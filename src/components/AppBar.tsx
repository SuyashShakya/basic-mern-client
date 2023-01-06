import React, { useState } from "react";
import { Avatar, Box, Button, Text, useToast } from "@chakra-ui/react";
import decode from "jwt-decode";

import AppBarBackground from "../assets/svgs/endless-constellation.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";

interface AppBarProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const AppBar = (props: AppBarProps) => {
  const { onClick } = props;
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("profile") as string)
  );
  React.useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile") as string));
  }, []);
  const onSignIn = () => {
    navigate(`/signin`, { replace: false });
  };
  const signOut = () => {
    toast({
      title: "User logged out Successfully!!!",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    localStorage.clear();
    setUser(null);
  };
  console.log("user", user);
  React.useEffect(() => {
    const token = user?.data?.token;
    console.log("token", user?.data);
    if (token) {
      const decodedToken: {
        email: string;
        id: string;
        exp: number;
        iat: number;
      } = decode(token);

      if (decodedToken?.exp * 1000 < new Date().getTime()) {
        signOut();
      }
    }
  }, [location]);

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
      <Box display="flex" gap={4} alignItems="center">
        {user && location.pathname === "/" && (
          <Link to="/create">
            <Button colorScheme="purple" onClick={onClick}>
              Create new Event
            </Button>
          </Link>
        )}
        {user && (
          <Box display="flex" alignItems="center" gap={2}>
            <Avatar size="sm" name={user?.data?.result?.name} />{" "}
            <Text color="white">{user?.data?.result?.name}</Text>
          </Box>
        )}
        {user ? (
          <Button colorScheme="green" onClick={signOut}>
            Sign out
          </Button>
        ) : (
          <Button colorScheme="red" onClick={onSignIn}>
            Sign in
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default AppBar;
