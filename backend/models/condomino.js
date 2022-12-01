const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Condomino', {
    idcondomino: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: "condomino_un_email"
    },
    nome: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    nif: {
      type: DataTypes.DECIMAL(9,0),
      allowNull: false,
      unique: "condomino_un_nif"
    },
    telemovel: {
      type: DataTypes.DECIMAL(9,0),
      allowNull: false,
      defaultValue: 0
    },
    fracao: {
      type: DataTypes.STRING(2),
      allowNull: false
    },
    andar: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    morada: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    idcondominio: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    codPostal: {
      type: DataTypes.STRING(8),
      allowNull: false,
      defaultValue: "0000-000"
    },
    group_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      references: {
        model: 'groups',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'condomino',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idcondomino" },
        ]
      },
      {
        name: "condomino_un_email",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "email" },
        ]
      },
      {
        name: "condomino_un_nif",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "nif" },
        ]
      },
      {
        name: "condomino_FK",
        using: "BTREE",
        fields: [
          { name: "group_id" },
        ]
      },
    ]
  });
};
