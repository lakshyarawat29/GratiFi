const express = require("express");
const mongoose = require("mongoose");
const creatorRoutes = require("./routes/creator.route");
const tipperRoutes = require("./routes/tipper.route");
const app = express();

// Middleware
app.use(express.json());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/creator", creatorRoutes);
app.use("/api/tipper", tipperRoutes);

mongoose
  .connect(
    'mongodb+srv://lr29freelancer:oaemRemYERh1icNF@backenddb.thles.mongodb.net/Node-API?retryWrites=true&w=majority&appName=BackendDB'
  )
  .then(() => {
    console.log('Connected to database');
    app.listen(3000, () => {
      console.log('server running on port 3000');
    });
  })
  .catch(() => {
    console.log('Connection Failed');
  });

