import express from "express";
import protectRoute from "../middlewares/protectRoute.js";
import {createPost , getPost, deletePost, likeUnlikePost, replyToPost, getFeed , getUserPosts} from "../controllers/postController.js";

const postRoutes=express.Router();

postRoutes.post("/create",protectRoute,createPost);
postRoutes.put("/like/:id",protectRoute,likeUnlikePost);
postRoutes.put("/reply/:id",protectRoute,replyToPost);
postRoutes.get("/user/:username",protectRoute,getUserPosts);
postRoutes.get("/feed",protectRoute,getFeed);
postRoutes.get("/:id",getPost);
postRoutes.delete("/:id",protectRoute,deletePost);
export default postRoutes;