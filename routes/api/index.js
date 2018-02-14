const router = require("express").Router();
const articleRoutes = require("./articles");

// Book routes
router.use("/user", articleRoutes);

module.exports = router;
