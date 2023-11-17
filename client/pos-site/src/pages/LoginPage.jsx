import { useNavigate } from "react-router-dom";
import url from "../../constants";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import GoogleLoginButton from "../components/GoogleLoginButton";
import loginImage from "../assets/login-background.svg"

export default function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm(() => {
      return {
        ...form,
        [name]: value,
      };
    });
  };
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post(url + "/login", form);
      
      localStorage.access_token = data.access_token;
      return navigate("/");
    } catch (error) {
      toast.error(error.response.data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  return (
    <>
      <div className="grid grid-cols-2">
        <form
          className="rounded-xl flex flex-col p-14 m-16 items-center gap-20 bg-violet-950"
          onSubmit={handleLogin}
        >
          <div className="m-4">
            <h1 className="text-lg">Welcome to MyGroceries POS</h1>
          </div>
          <div className="flex flex-col gap-10 w-full items-center">
            <input
              type="text"
              placeholder="Email"
              className="input input-bordered w-full"
              name="email"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              className="input input-bordered w-full"
              name="password"
              onChange={handleChange}
            />
            <button className="btn bg-lime-500 hover:bg-lime-700 w-full max-w-xs">
              Login
            </button>
          </div>
          <div className="flex flex-col items-center w-full gap-4">
            <hr className="w-full" />
            <p>Or continue with</p>
            <GoogleLoginButton />
          </div>
        </form>
        <div className="p-14 flex justify-center bg-gradient-to-r from-violet-500 to-fuchsia-500">
          <img src={loginImage} alt="" />
        </div>
      </div>
    </>
  );
}
