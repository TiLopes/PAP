const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Ocorrencias', {
    id_condomino: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'condomino',
        key: 'id'
      }
    },
    id_condominio: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'condominio',
        key: 'id'
      }
    },
    criador: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    data_ocorrencia: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    origem: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    titulo: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    descricao: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    info_adicional: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    data_lim_resolucao: {
      type: DataTypes.DATEONLY,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'ocorrencias',
    timestamps: false,
    indexes: [
      {
        name: "ocorrencias_FK",
        using: "BTREE",
        fields: [
          { name: "id_condomino" },
        ]
      },
      {
        name: "ocorrencias_FK_1",
        using: "BTREE",
        fields: [
          { name: "id_condominio" },
        ]
      },
    ]
  });
};
