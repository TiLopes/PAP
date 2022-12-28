const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Seguro', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    capital_obrigatorio: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    validade: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    empresa: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    apolice: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    coberturas: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    telemovel: {
      type: DataTypes.DECIMAL(9,0),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    mediador: {
      type: DataTypes.STRING(100),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'seguro',
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
    ]
  });
};
