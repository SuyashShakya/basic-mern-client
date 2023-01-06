import axios from "axios";
import { FormDataType } from "../components/EventForm";

const url = "http://localhost:5000";

export interface NewEventType extends Omit<FormDataType, "tags"> {
  tags?: string[];
  selectedFiles?: string;
  upvote?: number;
  downvote?: number;
  likes?: string[];
}

export interface ISignup {
  email?: string;
  password?: string;
  confirmPassword?: string;
  firstName?: string;
  lastName?: string;
}

export interface ISignin {
  email?: string;
  password?: string;
}

const API = axios.create({ baseURL: url });

API.interceptors.request.use((req) => {
  const profile = localStorage.getItem("profile");
  if (profile) {
    const token = JSON.parse(profile)?.data?.token;
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const fetchEvents = () => API.get("/posts");

export const createEvents = (newEvent: NewEventType) =>
  API.post("/posts", newEvent);

export const fetchEvent = (id: string) => API.get(`posts/${id}`);

export const updateEvent = (id: string, updatedEvent: NewEventType) =>
  API.patch(`posts/${id}`, updatedEvent);

export const deleteEvent = (id: string) => API.delete(`posts/${id}`);

export const likeEvent = (id: string) => API.patch(`posts/like/${id}`);

export const upvoteEvent = (id: string) => API.patch(`posts/upvote/${id}`);

export const downvoteEvent = (id: string) => API.patch(`posts/downvote/${id}`);

// export const signIn = (formData) => API.post("/user/signin", formData);
export const signIn = (formData: ISignin) => API.post("/user/signin", formData);
export const signUp = (formData: ISignup) => API.post("/user/signup", formData);
