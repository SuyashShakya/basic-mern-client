import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import * as api from "../api";

export interface EventState {
  events: Array<object>;
  event: object;
}

const initialState: EventState = {
  events: [],
  event: {},
};

export const fetchEvents = createAsyncThunk("events", async () => {
  try {
    const { data } = await api.fetchEvents();
    console.log("geda", data);
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
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
        console.log(error.message);
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
      console.log(error.message);
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
        console.log(error.message);
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
        console.log(error.message);
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
        console.log(error.message);
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
        console.log(error.message);
      }
    }
  }
);

export const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchEvents.fulfilled, (state, action) => {
      // Add user to the state array
      // state.event.pop();
      console.log("geda", action.payload);
      state.events = [...action.payload];
    });
    builder.addCase(createEvents.fulfilled, () => {
      // Add user to the state array
      // state.event.pop();
      return;
    });
    builder.addCase(fetchEvent.fulfilled, (state, action) => {
      // Add user to the state array
      // state.event.pop();
      state.event = action.payload;
    });
    builder.addCase(updateEvent.fulfilled, () => {
      return;
    });
    builder.addCase(deleteEvent.fulfilled, () => {
      return;
    });
    builder.addCase(upvoteEvent.fulfilled, () => {
      return;
    });
    builder.addCase(downvoteEvent.fulfilled, () => {
      return;
    });
  },
});

// Action creators are generated for each case reducer function
// export const { fetchEvents } = eventsSlice.actions;

export default eventsSlice.reducer;
