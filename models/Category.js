import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    identifier: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    search_title: [{ type: String }],
    content_type: {
      type: String,
      enum: ["category", "album"],
      default: "category",
    },
    related_content_type: [{ type: String, default: ["video"] }],
    desc: { type: String },
    img: { type: String }, // URL of image
    roundImg: { type: String },
    topic: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Topic",
    },
    topic_name: { type: String },
    tag: [{ type: String }],
    slug: { type: String },
    publish_date: {
      type: Date,
      default: Date.now,
    },
    donate: {
      isVisible: { type: Boolean, default: true },
      donate_text: { type: String },
      donate_link: { type: String },
    },
    interest: [{ type: String }],
    follow_count: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Check if model already exists to prevent overwriting
export default mongoose.models.Category || mongoose.model("Category", categorySchema);


