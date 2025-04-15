const mongoose = require("mongoose");

const FileSchema = new mongoose.Schema({
    filename: { type: String, required: true }, // Nombre del archivo
    path: { type: String, required: true }, // Ruta donde se almacena
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Quién subió el archivo
}, { timestamps: true });

module.exports = mongoose.model("File", FileSchema);
