import React, { useState } from "react";
import { API_ENDPOINT } from "../../config/constants";
import { useNavigate } from "react-router-dom";



export interface ApiResponse {
    auth_token: string;
    user: {
      id: number;
      name: string;
      email: string;
    };
  }


const ChangePasswordForm: React.FC = () => {
  const [current_password, setCurrentPassword] = useState("");
  const [new_password, setNewPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const authToken = localStorage.getItem("authToken");
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch(`${API_ENDPOINT}/user/password`, {
        method: "PATCH",
        headers: {
            "Authorization": `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        
        body: JSON.stringify({ current_password, new_password }),
      });

      if (!response.ok) {
        throw new Error("Update password failed");
      }

      console.log("Password updated successfully");

      navigate("/home");
    } catch (error:any) {
      setError(error.message);
      console.error("update password failed:", error);
    }
  };

  return (
    <div>
    <form  onSubmit={ (event) => void handleSubmit(event)}>
    {error && (
          <div className="bg-red-200 text-red-800 p-2 rounded-md mb-4">
            {error}
          </div>
        )}
      <div>
        <label className="block text-gray-700 font-semibold mb-2">Current Password:</label>
        <input
          type="password"
          name="currentpassword"
          id="currentpassword"
          value={current_password}
          required
          onChange={(e) => setCurrentPassword(e.target.value)}
          className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
        />
      </div>
      <div>
        <label className="block text-gray-700 font-semibold mb-2">
          New Password:
        </label>
        <input
          type="password"
          name="newpassword"
          id="newpassword"
          required
          value={new_password}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-gray mt-4"
      >
        Change Password
      </button>
    </form>
   
    </div>

  );
};

export default ChangePasswordForm;
