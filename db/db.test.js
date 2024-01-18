const { connect, disconnect, findUser, saveUser } = require('./db');
const User = require('../models/userModel');
const mongoose = require('mongoose');
// const { describe } = require('node:test');
// describe, test(), expect()

beforeAll(async ()=> {
    console.log("mongo up and running");
    return await connect(); 
})


describe("Defined User Test Suite", ()=>{
    test("As a user I want to save my details to the Database", async ()=>{
        const newUser = new User({
            _id:mongoose.Schema.Types.ObjectId, 
            firstName: 'Olatunji',
            lastName: "Kadri",
            address: '123 main street.',
            city: 'abuja',
            state: 'FCT',
            email:'tunji@kadri.com',
            password: '1234',

        })
        const user = await saveUser(newUser); 
        expect(user.firstName).toEqual('olatunji');
        expect(user.lastName).toEqual('kadri');
        expect(user.address).toEqual('123 main street');
        expect(user.state).toEqual(newUser.state);
        expect(user.email).toEqual(newUser.email);
    })
})

afterAll(async ()=>{
    return await disconnect();
})