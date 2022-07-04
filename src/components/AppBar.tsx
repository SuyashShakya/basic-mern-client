import React from "react";
import { Box, Button, Text } from "@chakra-ui/react";
import AppBarBackground from "../assets/svgs/endless-constellation.svg";

const AppBar = () => {
  return (
    <Box
      p={2}
      display="flex"
      width="100%"
      height="50px"
      backgroundImage={AppBarBackground}
      position="fixed"
      top={0}
      alignItems="center"
      justifyContent="space-between"
      zIndex={1}
    >
      <Text color="#ffffff">Events and Memories</Text>
      <Button colorScheme="purple">Create new Event</Button>
    </Box>
  );
};

export default AppBar;
