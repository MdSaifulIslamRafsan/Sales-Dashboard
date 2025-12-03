import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

type TState = {
  token: null | string;
  expire: null | number;
};

const initialState: TState = {
  token: null,
  expire: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { expire, token } = action.payload;
      state.token = token;
      state.expire = expire;
    },
  },
});

export const { setUser} = authSlice.actions;
export default authSlice.reducer;
export const useCurrentToken = (state: RootState) => state.auth.token;
export const selectCurrentExpire = (state: RootState) => state.auth.expire;
