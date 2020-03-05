/** @format */

const express = require("express");
const app = express();
const fs = require("fs");

app.get("/", (req, res) => {
  fs.readFile("./data.json", "utf8", (err, dataRead) => {
    if (err) {
      res.send(err);
    } else {
        var foundData = JSON.parse(dataRead);

      if (req.query.page) {
        if (req.query.position) {
          let a = foundData.data.filter(o => {
            if ('open' === o.position) {
              return o;
            }
          });
              let output = a.splice(0,req.query.page*10)
            res.send(output)

        }else{
            res.send(foundData.data.splice(0,req.query.page*10))
        }
        
      }else{
          res.send(foundData.data)
      }
      // res.send(dataRead)
    }
  });
});
app.listen("3000", (err, connect) => {
  if (err) {
    console.log("err");
  } else {
    console.log("connect");
  }
});
