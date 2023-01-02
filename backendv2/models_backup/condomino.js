const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Condomino', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nome_ocupante: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    nif_ocupante: {
      type: DataTypes.DECIMAL(9,0),
      allowNull: false
    },
    telemovel_ocupante: {
      type: DataTypes.DECIMAL(9,0),
      allowNull: true
    },
    data_aquisicao: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    data_venda: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    email_ocupante: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    id_condominio: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'fracoes',
        key: 'id_condominio'
      }
    },
    fracao: {
      type: DataTypes.STRING(5),
      allowNull: false,
      references: {
        model: 'fracoes',
        key: 'id'
      }
    },
    id_grupo: {
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
          { name: "id" },
        ]
      },
      {
        name: "condomino_un",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_condominio" },
          { name: "fracao" },
        ]
      },
      {
        name: "condomino_FK_1",
        using: "BTREE",
        fields: [
          { name: "fracao" },
          { name: "id_condominio" },
        ]
      },
      {
        name: "condomino_FK",
        using: "BTREE",
        fields: [
          { name: "id_grupo" },
        ]
      },
    ]
  });
};