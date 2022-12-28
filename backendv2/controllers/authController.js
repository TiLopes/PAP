const jwt = require("jsonwebtoken");
var initModels = require("../models/init-models");
const { sequelize } = require("../models");
var models = initModels(sequelize);
const { randomBytes, createHash } = require("node:crypto");
const { promisify } = require("util");
const randomBytesAsync = promisify(require("crypto").randomBytes);
const Condominio = models.Condominio;
// const Condomino = models.Condomino;
require("dotenv").config({
  path: "./config/.env",
});

const handleErrors = (err) => {
  var errs = { email: "", password: "" };

  console.error(err.message);
  try {
    const errCode = err.parent.code;
    console.log(errCode);
    switch (errCode) {
      case "ER_DUP_ENTRY":
        errs.email = "Email já existe.";
        console.log("aaaaaa");
        break;

      default:
        break;
    }
  } catch (error) {
    console.log(error);
    const errCode = err.message;
    if (errCode.includes("ER_DUP_ENTRY")) {
      errs.email = "Email já existe.";
      console.log("bbbbb");
      return errs;
    }
  }

  // SIGN UP

  // if (err.message.includes("Validation error")) {
  //   if (err.errors[0].message === "Email vazio") {
  //     errs.email = "Introduza um email";
  //     return errs;
  //   }

  //   if (err.errors[0].message === "Password vazia") {
  //     errs.password = "Introduza uma password";
  //     return errs;
  //   }

  //   if (err.errors[0].message === "Introduza no minimo 5 caracteres") {
  //     errs.password = "Escreva no mínimo 5 caracteres";
  //     return errs;
  //   }

  //   if (err.errors[0].message === "Email duplicado") {
  //     errs.email = "Esse email já foi registado";
  //     return errs;
  //   }
  // }

  // // LOG IN
  // if (err.message === "Email vazio") {
  //   errs.email = "Introduza um email";
  //   return errs;
  // }

  // if (err.message === "Password vazia") {
  //   errs.password = "Introduza uma password";
  //   return errs;
  // }

  // if (err.message === "Esse email nao esta registado") {
  //   errs.email = "Esse email não está registado";
  //   return errs;
  // }

  // if (err.message === "Password errada") {
  //   errs.password = "A password está incorreta";
  //   return errs;
  // }

  return errs;
};

// SIGN UP
module.exports.signupGET = async (req, res) => {
  const { code } = req.params;

  try {
    console.log(code);

    const condominio = await Condominio.findOne({ where: { code } });
    res.status(201).json({
      id: condominio.id,
      morada: condominio.morada,
      codPostal: condominio.codPostal,
    });
  } catch (error) {
    console.error(error);
    res.status(404).json({});
  }
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
  const { userType } = req.body;

  if (userType === "condominio") {
    const {
      nomeCond,
      nomeAdmin,
      telemovel,
      email,
      password,
      nif,
      morada,
      codPostal,
    } = req.body;

    try {
      const condominio = await Condominio.create({
        nif,
        nome: nomeCond,
        nome_admin: nomeAdmin,
        email_admin: email,
        password,
        morada,
        cod_postal: codPostal,
        telemovel_admin: telemovel,
      });
      return res.status(200).json({
        nome: condominio.nome,
        nomeAdministrador: condominio.nomeAdministrador,
        email: condominio.email,
        nif: condominio.nif,
        morada: condominio.morada,
        codPostal: condominio.codPostal,
      });
    } catch (err) {
      console.log(err);
      const errors = handleErrors(err);
      console.log(errors);
      return res.status(400).json({ errors });
    }
  }

  const {
    nomeCond,
    email,
    password,
    nif,
    telemovel,
    fracao,
    andar,
    morada,
    idCondominio,
    codPostal,
  } = req.body;

  try {
    console.log("idcond" + idCondominio);
    const condomino = await Condomino.create({
      email,
      password,
      nome: nomeCond,
      nif,
      telemovel,
      fracao,
      andar,
      morada,
      idcondominio: idCondominio,
      codPostal,
    });
    return res.status(200).json({
      nome: condomino.nome,
      nomeAdministrador: condomino.nomeAdministrador,
      email: condomino.email,
      nif: condomino.nif,
      morada: condomino.morada,
      codPostal: condomino.codPostal,
    });
  } catch (err) {
    console.log(err);
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

// LOGIN
module.exports.loginGET = (req, res) => {
  res.status(200).json({ success: true });
};

function bufferFromBufferString(bufferStr) {
  return Buffer.from(
    bufferStr
      .replace(/[<>]/g, "") // remove < > symbols from str
      .split(" ") // create an array splitting it by space
      .slice(1) // remove Buffer word from an array
      .reduce((acc, val) => acc.concat(parseInt(val, 16)), []) // convert all strings of numbers to hex numbers
  );
}

module.exports.loginPOST = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const userType = req.body.userType;

  try {
    if (userType === "condominio") {
      const condominio = await Condominio.login(email, password);

      const randString = (await randomBytesAsync(128)).toString("hex");

      const hash = createHash("sha256");
      const hashedRandString = hash.update(randString, "utf-8").digest("hex");

      console.log(`Hashed string: ${hashedRandString}`);

      // tokens creation
      const accessToken = jwt.sign(
        { id: condominio.id, group_id: condominio.group_id, hashedRandString },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1h" }
      );
      await Condominio.saveToken(condominio.id, accessToken);

      var accDate = jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decodedToken) => {
          return decodedToken.exp;
        }
      );

      res
        .status(200)
        .cookie("fp", randString, {
          httpOnly: true,
          withCredentials: true,
          maxAge: 3_600_000,
        })
        .json({
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
