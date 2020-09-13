const express = require("express");
const router = express.Router();
const { commentsController } = require("../controllers");

router.get("/", commentsController.get);
router.post("/", commentsController.post);
router.patch("/:id", commentsController.patch);
router.delete("/:id", commentsController.delete);

module.exports = router;
