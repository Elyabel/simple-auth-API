const { Router } = require("express");

const router = Router();

const { AuthCtrl } = require("../controllers");

router.post("/register", AuthCtrl.register);
router.post("/login", AuthCtrl.login);

module.exports = router;