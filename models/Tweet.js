import mongoose from "mongoose";

const tweetSchema = new mongoose.Schema({

    identifier: {
        type: String,
        required: true,
    },
    
    title:{
        type: String
    },

    name: {
        type: String,
        default: "Jyot India"
    },

    link: {
        type: String
    },

    handle: {
        type: String,
        default: "@IndiaJyot"
    },

    logo: {
        type: String,
        default: "https://jyot.in/wp-content/uploads/2022/05/logo-117.png"
    },

    img: {
        type: String
    },

    desc: {
        type: String
    },

    tweet_type: {
        type: String,
        enum: ["jyot","reply"],
        default: "jyot"
    },

    tags: [{ // list of strings
        type: String
    }],

    reply_to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tweets"
    },

    publish_date : {
        type: Date,
        default: new Date().toDateString(),
    },

    like_count: {
        type: Number,
        required: true,
        default: 0
    }

},{ timestamps: true });


export default mongoose.models.Tweet || mongoose.model("Tweet", tweetSchema);