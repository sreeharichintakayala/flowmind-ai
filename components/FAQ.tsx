"use client";

import { m } from "framer-motion";

export default function FAQ() {
  return (
    <section className="px-4 md:px-6 py-32 bg-black">
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold">
          Frequently Asked Questions
        </h2>

        <p className="text-gray-400 mt-6 text-lg">
          Everything you need to know about FlowMind AI.
        </p>
      </div>

      <div className="max-w-4xl mx-auto mt-20 space-y-6">
        <m.div
          whileHover={{ scale: 1.01 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur"
        >
          <h3 className="text-xl font-semibold">What is FlowMind AI?</h3>

          <p className="text-gray-400 mt-4">
            FlowMind AI is an AI-powered productivity platform that helps
            businesses automate workflows, manage tasks, and improve
            collaboration.
          </p>
        </m.div>

        <m.div
          whileHover={{ scale: 1.01 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur"
        >
          <h3 className="text-xl font-semibold">
            Can I use it for team collaboration?
          </h3>

          <p className="text-gray-400 mt-4">
            Yes, FlowMind AI is designed for individuals, startups, and
            enterprise teams with collaborative AI workflows.
          </p>
        </m.div>

        <m.div
          whileHover={{ scale: 1.01 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur"
        >
          <h3 className="text-xl font-semibold">
            Does it support automation integrations?
          </h3>

          <p className="text-gray-400 mt-4">
            Absolutely. The platform supports AI-driven automation, workflow
            triggers, analytics, and third-party integrations.
          </p>
        </m.div>
      </div>
    </section>
  );
}
