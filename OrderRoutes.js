import { Router } from "express";
import fs from "node:fs";

const orderRoutes = Router();

// get
orderRoutes.get("/", (req, res) => {
  fs.readFile("./db.json", "utf-8", (err, data) => {
    res.send(JSON.parse(data));
  });
});

// post
orderRoutes.post("/", (req, res) => {
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
});

// handle order fulfilment and recall
orderRoutes.post("/:table_no", (req, res) => {
  fs.readFile("./db.json", "utf-8", (err, data) => {
    let db = [];
    db = JSON.parse(data); // into Js object
    const index = db.findIndex((item) => item.table_no == req.params.table_no); // too complicated : get the index of thet item
    db.splice(index, 1, req.body); // at position 'index' remove '1' item and and add 'req.body'
    // plz refer: https://www.w3schools.com/jsref/jsref_splice.asp

    fs.writeFile("./db.json", JSON.stringify(db), "utf-8", (err) => {
      console.log("Your file has been written.");
    });
  });
});
export default orderRoutes;
