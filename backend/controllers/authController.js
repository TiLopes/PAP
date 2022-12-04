const jwt = require("jsonwebtoken");
const { sequelize } = require("../models");
var initModels = require("../models/init-models");
var models = initModels(sequelize);
const Condominio = models.Condominio;
const Condomino = models.Condomino;
require("dotenv").config({
  path: "./config/.env",
});

const handleErrors = (err) => {
  let errs = { email: "", password: "" };

  console.log(err);
  console.log(err.message);

  // SIGN UP
  if (err.message.includes("Validation error")) {
    console.log(err.errors[0].message);
    if (err.errors[0].message === "Email vazio") {
      errs.email = "Introduza um email";
      return errs;
    }

    if (err.errors[0].message === "Password vazia") {
      errs.password = "Introduza uma password";
      return errs;
    }

    if (err.errors[0].message === "Introduza no minimo 5 caracteres") {
      errs.password = "Escreva no mínimo 5 caracteres";
      return errs;
    }

    if (err.errors[0].message === "Email duplicado") {
      errs.email = "Esse email já foi registado";
      return errs;
    }
  }

  // LOG IN
  if (err.message === "Email vazio") {
    errs.email = "Introduza um email";
    return errs;
  }

  if (err.message === "Password vazia") {
    errs.password = "Introduza uma password";
    return errs;
  }

  if (err.message === "Esse email nao esta registado") {
    errs.email = "Esse email não está registado";
    return errs;
  }

  if (err.message === "Password errada") {
    errs.password = "A password está incorreta";
    return errs;
  }

  return errs;
};

// SIGN UP
module.exports.signupGET = (req, res) => {
  res.status(200).json({ success: true });
};

// module.exports.signupPOST = async (req, res) => {
//   const { nomeCond, nomeAdmin, email, password, nif, morada, codPostal } = req.body;

//   try {
//     const user = await User.create({ email: email, password: password });
//     res.status(200).json({
//       user: {
//         group_id: user.group_id,
//         id: user.id,
//         email: user.email,
//       },
//     });
//   } catch (err) {
//     const errors = handleErrors(err);
//     res.status(400).json({ errors });
//   }
// };

module.exports.signupPOST = async (req, res) => {
  const {
    nomeCond,
    nomeAdmin,
    email,
    password,
    nif,
    morada,
    codPostal,
    userType,
  } = req.body;

  try {
    if (userType === "condominio") {
      const condominio = await Condominio.create({
        nome: nomeCond,
        nomeAdministrador: nomeAdmin,
        email,
        password,
        nif,
        morada,
        codPostal,
      });
      res.status(200).json({
        nome: condominio.nome,
        nomeAdministrador: condominio.nomeAdministrador,
        email: condominio.email,
        nif: condominio.nif,
        morada: condominio.morada,
        codPostal: condominio.codPostal,
      });
    } else {
      const condomino = await Condomino.create({
        nome: nomeCond,
        nomeAdministrador: nomeAdmin,
        email,
        password,
        nif,
        morada,
        codPostal,
      });
      res.status(200).json({
        nome: condomino.nome,
        nomeAdministrador: condomino.nomeAdministrador,
        email: condomino.email,
        nif: condomino.nif,
        morada: condomino.morada,
        codPostal: condomino.codPostal,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ err });
  }
};

// LOGIN
module.exports.loginGET = (req, res) => {
  res.status(200).json({ success: true });
};

module.exports.loginPOST = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const userType = req.body.userType;

  try {
    if (userType === "condominio") {
      const condominio = await Condominio.login(email, password);

      // tokens creation
      const accessToken = jwt.sign(
        { id: condominio.id, group_id: condominio.group_id },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1h" }
      );

      var accDate = jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decodedToken) => {
          return decodedToken.exp;
        }
      );

      await Condominio.saveToken(condominio.id, accessToken);

      res.status(200).json({
        id: condominio.id,
        group_id: condominio.group_id,
        email: condominio.email,
        accessToken: {
          token: accessToken,
          expires: accDate,
        },
      });
    }
  } catch (err) {
    const errs = handleErrors(err);
    console.log(errs);
    res.status(400).json({ errs });
  }
};

// LOG OUT
// module.exports.logout_get = async (req, res) => {
//   // Cookies
//   const cookies = req.cookies;

//   if (!cookies?.refreshToken) {
//     return res.status(403).json({ clearCookies: false, redirect: true });
//   }

//   // Encontrar refreshToken na db
//   const refreshToken = cookies.refreshToken;
//   const user = await User.findOne({ where: { authToken: refreshToken } });

//   if (!user) {
//     return res.status(403).json({ clearCookies: true, redirect: true });
//   }

//   // Remover refreshToken da db
//   await User.removeToken(user);

//   res.status(200).json({ clearCookies: true, redirect: true });
// };
