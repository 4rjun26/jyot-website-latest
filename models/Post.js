import mongoose from "mongoose";

const postSchema = new mongoose.Schema({

    identifier: {
        type: String,
        required: true,
    },

    title:{
        type: String,
        required: true,
        default: "null"
    },

    ep:{
        type: String,
    },

    extra: {
        type: String
    },

    title_format: {
        type: String,
        default: "null"
    },

    search_title:{
        type: String,
    },

    desc: {
        type: String
    },

    link: {
        type: String
    },

    views: {
        type: Number
    },

    img: {
        type: String,  // Img url
        required: true
    },

    publish_date : {
        type: Date,
        default: new Date().toDateString(),
    },

    content_type: {
        type: String,
        enum: ["video", "audio", "article","shorts","collections","music","movie"],
        default: "video"
    },

    visibility: {
        type: Boolean,
        required: true,
        default: true
    },

    category_id: [{
        type: mongoose.Schema.Types.ObjectId,
        ref : "Category"
    }],

    category_name: [{
        type: String,
    }],

    topic_name: [{
        type: String,
    }],

    topic_id: [{
        type: mongoose.Schema.Types.ObjectId,
        ref : "Topic"
    }],


    slug: {
        type: String,
    },

    like_count: {
        type: Number,
        required: true,
        default: 0
    },

    interest: [{
        type: String
    }]

    // tag: [tagSchema],


}, { timestamps: true });


export default mongoose.models.Post || mongoose.model("Post", postSchema);