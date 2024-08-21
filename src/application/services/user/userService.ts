import { IUserService } from "./IUserService";
import { User } from "../../../domain/user";
import { IUserProps } from "../../handlers/dtos/IUserProps";
import { inject, injectable } from "inversify";
import { TYPES } from "../../utilities/types";
import { IUserRepository } from "../../../infrastructure/abstract_repos/IUserRepository";
import { UserMapper } from "../../../infrastructure/data_access/orm_repository/mappers/userMapper";
import { UserEntity } from "../../../infrastructure/models/UserEntity";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ILoginProps } from "../../handlers/dtos/ILoginProps";

@injectable()
export class UserService implements IUserService {
  secretKey = "your-secret-key";

  constructor(
    @inject(TYPES.IUserRepository) private userRepository: IUserRepository
  ) {}

  async login(loginProps: ILoginProps): Promise<string> {
    const user = await this.userRepository.getByName(loginProps.username);
    if (!user || !(await bcrypt.compare(loginProps.password, user.password))) {
      throw new Error(`Invalid username or password`);
    }
    const token = jwt.sign(
      { username: user.username, role: user.role },
      this.secretKey,
      { expiresIn: "1h" }
    );
    return token;
  }

  async getUsers(): Promise<User[]> {
    const users: UserEntity[] = await this.userRepository.getAll();
    return users.map((user: UserEntity) => UserMapper.toDomain(user));
  }

  async findUserByName(name: string): Promise<User | null> {
    const user: UserEntity | null = await this.userRepository.getByName(name);
    if (user == null) {
      return null;
    } else {
      return UserMapper.toDomain(user);
    }
  }

  async saveUser(userProps: IUserProps): Promise<User> {
    const hashedPassword = await bcrypt.hash(userProps.password, 10);
    userProps.password = hashedPassword;
    const user: User = User.create(userProps);
    const savedUser = await this.userRepository.save(UserMapper.toEntity(user));
    return UserMapper.toDomain(savedUser);
  }
}
