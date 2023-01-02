var DataTypes = require("sequelize").DataTypes;
var _Fracoes = require("./fracoes");
var _Condominio = require("./condominio");
var _GroupPermissions = require("./group_permissions");
var _Groups = require("./groups");
var _Permissions = require("./permissions");
var _Seguro = require("./seguro");
var _Condomino = require("./condomino");

function initModels(sequelize) {
  var Fracoes = _Fracoes(sequelize, DataTypes);
  var Condominio = _Condominio(sequelize, DataTypes);
  var GroupPermissions = _GroupPermissions(sequelize, DataTypes);
  var Groups = _Groups(sequelize, DataTypes);
  var Permissions = _Permissions(sequelize, DataTypes);
  var Seguro = _Seguro(sequelize, DataTypes);
  var Condomino = _Condomino(sequelize, DataTypes);

  Groups.belongsToMany(Permissions, {
    as: "permission_id_permissions",
    through: GroupPermissions,
    foreignKey: "group_id",
    otherKey: "permission_id",
  });
  Permissions.belongsToMany(Groups, {
    as: "group_id_groups",
    through: GroupPermissions,
    foreignKey: "permission_id",
    otherKey: "group_id",
  });
  Fracoes.belongsTo(Condominio, {
    as: "id_condominio_condominio",
    foreignKey: "id_condominio",
  });
  Condominio.hasMany(Fracoes, { as: "fracoes", foreignKey: "id_condominio" });
  Condomino.belongsTo(Fracoes, {
    as: "id_condominio_fraco",
    foreignKey: "id_condominio",
  });
  Fracoes.hasMany(Condomino, { as: "condominos", foreignKey: "id_condominio" });
  Condomino.belongsTo(Fracoes, { as: "fracao_fraco", foreignKey: "fracao" });
  Fracoes.hasMany(Condomino, { as: "fracao_condominos", foreignKey: "fracao" });
  Condominio.belongsTo(Groups, {
    as: "id_grupo_group",
    foreignKey: "id_grupo",
  });
  Groups.hasMany(Condominio, { as: "condominios", foreignKey: "id_grupo" });
  Condomino.belongsTo(Groups, { as: "id_grupo_group", foreignKey: "id_grupo" });
  Groups.hasMany(Condomino, { as: "condominos", foreignKey: "id_grupo" });
  GroupPermissions.belongsTo(Groups, { as: "group", foreignKey: "group_id" });
  Groups.hasMany(GroupPermissions, {
    as: "group_permissions",
    foreignKey: "group_id",
  });
  GroupPermissions.belongsTo(Permissions, {
    as: "permission",
    foreignKey: "permission_id",
  });
  Permissions.hasMany(GroupPermissions, {
    as: "group_permissions",
    foreignKey: "permission_id",
  });
  Condominio.belongsTo(Seguro, {
    as: "id_seguro_seguro",
    foreignKey: "id_seguro",
  });
  Seguro.hasOne(Condominio, { as: "condominio", foreignKey: "id_seguro" });

  return {
    Fracoes,
    Condominio,
    GroupPermissions,
    Groups,
    Permissions,
    Seguro,
    Condomino,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
