const { Sequelize } = require("sequelize");
const bcrypt = require("bcrypt");
module.exports = function (sequelize, DataTypes) {
  const Condominio = sequelize.define(
    "Condominio",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      nif: {
        type: DataTypes.DECIMAL(9, 0),
        allowNull: false,
        defaultValue: 0,
        unique: "nif_UNIQUE",
      },
      nome: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      nome_admin: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      email_admin: {
        type: DataTypes.STRING(100),
        allowNull: true,
        validate: {
          async exists() {
            const con = await Condominio.findOne({
              where: { email_admin: this.email_admin },
            });
            if (con) {
              console.log("Email igual:" + con.email_admin);
              throw new Error("ER_DUP_ENTRY");
            }
          },
        },
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      morada: {
        type: DataTypes.STRING(100),
        allowNull: false,
        defaultValue: "",
        unique: "morada_UNIQUE",
      },
      cod_postal: {
        type: DataTypes.STRING(8),
        allowNull: false,
        defaultValue: "0000-000",
        unique: "cod_postal_UNIQUE",
      },
      id_seguro: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "seguro",
          key: "id",
        },
        unique: "fk_seguro",
      },
      telemovel_admin: {
        type: DataTypes.DECIMAL(9, 0),
        allowNull: false,
        defaultValue: 0,
      },
      id_grupo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 999,
        references: {
          model: "groups",
          key: "id",
        },
      },
      auth_token: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: "auth_token_UNIQUE",
      },
    },
    {
      sequelize,
      tableName: "condominio",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }],
        },
        {
          name: "nif_UNIQUE",
          unique: true,
          using: "BTREE",
          fields: [{ name: "nif" }],
        },
        {
          name: "morada_UNIQUE",
          unique: true,
          using: "BTREE",
          fields: [{ name: "morada" }],
        },
        {
          name: "cod_postal_UNIQUE",
          unique: true,
          using: "BTREE",
          fields: [{ name: "cod_postal" }],
        },
        {
          name: "id_seguro_UNIQUE",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id_seguro" }],
        },
        {
          name: "fk_grupo",
          using: "BTREE",
          fields: [{ name: "id_grupo" }],
        },
        {
          name: "auth_token_UNIQUE",
          unique: true,
          using: "BTREE",
          fields: [{ name: "auth_token" }],
        },
      ],
    }
  );
  Condominio.beforeCreate((Condominio, options) => {
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(Condominio.getDataValue("password"), salt);
    Condominio.setDataValue("password", hash);
  });

  Condominio.login = async function (email, password) {
    if (!email) {
      throw new Error("Email vazio");
    }

    if (!password) {
      throw new Error("Password vazia");
    }

    const condominio = await Condominio.findOne({
      where: { email_admin: email },
    });

    if (!condominio) {
      throw new Error("Esse email nao esta registado");
    }

    const auth = bcrypt.compareSync(password, condominio.password);
    if (auth) {
      return condominio;
    }
    throw new Error("Password errada");
  };

  Condominio.saveToken = async (id, token) => {
    await Condominio.update({ auth_token: token }, { where: { id: id } });
  };

  Condominio.removeToken = async (condominio, token) => {
    await Condominio.update(
      { auth_token: null },
      { where: { id: condominio.id } }
    );
    console.log("Apagado com sucesso");
  };

  return Condominio;
};
