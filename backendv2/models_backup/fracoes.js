const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Fracoes', {
    id: {
      type: DataTypes.STRING(5),
      allowNull: false,
      primaryKey: true
    },
    tipo: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    andar: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    escritura: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    estado: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: "Livre"
    },
    id_condominio: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'condominio',
        key: 'id'
      }
    },
    id_condomino: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'condomino',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'fracoes',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
          { name: "id_condominio" },
        ]
      },
      {
        name: "fracoes_FK",
        using: "BTREE",
        fields: [
          { name: "id_condominio" },
        ]
      },
      {
        name: "fracoes_FK_1",
        using: "BTREE",
        fields: [
          { name: "id_condomino" },
        ]
      },
    ]
  });
};
