import { Box } from "@chakra-ui/react";
import React from "react";
import EventsBackground from "../assets/svgs/protruding-squares.svg";
import Event from "./Event";

const Events = () => {
  return (
    <Box p={5} mt="50px" minH="100vh" bgImage={EventsBackground}>
      <Event />
    </Box>
  );
};

export default Events;
