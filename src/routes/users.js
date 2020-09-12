const express = require("express");
const router = express.Router();
const { usersController } = require("../controllers");

router.get("/", usersController.get);
router.post("/", usersController.post);
router.get("/:id", usersController.filter);
module.exports = router;
