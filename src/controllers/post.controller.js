import { Post } from "../models/post.model.js";
import { User } from "../models/user.model.js";
import { userController } from "./user.controller.js";

export const postController = {
  // add post
  addPost: async (req, res, next) => {
    const { author, title, content } = req.body;

    try {
      const [data] = await Post.insertMany({
        author,
        title,
        content,
      });

      if (data) {
        await userController.pushPosts(author, data._id);
        return res.json({
          status: "success",
          message: "Post added successfully",
          data,
        });
      }
      return res.json({ status: "failed", message: "Failed to add post" });
    } catch (error) {
      return res.json({
        status: "error",
        message: "server error",
        error,
      });
    }
  },

  // update post
  updatePost: async (req, res) => {
    const { id, title, content } = req.body;
    const updates = {};

    try {
      if (title) {
        updates.title = title;
      }
      if (content) {
        updates.content = content;
      }

      if (!Object.keys(updates).length) {
        return res.json({
          status: "failed",
          message: "there's no data to be updated",
        });
      }

      const data = await Post.findByIdAndUpdate(id, updates, {
        new: true,
      });

      if (data) {
        return res.json({
          status: "success",
          message: "Post updated successfully",
          data,
        });
      }
      return res.json({
        status: "failed",
        message: "Stupid Error",
      });
    } catch (error) {
      return res.json({ status: "error", message: "server error", error });
    }
  },

  //delete post
  deletePost: async (req, res) => {
    const { id } = req.body;

    try {
      const data = await Post.findByIdAndDelete(id);

      if (data) {
        return res.json({
          status: "success",
          message: "Post deleted successfully",
        });
      }
      return res.json({
        status: "failed",
        message: "no post has been deleted",
      });
    } catch (error) {
      return res.json({ status: "error", message: "server error", error });
    }
  },

  //get all posts
  getAllPosts: async (_, res) => {
    try {
      const data = await Post.find();

      if (data.length) {
        return res.json({ status: "success", data });
      }

      return res.json({
        status: "failed",
        message: "no posts yet",
      });
    } catch (error) {
      return res.json({ status: "error", message: "server error", error });
    }
  },

  //get all posts with their authors
  getAllPostsWithAuthors: async (_, res) => {
    try {
      const data = await Post.find().populate([
        {
          path: "author",
        },
      ]);

      if (data.length) {
        return res.json({ status: "success", data });
      }

      return res.json({
        status: "failed",
        message: "no posts yet",
      });
    } catch (error) {
      return res.json({ status: "error", message: "server error", error });
    }
  },

  //sort posts descending
  sortDesc: async (_, res) => {
    try {
      const data = await Post.find().sort({ createdAt: -1 });

      if (data.length) {
        return res.json({ status: "success", data });
      }

      return res.json({
        status: "failed",
        message: "No posts found",
      });
    } catch (error) {
      return res.json({ status: "error", message: "Server error", error });
    }
  },
};
