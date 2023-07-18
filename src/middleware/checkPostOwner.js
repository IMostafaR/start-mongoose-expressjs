import { Post } from "../models/post.model.js";

export const isOwner = async (req, res, next) => {
  const { author, id } = req.body;

  try {
    let [data] = await Post.find({ author, _id: id });
    if (!data) {
      return res.json({
        status: "failed",
        message: "You don't have access to update this post",
        data,
      });
    }
  } catch (error) {
    return res.json({
      status: "error",
      message: "server error",
      error,
    });
  }

  next();
};
