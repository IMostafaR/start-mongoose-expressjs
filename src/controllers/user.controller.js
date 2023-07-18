import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";

export const userController = {
  // sign up
  signUp: async (req, res) => {
    const { name, email, password, age, gender, phone } = req.body;

    try {
      const hashedPassword = bcrypt.hashSync(password, 8);
      const [data] = await User.insertMany({
        name,
        email,
        password: hashedPassword,
        age,
        gender,
        phone,
      });

      if (data) {
        return res.json({
          status: "success",
          message: "User created successfully",
          data,
        });
      }
      return res.json({ status: "failed", message: "Failed to create user" });
    } catch (error) {
      return res.json({
        status: "error",
        message: "server error",
        error,
      });
    }
  },

  // login
  logIn: async (req, res) => {
    const { email, password } = req.body;

    try {
      const data = await User.findOne({
        email,
      });

      if (data) {
        const passwordCheck = bcrypt.compareSync(password, data.password);
        if (passwordCheck) {
          return res.json({
            status: "success",
            message: "User signedIn successfully",
            id: data._id,
          });
        }
        return res.json({
          status: "failed",
          message: "incorrect email or password",
        });
      }
    } catch (error) {
      return res.json({ status: "error", message: "server error", error });
    }
  },

  // update user
  updateUser: async (req, res) => {
    const { id, name, email, password, age, phone } = req.body;
    const updates = {};

    try {
      if (name) {
        updates.name = name;
      }
      if (email) {
        updates.email = email;
      }
      if (password) {
        const hashedPassword = bcrypt.hashSync(password, 8);
        updates.password = hashedPassword;
      }
      if (age) {
        updates.age = age;
      }
      if (phone) {
        updates.phone = phone;
      }

      if (!Object.keys(updates).length) {
        return res.json({
          status: "failed",
          message: "there's no data to be updated",
        });
      }

      const data = await User.findByIdAndUpdate(id, updates, {
        new: true,
      });

      if (data) {
        return res.json({
          status: "success",
          message: "User's data updated successfully",
          data,
        });
      }
      return res.json({
        status: "failed",
        message: "Please login to update your data",
      });
    } catch (error) {
      return res.json({ status: "error", message: "server error", error });
    }
  },

  //delete user
  deleteUser: async (req, res) => {
    const { id } = req.body;

    try {
      const data = await User.findByIdAndDelete(id);

      if (data) {
        return res.json({
          status: "success",
          message: "user's data deleted successfully",
          id: data._id,
          email: data.email,
        });
      }
      return res.json({
        status: "failed",
        message: "no user has been deleted",
      });
    } catch (error) {
      return res.json({ status: "error", message: "server error", error });
    }
  },

  // search for user where his name start with "X" and age less than Y
  searchNameAndAge: async (req, res) => {
    const { letter, age } = req.body;

    try {
      const data = await User.find({
        name: {
          $regex: `^${letter}`,
          $options: "i",
        },
        age: {
          $lt: age,
        },
      });

      if (data.length) {
        return res.json({ status: "success", data });
      }

      return res.json({
        status: "failed",
        message: "no matched users",
      });
    } catch (error) {
      return res.json({ status: "error", message: "server error", error });
    }
  },

  // search for user where his age is between X and Y
  searchAgeRange: async (req, res) => {
    const { lowAge, highAge } = req.body;

    try {
      const data = await User.find({
        age: { $gt: lowAge, $lte: highAge },
      });

      if (data.length) {
        return res.json({ status: "success", data });
      }

      return res.json({
        status: "failed",
        message: "no matched users",
      });
    } catch (error) {
      return res.json({ status: "error", message: "server error", error });
    }
  },

  // get all user
  getAllUsers: async (_, res) => {
    try {
      const data = await User.find();

      if (data.length) {
        return res.json({ status: "success", data });
      }

      return res.json({
        status: "failed",
        message: "no matched users",
      });
    } catch (error) {
      return res.json({ status: "error", message: "server error", error });
    }
  },

  // get user profile with user posts
  getUserPosts: async (_, res) => {
    try {
      const data = await User.find().populate([
        {
          path: "posts",
        },
      ]);

      if (data.length) {
        return res.json({ status: "success", data });
      }

      return res.json({
        status: "failed",
        message: "no matched users",
      });
    } catch (error) {
      return res.json({ status: "error", message: "server error", error });
    }
  },

  // push new posts to their user
  pushPosts: async (author, postId) => {
    try {
      const user = await User.findById(author);
      user.posts.push(postId);
      await user.save();
    } catch (error) {
      return res.json({ status: "error", message: "server error", error });
    }
  },
};
