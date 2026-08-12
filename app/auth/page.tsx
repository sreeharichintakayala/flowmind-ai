"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { GoogleLogin } from "@react-oauth/google";
import { CredentialResponse } from "@react-oauth/google";
export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [onError, setOnError] = useState("");
  const handleGoogleLogin = async (credentialResponse: CredentialResponse) => {
    try {
      const response = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          credential: credentialResponse.credential,
        }),
      });

      const data = await response.json();

      if (data.token) {
        localStorage.setItem("token", data.token);
        router.push("/dashboard");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogin = async (e: any) => {
    console.log("Login Clicked");
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Login Failed");
      }
      localStorage.setItem("token", data.token);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  const handleRegister = async () => {
    console.log("Register clicked");
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Registration Failed");
      }
      router.push(`/verify-otp?email=${encodeURIComponent(data.user.email)}`);

      // router.push("/login");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-black">
      {/* Left Section */}
      <div className="relative hidden flex-1 overflow-hidden bg-black lg:block">
        {/* <div
          className="absolute top-20 left-20 z-50"
          style={{
            width: "300px",
            height: "300px",
            background: "red",
          }} */}
        {/* ></div> */}
        {/* <div className="absolute inset-0 bg-red-500 z-50">TEST</div> */}
        {/* <div className="absolute top-20 left-40 h-[600px] w-[600px] rounded-full bg-purple-600/20 blur-[150px]" />

        <div className="absolute bottom-0 -right-40 h-[600px] w-[600px] rounded-full bg-blue-600/20 blur-[150px]" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(168,85,247,0.2),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.2),transparent_40%)]" /> */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 20% 20%, rgba(168,85,247,0.4), transparent 40%), radial-gradient(circle at 80% 80%, rgba(59,130,246,0.4), transparent 40%)",
          }}
        />
        <div className="absolute top-8 left-8 z-20">
          <h1 className="text-2xl font-bold text-white">FlowMind AI</h1>
        </div>
        <div className="relative z-10 flex h-full flex-col justify-center px-16 mt-12">
          <div className="inline-flex w-fit items-center rounded-full border border-slate-700 bg-slate-900/60 px-5 py-2 text-slate-300 backdrop-blur-sm">
            🚀 AI-Powered Productivity Platform
          </div>

          <h1 className="mt-8 text-5xl lg:text-6xl font-extrabold leading-tight">
            <span className="text-white">Automate Your</span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Workflow With AI
            </span>
          </h1>
          {/* <h1 className="text-6xl font-bold leading-tight">
            <span className="text-white">Automate Your</span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Workflow With AI
            </span>
          </h1> */}
          <p className="mt-8 max-w-2xl text-xl text-slate-400">
            Plan projects, generate tasks, track progress and boost productivity
            with intelligent AI workflows.
          </p>

          <div className="mt-12 flex gap-6 ">
            <div
              className="rounded-2xl border border-slate-800 bg-black/20 p-8
             hover:border-purple-500/50
             hover:shadow-purple-500/20
             transition-all duration-300"
            >
              <h3 className="text-3xl font-bold text-white">10K+</h3>
              <p className="text-slate-400">Projects Created</p>
            </div>

            {/* <div
              className="rounded-2xl border border-slate-800 bg-black/20 p-8
             hover:border-blue-500/50
             hover:shadow-blue-500/20
             transition-all duration-300"
            > */}
            <div
              className="
    rounded-2xl
    border
    border-slate-800
    p-8
    transition-all
    duration-300
    hover:border-purple-500
    hover:shadow-[0_0_40px_rgba(168,85,247,0.5)]
  "
            >
              <h3 className="text-3xl font-bold text-white">98%</h3>
              <p className="text-slate-400">Productivity Boost</p>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="flex-1 relative overflow-hidden bg-black">
        <h1 className="text-white text-6xl">LEFT SIDE</h1>
      </div> */}
      {/* Right Section */}
      <div className="w-full lg:w-[500px] flex shrink-0 items-center justify-center p-4 sm:p-8 bg-slate-950/80 border border-slate-800">
        <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-xl sm:p-10">
          {/* <AnimatePresence mode="wait"> */}
          {isLogin ? (
            <>
              <h1 className="text-3xl font-bold mb-6 text-white">
                Welcome Back
              </h1>

              <div className="mb-6">
                <GoogleLogin
                  onSuccess={handleGoogleLogin}
                  onError={() => console.log("Login Failed")}
                />
              </div>
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-700"></div>
                </div>

                <div className="relative flex justify-center">
                  <span className="bg-black px-4 text-slate-400 text-sm">
                    OR CONTINUE WITH EMAIL
                  </span>
                </div>
              </div>
              <input
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full text-white border p-3 rounded-lg mb-4 placeholder:text-slate-500"
              />

              <input
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full text-white border p-3 rounded-lg mb-4 placeholder:text-slate-500"
              />
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <button
                className="w-full bg-blue-600 text-white p-3 rounded-lg"
                onClick={handleLogin}
              >
                Login
              </button>

              <p className="mt-4 text-center text-slate-400">
                Don't have an account?
                <button
                  onClick={() => setIsLogin(false)}
                  className="ml-2 text-blue-400 cursor-pointer"
                >
                  Register
                </button>
              </p>
            </>
          ) : (
            <motion.div
              key="register"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.3 }}
            >
              <h1 className="text-3xl font-bold mb-6 text-white">
                Create Account
              </h1>

              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                className="w-full text-white border p-3 rounded-lg mb-4 placeholder:text-slate-500"
              />

              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full text-white border p-3 rounded-lg mb-4 placeholder:text-slate-500"
              />

              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                type="password"
                className="w-full text-white border p-3 rounded-lg mb-4 placeholder:text-slate-500"
              />
              {error && <p className="text-sm text-red-500">{error}</p>}
              <button
                type="submit"
                className="w-full cursor-pointer bg-green-600 text-white p-3 rounded-lg"
                onClick={handleRegister}
              >
                Register
              </button>

              <p className="mt-4 text-center text-slate-700">
                Already have an account?
                <button
                  onClick={() => setIsLogin(true)}
                  className="ml-2 text-blue-600"
                >
                  Login
                </button>
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
