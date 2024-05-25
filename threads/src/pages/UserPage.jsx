import React from 'react'
import UserHeader from '../components/UserHeader'
import UserPost from '../components/UserPost'
const UserPage = () => {
  return (
    <>
        <UserHeader/> 
        <UserPost likes={1200} replies={481} postImg="./post1.png" postTitle="Let's talk about threads."/>
        <UserPost likes={520} replies={181} postImg="./post2.png" postTitle="Nice Tutorial"/>
        <UserPost likes={1400} replies={540} postImg="./post3.png" postTitle="Ek dam paagal aadmi hai"/>
        <UserPost/>
    </>
  )
}

export default UserPage
