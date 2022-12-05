const { sequelize } = require("../models");
var initModels = require("../models/init-models");
var models = initModels(sequelize);
const Condominio = models.Condominio;

const userInfoGET = async (req, res) => {
  const user = await User.findByPk(req.params.userId, {
    attributes: { exclude: ["password", "authToken"] },
  });

  if (!user) {
    return res.status(404).json({ error: "User does not exist" });
  }

  res.status(200).json({ user });
};

const personalInfoGET = async (req, res) => {
  const token = req.header("auth-token");

  const condominio = await Condominio.findOne({
    where: {
      authToken: token,
    },
  });

  if (!condominio) {
    return res.status(404).json({ error: "Condominio does not exist" });
  }

  res.status(200).json({
    user: {
      nome: condominio.nome,
      nif: condominio.nif,
      nomeAdmin: condominio.nomeAdmin,
      email: condominio.email,
      morada: condominio.morada,
      codPostal: condominio.codPostal,
    },
  });
};

module.exports = { userInfoGET, personalInfoGET };
