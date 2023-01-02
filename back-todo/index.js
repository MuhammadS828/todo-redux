const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors")

const app = express();

app.use(cors())
app.use(express.json());
app.use(require("./routers/todo.route"));

mongoose.connect(
  "mongodb+srv://Umar:Umar2002@cluster0.lfxnu2y.mongodb.net/todo-redux",
  (err) => {
    if (err) {
      console.log(err);
    }
    console.log("База подключена");
  }
);

app.listen(3000, () => {
  console.log("started");
});
