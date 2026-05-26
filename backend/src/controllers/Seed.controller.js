// backend/controllers/seedController.js
import axios from "axios"
import Product from "../models/Product.model.js"
const seedProducts = async (req, res) => {
  try {
    // 1. Fake Store API se dummy products fetch karein
    const response = await axios.get('https://fakestoreapi.com/products');
    const dummyProducts = response.data;

    // 2. Data ko hamare Product Model ke mutabiq map karein
    const productsToInsert = dummyProducts.map(product => ({
      name: product.title,
      description: product.description,
      price: product.price,
      category: product.category,
      images: [product.image], // Fake Store API mein single image hoti hai, hum array banate hain
      stock: Math.floor(Math.random() * 50) + 10 // Random stock value
    }));

    // 3. Purane products delete karein aur naye insert karein
    await Product.deleteMany({}); // Warning: Production mein ye line caution se use karein!
    await Product.insertMany(productsToInsert);

    res.status(200).json({ message: "Database seeded successfully with dummy products!" });
  } catch (error) {
    console.error("Error seeding database:", error);
    res.status(500).json({ message: "Failed to seed database", error: error.message });
  }
};

export default seedProducts;