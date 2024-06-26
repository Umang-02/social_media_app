import React from "react";
import { Stack, HStack, VStack, Text } from "@chakra-ui/react";
import { Box, Flex } from "@chakra-ui/react";
import { Avatar } from "@chakra-ui/react";
import { Link } from "@chakra-ui/react";
import { BsInstagram } from "react-icons/bs";
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
import { Portal } from "@chakra-ui/react";
const UserHeader = () => {
  const copyURL=()=>{
    const currentURL=window.location.href;
    navigator.clipboard.writeText(currentURL).then(()=>{
      console.log("URL has been copied");
    })
  }
  return (
    <VStack gap={4} alignItems={"start"}>
      <Flex justifyContent={"space-between"} w={"full"}>
        <Box>
          <Text fontSize={"2xl"} fontWeight={"bold"}>
            Mark Zuckerberg
          </Text>
          <Flex gap={2} alignItems={"center"}>
            <Text fontSize={"sm"}>markzuckerberg</Text>
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
          <Avatar name="Mark Zuckerberg" src="/zuck-avatar.png" size={"xl"} />
        </Box>
      </Flex>
      <Text>Co-founder, executive chairman and CEO of Meta Platforms.</Text>
      <Flex w={"full"} justifyContent={"space-between"}>
        <Flex gap={2} alignItems={"center"}>
          <Text color={"gray.light"}>3.2k folowers</Text>
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
