import express from "express";
import cors from "cors"; // cross origin resource sharing
import fs from "node:fs";
import { log } from "node:console";
import mongoose from "mongoose";
import billingRoutes from "./BillingRoutes.js";

const mongoURI ="mongodb+srv://redmenIshab:2D5KPigID2s24CsD@mern-mmamc.iobwd2h.mongodb.net/";

(async()=>{
 try{
  await mongoose.connect(mongoURI)
  console.log("MongoDB connected successfully") }
  catch(error){
    console.error("Error connecting to MongoDB:", error)
  }
})()

const app = express();

app.use(express.json()); // when a req contains JSON data in its body, parse it so I can access it through req.body.
app.use(cors()); // tells your express server to allow requests coming from a different origin.

/*------------------------ROUTES-----------------------------*/
/*-----------------------------------------------------*/
// ROUTES
app.get("/", (req, res) => {
  res.send("hello from server");
});

/*----------------------GET ORDERS-------------------------------*/

app.get("/orders", (req, res) => {
  fs.readFile("./db.json", "utf-8", (err, data) => {
    res.send(JSON.parse(data));
  });
});

/*----------------------POST ORDERS-------------------------------*/
app.post("/orders", (req, res) => {
  // console.log(req.body);

  fs.readFile("./db.json", "utf-8", (err, data) => {
    // console.log(data);
    // console.log(typeof data); // string
    let db = [];
    db = JSON.parse(data); // into Js object
    db.push(req.body);

    fs.writeFile("./db.json", JSON.stringify(db), "utf-8", (err) => {
      console.log("Your file has been written.");
    });
  });

  // res.json({
  //   message: "Order received",
  //   order: req.body,
  // });
});

/*----------------------EDIT ORDERS-------------------------------*/

app.post("/orders/:table_no", (req, res) => {
  fs.readFile("./db.json", "utf-8", (err, data) => {
    let db = [];
    db = JSON.parse(data); // into Js object
    const index = db.findIndex((item) => item.table_no == req.params.table_no);
    db.splice(index, 1, req.body);

    fs.writeFile("./db.json", JSON.stringify(db), "utf-8", (err) => {
      console.log("Your file has been written.");
    });
  });
});
//

/*-----------------------------------------------------*/



app.use("/billing", billingRoutes)

app.listen(3000, () => {
  console.log("running on port 3000");
});
