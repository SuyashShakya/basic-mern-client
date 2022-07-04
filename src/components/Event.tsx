import React from "react";
import { IconButton } from "@chakra-ui/react";
import { Box, Text, Image } from "@chakra-ui/react";
import { EditIcon, ArrowUpIcon, DeleteIcon } from "@chakra-ui/icons";

const Event = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      maxW="300px"
      h="400px"
      borderRadius={5}
      position="relative"
      bg="white"
    >
      <Image
        src="data:image/jpeg;base64,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"
        alt="name"
        borderTopRadius={5}
      />
      <Box position="absolute" top={1} left={2}>
        <Text color="white" fontWeight={500} fontSize={13}>
          Mark
        </Text>
        <Text color="white" fontWeight={500} fontSize={12}>
          2 months ago
        </Text>
      </Box>
      <IconButton
        position="absolute"
        variant="ghost"
        height={5}
        width={1}
        top={1}
        right={1}
        aria-label="Edit Event"
        icon={<EditIcon color="white" />}
      />
      <Box p={2}>
        <Text fontSize={12}>#escaperoom, #randomshit</Text>
        <br />
        <Text fontSize={16}>Visited Escaperoom</Text>
        <br />
        <Text fontSize={13}>description</Text>
        <br />

        <Box display="flex" alignItems="center" position="absolute" bottom={2}>
          <IconButton
            variant="ghost"
            height={5}
            py={0}
            aria-label="Edit Event"
            icon={<ArrowUpIcon />}
          />
          <Text fontSize={12}>55</Text>
        </Box>
        <Box position="absolute" bottom={2} right={2}>
          <IconButton
            variant="ghost"
            height={5}
            width={1}
            aria-label="Edit Event"
            icon={<DeleteIcon />}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Event;
