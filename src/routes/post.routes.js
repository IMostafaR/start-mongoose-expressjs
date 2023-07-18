import { Router } from "express";
import { postController } from "../controllers/post.controller.js";
import { isAuthorExist } from "../middleware/checkUserId.js";
import { isOwner } from "../middleware/checkPostOwner.js";

const router = Router();

// add post
router.post("/add", isAuthorExist, postController.addPost);

// update post
router.put("/update", isAuthorExist, isOwner, postController.updatePost);

//delete post
router.delete("/delete", isAuthorExist, isOwner, postController.deletePost);

//get all posts
router.get("/all", postController.getAllPosts);

//get all posts with their authors
router.get("/authors", postController.getAllPostsWithAuthors);

//sort posts descending
router.get("/sortDesc", postController.sortDesc);

export default router;
