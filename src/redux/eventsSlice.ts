import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import * as api from "../api";

export interface EventState {
  event: Array<object>;
}

const initialState: EventState = {
  event: [],
};

export const fetchEvents = createAsyncThunk("events", async () => {
  const { data } = await api.fetchEvents();
  console.log("gandu", data);
  return data;
});

export const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchEvents.fulfilled, (state, action) => {
      // Add user to the state array
      // state.event.pop();
      state.event.push(action.payload);
    });
  },
});

// Action creators are generated for each case reducer function
// export const { fetchEvents } = eventsSlice.actions;

export default eventsSlice.reducer;
