const { sequelize } = require("../models");
var initModels = require("../models/init-models");
var models = initModels(sequelize);
const Condominio = models.Condominio;
const groupPerm = models.GroupPermissions;

const verifyPermission = async (req, res, next) => {
  const token = req.header("auth-token");

  if (!token) {
    return res.status(403).json({ error: "Invalid token" });
  }

  const condominio = await Condominio.findOne({ where: { authToken: token } });
  console.log(condominio.id);

  if (!condominio) {
    return res.status(403).json({ error: "Invalid user token" });
  }

  const acl = await groupPerm
    .findAll(
      { where: { group_id: condominio.group_id } },
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
