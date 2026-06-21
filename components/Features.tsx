"use client";

import { m } from "framer-motion";

export default function Features() {
  const cardTransition = { type: "spring" as const, stiffness: 200 };

  return (
    <section className="px-4 md:px-6 py-32 bg-black">
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold">Powerful AI Features</h2>

        <p className="text-gray-400 mt-6 text-lg">
          Everything your team needs to automate workflows, improve
          productivity, and scale operations using AI.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 max-w-6xl mx-auto">
        <m.div
          whileHover={{
            y: -10,
            scale: 1.03,
          }}
          transition={cardTransition}
          className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition"
        >
          <h3 className="text-2xl font-semibold">AI Workflow Automation</h3>

          <p className="text-gray-400 mt-4">
            Automate repetitive tasks and optimize business processes with
            intelligent AI agents.
          </p>
        </m.div>

        <m.div
          whileHover={{
            y: -10,
            scale: 1.03,
          }}
          transition={cardTransition}
          className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition"
        >
          <h3 className="text-2xl font-semibold">Smart Analytics</h3>

          <p className="text-gray-400 mt-4">
            Gain actionable insights using real-time analytics and predictive
            AI-powered reports.
          </p>
        </m.div>

        <m.div
          whileHover={{
            y: -10,
            scale: 1.03,
          }}
          transition={cardTransition}
          className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition"
        >
          <h3 className="text-2xl font-semibold">AI Assistant</h3>

          <p className="text-gray-400 mt-4">
            Interact with an intelligent assistant that helps manage tasks,
            content, and communication.
          </p>
        </m.div>
      </div>
    </section>
  );
}
