require("dotenv").config();
const { error } = require("./logger");

!process.env.DATABASE_URI
  ? (error("No database configuration"), process.exit(1))
  : null;

const PORT = process.env.PORT || 3001;
const DATABASE_URI = process.env.DATABASE_URI;

module.exports = { PORT, DATABASE_URI };
