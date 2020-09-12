const { User } = require("../../db/models");
const { Comment } = require("../../db/models");

module.exports = {
  get: async (req, res, next) => {
    try {
      const users = await User.findAll();
      console.log(users);
      res.json(users);
    } catch (err) {
      console.log(err);
      next(err);
    }
  },
  post: async (req, res, next) => {
    try {
      const user = await User.create({
        name: req.body.name,
        email: req.body.email,
      });
      console.log(user);
      res.status(201).json(user);
    } catch (err) {
      console.log(err);
      next(err);
    }
  },
  filter: async (req, res, next) => {
    try {
      const comments = await Comment.findAll({
        include: {
          model: User,
          where: { id: req.params.id },
        },
      });
      console.log(comments);
      res.json(comments);
    } catch (err) {
      console.log(err);
      next(err);
    }
  },
};
