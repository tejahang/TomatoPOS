import express from "express";
import cors from "cors"; // cross origin resource sharing
import orderRoutes from "./OrderRoutes.js";
import mongoose from "mongoose";
const app = express();

app.use(express.json()); // when a req contains JSON data in its body, parse it so I can access it through req.body.
app.use(cors()); // tells your express server to allow requests coming from a different origin.

// connection string
const mongoURI =
  "mongodb+srv://tejahang:M6YzF08psUF2LsRw@cluster0.njq0bju.mongodb.net/?appName=Cluster0";

// db connection logic
(async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
})();

/*------------------------ROUTES-----------------------------*/
// ROUTES
app.get("/", (req, res) => {
  res.send("hello from server");
});

/*----------------------ORDER ORDERS-------------------------------*/
app.use("/orders", orderRoutes);

/*-----------------------------------------------------*/

app.listen(3000, () => {
  console.log("running on port 3000");
});
