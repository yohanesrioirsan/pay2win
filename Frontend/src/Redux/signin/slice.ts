import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import auth from "../../utility/auth";

const signinSlice = createSlice({
  name: "signin",
  initialState: {
    username: auth.getAuth() ?? null,
  },
  reducers: {
    loginStart(state) {
      state.username = null;
    },
    loginSuccess(state, action) {
      state.username = action.payload;
      toast.success("Anda Berhasil Login", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
      });
      auth.setAuth(action.payload);
    },
    loginFailed(state) {
      state.username = null;
    },
  },
});

export const { loginStart, loginSuccess, loginFailed } = signinSlice.actions;

export default signinSlice.reducer;
