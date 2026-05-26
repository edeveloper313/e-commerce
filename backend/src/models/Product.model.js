import mongoose from "mongoose"
const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    description: String,
    category: String,
    images: [String],
    stock: Number
}, { timestamps: true });
// Scalability ke liye indexing:
productSchema.index({ name: 'text', category: 1 }); 
const productModel = mongoose.model('Product', productSchema);

export default productModel