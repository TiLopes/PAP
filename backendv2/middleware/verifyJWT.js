const jwt = require("jsonwebtoken");
const { sequelize } = require("../models");
const { createHash } = require("node:crypto");
var initModels = require("../models/init-models");
var models = initModels(sequelize);
const Condominio = models.Condominio;
const Condomino = models.Condomino;
require("dotenv").config({
  path: "./config/.env",
});

const verifyJWT = (req, res, next) => {
  const token = req.header("auth-token");
  const cookies = req.cookies;

  console.log(cookies);
  const fp = cookies.fp;
  console.log(fp);

  if (!token) {
    return res.status(401).json({ error: "No token" });
  }

  if (!fp) {
    return res.status(401).json({ error: "Invalid token" });
  }

  // if (!fpCookie) {
  //   return res.status(401).json({ error: "Invalid authentication" });
  // }

  // console.log(fpCookie);

  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    async (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        return res.status(403).json({ error: "Token is invalid" });
      }

      console.log(decodedToken);
      const hash = createHash("sha256");
      const finalString = hash.update(fp, "utf-8").digest("hex");

      if (!(finalString === decodedToken.hashedRandString)) {
        return res.status(403).json({ error: "Token is invalid" });
      }

      const condominio =
        (await Condominio.findOne({
          where: { auth_token: token },
        })) || null;

      if (condominio != null) {
        req.condominioID = condominio.id;
        return next();
      }

      const condomino =
        (await Condomino.findOne({
          where: { auth_token: token },
        })) || null;

      if (condomino == null) {
        return res.status(401).json({ error: "Invalid user token" });
      }

      next();
    }
  );
};

module.exports = verifyJWT;
