import React from "react";
import { Box, Text, Image, IconButton } from "@chakra-ui/react";
import { EditIcon, ArrowUpIcon, DeleteIcon } from "@chakra-ui/icons";
import moment from "moment";
import { NewEventType } from "../api";

interface EventProps extends Omit<NewEventType, "selectedFiles"> {
  createdAt?: string;
  image?: string;
}

const Event = (props: EventProps) => {
  const { image, creator, title, tags, message, createdAt } = props;
  return (
    <Box
      display="flex"
      flexDirection="column"
      w="300px"
      h="400px"
      borderRadius={5}
      position="relative"
      bg="white"
    >
      <Image src={image} alt={title} borderTopRadius={5} height={200} />
      <Box position="absolute" top={1} left={2}>
        <Text color="white" fontWeight={500} fontSize={13}>
          {creator}
        </Text>
        <Text color="white" fontWeight={500} fontSize={12}>
          {moment(createdAt, "YYYYMMDD").fromNow()}
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
        <Box display="flex" gap={1}>
          {tags?.map((item, index) => (
            <Text fontSize={12} key={index}>
              #{item}
            </Text>
          ))}
        </Box>
        <br />
        <Text fontSize={16}>{title}</Text>
        <br />
        <Text fontSize={13}>{message}</Text>
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
