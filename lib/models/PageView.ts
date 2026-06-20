import mongoose, { Schema, Document, Model } from "mongoose";

export interface IPageView extends Document {
  page: string;
  count: number;
  lastVisited: Date;
}

const PageViewSchema = new Schema<IPageView>({
  page: { type: String, required: true, unique: true },
  count: { type: Number, default: 0 },
  lastVisited: { type: Date, default: Date.now },
});

const PageView: Model<IPageView> =
  mongoose.models.PageView ||
  mongoose.model<IPageView>("PageView", PageViewSchema);

export default PageView;
