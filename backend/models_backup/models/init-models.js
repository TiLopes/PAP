var DataTypes = require("sequelize").DataTypes;
var _Condominio = require("./condominio");
var _Condomino = require("./condomino");
var _GroupPermissions = require("./group_permissions");
var _Groups = require("./groups");
var _Permissions = require("./permissions");
var _User = require("./user");

function initModels(sequelize) {
  var Condominio = _Condominio(sequelize, DataTypes);
  var Condomino = _Condomino(sequelize, DataTypes);
  var GroupPermissions = _GroupPermissions(sequelize, DataTypes);
  var Groups = _Groups(sequelize, DataTypes);
  var Permissions = _Permissions(sequelize, DataTypes);
  var User = _User(sequelize, DataTypes);

  Groups.belongsToMany(Permissions, { as: 'permission_id_permissions', through: GroupPermissions, foreignKey: "group_id", otherKey: "permission_id" });
  Permissions.belongsToMany(Groups, { as: 'group_id_groups', through: GroupPermissions, foreignKey: "permission_id", otherKey: "group_id" });
  Condominio.belongsTo(Groups, { as: "group", foreignKey: "group_id"});
  Groups.hasMany(Condominio, { as: "condominios", foreignKey: "group_id"});
  Condomino.belongsTo(Groups, { as: "group", foreignKey: "group_id"});
  Groups.hasMany(Condomino, { as: "condominos", foreignKey: "group_id"});
  GroupPermissions.belongsTo(Groups, { as: "group", foreignKey: "group_id"});
  Groups.hasMany(GroupPermissions, { as: "group_permissions", foreignKey: "group_id"});
  User.belongsTo(Groups, { as: "group", foreignKey: "group_id"});
  Groups.hasMany(User, { as: "users", foreignKey: "group_id"});
  GroupPermissions.belongsTo(Permissions, { as: "permission", foreignKey: "permission_id"});
  Permissions.hasMany(GroupPermissions, { as: "group_permissions", foreignKey: "permission_id"});

  return {
    Condominio,
    Condomino,
    GroupPermissions,
    Groups,
    Permissions,
    User,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
