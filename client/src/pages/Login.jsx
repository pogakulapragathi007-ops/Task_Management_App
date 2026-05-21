import { useState } from "react";
import API from "../services/api";

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ✅ LOGIN FUNCTION
  const handleLogin = async () => {

    try {

      const res = await API.post("/auth/login", {
        email,
        password,
      });

      // ✅ SAVE TOKEN
      localStorage.setItem("token", res.data.token);

      alert("Login Successful");

      // ✅ REDIRECT
      window.location.href = "/dashboard";

    } catch (error) {

      console.log(error);

      alert("Login Failed");

    }
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-[#0b0f1a]">

      {/* LOGIN CARD */}
      <div className="card p-8 w-[400px]">

        {/* TITLE */}
        <h1 className="text-4xl font-bold text-rainbow mb-2 text-center">
          Welcome Back
        </h1>

        <p className="text-gray-300 text-center mb-6">
          Login to continue
        </p>

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Enter Email"
          className="w-full mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Enter Password"
          className="w-full mb-6"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* LOGIN BUTTON */}
        <button
          onClick={handleLogin}
          className="btn-rainbow w-full"
        >
          Login
        </button>

      </div>

    </div>
  );
}