const { Comment } = require("../../db/models");

module.exports = {
  post: async (req, res, next) => {
    try {
      const comment = await Comment.create({
        userId: req.body.id,
        comment: req.body.comment,
      });
      console.log(comment);
      res.status(201).json(comment);
    } catch (err) {
      console.log(err);
      next(err);
    }
  },
  patch: async (req, res, next) => {
    try {
      const result = await Comment.update(
        {
          comment: req.body.comment,
        },
        {
          where: { id: req.params.id },
        }
      );
      res.json(result);
    } catch (err) {
      console.log(err);
      next(err);
    }
  },
  delete: async (req, res, next) => {
    try {
      const result = await Comment.destroy({ where: { id: req.params.id } });
      res.json(result);
    } catch (err) {
      console.log(err);
      next(err);
    }
  },
};
