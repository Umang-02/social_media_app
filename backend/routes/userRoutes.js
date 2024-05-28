import express from 'express';
import signUpUser from '../controllers/userController.js';

const userRoutes=express.Router();

userRoutes.post("/signup",signUpUser);

export default userRoutes;