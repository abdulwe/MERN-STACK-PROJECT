import React, { useState } from "react";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { useNavigate } from "react-router";
import api from "../lib/axios"; // your axios instance
import toast from "react-hot-toast";

export default function SigninForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      // Call backend API
      const response = await api.post("/users/signin", {
        email: formData.email,
        password: formData.password,
      });

      // Save JWT to localStorage
      localStorage.setItem("token", response.data.token);

      toast.success(response.data.message || "Check Your Email For OTP");

      // Navigate to dashboard
      navigate("/", { state: { email: formData.email } });
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200 p-4">
      <div className="card w-full max-w-md shadow-2xl bg-white border border-primary rounded-lg">
        <div className="card-body">
          <h2 className="text-3xl font-bold text-center text-primary mb-6">
            Sign In
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Email</span>
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input input-bordered input-primary w-full"
                required
              />
            </div>

            {/* Password */}
            <div className="form-control relative">
              <label className="label">
                <span className="label-text font-semibold">Password</span>
              </label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="input input-bordered input-primary w-full pr-10"
                required
              />
              <span
                className="absolute right-3 top-12 cursor-pointer text-xl text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <HiEyeOff /> : <HiEye />}
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={`btn btn-primary w-full mt-4 ${loading ? "loading" : ""}`}
              disabled={loading}
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <p className="text-center mt-4 text-sm">
            Don't have an account?{" "}
            <a href="/signup" className="text-primary font-semibold hover:underline">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
