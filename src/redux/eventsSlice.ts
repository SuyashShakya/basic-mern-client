import { createSlice } from "@reduxjs/toolkit";
import { fetchEvent, fetchEvents } from "./thunkFunctions";

export interface EventState {
  events: Array<object> | null;
  event: object;
}

const initialState: EventState = {
  events: null,
  event: {},
};

export const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchEvents.fulfilled, (state, action) => {
      // Add user to the state array
      // state.event.pop();
      state.events = [...action.payload];
    });

    builder.addCase(fetchEvent.fulfilled, (state, action) => {
      // Add user to the state array
      // state.event.pop();
      state.event = action.payload;
    });
  },
});

// Action creators are generated for each case reducer function
// export const { fetchEvents } = eventsSlice.actions;

export default eventsSlice.reducer;
