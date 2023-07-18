import { Router } from "express";
import { userController } from "../controllers/user.controller.js";
import { isEmailExist } from "../middleware/checkEmail.js";

const router = Router();

// sign up
router.post("/signup", isEmailExist, userController.signUp);

// login
router.post("/login", userController.logIn);

// update user
router.put("/update", userController.updateUser);

// update user
router.delete("/delete", userController.deleteUser);

// search for user where his name start with "X" and age less than Y
router.get("/filterNameAge", userController.searchNameAndAge);

// search for user where his age is between X and Y
router.get("/filterAge", userController.searchAgeRange);

// search for user where his age is between X and Y
router.get("/all", userController.getAllUsers);

// get user profile with user posts(
router.get("/posts", userController.getUserPosts);

export default router;
