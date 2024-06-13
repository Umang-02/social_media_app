import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/helpers/generateTokenAndSetCookie.js";
import jwt from 'jsonwebtoken';

const signUpUser=async(req,res)=>{
    try {
        const {name,email,username,password}=req.body;
        const user=await User.findOne({$or:[{email},{username}]});
        if(user)
            {
                return res.status(400).json({error:"User already exists"});
            }
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);

        const newUser=new User({
            name,
            email,
            username,
            password:hashedPassword,
        });

        await newUser.save();

        if(newUser)
        {
            generateTokenAndSetCookie(newUser.id,res);
            res.status(201).json({
                _id:newUser._id,
                name:newUser.name,
                email:newUser.email,
                username:newUser.username,
            })
        }
        else
        {
            res.status(400).json({error:"Invalid user data"});
        }
    } catch (error) {
        res.status(500).json({error:error.message});
        console.log("Error in signUpUser:",error.message);
    }
};

const loginUser=async(req,res)=>{
    try {
        const {username,password}=req.body;
        const user=await User.findOne({username});
        const isPasswordCorrect=await bcrypt.compare(password,user?.password || "");
        //if the user is not found then the value of user becomes a null object, and while we check the password, bcrypt doesn't support the check of a string and null value, hence we add password || "" defining if the user is null indicating no user.password, in that case simply compare it with an empty string which will automatically give us the false value and then we can easily proceed with that!
        if(!user || !isPasswordCorrect)
            return res.status(400).json({error:"Invalid Username or Password"});
        
        generateTokenAndSetCookie(user._id,res);

        res.status(200).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            username:user.username,
        })
        
    } catch (error) {
        res.status(500).json({error:error.message});
        console.log("Error in loginuser functionality",error.message);
    }
};

const logoutUser=async(req,res)=>{
    try {
        res.cookie("jwt","",{maxAge:1});
        res.status(200).json({message:"User logged out successfully"});
    } catch (error) {
        res.status(500).json({error:error.message});
        console.log("Error in logout functionality",error.message);
    }
};

const followUnfollowUser=async(req,res)=>{
    try {
        const {id}=req.params;
        const userToModify=await User.findById(id);
        const currentUser=await User.findById(req.user._id);

        if(id===req.user._id.toString()) return res.status(400).json({error:"You cannot follow/unfollow yourself"});

        if(!userToModify || !currentUser) return res.status(400).json({error:"User not found!"});

        const isFollowing=currentUser.following.includes(id);

        if(isFollowing){
            //unfollow the user
            await User.findByIdAndUpdate(req.user._id,{$pull:{following:id}});

            await User.findByIdAndUpdate(id,{$pull:{followers:req.user._id}});

            res.status(200).json({message:"User unfollowed successfully."})
        }
        else{
            await User.findByIdAndUpdate(req.user._id,{$push:{following:id}});

            await User.findByIdAndUpdate(id,{$push:{followers:req.user._id}});
        
            res.status(200).json({message:"User followed successfully."})
        }
    } catch (error) {
        res.status(500).json({error:error.message});
        console.log("Error in follow unfollow functionality",error.message);        
    }
};

const updateUser=async(req,res)=>{
    const {name,username,password,email,profilepic,bio}=req.body;
    const userId=req.user._id;
    try {
        let user=await User.findById(userId);
        if(!user) return res.status(400).json({error:"User not found"});
        
        if(password)
        {
            const salt=await bcrypt.genSalt(10);
            const hashedPassword=await bcrypt.hash(password,salt);
            user.password=hashedPassword;
        }

        if(userId!==req.params.id)
        {
            res.status(500).json({error:"You cannot update any other profile from thsi profile!"});
        }

        user.name=name||user.name;
        user.email=email||user.email;
        user.username=username||user.username;
        user.profilepic=profilepic||user.profilepic;
        user.bio=bio||user.bio;

        user=await user.save();

        res.status(200).json({message:"User updated successfully."},user);

    } catch (error) {
        res.status(500).json({error:error.message});
        console.log("Error in update user functionality",error.message);
    }
};

const getUserProfile = async(req,res)=>{
    const {username}=req.params;
    try {
        const user= await User.findOne({username}).select("-password").select("-updateAt");
        if(!user) return res.status(400).json({error:"User not found"});

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({error:error.message});
        console.log("Error in gerUserProfie:",error.message);       
    }
}

export {signUpUser,loginUser,logoutUser,followUnfollowUser,updateUser,getUserProfile};