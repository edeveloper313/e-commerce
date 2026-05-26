import express from "express";
import cors from "cors";

import seedRouter from "./routes/Seed.routes.js"
import productRouter from "./routes/Product.routes.js"

const app=express()
app.use(express.json())
app.use(cors())


app.use("/api/seeding",seedRouter)
app.use("/api/products",productRouter)

app.get("/", (req, res) => {
    res.send("API is running...");
});

export default  app;