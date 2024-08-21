import { injectable } from "inversify";
import { ICarService } from "./interface/ICarService";
import { Car } from "../../../domain/car";
import { ICarProps } from "../../handlers/dtos/ICarProps";
import pool from "../../../config/mysql-pool";

@injectable()
export class CarDbService {
  getCars(): Car[] {
    throw new Error("Method not implemented.");
  }
  public findCarById(id: number): Car | undefined {
    throw new Error("Method not implemented.");
  }
  addCar(carProps: ICarProps): Car {
    const car = Car.create(carProps);
    const savedcar = this.createCarInDB(car);
    return car;
  }
  updateCar(id: number, updateCar: ICarProps): Car | undefined {
    throw new Error("Method not implemented.");
  }
  deleteCar(id: number): string;
  deleteCar(regNo: string): string;
  deleteCar(regNo: unknown): string {
    throw new Error("Method not implemented.");
  }

  private async executeQuery(query: string, values: any[]): Promise<any> {
    return new Promise((resolve, reject) => {
      pool.query(query, values, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }

  public async createCarInDB(car: Car): Promise<Car> {
    const query = `INSERT INTO Cars (regNo, brand, model, year, seatCapacity) VALUES (?, ?, ?, ?, ?)`;
    const values = [
      car.regNo,
      car.brand,
      car.model,
      car.year,
      car.seatCapacity,
    ];

    try {
      const result = await this.executeQuery(query, values);
      car.id = result.insertId; // Assuming 'id' is auto-generated and returned
      return car;
    } catch (err) {
      console.error("Error creating car:", err);
      throw err;
    }
  }

  public async getCarByIdFromDB(id: number): Promise<Car | null> {
    const query = `SELECT * FROM Cars WHERE id = ?`;
    const values = [id];

    try {
      const rows = await this.executeQuery(query, values);
      if (rows.length > 0) {
        return rows[0] as Car;
      } else {
        return null;
      }
    } catch (err) {
      console.error("Error retrieving car:", err);
      throw err;
    }
  }

  public async getCarsFromDB(): Promise<Car[]> {
    const query = `SELECT * FROM Cars`;

    try {
      const rows = await this.executeQuery(query, []);
      const cars: Car[] = rows.map((row: any) => ({
        id: row.id,
        regNo: row.regNo,
        brand: row.brand,
        model: row.model,
        year: row.year,
        seatCapacity: row.seatCapacity,
        // Add more properties as needed
      }));
      return cars;
    } catch (err) {
      console.error("Error retrieving cars:", err);
      throw err;
    }
  }

  public async updateCarFromDB(car: Car): Promise<Car | null> {
    const query = `UPDATE Cars SET regNo = ?, brand = ?, model = ?, year = ?, seatCapacity = ? WHERE id = ?`;
    const values = [
      car.regNo,
      car.brand,
      car.model,
      car.year,
      car.seatCapacity,
      car.id,
    ];

    try {
      const result = await this.executeQuery(query, values);
      if (result.affectedRows > 0) {
        return car;
      } else {
        return null;
      }
    } catch (err) {
      console.error("Error updating car:", err);
      throw err;
    }
  }

  public async deleteCarFromDB(id: number): Promise<boolean> {
    const query = `DELETE FROM Cars WHERE id = ?`;
    const values = [id];

    try {
      const result = await this.executeQuery(query, values);
      return result.affectedRows > 0;
    } catch (err) {
      console.error("Error deleting car:", err);
      throw err;
    }
  }
}

// const mysqlConfig = require("../config/mysql-config.json");

// export async function saveToMySQLDB(car: Car): Promise<Car> {
//   const connection = mysql.createConnection(mysqlConfig);

//   try {
//     connection.connect();

//     const query = `INSERT INTO Cars (regNo, brand, model, year, seatCapacity) VALUES (?, ?, ?, ?, ?)`;
//     const values = [
//       car.regNo,
//       car.brand,
//       car.model,
//       car.year,
//       car.seatCapacity,
//     ];

//     const result = await new Promise<any>((resolve, reject) => {
//       connection.query(query, values, (err, results) => {
//         if (err) reject(err);
//         else resolve(results);
//       });
//     });

//     car.id = result.insertId; // Assuming 'id' is auto-generated and returned

//     return car;
//   } catch (err) {
//     console.error("MySQL error:", err);
//     throw err;
//   } finally {
//     connection.end(); // Close the connection
//   }
// }
