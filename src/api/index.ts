import axios from "axios";
import { FormDataType } from "../components/EventForm";

const url = "http://localhost:5000/posts";

export interface NewEventType extends FormDataType {
  tags: string[];
  selectedFiles: string;
}

export const fetchEvents = () => axios.get(url);
export const createEvents = (newEvent: NewEventType) =>
  axios.post(url, newEvent);
