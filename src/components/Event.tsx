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
import { AiOutlineLike } from "react-icons/ai";

interface EventProps extends Omit<NewEventType, "selectedFiles"> {
  createdAt?: string;
  image?: string;
  upvote?: number;
  downvote?: number;
  likes?: string[];
  creator?: string;
  user?: {
    data: {
      result: {
        _id: string;
      };
    };
  };
  editHandler?: MouseEventHandler<HTMLButtonElement> | undefined;
  deleteHandler?: MouseEventHandler<HTMLButtonElement> | undefined;
  upvoteHandler?: MouseEventHandler<HTMLButtonElement> | undefined;
  downvoteHandler?: MouseEventHandler<HTMLButtonElement> | undefined;
  likeHandler?: MouseEventHandler<HTMLButtonElement> | undefined;
}

const Event = (props: EventProps) => {
  const {
    image,
    name,
    title,
    tags,
    message,
    createdAt,
    user,
    likes,
    creator,
    upvote,
    downvote,
    editHandler,
    deleteHandler,
    upvoteHandler,
    downvoteHandler,
    likeHandler,
  } = props;
  console.log("like", likes);
  // const editData = useAppSelector((state) => state?.events?.event)
  const LikesCompo = () => {
    if (likes.length > 0) {
      return likes.find((like) => like === user?.data?.result?._id) ? (
        <>
          <IconButton
            variant="ghost"
            height={5}
            py={0}
            aria-label="Like Event"
            icon={<AiOutlineLike />}
            onClick={likeHandler}
          />
          <Text fontSize={12}>
            {likes.length > 2
              ? `You and ${likes.length - 1} others`
              : `${likes.length} like${likes.length > 1 ? "s" : ""}`}
          </Text>
        </>
      ) : (
        <>
          <IconButton
            variant="ghost"
            height={5}
            py={0}
            aria-label="Like Event"
            icon={<AiOutlineLike />}
            onClick={likeHandler}
          />
          <Text fontSize={12}>
            {likes.length} {likes.length === 1 ? "like" : "likes"}
          </Text>
        </>
      );
    }
    return (
      <>
        <IconButton
          variant="ghost"
          height={5}
          py={0}
          aria-label="Like Event"
          icon={<AiOutlineLike />}
          onClick={likeHandler}
        />
        <Text fontSize={12}>Like</Text>
      </>
    );
  };
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
          {name}
        </Text>
        <Text color="white" fontWeight={500} fontSize={12}>
          {moment(createdAt, "YYYYMMDD").fromNow()}
        </Text>
      </Box>
      {user?.data?.result?._id === creator && (
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
      )}
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
          <LikesCompo />
          {/* <IconButton
            variant="ghost"
            height={5}
            py={0}
            aria-label="Like Event"
            icon={<AiOutlineLike />}
            onClick={likeHandler}
          />
          <Text fontSize={12}>{likes?.length || 0}</Text> */}
          {/* <IconButton
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
          <Text fontSize={12}>{downvote || 0}</Text> */}
        </Box>
        <Box position="absolute" bottom={2} right={2}>
          {user?.data?.result?._id === creator && (
            <IconButton
              variant="ghost"
              height={5}
              width={1}
              aria-label="Delete Event"
              icon={<DeleteIcon />}
              onClick={deleteHandler}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Event;
