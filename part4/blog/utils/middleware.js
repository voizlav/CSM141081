const mongoose = require("mongoose");
const { CastError, ValidationError } = mongoose.Error;
const { info, error } = require("./logger");

const requestLog = (req, _, next) => {
  info("Method:", req.method);
  info("Path:", req.path);
  info("Body", req.body);
  info("---");
  next();
};

const notFound = (_, res) => {
  res.status(404).send({ error: "Unknown endpoint" });
};

const errorHandler = (err, _, res) => {
  error(err.message);

  if (err instanceof ValidationError)
    return res.status(400).json({ error: "Validtion error" });

  if (err instanceof CastError)
    return res.status(400).json({ error: "Malformed ID" });

  return res.status(500).json({ error: "Internal Server Error" });
};

module.exports = { requestLog, notFound, errorHandler };
