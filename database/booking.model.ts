import mongoose, { Schema, Document, models } from "mongoose";
import Event from "./event.model";

// 1️⃣ Booking interface
export interface IBooking extends Document {
  eventId: mongoose.Types.ObjectId;
  email: string;
}

// 2️⃣ Booking schema
const bookingSchema = new Schema<IBooking>(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: "Event",
      required: [true, "Event ID is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      validate: {
        validator: function (v: string) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: "Invalid email format",
      },
    },
  },
  {
    timestamps: true,
  }
);

// 3️⃣ Indexes
bookingSchema.index({ eventId: 1 });
bookingSchema.index({ eventId: 1, email: 1 }, { unique: true });

// 4️⃣ Pre-save hook: verify event exists
bookingSchema.pre<IBooking>("save", async function (next) {
  try {
    const eventExists = await Event.exists({ _id: this.eventId });

    if (!eventExists) {
      return next(new Error("Referenced event does not exist"));
    }

    next();
  } catch (error) {
    next(error as Error);
  }
});

// 5️⃣ Export model (safe for Next.js)
const Booking =
  models.Booking || mongoose.model<IBooking>("Booking", bookingSchema);

export default Booking;
