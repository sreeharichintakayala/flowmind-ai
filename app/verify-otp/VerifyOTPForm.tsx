"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import OTPInput from "../components/auth/OTPInput";
export default function VerifyOTPPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const email = searchParams.get("email") || "";

  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleVerify = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          otp: otp.join(""),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error);
        return;
      }

      alert("Email verified successfully!");

      router.push("/login");
    } catch (err) {
      setError("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950">
      <div className="w-full max-w-md rounded-3xl bg-slate-900 p-8 shadow-2xl">
        <h1 className="mb-2 text-center text-3xl font-bold text-white">
          Verify Email
        </h1>

        <p className="mb-8 text-center text-slate-400">
          We've sent a 6-digit OTP to
        </p>

        <p className="mb-8 text-center font-semibold text-blue-400">{email}</p>
        <OTPInput value={otp} onChange={setOtp} />
        {error && <p className="mb-4 text-center text-red-500">{error}</p>}

        <button
          onClick={handleVerify}
          disabled={loading}
          className="w-full rounded-xl bg-blue-600 py-4 font-semibold text-white hover:bg-blue-700"
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>
      </div>
    </div>
  );
}
