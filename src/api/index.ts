import axios from "axios";
import { FormDataType } from "../components/EventForm";

const url = "https://events-project-demo.herokuapp.com/posts";

export interface NewEventType extends Omit<FormDataType, "tags"> {
  tags?: string[];
  selectedFiles?: string;
  upvote?: number;
  downvote?: number;
}

export const fetchEvents = () => axios.get(url);

export const createEvents = (newEvent: NewEventType) =>
  axios.post(url, newEvent);

export const fetchEvent = (id: string) => axios.get(`${url}/${id}`);

export const updateEvent = (id: string, updatedEvent: NewEventType) =>
  axios.patch(`${url}/${id}`, updatedEvent);

export const deleteEvent = (id: string) => axios.delete(`${url}/${id}`);

export const upvoteEvent = (id: string) => axios.patch(`${url}/upvote/${id}`);

export const downvoteEvent = (id: string) =>
  axios.patch(`${url}/downvote/${id}`);
