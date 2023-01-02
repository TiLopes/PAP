const { sequelize } = require("../models");
var initModels = require("../models/init-models");
var models = initModels(sequelize);
const Condominio = models.Condominio;
const Condomino = models.Condomino;
const groupPerm = models.GroupPermissions;

const verifyPermission = async (req, res, next) => {
  const token = req.header("auth-token");
  let groupID;

  if (!token) {
    return res.status(403).json({ error: "Invalid token" });
  }

  const condominio = await Condominio.findOne({
    where: { auth_token: token },
  });

  if (condominio != null) {
    console.log("condominio");
    groupID = condominio.id_grupo;
  } else {
    console.log("condomino");
    const condomino = await Condomino.findOne({ where: { auth_token: token } });
    groupID = condomino.id_grupo;
  }

  console.log(groupID);

  const acl = await groupPerm
    .findAll(
      { where: { group_id: groupID } },
      { attributes: ["permission_id"] }
    )
    .then((mapACL) => {
      var x = mapACL.map((perm) => perm.permission_id);
      return x;
    });

  console.log(acl);

  const url = new URL(req.protocol + "://" + req.get("host") + req.originalUrl);

  const pathSplit = url.pathname.split("/");
  console.log(pathSplit);
  const action = pathSplit[2];
  const spec = pathSplit[3];
  const fullPerm = action + ":" + spec;
  console.log(fullPerm);

  if (acl.includes(fullPerm.toLowerCase()) || acl.includes("*:*")) {
    next();
  } else {
    return res.status(401).json({ error: "Invalid permission" });
  }
};

module.exports = verifyPermission;
