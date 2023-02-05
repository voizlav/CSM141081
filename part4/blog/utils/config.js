require("dotenv").config();

!process.env.DATABASE_URI ? console.error("No database configuration") : null;

const PORT = process.env.PORT || 3001;
const DATABASE_URI = process.env.DATABASE_URI;

module.exports = { PORT, DATABASE_URI };
