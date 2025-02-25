import mongoose from "mongoose";

const topicSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    slug: { type: String, unique: true },
  },
  { timestamps: true }
);

// Ensure model is not redefined

export default mongoose.models.Topic || mongoose.model("Topic", topicSchema);;
