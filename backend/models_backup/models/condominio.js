const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");

module.exports = function (sequelize, DataTypes) {
  const Condominio = sequelize.define(
    "Condominio",
    {
      idcondominio: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      nome: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      nomeAdministrador: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: "condominio_un_email",
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      nif: {
        type: DataTypes.DECIMAL(9, 0),
        allowNull: false,
        defaultValue: 0,
        unique: "condominio_un_nif",
      },
      morada: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      codPostal: {
        type: DataTypes.STRING(8),
        allowNull: false,
        defaultValue: "0000-000",
      },
      group_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 999,
        references: {
          model: "groups",
          key: "id",
        },
      },
      authToken: {
        type: DataTypes.STRING(255),
        allowNull: true,
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
          fields: [{ name: "idcondominio" }],
        },
        {
          name: "condominio_un_email",
          unique: true,
          using: "BTREE",
          fields: [{ name: "email" }],
        },
        {
          name: "condominio_un_nif",
          unique: true,
          using: "BTREE",
          fields: [{ name: "nif" }],
        },
        {
          name: "condominio_FK",
          using: "BTREE",
          fields: [{ name: "group_id" }],
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

    const condominio = await Condominio.findOne({ where: { email: email } });

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
    await Condominio.update(
      { authToken: token },
      { where: { idcondominio: id } }
    );
  };

  Condominio.removeToken = async (condominio, token) => {
    await Condominio.update(
      { authToken: null },
      { where: { idcondominio: condominio.idcondominio } }
    );
    console.log("Apagado com sucesso");
  };

  return Condominio;
};
