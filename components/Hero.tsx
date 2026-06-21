"use client";

import { ArrowRight } from "lucide-react";
import { m } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center text-center px-4 md:px-6 pt-24 md:pt-32 overflow-hidden">
      {/* Gradient Glow Backgrounds */}
      <div className="absolute top-[-150px] left-[-120px] w-[400px] h-[400px] bg-purple-500/30 rounded-full blur-3xl" />
      <div className="absolute top-[50px] right-[-100px] w-[350px] h-[350px] bg-blue-500/30 rounded-full blur-3xl" />
      <div className="absolute bottom-[-120px] w-[500px] h-[300px] bg-cyan-500/20 rounded-full blur-3xl" />

      <div className="relative z-10 flex flex-col items-center">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/10 border border-white/10 rounded-full px-4 py-2 text-sm mb-6 backdrop-blur"
        >
          AI-Powered Productivity Platform
        </m.div>

        <m.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold max-w-3xl leading-tight"
        >
          Automate Your Workflow With Intelligent AI
        </m.h1>

        <m.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-gray-400 text-lg mt-6 max-w-2xl"
        >
          Streamline tasks, manage projects, generate content, and boost team
          productivity with next-generation AI automation tools.
        </m.p>

        <m.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex gap-4 mt-10"
        >
          <button className="flex flex-col sm:flex-row gap-4 mt-10 w-full sm:w-auto bg-white text-black px-6 py-3 rounded-full font-semibold items-center gap-2 hover:scale-105 transition hover:shadow-purple-500/20 hover:shadow-xl">
            Start Free Trial
            <ArrowRight size={18} />
          </button>

          <button className="flex flex-col sm:flex-row gap-4 mt-10 w-full sm:w-auto border border-white/20 px-6 py-3 rounded-full hover:bg-white/10 transition hover:shadow-purple-500/20 hover:shadow-xl">
            Watch Demo
          </button>
        </m.div>

        {/* Dashboard Mockup */}
        <m.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          whileHover={{ scale: 1.01 }}
          className="mt-20 w-full max-w-5xl rounded-3xl border border-white/10 bg-white/5 backdrop-blur p-8 shadow-2xl relative"
        >
          {/* Floating Dashboard glow */}
          <div className="absolute top-10 right-10 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-10 left-10 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <m.div
              whileHover={{
                y: -8,
                scale: 1.03,
              }}
              transition={{ type: "spring", stiffness: 200 }}
              className="bg-black/40 p-6 rounded-2xl border border-white/10"
            >
              <h3 className="text-gray-400">Tasks Automated</h3>
              <p className="text-4xl font-bold mt-4">12K+</p>
            </m.div>

            <m.div
              whileHover={{
                y: -8,
                scale: 1.03,
              }}
              transition={{ type: "spring", stiffness: 200 }}
              className="bg-black/40 p-6 rounded-2xl border border-white/10"
            >
              <h3 className="text-gray-400">Team Productivity</h3>
              <p className="text-4xl font-bold mt-4">87%</p>
            </m.div>

            <m.div
              whileHover={{
                y: -8,
                scale: 1.03,
              }}
              transition={{ type: "spring", stiffness: 200 }}
              className="bg-black/40 p-6 rounded-2xl border border-white/10"
            >
              <h3 className="text-gray-400">AI Workflows</h3>
              <p className="text-4xl font-bold mt-4">350+</p>
            </m.div>
          </div>
        </m.div>
      </div>
    </section>
  );
}
