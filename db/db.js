const mongoose = require('mongoose');
require('dotenv').config();
const User = require('../models/userModel');

const connect = async () => {
    await mongoose.connect(process.env.mongo);
}

const disconnect = async () => {
    await mongoose.connection.close();
}

const findUser = async (obj) => {
    return User.find(obj).exec();
}

const saveUser = async (newUser) => {
    return await newUser.save();
}
module.exports = { connect, disconnect, findUser, saveUser }