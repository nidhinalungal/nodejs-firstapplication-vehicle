import { Request, Response } from "express";
import { Bike } from "../../domain/bike";
import bikeManager from "../services/bike/bikeInMemoryService";
import { IBikeProps } from "../handlers/dtos/IBikeProps";

class BikeController {
  public hello(req: Request, res: Response): void {
    res.status(200).json({
      message: "Welcome to BikeController!!",
    });
  }

  public getBikes(req: Request, res: Response): void {
    res.send(bikeManager.getBikes());
  }

  public createBike(req: Request, res: Response): void {
    const bikeProps: IBikeProps = req.body;
    const bike = Bike.create(bikeProps);
    bikeManager.addBike(bike);
    res.status(201).send(bike);
  }

  public deleteBike(req: Request, res: Response): void {
    const index = parseInt(req.params.index, 10);
    if (isNaN(index)) {
      res.status(400).send({ error: "Invalid index" });
      return;
    }
    bikeManager.deleteBike(index);
    res.status(204).send();
  }
}

export default new BikeController();
