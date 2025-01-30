require("dotenv").config();

const express = require("express");
const noteRoutes = require("./src/routes/noteRoutes");
const userRoutes=require('./src/routes/userRoute')
const { syncDB } = require("./src/models");
const bodyParser = require("body-parser");
const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded());
app.use("/api/notes", noteRoutes);
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 3000;

syncDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

