import React from "react";
import { Box, Button, Text } from "@chakra-ui/react";
import AppBarBackground from "../assets/svgs/endless-constellation.svg";
import { Link, useLocation } from "react-router-dom";

interface AppBarProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const AppBar = (props: AppBarProps) => {
  const { onClick } = props;
  const location = useLocation();
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
      <Link to="/">
        <Text color="#ffffff">Events and Memories</Text>
      </Link>
      {location.pathname === "/" && (
        <Link to="/create">
          <Button colorScheme="purple" onClick={onClick}>
            Create new Event
          </Button>
        </Link>
      )}
    </Box>
  );
};

export default AppBar;
