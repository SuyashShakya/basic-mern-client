import { createSlice } from "@reduxjs/toolkit";
import { userSignin } from "./thunkFunctions";

export interface UserState {
  user?: unknown;
}

const initialState: UserState = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(userSignin.fulfilled, (state, action) => {
      console.log("hello", action.payload);
      state.user = action.payload;
    });
  },
});

// Action creators are generated for each case reducer function
// export const { fetchEvents } = eventsSlice.actions;

export default userSlice.reducer;
