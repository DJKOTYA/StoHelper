// файл для отправки данных на сервер
const Express = require("express");
const Router = new Express();
const Controller = require("./AuthUserController");

Router.post("/RegistrUserData", Controller.RegistrUserData);
Router.post("/LoginUserData", Controller.LoginUserData);

module.exports = Router;