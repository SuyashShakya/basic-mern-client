import React, { MouseEventHandler } from "react";
import { Box, Text, Image, IconButton } from "@chakra-ui/react";
import {
  EditIcon,
  ArrowUpIcon,
  DeleteIcon,
  ArrowDownIcon,
} from "@chakra-ui/icons";
import moment from "moment";
import { NewEventType } from "../api";

interface EventProps extends Omit<NewEventType, "selectedFiles"> {
  createdAt?: string;
  image?: string;
  upvote?: number;
  downvote?: number;
  editHandler?: MouseEventHandler<HTMLButtonElement> | undefined;
  deleteHandler?: MouseEventHandler<HTMLButtonElement> | undefined;
  upvoteHandler?: MouseEventHandler<HTMLButtonElement> | undefined;
  downvoteHandler?: MouseEventHandler<HTMLButtonElement> | undefined;
}

const Event = (props: EventProps) => {
  const {
    image,
    creator,
    title,
    tags,
    message,
    createdAt,
    upvote,
    downvote,
    editHandler,
    deleteHandler,
    upvoteHandler,
    downvoteHandler,
  } = props;
  // const editData = useAppSelector((state) => state?.events?.event)
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
        onClick={editHandler}
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
            aria-label="Like Event"
            icon={<ArrowUpIcon />}
            onClick={upvoteHandler}
          />
          <Text fontSize={12}>{upvote || 0}</Text>
          &nbsp; &nbsp;
          <IconButton
            variant="ghost"
            height={5}
            py={0}
            aria-label="Like Event"
            icon={<ArrowDownIcon />}
            onClick={downvoteHandler}
          />
          <Text fontSize={12}>{downvote || 0}</Text>
        </Box>
        <Box position="absolute" bottom={2} right={2}>
          <IconButton
            variant="ghost"
            height={5}
            width={1}
            aria-label="Delete Event"
            icon={<DeleteIcon />}
            onClick={deleteHandler}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Event;
