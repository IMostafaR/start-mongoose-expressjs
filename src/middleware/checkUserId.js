import { User } from "../models/user.model.js";

export const isAuthorExist = async (req, res, next) => {
  const { author } = req.body;

  try {
    let data = await User.findById(author);

    if (!data) {
      return res.json({
        status: "failed",
        message: "Please login!",
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
