const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");
module.exports = function (sequelize, DataTypes) {
  const Condomino = sequelize.define(
    "Condomino",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      nome_ocupante: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      nif_ocupante: {
        type: DataTypes.DECIMAL(9, 0),
        allowNull: false,
      },
      telemovel_ocupante: {
        type: DataTypes.DECIMAL(9, 0),
        allowNull: true,
      },
      data_aquisicao: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      data_venda: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      email_ocupante: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      id_condominio: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "condominio",
          key: "id",
        },
      },
      id_grupo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        references: {
          model: "groups",
          key: "id",
        },
      },
      auth_token: {
        type: DataTypes.STRING(500),
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "condomino",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }],
        },
        {
          name: "condomino_FK",
          using: "BTREE",
          fields: [{ name: "id_grupo" }],
        },
        {
          name: "condomino_FK_1",
          using: "BTREE",
          fields: [{ name: "id_condominio" }],
        },
      ],
    }
  );

  Condomino.beforeCreate(async (condomino, options) => {
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(condomino.getDataValue("password"), salt);
    condomino.setDataValue("password", hash);
    const c = await Condomino.findOne({
      where: {
        id_condominio: condomino.id_condominio,
        email_ocupante: condomino.email_ocupante,
      },
    });

    if (c) {
      throw new Error("ER_DUP_ENTRY");
    }
  });

  Condomino.login = async function (email, password) {
    if (!email) {
      throw new Error("Email vazio");
    }

    if (!password) {
      throw new Error("Password vazia");
    }

    const condomino = await Condomino.findOne({
      where: { email_ocupante: email },
    });

    if (!condomino) {
      throw new Error("Esse email nao esta registado");
    }

    const auth = bcrypt.compareSync(password, condomino.password);
    if (auth) {
      return condomino;
    }
    throw new Error("Password errada");
  };

  Condomino.saveToken = async (id, token) => {
    await Condomino.update({ auth_token: token }, { where: { id: id } });
  };

  return Condomino;
};
