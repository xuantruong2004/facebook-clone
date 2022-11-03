import React, { useState } from "react";
import Login from "../../components/Form/Login";
import SignUp from "../../components/Form/SignUp";
import "./Auth.scss";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="Auth">
      <div className="AuthContainer">
        <div className="AuthLeft">
          <h1>Facebook</h1>
          <p>facebook ket noi cuoc song ket noi moi nguoi</p>
        </div>

        <div className="AuthRight">
          {isLogin ? (
            <Login setIsLogin={setIsLogin} />
          ) : (
            <SignUp setIsLogin={setIsLogin} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
