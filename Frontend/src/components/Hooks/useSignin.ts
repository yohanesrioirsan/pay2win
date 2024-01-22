import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  loginSuccess,
  loginStart,
  loginFailed,
} from "../../Redux/signin/slice";
import axios from "axios";
import { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function useSignin() {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    username: "",
    password: "",
  });

  const dispatch = useDispatch();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      dispatch(loginStart());
      const response = await axios.post(
        "https://pay2win-puce.vercel.app/signin",
        formValues
      );

      console.log(response.data);

      dispatch(loginSuccess(response.data));

      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (error) {
      dispatch(loginFailed());
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.errors || "An error occurred", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "light",
        });
      } else {
        alert("An error occurred");
      }
    }
  };

  return {
    formValues,
    setFormValues,
    handleSubmit,
  };
}

export default useSignin;
