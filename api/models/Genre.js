const mongoose = require("mongoose");

const GenreSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true }
});

module.exports = mongoose.model("Genre", GenreSchema);