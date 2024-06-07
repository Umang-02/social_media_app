import User from "../models/userModel.js";
import Post from "../models/postModel.js";
const createPost = async(req,res)=>{
    try {
        const {postedBy,text,img}=req.body;
        if(!postedBy || !text)
        {
            return res.staus(400).json({message:"PostedBy and text fields are required"});
        }
        const user= await User.findById(postedBy);
        if(!user)
            return res.status(404).json({message:"User not found"});
        // console.log(user._id);
        // console.log(req.user._id.toString());

        if(user._id.toString()!==req.user._id.toString())
        {
            return res.status(401).json({message:"Unauthorized to create post"});
        }

        if(text.length>500)
            return res.status(400).json({message:"Text must be less than 500 characters"});

        const newPost=new Post({postedBy,text,img});
        await newPost.save();

        res.status(201).json({message:"Post created successfully",newPost});

    } catch (error) {
        res.status(500).json({message:error.message});
        console.log("Error in the createPost function:",error.message);
    }
};

const getPost = async(req,res)=>{
    try {
        const post=await Post.findById(req.params.id);
        if(!post)
            return res.status(404).json({message:"Post not found"});
        
        res.status(200).json({post});

    } catch (error) {
        res.status(500).json({message:error.message});
        console.log("eror in getPost function:",error.message);
    }
};

const deletePost=async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id);
        if(!post) 
            return res.status(404).json({message:"Post not found"});
        
        if(post.postedBy.toString()!==req.user._id.toString())
        {
            return res.status(401).json({message:"Unauthorized to delete the post"});
        }

        await Post.findByIdAndDelete(req.params.id);
        return res.status(200).json({message:"Post deleted successfully"});

    } catch (error) {
        res.status(500).json({message:error.message});
        console.log("Error in the deletePost function:",error.message);
    }
};

const likeUnlikePost=async(req,res)=>{
    
};

export {createPost, getPost , deletePost, likeUnlikePost};