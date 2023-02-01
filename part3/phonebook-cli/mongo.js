require("dotenv").config();
const mongoose = require("mongoose");
const crypto = require("crypto");

process.argv.length < 3
  ? (console.error("Must provide password"), process.exit(1))
  : null;

!process.env.DBUSER ||
!process.env.CLUSTER ||
!process.env.REGION ||
!process.env.DATABASE
  ? (console.error("Must provide configuration"), process.exit(1))
  : null;

mongoose.set("strictQuery", false);
mongoose.connect(
  `mongodb+srv://${process.env.DBUSER}:${process.argv[2]}@${process.env.CLUSTER}.${process.env.REGION}.mongodb.net/${process.env.DATABASE}?retryWrites=true&w=majority`
);

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
      result.forEach((person) =>
        console.log(`${person.name} ${person.number}`)
      );
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
