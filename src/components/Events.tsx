import React from "react";
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
  useDisclosure,
} from "@chakra-ui/react";

import EventsBackground from "../assets/svgs/protruding-squares.svg";
import Event from "./Event";
import { useAppDispatch, useAppSelector } from "../redux/store";
import {
  deleteEvent,
  downvoteEvent,
  fetchEvents,
  upvoteEvent,
} from "../redux/eventsSlice";
import { useNavigate } from "react-router-dom";
import { NewEventType } from "../api";

export interface fetchedEventsType extends NewEventType {
  _id: string;
  createdAt: string;
}
const Events = () => {
  const [currentId, setCurrentId] = React.useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  React.useEffect(() => {
    dispatch(fetchEvents());
  }, []);
  const eventData = useAppSelector((state) => state);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const events = eventData?.events?.events as fetchedEventsType[];
  console.log("hello123", events);
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
      {!isEmpty(events) &&
        events?.map((item, index) => (
          <Event
            key={index}
            title={item?.title}
            creator={item?.creator}
            upvote={item?.upvote}
            downvote={item?.downvote}
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
    </Box>
  );
};

export default Events;
