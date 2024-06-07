import express from "express";
import protectRoute from "../middlewares/protectRoute.js";
import {createPost , getPost, deletePost, likeUnlikePost} from "../controllers/postController.js";

const postRoutes=express.Router();

postRoutes.post("/create",protectRoute,createPost);
postRoutes.get("/:id",getPost);
postRoutes.delete("/:id",protectRoute,deletePost);
postRoutes.post("/like/:id",protectRoute,likeUnlikePost);

export default postRoutes;