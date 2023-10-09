const  { Schema, model} = require("mongoose")

const Users = new Schema({
    Login: {type: String, unique: true, require: true},
    UserName: {type: String, require: true},
    Password: {type: String, require: true},
    CarNumber: {type: String, unique: true},
    VinNumber: {type: String, unique: true},
    TelephoneNumber: {type: String, unique: true, require: true},  
})

module.exports = model("Users", Users)