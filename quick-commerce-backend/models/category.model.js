import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, unique: true },
    icon: { type: String, default: "" },  // optional (emoji or URL)
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Category", categorySchema);