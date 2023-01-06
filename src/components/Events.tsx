import React, { useState } from "react";
import isEmpty from "lodash/isEmpty";
import {
  Box,
  Button,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  Spinner,
} from "@chakra-ui/react";

import EventsBackground from "../assets/svgs/protruding-squares.svg";
import Event from "./Event";
import { useAppDispatch, useAppSelector } from "../redux/store";

import { useNavigate } from "react-router-dom";
import { NewEventType } from "../api";
import {
  deleteEvent,
  downvoteEvent,
  fetchEvents,
  likeEvent,
  upvoteEvent,
} from "../redux/thunkFunctions";

export interface fetchedEventsType extends NewEventType {
  _id: string;
  createdAt: string;
}

const Container = (props: { children: React.ReactNode }) => {
  const { children } = props;
  return (
    <Box
      display="flex"
      flexWrap="wrap"
      gap={20}
      p={5}
      mt="50px"
      minH="100vh"
      bgImage={EventsBackground}
    >
      {children}
    </Box>
  );
};

const Events = () => {
  const [currentId, setCurrentId] = React.useState("");
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("profile") as string)
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  React.useEffect(() => {
    dispatch(fetchEvents());
    setUser(JSON.parse(localStorage.getItem("profile") as string));
  }, []);

  const eventData = useAppSelector((state) => state);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const events = eventData?.events?.events as fetchedEventsType[];

  if (events) {
    return (
      <Container>
        {!isEmpty(events) &&
          events?.map((item, index) => (
            <Event
              user={user}
              key={index}
              title={item?.title}
              name={item?.name}
              creator={item?.creator}
              upvote={item?.upvote}
              downvote={item?.downvote}
              likes={item?.likes}
              image={item?.selectedFiles}
              message={item?.message}
              tags={item?.tags}
              createdAt={item?.createdAt}
              editHandler={() =>
                navigate(`/edit/${item?._id}`, { replace: false })
              }
              deleteHandler={() => {
                onOpen();
                setCurrentId(item?._id);
              }}
              likeHandler={() => {
                dispatch(likeEvent(item?._id)).then(() =>
                  dispatch(fetchEvents())
                );
              }}
              upvoteHandler={() => {
                dispatch(upvoteEvent(item?._id)).then(() =>
                  dispatch(fetchEvents())
                );
              }}
              downvoteHandler={() => {
                dispatch(downvoteEvent(item?._id)).then(() =>
                  dispatch(fetchEvents())
                );
              }}
            />
          ))}
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              Are you sure you wantt to delete this event?
            </ModalHeader>
            <ModalCloseButton />

            <ModalFooter>
              <Button
                colorScheme="blue"
                onClick={() => {
                  dispatch(deleteEvent(currentId)).then(() => {
                    dispatch(fetchEvents());
                    onClose();
                  });
                }}
              >
                Yes
              </Button>{" "}
              &nbsp;
              <Button colorScheme="red" onClick={onClose}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Container>
    );
  }
  return (
    <Container>
      <Box display="flex" gap={3} alignItems="center" height={30}>
        <Text fontSize="3xl" fontWeight={600} color="white">
          Loading
        </Text>
        <Spinner size="lg" color="white" />
      </Box>
    </Container>
  );
};

export default Events;
