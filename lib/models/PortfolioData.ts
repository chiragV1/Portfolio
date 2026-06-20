import mongoose, { Schema, Document, Model } from "mongoose";

export interface IExperienceEntry {
  period: string;
  role: string;
  company: string;
  location: string;
  description: string;
  tags: string[];
  current: boolean;
}

export interface IEducationEntry {
  period: string;
  degree: string;
  institution: string;
  score: string;
  description: string;
}

export interface ISkillCategory {
  category: string;
  icon: string;
  skills: { name: string; level: number; color: string }[];
}

export interface IProfile {
  name: string;
  tagline: string;
  bio: string;
  location: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  twitter: string;
  stats: {
    yearsExperience: string;
    projectsCompleted: string;
    happyClients: string;
    toolsBuilt: string;
  };
}

export interface IPortfolioData extends Document {
  profile: IProfile;
  experience: IExperienceEntry[];
  education: IEducationEntry[];
  skills: ISkillCategory[];
  updatedAt: Date;
}

const ExperienceSchema = new Schema<IExperienceEntry>({
  period: String,
  role: String,
  company: String,
  location: String,
  description: String,
  tags: [String],
  current: { type: Boolean, default: false },
});

const EducationSchema = new Schema<IEducationEntry>({
  period: String,
  degree: String,
  institution: String,
  score: String,
  description: String,
});

const SkillSchema = new Schema({
  category: String,
  icon: String,
  skills: [{ name: String, level: Number, color: String }],
});

const ProfileSchema = new Schema<IProfile>({
  name: String,
  tagline: String,
  bio: String,
  location: String,
  email: String,
  phone: String,
  github: String,
  linkedin: String,
  twitter: String,
  stats: {
    yearsExperience: String,
    projectsCompleted: String,
    happyClients: String,
    toolsBuilt: String,
  },
});

const PortfolioDataSchema = new Schema<IPortfolioData>(
  {
    profile: ProfileSchema,
    experience: [ExperienceSchema],
    education: [EducationSchema],
    skills: [SkillSchema],
  },
  { timestamps: true }
);

const PortfolioData: Model<IPortfolioData> =
  mongoose.models.PortfolioData ||
  mongoose.model<IPortfolioData>("PortfolioData", PortfolioDataSchema);

export default PortfolioData;
