import { Schema, model, models } from "mongoose";
import { TripSchema } from "./Trip";

export const DaySchema = new Schema(
  {
    day: Number,
    trips: {
        type: [ TripSchema ],
        required: true,
      },
  }
);

export const Day = models.Day || model("Day", DaySchema);
