import React, { useState } from "react";
import { Stack, HStack, VStack, Text } from "@chakra-ui/react";
import { Box, Flex } from "@chakra-ui/react";
import { Avatar } from "@chakra-ui/react";
import { Link } from "@chakra-ui/react";
import { BsArrowReturnLeft, BsInstagram } from "react-icons/bs";
import { CgMoreO } from "react-icons/cg";
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
  } from '@chakra-ui/react';
import {Link as RouterLink} from "react-router-dom";
import {useRecoilValue} from "recoil";
import userAtom from "../atoms/userAtom"
import { Portal } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import useShowToast from "../hooks/useShowToast";
const UserHeader = ({user}) => {
  const showToast=useShowToast();
  const currentUser=useRecoilValue(userAtom);
  const copyURL=()=>{
    const currentURL=window.location.href;
    navigator.clipboard.writeText(currentURL).then(()=>{
      console.log("URL has been copied");
    })
  }

  const [updating,setUpdating]=useState(false);

  const [following,setFollowing]=useState(user.followers.includes(currentUser?._id));
  console.log(following);
  const handleFollowUnfollow=async()=>{
    if(!currentUser)
    {
      showToast("Error","Please login","error");
      return;
    }
      setUpdating(true);
      try {
      const res=await fetch(`/api/users/follow/${user._id}`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
        },
      });
      const data=await res.json();
      if(data.error)
      {
        showToast("Error",data.error,"error");  
        return;
      }

      if(following)
      {
        showToast("Sucess",`unfollowed ${user.name}`,"success");
        user.followers.pop(); //decrement the count by 1
      }
      else
      {
        showToast("Sucess",`followed ${user.name}`,"success");
        user.followers.push(currentUser?._id);
      }
      console.log(data);
      setFollowing(!following);
    } catch (error) {
      showToast("Error",error,"error");
    } finally{
      setUpdating(false);
    }
  }
  return (
    <VStack gap={4} alignItems={"start"}>
      <Flex justifyContent={"space-between"} w={"full"}>
        <Box>
          <Text fontSize={"2xl"} fontWeight={"bold"}>
            {user.name}
          </Text>
          <Flex gap={2} alignItems={"center"}>
            <Text fontSize={"sm"}>{user.username}</Text>
            <Text
              fontSize={"xs"}
              bg={"gray.dark"}
              color={"gray.light"}
              p={1}
              borderRadius={"full"}
            >
              threads.next
            </Text>
          </Flex>
        </Box>
        <Box>
          {user.profilePic && (<Avatar name="Mark Zuckerberg" src={user.profilePic} size={"xl"} />)}

          {!user.profilePic && (<Avatar name="Mark Zuckerberg" src="https://bit.ly/broken-link" size={"xl"} />)}

        </Box>
      </Flex>
      <Text>{user.bio}</Text>
      {currentUser?._id===user._id && (
        <Link as={RouterLink} to="/update">
          <Button size={"sm"}>Update Profile</Button>
        </Link>
      )}
      {currentUser?._id!==user._id && (
          <Button size={"sm"} onClick={handleFollowUnfollow} isLoading={updating}>{following?"Unfollow":"Follow"}</Button>
      )}
      <Flex w={"full"} justifyContent={"space-between"}>
        <Flex gap={2} alignItems={"center"}>
          <Text color={"gray.light"}>{user.followers.length} folowers</Text>
          <Box w="1" h="1" bg={"gray.light"} borderRadius={"full"}></Box>
          <Link color={"gray.light"}>instagram.com</Link>
        </Flex>
        <Flex gap={3} alignItems={"center"}>
          <Box>
            <BsInstagram size={24} cursor={"pointer"} />
          </Box>
          <Box>
            <Menu>
              <MenuButton>
              <CgMoreO size={24} cursor={"pointer"} />
              </MenuButton>
                <Portal>
                  <MenuList>
                    <MenuItem onClick={copyURL}>Copy Link</MenuItem>
                  </MenuList>
                </Portal>
            </Menu>
          </Box>
        </Flex>
      </Flex>
      <Flex w={"full"}>
        <Flex flex={1} borderBottom={"1.5px solid white"} justifyContent={"center"} pb='3' cursor={"pointer"}>
          <Text fontWeight={"bold"}>Threads</Text>
        </Flex>
        <Flex
          flex={1}
          borderBottom={"1px solid gray"}
          justifyContent={"center"}
          color={"gray.light"}
          pb='3'
          cursor={"pointer"}
          >
            <Text fontWeight={"bold"}>Replies</Text>
        </Flex>
      </Flex>
    </VStack>
  );
};

export default UserHeader;
