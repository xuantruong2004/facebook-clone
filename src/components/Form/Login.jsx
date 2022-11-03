import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logIn } from "../../actions/AuthAction";

const Login = ({ setIsLogin }) => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await dispatch(logIn(data));
      const user = JSON.parse(localStorage.getItem("profile"));
      if (user) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form className="login">
      <h2>Login</h2>
      <div className="info">
        <input
          value={data.email}
          type="text"
          placeholder="email"
          name="email"
          onChange={handleChange}
        />
      </div>
      <div className="info">
        <input
          value={data.password}
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
        />
      </div>
      <p>
        Don't have an account.
        <span onClick={() => setIsLogin((prev) => !prev)}> Sign up!</span>
      </p>
      <button className={loading ? "btn loading" : "btn"} onClick={handleLogin}>
        {loading ? "loading..." : "Login"}
      </button>
    </form>
  );
};

export default Login;
