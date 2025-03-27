import mongoose from "mongoose";

const topicdataSchema = new mongoose.Schema({
    title:{
        type: String,
        default:""
    },
    component_type: {
        type: String,
        required: true,
       enum: ["video", "audio", "article","shorts","collections","music","movie"],
        default: "video"
    },
    limit: {
        type: Number,
        required: true,
        default: 3
    },
    html_content: {
        type: String,
        required: true
    },
    index: {
        type: Number,
        required: true
    },
    topic_id: {
        type: String,
        required: true
    },
    category_name: [{
        type: String,
        default: ""
    }],
    topic_name: {
        type: String,
        required: true
    }
}, { timestamps: true });

export default mongoose.models.TopicData || mongoose.model("TopicData", topicdataSchema, "topicdata");