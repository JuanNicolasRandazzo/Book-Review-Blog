const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true }, // Puede ser un usuario o un nombre
    description: { type: String, required: true },
    genres: [{ type: mongoose.Schema.Types.ObjectId, ref: "Genre" }], // Relación con géneros
    categories: [{ type: String }], // Relación con categorías como "Reseña", "Entrevista"
    coverImage: { type: String }, // URL de la imagen de la portada
    pdf: { type: mongoose.Schema.Types.ObjectId, ref: "File" }, // Referencia al archivo PDF (si se sube)
    price: { type: Number, default: 0 }, // Precio si se vende en físico
    availableForSale: { type: Boolean, default: false }, // Si está a la venta o no
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Quién subió el libro
}, { timestamps: true });

module.exports = mongoose.model("Book", BookSchema);
