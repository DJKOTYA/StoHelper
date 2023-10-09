const { Schema, model } = require("mongoose");

const Service = new Schema({
  Login: { type: String, unique: true, require: true },
  Password: { type: String, require: true },
  ServiceName: { type: String, require: true },
  TelephoneNumber: { type: String, require: true, unique: true },
  StartOfWork: { type: String, require: true },
  EndOfWork: { type: String, require: true },
  WebAddres: { type: String, require: true, unique: true },
  City: { type: String, require: true },
  Addres: { type: String, require: true }, //автозаполнение адреса при регистрации
  Index: { type: String, require: true },
  AsisstanceService: [{ type: String }],
  Reviews: [
    {
      review: String,
      UserName: String,
    },
  ],
  Application: [
    {
      UserName: String,
      ListAssistance: [String],
      Date: String,
      Time: String,
    },
  ],
});

module.exports = model("Services", Service);
