import { Request, Response, NextFunction } from "express";
import { ICarProps } from "../../handlers/dtos/ICarProps";
import { error } from "console";
import Joi from "joi";

export function validateCarProps(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const schema = Joi.object<ICarProps>({
    regNo: Joi.string().required().not(null).messages({
      "string.base": "Registration number must be a string",
      "any.required": "Registration number is required",
      "any.invalid": "Registration number cannot be null",
    }),
    year: Joi.number().integer().min(2001).required().messages({
      "number.base": "Year must be a number",
      "number.min": "Year must be greater than 2000",
      "any.required": "Year is required",
    }),
    // Add other properties and validations as needed
    model: Joi.string().required().not(null).messages({
      "string.base": "Model must be a string",
      "any.required": "Model is required",
      "any.invalid": "Model cannot be null",
    }),
  }).unknown(true);

  // Validate the request body against the schema
  const { error } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    res
      .status(400)
      .send({ error: error.details.map((detail) => detail.message) });
    return;
  }

  next();

  // const carProps: ICarProps = req.body;

  // if (!carProps.regNo) {
  //   res.status(400).send({ error: "Registration number is required" });
  //   throw new Error("Registration number is required");
  // }

  // const year = parseInt(carProps.year, 10);
  // if (isNaN(year) || year <= 2000) {
  //   res.status(400).send({ error: "Year must be greater than 2000" });
  //   throw new Error("Year must be greater than 2000");
  // }

  // next();
}
