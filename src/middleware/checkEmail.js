import { User } from "../models/user.model.js";

export const isEmailExist = async (req, res, next) => {
  const { email } = req.body;

  try {
    let data = await User.findOne({
      email,
    });

    if (data) {
      return res.json({
        status: "failed",
        message: "Email already exists",
        email,
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
