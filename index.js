const express = require("express");
const PORT = process.env.PORT || 5000;
const app = express();
const mongoose = require("mongoose");
const AuthUserRouter = require("./users/AuthUser/AuthUserRouter");
const AuthServiceRouter = require("./Services/AuthService/AuthServiceRouter");

app.use(express.json());
app.use("/AuthUser", AuthUserRouter);
app.use("/AuthService", AuthServiceRouter);
const ServerStart = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://oxotnik:4759frost@cluster0.ze7hfmd.mongodb.net/StoHelper"
    );
    app.listen(PORT, () => {
      console.log(`все работает ${PORT}`);
    });
  } catch (error) {
    console.log(`ошибка подключения к серверу ${error}`);
  }
};


ServerStart();
