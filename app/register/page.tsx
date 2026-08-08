"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { redirect } from "next/navigation";
export default function RegisterPage() {
  redirect("/auth");
}

// export default function RegisterPage() {
//   const router = useRouter();

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleRegister = async (e: React.SubmitEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");
//     try {
//       const res = await fetch("/api/auth/register", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           name,
//           email,
//           password,
//         }),
//       });
//       const data = await res.json();
//       if (!res.ok) {
//         throw new Error(data.error || "Registration failed");
//       }
//       router.push("/login");
//     } catch (err: any) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-slate-100">
//       <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
//         <h1 className="text-4xl font-bold text-gray-900 text-center mb-8">
//           FlowMind AI
//         </h1>

//         <form onSubmit={handleRegister} className="space-y-4">
//           <input
//             type="text"
//             placeholder="Name"
//             className="w-full rounded-lg border border-gray-300 px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />

//           <input
//             type="email"
//             placeholder="Email"
//             className="w-full rounded-lg border border-gray-300 px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />

//           <input
//             type="password"
//             placeholder="Password"
//             className="w-full rounded-lg border border-gray-300 px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />

//           {error && <p className="text-sm text-red-500">{error}</p>}

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full rounded-lg bg-black p-3 text-white hover:bg-gray-800"
//           >
//             {loading ? "Creating Account..." : "Create Account"}
//           </button>
//         </form>

//         <p className="mt-4 text-center text-sm text-slate-900">
//           Already have an account?{" "}
//           <a href="/login" className="font-semibold text-blue-600">
//             Login
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// }
