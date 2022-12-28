const { decode } = require("jsonwebtoken");
const { sequelize } = require("../models");
var initModels = require("../models/init-models");
var models = initModels(sequelize);
const Condominio = models.Condominio;
const Fracao = models.Fracoes;

const userInfoGET = async (req, res) => {
  const user = await User.findByPk(req.params.userId, {
    attributes: { exclude: ["password", "auth_token"] },
  });

  if (!user) {
    return res.status(404).json({ error: "User does not exist" });
  }

  res.status(200).json({ user });
};

const personalInfoGET = async (req, res) => {
  const token = req.header("auth-token");

  try {
    const condominio = await Condominio.findOne({
      where: {
        auth_token: token,
      },
    });

    if (!condominio) {
      return res.status(404).json({ error: "Condominio does not exist" });
    }

    res.status(200).json({
      user: {
        nome: condominio.nome,
        nif: condominio.nif,
        nomeAdmin: condominio.nome_admin,
        email: condominio.email_admin,
        morada: condominio.morada,
        codPostal: condominio.cod_postal,
      },
    });
  } catch (err) {
    console.error(err);
  }
};

const adminInfoGET = (req, res) => {
  res.sendStatus(200);
};

const createFracao = async (req, res) => {
  const { fracao, andar, escritura, tipoFracao } = req.body;

  try {
    await Fracao.create({
      id: fracao,
      tipo: tipoFracao,
      andar: andar,
      escritura: escritura,
      id_condominio: req.condominioID,
    });
  } catch (err) {
    console.error(err);
  }

  res.sendStatus(200);
};

module.exports = { userInfoGET, personalInfoGET, adminInfoGET, createFracao };
