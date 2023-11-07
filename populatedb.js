#! /usr/bin/env node

console.log(
    'This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Message = require('./models/message');

const messages = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
    console.log("Debug: About to connect");
    await mongoose.connect(mongoDB);
    console.log("Debug: Should be connected?");
    await createMessages();
    console.log("Debug: Closing mongoose");
    mongoose.connection.close();
}

async function messageCreate(index, user, message) {
    const m = new Message({ user: user, text: message, added: new Date() });
    await m.save();
    messages[index] = m;
    console.log(`Added message ${user}`);
}

async function createMessages() {
    console.log("Adding mesagges");
    await Promise.all([
        messageCreate(0, "Amando", "Hi there!"),
        messageCreate(1, "Charles", "Hello World!"),
    ]);
}