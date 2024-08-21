import { User } from "../../../../domain/user";
import { UserEntity } from "../../../models/UserEntity";

export class UserMapper {
  static toDomain(user: UserEntity): User {
    const userProps = {
      id: user.id,
      name: user.name,
      username: user.username,
      password: user.password,
      role: user.role,
    };
    return new User(userProps);
  }

  static toEntity(user: User): UserEntity {
    const userEntity: UserEntity = new UserEntity();
    userEntity.id = user.id;
    userEntity.name = user.name;
    userEntity.username = user.username;
    userEntity.password = user.password;
    userEntity.role = user.role;
    return userEntity;
  }
}
