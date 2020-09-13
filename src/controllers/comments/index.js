const { Comment } = require("../../db/models");
const { User } = require("../../db/models");
module.exports = {
  get: async (req, res, next) => {
    try {
      const comment = await Comment.findAll({
        include: {
          model: User,
        },
      });
      res.json(comment);
    } catch (err) {
      console.log(err);
      next(err);
    }
  },
  post: async (req, res, next) => {
    try {
      const comment = await Comment.create({
        userId: req.body.userid,
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
