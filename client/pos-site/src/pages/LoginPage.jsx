import { useNavigate } from "react-router-dom";
import url from "../../constants";
import { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import GoogleLoginButton from "../components/GoogleLoginButton";
import loginImage from "../assets/login-background.svg";
import AuthContext from "../context/AuthContext";

export default function LoginPage() {
  const navigate = useNavigate();
  const { userId, setUserId } = useContext(AuthContext);
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
      console.log(data);
      localStorage.access_token = data.access_token;
      localStorage.userId = data.userId;
      setUserId(data.userId);
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
      <div className="flex justify-center md:grid grid-cols-2 h-screen">
        <div className="flex items-center justify-center">
          <form
            className="rounded-xl flex flex-col p-2 m-4 items-center gap-10 bg-violet-950 md:w-5/6 xl:w-4/6"
            onSubmit={handleLogin}
          >
            <div className="p-4">
              <h1 className="text-lg">Welcome to MyGroceries POS</h1>
            </div>
            <div className="flex flex-col gap-10 w-full items-center">
              <div>
                <input
                  type="text"
                  placeholder="Email"
                  className="input input-bordered w-full"
                  name="email"
                  onChange={handleChange}
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Password"
                  className="input input-bordered w-full"
                  name="password"
                  onChange={handleChange}
                />
              </div>
              <div>
                <button className="btn bg-lime-500 hover:bg-lime-700 w-full max-w-xs">
                  Login
                </button>
              </div>
            </div>
            <div className="flex flex-col items-center w-full gap-4">
              <hr className="w-4/6" />
              <p>Or continue with</p>
              <GoogleLoginButton />
            </div>
          </form>
        </div>
        <div className="hidden md:flex p-14 justify-center bg-gradient-to-r from-violet-500 to-fuchsia-500">
          <img src={loginImage} alt="" />
        </div>
      </div>
    </>
  );
}
