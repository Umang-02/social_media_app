import express from "express";
import protectRoute from "../middlewares/protectRoute.js";
import {createPost} from "../controllers/postController.js";

const postRoutes=express.Router();

postRoutes.post("/create",protectRoute,createPost);

export default postRoutes;