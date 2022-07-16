import React from "react";
import { Box } from "@chakra-ui/react";
import pageNotFound from "../assets/vector/pageNotFound.jpg";

const PageNotFound = () => {
  return (
    <Box
      mt={10}
      h="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <img src={pageNotFound} height={500} width={500} alt="" />
    </Box>
  );
};

export default PageNotFound;
