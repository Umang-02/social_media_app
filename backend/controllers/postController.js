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
    try {
        const id=req.params.id; //retrieving the id of the post from the url params
        const userId=req.user._id; //retrieving the id of the user who has requested to like or unlike the post

        const post=await Post.findById(id); //checking if there is a post with an id obtained from the params of the request url.

        if(!post)
        {
            return res.status(404).json({message:"Post not found"});
        }

        const userLikedPost=post.likes.includes(userId); // we are checking if the current user has already liked the current post or not

        if(userLikedPost)
        {
            //if the user has already liked the post, then we should unlike the post meaning remove it from the list of people liked.

            await Post.updateOne({_id:id},{$pull:{likes:userId}});
            res.status(200).json({message:"Post unliked successfully"});
        }
        else
        {
            //if the user has not already liked the post, then we will have to like the post, for that we must include the current user's id in the current post likes list.

            post.likes.push(userId); //including the current user's id into the post likes list.
            await post.save();
            res.status(200).json({message:"Post liked successfully"})
        }

    } catch (error) {
        res.status(500).json({message:error.message});
        console.log("Error in like and unlike function:",error.message);
    }
};

const replyToPost = async(req,res)=>{
    try {
        const postId=req.params.id; //geting the post id from the params of the url

        const userId=req.user._id; //getting the user id from the req made by the current user.
        
        const {text}=req.body; //getting the text from the body of the post json body at the end point.
        
        const username=req.user.username; //getting the username from the database of the user using the current user data.
        
        const userProfilePic=req.user.profilePic; //getting the profile pic from the database of the user using the current user data.

        const post=await Post.findById(postId); //getting the post by searching using the post id

        if(!post) //if there is no such post with the obtained post id, returning the error of post not found.
        {
            return res.status(404).json({message:"Post not found"});
        }

        if(!text) //if there is no text found, asking the user to input the text
        {
            return res.status(404).json({message:"No text has been found for the comment. Please fill the text field"});
        }
        
        const reply={userId,text,userProfilePic,username};
        post.replies.push(reply);
        await post.save();

        res.status(200).json({message:"Reply added successfully"});

    } catch (error) {
        res.status(500).json({message:error.message});
        console.log("Error is in post reply function:",error.message);
    }
};

const getFeed=async(req,res)=>{
    try {
        const userId=req.user._id;
        const user= await User.findById(userId);
        if(!user)
        {
            return res.status(404).json({message:"User not found"});
        }

        const following=user.following;

        const feedPosts=await Post.find({postedBy:{$in:following}}).sort({createdAt:-1});

        res.status(200).json({feedPosts});
        
    } catch (error) {
        res.status(500).json({message:error.message});
        console.log("Error in getFeed function in postController:",error.message);
    }
};

export {createPost, getPost , deletePost, likeUnlikePost, replyToPost, getFeed};