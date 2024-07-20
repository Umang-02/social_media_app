import express from 'express';
import {signUpUser,loginUser,logoutUser,followUnfollowUser,updateUser, getUserProfile} from '../controllers/userController.js';

import protectRoute from '../middlewares/protectRoute.js';

const userRoutes=express.Router();

userRoutes.get("/profile/:query",getUserProfile);
userRoutes.post("/signup",signUpUser);
userRoutes.post("/login",loginUser);
userRoutes.post("/logout",logoutUser);
userRoutes.post("/follow/:id",protectRoute,followUnfollowUser);
userRoutes.put("/update/:id",protectRoute,updateUser);

export default userRoutes;