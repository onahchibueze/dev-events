import mongoose, { Schema, Document, models } from "mongoose";

// 1️⃣ Base Event interface (pure data)
export interface IEvent {
  title: string;
  slug: string;
  description: string;
  overview: string;
  image: string;
  venue: string;
  location: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  mode: "online" | "offline" | "hybrid";
  audience: string;
  agenda: string[];
  organizer: string;
  tags: string[];
}

// 2️⃣ Mongoose Event Document
export interface IEventDocument extends IEvent, Document {}

// 3️⃣ Event Schema
const eventSchema = new Schema<IEventDocument>(
  {
    title: { type: String, required: [true, "Title is required"], trim: true },
    slug: { type: String, unique: true },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    overview: {
      type: String,
      required: [true, "Overview is required"],
      trim: true,
    },
    image: { type: String, required: [true, "Image is required"], trim: true },
    venue: { type: String, required: [true, "Venue is required"], trim: true },
    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
    },
    date: { type: String, required: [true, "Date is required"] },
    time: { type: String, required: [true, "Time is required"] },
    mode: {
      type: String,
      enum: ["online", "offline", "hybrid"],
      required: [true, "Mode is required"],
    },
    audience: {
      type: String,
      required: [true, "Audience is required"],
      trim: true,
    },
    agenda: { type: [String], required: [true, "Agenda is required"] },
    organizer: {
      type: String,
      required: [true, "Organizer is required"],
      trim: true,
    },
    tags: { type: [String], required: [true, "Tags are required"] },
  },
  {
    timestamps: true,
  }
);

// 4️⃣ Indexes
eventSchema.index({ slug: 1 }, { unique: true });

// 5️⃣ Pre-save hook
eventSchema.pre<IEventDocument>("save", function (next) {
  // Generate slug
  if (this.isModified("title") || this.isNew) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  }

  // Normalize date
  if (this.isModified("date") || this.isNew) {
    const dateObj = new Date(this.date);
    if (isNaN(dateObj.getTime())) {
      return next(new Error("Invalid date format"));
    }
    this.date = dateObj.toISOString().split("T")[0];
  }

  // Validate time
  if (this.isModified("time") || this.isNew) {
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    if (!timeRegex.test(this.time)) {
      return next(new Error("Time must be in HH:MM format"));
    }
  }

  next();
});

// 6️⃣ Export model (safe for Next.js)
const Event =
  models.Event || mongoose.model<IEventDocument>("Event", eventSchema);

export default Event;
