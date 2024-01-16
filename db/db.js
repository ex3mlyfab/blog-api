const mongoose = require('mongoose');
require('dotenv').config();

const connect = async () => {
    await mongoose.connect(process.env.mongo);
}

const disconnect = async () => {
    await mongoose.connection.close();
}
module.exports = { connect }