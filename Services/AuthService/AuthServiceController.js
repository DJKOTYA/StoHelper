const Services = require("../../models/Services");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { secrete } = require("../../config");
const GenerateAccsessToken = (id) => {
  const payload = { id };
  return jwt.sign(payload, secrete, { expiresIn: "24h" });
};

class AuthServiceController {
  async RegistrServiceData(req, res) {
    try {
      const {
        Login,
        Password,
        ServiceName,
        TelephoneNumber,
        StartOfWork,
        EndOfWork,
        WebAddres,
        City,
        Addres,
        Index,
      } = req.body;
      const CandidateServise = await Servisec.findOne({ Login });
      if (CandidateServise) {
        return res
          .status(400)
          .json({ messege: "Пользователь с таким логином уже существует" });
      }
      const HashPassword = bcrypt.hashSync(Password, 7);
      const NewService = new Sevices({
        Login,
        Password: HashPassword,
        ServiceName,
        TelephoneNumber,
        StartOfWork,
        EndOfWork,
        WebAddres,
        City,
        Addres,
        Index,
      });
      await NewService.save();
      return res.json({ messege: "Пользователь зарегестрирован" });
    } catch (Error) {
      console.log("ошибка регистрации" + Error);
      res.status(400).json({
        success: false,
        messege: "ошибка регистрации",
      });
    }
  }
  async LoginServiceData(req, res) {
    try {
      const { Login, Password } = req.body;
      const ServiceLogin = await Services.findOne({ Login });
      if (!ServiceLogin) {
        return res.status(400).json({ messege: `логин ${Login} не найден` });
      }
      const ValidPassword = bcrypt.compareSync(Password, ServiceLogin.Password);
      if (!ValidPassword) {
        return res.status(400).json({ messege: "неверный пароль" });
      }
      const Token = GenerateAccsessToken(Services._id);
      return res.json({ ServiceLogin, Token });
    } catch (Error) {
      console.log("ошибка входа" + Error);
      res.status(400).json({
        success: false,
        message: "Ошибка при входа",
      });
    }
  }
}

module.exports = new AuthServiceController();