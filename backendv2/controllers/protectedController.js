const { decode } = require("jsonwebtoken");
const { newCondomino } = require("../helper/sendEmail");
const { sequelize } = require("../models");
var initModels = require("../models/init-models");
var models = initModels(sequelize);
const Condominio = models.Condominio;
const Fracao = models.Fracoes;
const Condomino = models.Condomino;
const fracoesErrors = require("../helper/errorHandlingFracoes").fracoesErrors;

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
  console.log("admin info");
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

    return res.status(400).json({ errors: fracoesErrors(err) });
  }

  res.sendStatus(200);
};

const getFracoesLivres = async (req, res) => {
  let fracoes;
  let condominio;
  try {
    fracoes = await Fracao.findAll({
      where: { id_condominio: req.condominioID, estado: "Livre" },
      attributes: ["id"],
    });
    condominio = await Condominio.findByPk(req.condominioID, {
      attributes: ["morada", "cod_postal"],
    });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ errors: err });
  }

  res.status(200).json({ fracoes, condominio });
};

const createCondomino = async (req, res) => {
  const { fracao, aquisicao, venda, nome, nif, telemovel, email, password } =
    req.body;

  try {
    const condomino = await Condomino.create({
      nome_ocupante: nome,
      nif_ocupante: nif,
      telemovel_ocupante: telemovel,
      data_aquisicao: aquisicao,
      data_venda: venda,
      email_ocupante: email,
      password: password,
      id_condominio: req.condominioID,
    });

    await Fracao.update(
      {
        estado: "Ocupado",
        id_condomino: condomino.id,
      },
      {
        where: { id: fracao, id_condominio: req.condominioID },
      }
    );

    // newCondomino(email, password);
  } catch (err) {
    console.error(err);

    return res.status(400).json({ errors: err });
  }

  res.sendStatus(200);
};

module.exports = {
  userInfoGET,
  personalInfoGET,
  adminInfoGET,
  createFracao,
  getFracoesLivres,
  createCondomino,
};
