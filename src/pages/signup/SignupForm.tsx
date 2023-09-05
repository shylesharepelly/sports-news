import React, { useState } from "react";
import { API_ENDPOINT } from "../../config/constants";
import { useNavigate } from "react-router-dom";
import { ApiResponse } from "../signin/SigninForm";

const SignupForm: React.FC = () => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch(`${API_ENDPOINT}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: userName,
          email: userEmail,
          password: userPassword,
        }),
      });

      if (!response.ok) {
        throw new Error("Sign-up failed");
      }
      console.log("Sign-up successful");

      const data = (await response.json()) as ApiResponse;
      localStorage.setItem("authToken", data.auth_token);
      console.log(data.auth_token);
      localStorage.setItem("userData", JSON.stringify(data.user));
      console.log(data);

      navigate("/home");
    } catch (error: any) {
      setError(error.message);
      console.error("Sign-up failed:", error);
    }
  };

  return (
    <form onSubmit={(event) => void handleSubmit(event)}>
      <div className="items-center justify-center ">
        {error && (
          <div className="bg-red-200 text-red-800 p-2 rounded-md mb-4">
            {error}
          </div>
        )}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Your Name:
          </label>
          <input
            type="text"
            name="userName"
            id="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Email:
          </label>
          <input
            type="email"
            name="userEmail"
            id="userEmail"
            value={userEmail}
            required
            onChange={(e) => setUserEmail(e.target.value)}
            className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Password:
          </label>
          <input
            type="password"
            name="userPassword"
            id="userPassword"
            required
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
            className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-gray mt-4"
        >
          Sign up
        </button>
      </div>
    </form>
  );
};
export default SignupForm;
