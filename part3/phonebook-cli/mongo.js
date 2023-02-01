require("dotenv").config();
const mongoose = require("mongoose");
const crypto = require("crypto");

process.argv.length < 3 || process.argv.length > 5 || process.argv.length === 4
  ? (console.error("Usage: node mongo.js password [name] [number]"),
    process.exit(1))
  : null;

process.argv.length === 5
  ? process.argv[3].length > 30 ||
    process.argv[3].length < 3 ||
    process.argv[4].length > 15 ||
    process.argv[4].length < 3
    ? (console.error("Name or/and number length out of scope"), process.exit(1))
    : null
  : null;

process.argv.length === 5
  ? !/^\p{L}+(\s\p{L}+)*$/u.test(process.argv[3])
    ? (console.error("Invalid name"), process.exit(1))
    : !/^\d+(?:-\d+)?$/.test(process.argv[4])
    ? (console.error("Invalid number"), process.exit(1))
    : null
  : null;

!process.env.DBUSER ||
!process.env.CLUSTER ||
!process.env.REGION ||
!process.env.DATABASE
  ? (console.error("Must provide database configuration"), process.exit(1))
  : null;

mongoose.set("strictQuery", false);
mongoose.connect(
  `mongodb+srv://` +
    `${process.env.DBUSER}` +
    `:${process.argv[2]}` +
    `@${process.env.CLUSTER}` +
    `.${process.env.REGION}` +
    `.mongodb.net/` +
    `${process.env.DATABASE}` +
    `?retryWrites=true&w=majority`
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
