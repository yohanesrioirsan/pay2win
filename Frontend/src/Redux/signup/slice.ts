import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const signupSlice = createSlice({
  name: "signup",
  initialState: {
    username: null,
  },
  reducers: {
    signupStart(state) {
      state.username = null;
    },
    signupSuccess(state, action) {
      state.username = action.payload;
      toast.success("Anda akan diarahkan ke login", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
      });
    },
    signupFailed(state) {
      state.username = null;
    },
  },
});

export const { signupStart, signupSuccess, signupFailed } = signupSlice.actions;

export default signupSlice.reducer;
