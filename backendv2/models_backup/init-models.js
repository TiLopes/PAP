var DataTypes = require("sequelize").DataTypes;
var _Condominio = require("./condominio");
var _Condomino = require("./condomino");
var _Fracoes = require("./fracoes");
var _GroupPermissions = require("./group_permissions");
var _Groups = require("./groups");
var _Ocorrencias = require("./ocorrencias");
var _Permissions = require("./permissions");
var _Seguro = require("./seguro");

function initModels(sequelize) {
  var Condominio = _Condominio(sequelize, DataTypes);
  var Condomino = _Condomino(sequelize, DataTypes);
  var Fracoes = _Fracoes(sequelize, DataTypes);
  var GroupPermissions = _GroupPermissions(sequelize, DataTypes);
  var Groups = _Groups(sequelize, DataTypes);
  var Ocorrencias = _Ocorrencias(sequelize, DataTypes);
  var Permissions = _Permissions(sequelize, DataTypes);
  var Seguro = _Seguro(sequelize, DataTypes);

  Groups.belongsToMany(Permissions, { as: 'permission_id_permissions', through: GroupPermissions, foreignKey: "group_id", otherKey: "permission_id" });
  Permissions.belongsToMany(Groups, { as: 'group_id_groups', through: GroupPermissions, foreignKey: "permission_id", otherKey: "group_id" });
  Condomino.belongsTo(Condominio, { as: "id_condominio_condominio", foreignKey: "id_condominio"});
  Condominio.hasMany(Condomino, { as: "condominos", foreignKey: "id_condominio"});
  Fracoes.belongsTo(Condominio, { as: "id_condominio_condominio", foreignKey: "id_condominio"});
  Condominio.hasMany(Fracoes, { as: "fracos", foreignKey: "id_condominio"});
  Ocorrencias.belongsTo(Condominio, { as: "id_condominio_condominio", foreignKey: "id_condominio"});
  Condominio.hasMany(Ocorrencias, { as: "ocorrencia", foreignKey: "id_condominio"});
  Fracoes.belongsTo(Condomino, { as: "id_condomino_condomino", foreignKey: "id_condomino"});
  Condomino.hasMany(Fracoes, { as: "fracos", foreignKey: "id_condomino"});
  Ocorrencias.belongsTo(Condomino, { as: "id_condomino_condomino", foreignKey: "id_condomino"});
  Condomino.hasMany(Ocorrencias, { as: "ocorrencia", foreignKey: "id_condomino"});
  Condominio.belongsTo(Groups, { as: "id_grupo_group", foreignKey: "id_grupo"});
  Groups.hasMany(Condominio, { as: "condominios", foreignKey: "id_grupo"});
  Condomino.belongsTo(Groups, { as: "id_grupo_group", foreignKey: "id_grupo"});
  Groups.hasMany(Condomino, { as: "condominos", foreignKey: "id_grupo"});
  GroupPermissions.belongsTo(Groups, { as: "group", foreignKey: "group_id"});
  Groups.hasMany(GroupPermissions, { as: "group_permissions", foreignKey: "group_id"});
  GroupPermissions.belongsTo(Permissions, { as: "permission", foreignKey: "permission_id"});
  Permissions.hasMany(GroupPermissions, { as: "group_permissions", foreignKey: "permission_id"});
  Condominio.belongsTo(Seguro, { as: "id_seguro_seguro", foreignKey: "id_seguro"});
  Seguro.hasOne(Condominio, { as: "condominio", foreignKey: "id_seguro"});

  return {
    Condominio,
    Condomino,
    Fracoes,
    GroupPermissions,
    Groups,
    Ocorrencias,
    Permissions,
    Seguro,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
