require("dotenv").config();

process.argv.length < 3
  ? (console.error("Must provide password"), process.exit(1))
  : null;

const PASSWORD = process.argv[2];
const USERNAME = process.env.USERNAME;
const CLUSTER = process.env.CLUSTER;
const REGION = process.env.REGION;
const DATABASE = process.env.DATABASE;

const URI = `mongodb+srv://${USERNAME}:${PASSWORD}@${CLUSTER}.${REGION}.mongodb.net/${DATABASE}?retryWrites=true&w=majority`;
