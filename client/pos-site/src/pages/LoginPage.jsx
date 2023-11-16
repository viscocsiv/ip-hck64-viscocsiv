import { useNavigate } from "react-router-dom";
import url from "../../constants";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

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
      <div className="main-container" id="login-container">
        <form id="login-form" className="wrapper-col" onSubmit={handleLogin}>
          <h1>Login to CMS</h1>
          <div className="wrapper-col input-container">
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
            <button id="login-btn" className="submit-btn">
              LOGIN
            </button>
          </div>
        </form>
      </div>
    </>
  );
}