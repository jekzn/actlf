require("dotenv").config();

const express = require("express");
const Data = require("./models/model");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const mongoString = process.env.DATABASE_URL;
app.use(cors());
mongoose.connect(mongoString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const database = mongoose.connection;
database.on("error", (error) => {
  console.log(error);
});

database.once("open", () => {
  console.log("Database Connected");
});

app.use(express.json());

const routes = require("./routes/routes");
app.use("/api", routes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started at PORT ${port}`);
});
