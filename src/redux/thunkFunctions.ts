import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const userSignin = createAsyncThunk(
  "signin",
  async (signinData: api.ISignin) => {
    try {
      const data = await api.signIn(signinData);
      localStorage.setItem("profile", JSON.stringify({ ...data }));
      return data;
    } catch (error) {
      if (error instanceof Error) {
        return error;
      }
    }
  }
);

export const userSignup = createAsyncThunk(
  "signup",
  async (signupData: api.ISignup) => {
    try {
      const data = await api.signUp(signupData);
      return data;
    } catch (error) {
      if (error instanceof Error) {
        return error;
      }
    }
  }
);

export const fetchEvents = createAsyncThunk("events", async () => {
  try {
    const { data } = await api.fetchEvents();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
});

export const createEvents = createAsyncThunk(
  "create-events",
  async (newEvent: api.NewEventType) => {
    try {
      const { data } = await api.createEvents(newEvent);
      return data;
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }
);

export const fetchEvent = createAsyncThunk("event", async (id: string) => {
  try {
    const { data } = await api.fetchEvent(id);
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
});

export const updateEvent = createAsyncThunk(
  "update-event",
  async ({
    id,
    updatedData,
  }: {
    id: string;
    updatedData: api.NewEventType;
  }) => {
    try {
      const { data } = await api.updateEvent(id, updatedData);
      return data;
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }
);

export const deleteEvent = createAsyncThunk(
  "delete-event",
  async (id: string) => {
    try {
      const { data } = await api.deleteEvent(id);
      return data;
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }
);

export const upvoteEvent = createAsyncThunk(
  "upvote-event",
  async (id: string) => {
    try {
      const { data } = await api.upvoteEvent(id);
      return data;
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }
);

export const downvoteEvent = createAsyncThunk(
  "downvote-event",
  async (id: string) => {
    try {
      const { data } = await api.downvoteEvent(id);
      return data;
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }
);

export const likeEvent = createAsyncThunk("like-event", async (id: string) => {
  try {
    const { data } = await api.likeEvent(id);
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
});
