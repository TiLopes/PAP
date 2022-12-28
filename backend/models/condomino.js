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
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: "condomino_un_email",
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      nome: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      nif: {
        type: DataTypes.DECIMAL(9, 0),
        allowNull: false,
        unique: "condomino_un_nif",
      },
      telemovel: {
        type: DataTypes.DECIMAL(9, 0),
        allowNull: false,
        defaultValue: 0,
      },
      fracao: {
        type: DataTypes.STRING(2),
        allowNull: false,
      },
      andar: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      morada: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      idcondominio: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "condominio",
          key: "id",
        },
      },
      codPostal: {
        type: DataTypes.STRING(8),
        allowNull: false,
        defaultValue: "0000-000",
      },
      group_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
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
          name: "condomino_un_email",
          unique: true,
          using: "BTREE",
          fields: [{ name: "email" }],
        },
        {
          name: "condomino_un_nif",
          unique: true,
          using: "BTREE",
          fields: [{ name: "nif" }],
        },
        {
          name: "condomino_FK",
          using: "BTREE",
          fields: [{ name: "group_id" }],
        },
        {
          name: "condomino_ibfk_1",
          using: "BTREE",
          fields: [{ name: "idcondominio" }],
        },
      ],
    }
  );
  Condomino.beforeCreate((Condomino, options) => {
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(Condomino.getDataValue("password"), salt);
    Condomino.setDataValue("password", hash);
  });

  return Condomino;
};
