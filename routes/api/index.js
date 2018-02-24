const router = require("express").Router();
const itemizeRoutes = require("./itemize");

router.use("/user", itemizeRoutes);

module.exports = router;
