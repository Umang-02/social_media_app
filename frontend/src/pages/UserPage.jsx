import React, { useEffect, useState } from 'react'
import UserHeader from '../components/UserHeader'
import UserPost from '../components/UserPost'
import { useParams } from 'react-router-dom';
import useShowToast from "../hooks/useShowToast";
import { Flex, Spinner } from '@chakra-ui/react';
import Post from '../components/Post';

const UserPage = () => {
  const [user,setUser]=useState(null);
  const {username}=useParams();
  const showToast=useShowToast();
  const [posts,setPosts]=useState([]);
  const [fetchingPosts,setFetchingPosts]=useState(true);
  useEffect(()=>{
    const getUser=async()=>{
      try {
        const res=await fetch(`/api/users/profile/${username}`);
        const data=await res.json();
        // console.log(data);
        if(data.error){
          showToast("Error",data.error,"error");
          return;
        }
        setUser(data);
      } catch (error) {
        showToast("Error",error,"error");
      }
    };
    
    const getPosts=async()=>{
      setFetchingPosts(true);
      try {
        const res=await fetch(`/api/posts/user/${username}`);
        const data=await res.json();
        console.log(data);
        setPosts(data);
      } catch (error) {
        showToast("Error",error.message,"error");
        setPosts([]);
      } finally{setFetchingPosts(false)}
    }
    getUser();
    getPosts();
  },[username,showToast]);

  if(!user) return <h1>User has no posts.</h1>;

  return (
    <>
        <UserHeader user={user}/> 
        {!fetchingPosts && posts.length===0 && <h1>User has no posts.</h1>}
        {fetchingPosts && (
          <Flex justifyContent={"center"} my={12}>
            <Spinner size={"xl"}/>
          </Flex>
        )}
        {posts.map((post)=>(
          <Post key={post._id} post={post} postedBy={post.postedBy}/>
        ))}
    </>
  )
}

export default UserPage
