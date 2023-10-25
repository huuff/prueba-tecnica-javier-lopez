import { Schema, model, models } from "mongoose";

export const TripSchema = new Schema(
  {
    arrival: String,
    operator: String,
    ship: String,
    time: String,
  }
);

export const Trip = models.Trip || model("Trip", TripSchema);