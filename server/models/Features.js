import mongoose from "mongoose";

const FeaturesSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Feature = mongoose.model("Feature", FeaturesSchema);

export default Feature;
