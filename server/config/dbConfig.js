require('dotenv').config()

const mongoose = require('mongoose');


mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URI);

const db = mongoose.connection;

db.on('connected', () => {
    console.log("Mongo DB connection successfull");
})

db.on('error', (err) => {
    console.log('Mongo DB connection failed')
})

module.exports = db;