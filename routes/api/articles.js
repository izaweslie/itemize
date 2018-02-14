const router = require("express").Router();
const userController = require("../../controllers/articlesController");
const itemsController = require("../../controllers/itemsController")

// Matches with "/api/users"
router.route("/")
  .get(userController.findAll)
  .post(userController.create);

// Matches with "/api/users/:id"
router
  .route("/:id")
  .get(userController.findById)
  .put(userController.update)
  .post(userController.create)
  .delete(userController.remove);

// Matches with "/api/users/:id/item"
router
  .route("/:id/item")
  .get(itemsController.findById)
  .put(itemsController.update)
  .post(itemsController.create)
  .delete(itemsController.remove);


module.exports = router;
