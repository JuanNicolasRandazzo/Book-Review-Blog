const mongoose = require("mongoose")

const PostSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    title: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: false,
    },
    categories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
    }],
    genres: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Genre",
    }],
    rating: {
        type: Number,
        min: 0,
        max: 5,
        required: true
    },
}, { timestamps: true });


module.exports = mongoose.model("Post", PostSchema);