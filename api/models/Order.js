const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    buyer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Quién compró
    book: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true }, // Qué libro compró
    seller: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Quién vendió
    price: { type: Number, required: true },
    status: {
        type: String,
        enum: ["Pending", "Shipped", "Delivered", "Cancelled"],
        default: "Pending"
    },
    address: { type: String, required: true }, // Dirección de envío
}, { timestamps: true });

module.exports = mongoose.model("Order", OrderSchema);