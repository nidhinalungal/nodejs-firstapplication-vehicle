import cron from "node-cron";
import ExcelJS from "exceljs";
import nodemailer from "nodemailer";
import { TYPES } from "../../utilities/types";
import { inject, injectable } from "inversify";
import { ICarRepository } from "../../../infrastructure/abstract_repos/ICarRepository ";
import fs from "fs";
import path from "path";
import { CarEntity } from "../../../infrastructure/models/CarEntity";

@injectable()
export class CarsCronJobService {
  constructor(
    @inject(TYPES.ICarRepository) private carRepository: ICarRepository
  ) {}

  public async startJob() {
    // run at the end of the day
    // cron.schedule("0 0 * * *", async () => {
    //  run in every 2minutes
    cron.schedule("*/2 * * * *", async () => {
      const cars = await this.getCarsAddedToday();
      if (cars.length > 0) {
        const fileBuffer = await generateExcel(cars);
        //    const sendMail =   await sendEmail(fileBuffer);
        const reportsDir = path.join(__dirname, "reports");
        const filePath = path.join(
          reportsDir,
          `cars_report_${new Date().toISOString().replace(/:/g, "-")}.xlsx`
        );

        if (!fs.existsSync(reportsDir)) {
          fs.mkdirSync(reportsDir, { recursive: true });
        }

        fs.writeFile(filePath, fileBuffer, (err) => {
          if (err) {
            console.error("Error saving the Excel file:", err);
          } else {
            console.log("Excel file saved successfully:", filePath);
          }
        });
        console.log("Daily report sent.");
      } else {
        console.log("No cars added today.");
      }
    });

    console.log("Cron job scheduled.");
  }

  async getCarsAddedToday() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const carsAddedToday = await this.carRepository.getCarsAddedToday(
      today,
      tomorrow
    );

    console.log("cars fetched from db", carsAddedToday);
    return carsAddedToday;
  }
}
// Function to fetch car names added today

async function generateExcel(cars: CarEntity[]): Promise<Buffer> {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Cars");

  worksheet.columns = [
    { header: "Car Brand", key: "brand", width: 30 },
    { header: "Car Model", key: "model", width: 30 },
    { header: "Added Date", key: "addedDate", width: 30 },
  ];

  cars.forEach((car) => {
    worksheet.addRow({ brand : car.brand, model: car.model, addedDate: car.createdAt });
  });

  const buffer = (await workbook.xlsx.writeBuffer()) as Buffer;
  return buffer;
}

// Function to send email
async function sendEmail(fileBuffer: Buffer) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "nidhinalungal@gmail.com",
      pass: "password",
    },
  });

  const mailOptions = {
    from: "nidhinalungal@gmail.com",
    to: "alungalnidhin@gmail.com",
    subject: "Daily Car Report",
    text: "Attached is the Excel file with the cars added today.",
    attachments: [
      {
        filename: "DailyCarReport.xlsx",
        content: fileBuffer,
        contentType:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
    ],
  };

  await transporter.sendMail(mailOptions);
}
