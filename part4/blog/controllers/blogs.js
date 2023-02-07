const blogRoutes = require("express").Router();
const Blog = require("../models/blog");

blogRoutes.get("/", (_, res, next) => {
  Blog.find({})
    .then((blogs) => res.json(blogs))
    .catch((err) => next(err));
});

blogRoutes.post("/", (req, res, next) => {
  const blog = new Blog(req.body);

  blog
    .save()
    .then((result) => res.status(201).json(result))
    .catch((err) => next(err));
});

module.exports = blogRoutes;
