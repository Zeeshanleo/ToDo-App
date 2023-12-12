require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const todoRoutes = require("./routes/todo");

const app = express();

app.use(express.json());

//middleware
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//routes
app.use("/api/todo", todoRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("connected to database");

    app.listen(process.env.PORT, () => {
      console.log("Listening for request on port ", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
