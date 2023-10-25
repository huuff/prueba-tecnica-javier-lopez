import { Schema, model, models } from "mongoose";
import { DaySchema } from "./Day";

export const RouteSchema = new Schema(
  {
    month: Number,
    year: Number,
    days: {
        type: [ DaySchema ],
        required: true,
      },
  }
);

export const ALCEGEUT = models.ALCEGEUT || model("ALCEGEUT", RouteSchema);
export const GEUTALCE = models.GEUTALCE || model("GEUTALCE", RouteSchema);