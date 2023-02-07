const http = require("http");
const cors = require("cors");
const mongoose = require("mongoose");
const express = require("express");
const app = express();

const blogRoutes = require("./controllers/blogs");
const { requestLog, notFound, errorHandler } = require("./utils/middleware");
const { DATABASE_URI } = require("./utils/config");
const { info, error } = require("./utils/logger");

mongoose.set("strictQuery", false);
mongoose
  .connect(DATABASE_URI)
  .then(info("Connection established to database"))
  .catch((err) => error("Error connecting to database:", err.message));

app.use(cors());
app.use(express.json());
app.use(requestLog);
app.use("/api/blogs", blogRoutes);
app.use(notFound);
app.use(errorHandler);

module.exports = { app };
