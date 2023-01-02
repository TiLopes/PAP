const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Condominio', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nif: {
      type: DataTypes.DECIMAL(9,0),
      allowNull: false,
      defaultValue: 0,
      unique: "nif_UNIQUE"
    },
    nome: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    nome_admin: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    email_admin: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    telemovel_admin: {
      type: DataTypes.DECIMAL(9,0),
      allowNull: false,
      defaultValue: 0
    },
    morada: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: "",
      unique: "morada_UNIQUE"
    },
    cod_postal: {
      type: DataTypes.STRING(8),
      allowNull: false,
      defaultValue: "0000-000",
      unique: "cod_postal_UNIQUE"
    },
    id_seguro: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'seguro',
        key: 'id'
      },
      unique: "fk_seguro"
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    id_grupo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 999,
      references: {
        model: 'groups',
        key: 'id'
      }
    },
    auth_token: {
      type: DataTypes.STRING(255),
      allowNull: true,
      unique: "auth_token_UNIQUE"
    }
  }, {
    sequelize,
    tableName: 'condominio',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "nif_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "nif" },
        ]
      },
      {
        name: "morada_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "morada" },
        ]
      },
      {
        name: "cod_postal_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "cod_postal" },
        ]
      },
      {
        name: "id_seguro_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_seguro" },
        ]
      },
      {
        name: "auth_token_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "auth_token" },
        ]
      },
      {
        name: "fk_grupo",
        using: "BTREE",
        fields: [
          { name: "id_grupo" },
        ]
      },
    ]
  });
};
