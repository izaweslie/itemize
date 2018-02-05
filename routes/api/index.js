const router = require("express").Router();
const articleRoutes = require("./articles");

// Book routes
router.use("/items", articleRoutes);

module.exports = router;
