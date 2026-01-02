import React, { useState } from "react";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { useNavigate } from "react-router";
import api from "../lib/axios"; // your axios instance
import toast from "react-hot-toast";

export default function SignupForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    whatsAppNumber: "",
    password: "",
    confirmPassword: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate password match
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      // Call backend API
      const response = await api.post("/users/signup", {
        userName: formData.userName,
        email: formData.email,
        whatsAppNumber: formData.whatsAppNumber,
        password: formData.password
      });

      toast.success(response.data.message || "Signup successful");

      // Navigate to login
      navigate("/signin");
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200 p-4">
      <div className="card w-full max-w-md shadow-2xl bg-white border border-primary rounded-lg">
        <div className="card-body">
          <h2 className="text-3xl font-bold text-center text-primary mb-6">
            Create Account
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Username */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Username</span>
              </label>
              <input
                type="text"
                placeholder="Enter your username"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                className="input input-bordered input-primary w-full"
                required
              />
            </div>

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

            {/* WhatsApp */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">WhatsApp Number</span>
              </label>
              <input
                type="text"
                placeholder="Enter your WhatsApp number"
                name="whatsAppNumber"
                value={formData.whatsAppNumber}
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

            {/* Confirm Password */}
            <div className="form-control relative">
              <label className="label">
                <span className="label-text font-semibold">Confirm Password</span>
              </label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="input input-bordered input-primary w-full pr-10"
                required
              />
              <span
                className="absolute right-3 top-12 cursor-pointer text-xl text-gray-600"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <HiEyeOff /> : <HiEye />}
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={`btn btn-primary w-full mt-4 ${loading ? "loading" : ""}`}
              disabled={loading}
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </form>

          <p className="text-center mt-4 text-sm">
            Already have an account?{" "}
            <a href="/signin" className="text-primary font-semibold hover:underline">
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
