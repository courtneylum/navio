import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

function Signup() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${apiUrl}/register`, { name, email, password })
      .then((result) => {
        console.log(result);
        navigate("/login");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Sign Up</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-left font-medium mb-1">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter Name"
              autoComplete="off"
              id="name"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-left font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              autoComplete="off"
              id="email"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-left font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              id="password"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition active:bg-green-500"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-sm mt-4">Already have an account?</p>
        <Link
          to="/login"
          className="block mt-2 text-center bg-gray-100 border py-2 rounded hover:bg-gray-200 transition"
        >
          Login
        </Link>
      </div>
    </div>
  );
}

export default Signup;
