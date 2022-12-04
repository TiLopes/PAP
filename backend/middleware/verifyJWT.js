const jwt = require("jsonwebtoken");
const { sequelize } = require("../models");
var initModels = require("../models/init-models");
var models = initModels(sequelize);
const Condominio = models.Condominio;
const Condomino = models.Condomino;
require("dotenv").config({
  path: "./config/.env",
});

const verifyJWT = (req, res, next) => {
  const token = req.header("auth-token");

  if (!token) {
    return res.status(401).json({ error: "No token" });
  }

  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    async (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        return res.status(403).json({ error: "Token is invalid" });
      }

      const condominio =
        (await Condominio.findOne({
          where: { authToken: token },
        })) || null;

      if (condominio != null) {
        console.log("a");
        return next();
      }

      const condomino =
        (await Condomino.findOne({
          where: { authToken: token },
        })) || null;

      if (condomino == null) {
        return res.status(401).json({ error: "Invalid user token" });
      }

      next();
    }
  );
};

module.exports = verifyJWT;
