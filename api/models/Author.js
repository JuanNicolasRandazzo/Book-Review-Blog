// models/Author.js
const mongoose = require("mongoose");

const AuthorSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        bio: {
            type: String,
        },
        birthDate: {
            type: Date,
        },
        deathDate: {
            type: Date,
        },
        nationality: {
            type: String,
        },
        photo: {
            type: String, // URL a la imagen del autor
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Author", AuthorSchema);
