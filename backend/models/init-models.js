var DataTypes = require("sequelize").DataTypes;
var _group_permissions = require("./group_permissions");
var _groups = require("./groups");
var _permissions = require("./permissions");
var _user = require("./user");

function initModels(sequelize) {
  var group_permissions = _group_permissions(sequelize, DataTypes);
  var groups = _groups(sequelize, DataTypes);
  var permissions = _permissions(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);

  groups.belongsToMany(permissions, { as: 'permission_id_permissions', through: group_permissions, foreignKey: "group_id", otherKey: "permission_id" });
  permissions.belongsToMany(groups, { as: 'group_id_groups', through: group_permissions, foreignKey: "permission_id", otherKey: "group_id" });
  group_permissions.belongsTo(groups, { as: "group", foreignKey: "group_id"});
  groups.hasMany(group_permissions, { as: "group_permissions", foreignKey: "group_id"});
  user.belongsTo(groups, { as: "group", foreignKey: "group_id"});
  groups.hasMany(user, { as: "users", foreignKey: "group_id"});
  group_permissions.belongsTo(permissions, { as: "permission", foreignKey: "permission_id"});
  permissions.hasMany(group_permissions, { as: "group_permissions", foreignKey: "permission_id"});

  return {
    group_permissions,
    groups,
    permissions,
    user,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
