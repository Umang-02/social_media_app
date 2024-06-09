import express from "express";
import protectRoute from "../middlewares/protectRoute.js";
import {createPost , getPost, deletePost, likeUnlikePost, replyToPost, getFeed} from "../controllers/postController.js";

const postRoutes=express.Router();

postRoutes.post("/create",protectRoute,createPost);
postRoutes.get("/:id",getPost);
postRoutes.delete("/:id",protectRoute,deletePost);
postRoutes.post("/like/:id",protectRoute,likeUnlikePost);
postRoutes.post("/reply/:id",protectRoute,replyToPost);
postRoutes.get("/feed",protectRoute,getFeed);

export default postRoutes;