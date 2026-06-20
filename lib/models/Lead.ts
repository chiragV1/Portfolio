import mongoose, { Schema, Document, Model } from "mongoose";

export interface ILead extends Document {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  projectType: string;
  message: string;
  source: string;
  status: "new" | "contacted" | "closed";
  createdAt: Date;
}

const LeadSchema = new Schema<ILead>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    company: { type: String, trim: true },
    phone: { type: String, trim: true },
    projectType: { type: String, required: true },
    message: { type: String, required: true },
    source: { type: String, default: "portfolio" },
    status: {
      type: String,
      enum: ["new", "contacted", "closed"],
      default: "new",
    },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

const Lead: Model<ILead> =
  mongoose.models.Lead || mongoose.model<ILead>("Lead", LeadSchema);

export default Lead;
