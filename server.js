import express from "express";
import mongoose from "mongoose";
import Product from "./models/productModel.js";
const app = express();
//middleware
app.use(express.json());

//getall products
app.get("/", async (req, res) => {
  let products;
  try {
    products = await Product.find();
  } catch (error) {
    console.log(error);
  }
  if (!products) {
    res.status(404).json({ message: "N/A" });
  }
  res.status(200).json({ products });
});

app.get("/blog", (req, res) => {
  res.send("heya i am kuber");
});


//fetch by id
app.get("/products/:id", async (req, res) => {
  try {
    const {id}=req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    console.log(err);
    res.status(500).json({ message: "not well" });
  }
});

//add products
app.post("/products", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "sb not changa si" });
  }
});

//update 
app.put("/products/:id",async(req,res)=>{
    try {
        const {id}=req.params;
    } catch (error) {
        res.status(500).json({ message: "sb not changa si" });
    }
})



mongoose
  .connect(
    "mongodb+srv://suyash:7jIrpLn5LZRAr4aX@cluster0.t65usjp.mongodb.net/restful?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(3002);
  })
  .then(() => {
    console.log("db connected");
  })
  .catch((err) => {
    console.log(err);
  });
