import express from 'express';
import {signUpUser,loginUser,logoutUser,followUnfollowUser,updateUser} from '../controllers/userController.js';

import protectRoute from '../middlewares/protectRoute.js';

const userRoutes=express.Router();

userRoutes.post("/signup",signUpUser);
userRoutes.post("/login",loginUser);
userRoutes.post("/logout",logoutUser);
userRoutes.post("/follow/:id",protectRoute,followUnfollowUser);
userRoutes.post("/update/:id",protectRoute,updateUser);

export default userRoutes;