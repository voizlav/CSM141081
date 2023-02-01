require("dotenv").config();
const mongoose = require("mongoose");
const crypto = require("crypto");

process.argv.length < 3
  ? (console.error("Must provide password"), process.exit(1))
  : null;

const PASS = process.argv[2];
const DBUSER = process.env.DBUSER;
const CLUSTER = process.env.CLUSTER;
const REGION = process.env.REGION;
const DATABASE = process.env.DATABASE;
const URI = `mongodb+srv://${DBUSER}:${PASS}@${CLUSTER}.${REGION}.mongodb.net/${DATABASE}?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);
mongoose.connect(URI);

const Peeps = mongoose.model(
  "Peeps",
  new mongoose.Schema({
    id: String,
    name: String,
    number: String,
  })
);

process.argv.length < 4
  ? Peeps.find().then((result) => {
      result.forEach((person) => {
        console.log(`${person.name} ${person.number}`);
      });
      mongoose.connection.close();
    })
  : new Peeps({
      id: crypto.randomUUID().split("-")[0],
      name: process.argv[3],
      number: process.argv[4],
    })
      .save()
      .then((result) => {
        console.log(
          `added ${result.name} number ${result.number} to phonebook`
        );
        mongoose.connection.close();
      });
