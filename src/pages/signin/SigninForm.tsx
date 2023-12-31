import React, { useState } from "react";
import { API_ENDPOINT } from "../../config/constants";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";

export interface ApiResponse {
  auth_token: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
}

const SigninForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch(`${API_ENDPOINT}/users/sign_in`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Sign-in failed");
      }

      console.log("Sign-in successful");

      const data = (await response.json()) as ApiResponse;
      // console.log("data",data)
      // console.log("data",data.user)
      localStorage.setItem("authToken", data.auth_token);
      localStorage.setItem("userData", JSON.stringify(data.user));
      navigate("/home");
    } catch (error: any) {
      setError(error.message);
      console.error("Sign-in failed:", error);
    }
  };

  return (
    <div>
      <form onSubmit={(event) => void handleSubmit(event)}>
        {error && (
          <div className="bg-red-200 text-red-800 p-2 rounded-md mb-4">
            {error}
          </div>
        )}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Email:
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Password:
          </label>
          <input
            type="password"
            name="password"
            id="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-gray mt-4"
        >
          Sign In
        </button>
      </form>
      <Link to={`/signup`}>
        <button
          id="signupbtn"
          className="rounded-md bg-blue-600 px-4 py-2 m-2 text-sm font-medium text-white hover:bg-opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          For SignUp
        </button>
      </Link>
    </div>
  );
};

export default SigninForm;
