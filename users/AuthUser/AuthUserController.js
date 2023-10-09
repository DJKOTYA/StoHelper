// файл дял обработки данных перед отправкой
const Users = require("../../models/Users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { secret } = require("../../config");
const GenerateAccsessToken = (id) => {
  const payload = { id };
  return jwt.sign(payload, secret, { expiresIn: "24h" });
};

class AuthUserController {
  async RegistrUserData(req, res) {
    try {
      const {
        Login,
        UserName,
        Password,
        CarNumber,
        VinNumber,
        TelephoneNumber,
      } = req.body;
      const CandidateUser = await Users.findOne({ Login });
      if (CandidateUser) {
        return res
          .status(400)
          .json({ messege: "Пользователь с таким логином уже существует" });
      }
      const HashPassword = bcrypt.hashSync(Password, 7);
      const NewUser = new Users({
        Login,
        UserName,
        Password: HashPassword,
        CarNumber,
        VinNumber,
        TelephoneNumber,
      });

      await NewUser.save();
      return res.json({ messege: "Пользователь зарегестрирован" });
    } catch (Error) {
      console.log("ошибка регистрации" + Error);
      res.status(400).json({
        success: false,
        message: "Ошибка при регистрации",
      });
    }
  }
  async LoginUserData(req, res) {
    try {
      const { Login, Password } = req.body;
      const UserLogin = await Users.findOne({ Login });
      // const UserTelephone = await Users.findOne({ TelephoneNumber });
      if (!UserLogin) {
        return res.status(400).json({ messege: `логин ${Login} не найден ` });
      }
      // if (TelephoneNumber != null && !UserTelephone) {
      // return res
      // .status(400)
      //  .json({messege: `телефон не верный `})
      // }
      const ValidPassword = bcrypt.compareSync(Password, UserLogin.Password);
      if (!ValidPassword) {
        return res.status(400).json({ messege: `неверный пароль` });
      }
      const Token = GenerateAccsessToken(Users._id);
      return res.json({ UserLogin, Token });
    } catch (Error) {
      console.log("ошибка входа" + Error);
      res.status(400).json({
        success: false,
        message: "Ошибка при входа",
      });
    }
  }
}

module.exports = new AuthUserController();
