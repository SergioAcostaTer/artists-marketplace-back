import mongoose, { Schema, Document, Model } from "mongoose";

export interface ISocialLinks {
  spotify?: {
    url: string;
    monthlyListeners?: string;
  };
  instagram?: {
    url: string;
    username?: string;
    followers?: string;
  };
  [key: string]:
    | {
        url: string;
        [key: string]: string | undefined;
      }
    | undefined;
}

export interface IPortfolio extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  banner: string;
  mainColor?: string;
  secondaryColor?: string;
  socialLinks: ISocialLinks;
}

const portfolioSchema: Schema<IPortfolio> = new Schema(
  {
    userId: {
      type: String,
      ref: "User",
      required: true,
    },
    banner: {
      type: String,
      default: null,
    },
    mainColor: {
      type: String,
    },
    secondaryColor: {
      type: String,
    },
    socialLinks: {
      type: Map,
      of: Object,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

const Portfolio: Model<IPortfolio> = mongoose.model<IPortfolio>(
  "Portfolio",
  portfolioSchema
);

export default Portfolio;
