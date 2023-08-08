import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface User {
  id: string;
  email: string;
  image: string;
  name: string;
  role: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface GlobalState {
  user: User | null;
}

const initialState: GlobalState = {
  user: null,
};

export const globalSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateUser } = globalSlice.actions;

export default globalSlice.reducer;
