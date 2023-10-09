const Express = require("express");
const Router = new Express();
const Controller = require("./AuthServiceController");

Router.post("/RegisterServiceData", Controller.RegistrServiceData);
Router.post("/LoginServiceData", Controller.LoginServiceData);

module.exports = Router;
