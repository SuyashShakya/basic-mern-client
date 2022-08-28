import React from "react";
import isArray from "lodash/isArray";
import { Box } from "@chakra-ui/react";

import EventsBackground from "../assets/svgs/protruding-squares.svg";
import Event from "./Event";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { fetchEvents } from "../redux/eventsSlice";

const Events = () => {
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(fetchEvents());
  }, []);
  const eventData = useAppSelector((state) => state);
  const events = eventData?.events?.event?.[0];
  console.log("events", events);
  return (
    <Box
      display="flex"
      gap={5}
      p={5}
      mt="50px"
      minH="100vh"
      bgImage={EventsBackground}
    >
      {isArray(events) &&
        events?.map((item, index) => (
          <Event
            key={index}
            title={item?.title}
            creator={item?.creator}
            image={item?.selectedFiles}
            message={item?.message}
            tags={item?.tags}
            createdAt={item?.createdAt}
          />
        ))}
    </Box>
  );
};

export default Events;
