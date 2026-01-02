import { useLocation, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import api from "../lib/axios";
import toast from "react-hot-toast";

export default function VerifyOtp() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  // 🔒 Protect page refresh
  useEffect(() => {
    if (!state?.email) {
      navigate("/signin");
    }
  }, [state, navigate]);

  // ⏳ Cooldown timer
  useEffect(() => {
    if (cooldown === 0) return;

    const timer = setTimeout(() => {
      setCooldown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [cooldown]);

  const handleVerify = async () => {
    try {
      setLoading(true);

      const res = await api.post("/users/verify-otp", {
        email: state.email,
        otp,
      });

      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      setResendLoading(true);

      await api.post("/users/resend-otp", {
        email: state.email,
      });

      toast.success("OTP resent to your email");
      setCooldown(60); // ⏱ 60 seconds cooldown
    } catch {
      toast.error("Failed to resend OTP");
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200">
      <div className="card w-96 bg-base-100 shadow">
        <div className="card-body">
          <h2 className="text-xl font-bold text-center">
            Verify OTP
          </h2>

          <input
            className="input input-bordered w-full"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />

          <button
            className="btn btn-primary mt-4 w-full"
            onClick={handleVerify}
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>

          {/* 🔁 Resend OTP */}
          <button
            className="btn btn-link mt-2"
            onClick={handleResendOtp}
            disabled={resendLoading || cooldown > 0}
          >
            {cooldown > 0
              ? `Resend OTP in ${cooldown}s`
              : "Resend OTP"}
          </button>
        </div>
      </div>
    </div>
  );
}
