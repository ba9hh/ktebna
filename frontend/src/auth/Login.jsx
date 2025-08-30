import React, { useContext } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { AuthContext } from "../AuthProvider";

const Login = () => {
  const { handleGoogleLogin } = useContext(AuthContext);
  return (
    <div className="absolute inset-0 flex flex-col flex-1 justify-center items-center w-full sm:bg-[#f5f5f5] bg-white gap-6">
      <div className="w-[26%] bg-white rounded-md shadow-md hover:bg-gray-100 cursor-pointer">
        <GoogleLogin
          onSuccess={(res) => handleGoogleLogin(res)}
          onError={() => {
            console.log("Login Failed");
          }}
          className="w-full h-full"
        />
      </div>
    </div>
  );
};

export default Login;
