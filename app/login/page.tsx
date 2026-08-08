"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { redirect } from "next/navigation";

export default function LoginPage() {
  redirect("/auth");
}
// export default function LoginPage() {
//   const router = useRouter();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleLogin = async (e: any) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     try {
//       const res = await fetch("/api/auth/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           email,
//           password,
//         }),
//       });
//       const data = await res.json();
//       if (!res.ok) {
//         throw new Error(data.error || "Login failed");
//       }
//       localStorage.setItem("token", data.token);
//       router.push("/dashboard");
//     } catch (err: any) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-slate-100">
//       <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
//         <h1 className="mb-8 text-center text-5xl font-bold text-slate-900">
//           FlowMind AI
//         </h1>

//         <form onSubmit={handleLogin} className="space-y-6">
//           <input
//             type="email"
//             placeholder="Email"
//             className="w-full rounded-xl border border-gray-300 px-4 py-4 text-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />

//           <input
//             type="password"
//             placeholder="Password"
//             className="w-full rounded-xl border border-gray-300 px-4 py-4 text-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />

//           {error && <p className="text-red-500 text-sm">{error}</p>}

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full rounded-xl bg-black py-4 text-xl font-semibold text-white transition hover:bg-gray-800"
//           >
//             {loading ? "Signing In..." : "Login"}
//           </button>
//         </form>

//         <p className="mt-6 text-center text-gray-600">
//           Don't have an account?{" "}
//           <a
//             href="/register"
//             className="font-semibold text-blue-600 hover:underline"
//           >
//             Register
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// }
