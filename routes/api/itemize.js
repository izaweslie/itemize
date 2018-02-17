const router = require("express").Router();
const usersController = require("../../controllers/usersController");
const itemsController = require("../../controllers/itemsController")

// Matches with "/api/user
router.route("/")
  .get(usersController.findAll)
  .post(usersController.create);

// Matches with "/api/user/:id"
router
  .route("/:id")
  .get(usersController.findById)
  .put(usersController.update)
  .post(usersController.create)
  .delete(usersController.remove);

// Matches with "/api/user/:id/item"
router
  .route("/:id/item")
  .get(itemsController.findById)
  .put(itemsController.update)
  .post(itemsController.create)
  .delete(itemsController.remove);

module.exports = router;
