const express = require("express");
const router = express.Router();
const protectedController = require("../controllers/protectedController");
const verifyJWT = require("../middleware/verifyJWT");
const verifyPermission = require("../middleware/verifyPermissions");

router.get(
  "/api/showuser/info/:userId",
  verifyJWT,
  verifyPermission,
  protectedController.userInfoGET
);

router.get(
  "/api/showuser/me",
  verifyJWT,
  verifyPermission,
  protectedController.personalInfoGET
);

router.get(
  "/api/condominio/info",
  verifyJWT,
  verifyPermission,
  protectedController.adminInfoGET
);

router.put(
  "/api/create/fracao",
  verifyJWT,
  verifyPermission,
  protectedController.createFracao
);

module.exports = router;
