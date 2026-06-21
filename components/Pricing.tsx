"use client";

import { m } from "framer-motion";

export default function Pricing() {
  const cardTransition = { type: "spring" as const, stiffness: 200 };

  return (
    <section className="px-4 md:px-6 py-32 bg-black">
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold">Simple Pricing</h2>

        <p className="text-gray-400 mt-6 text-lg">
          Flexible plans designed for startups, teams, and enterprises.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-20 max-w-6xl mx-auto">
        {/* Starter Plan */}
        <m.div
          whileHover={{
            y: -10,
            scale: 1.03,
          }}
          transition={cardTransition}
          className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur hover:border-purple-500/40 hover:shadow-purple-500/20 hover:shadow-2xl transition duration-300"
        >
          <h3 className="text-2xl font-semibold">Starter</h3>

          <p className="text-gray-400 mt-4">
            Perfect for individuals and small teams.
          </p>

          <div className="mt-8">
            <span className="text-4xl md:text-5xl font-bold">$19</span>
            <span className="text-gray-400">/month</span>
          </div>

          <ul className="mt-8 space-y-4 text-gray-300">
            <li>✔ AI Task Automation</li>
            <li>✔ Basic Analytics</li>
            <li>✔ Workflow Templates</li>
            <li>✔ Email Support</li>
          </ul>

          <button className="w-full mt-10 bg-white text-black py-3 rounded-2xl font-semibold hover:shadow-purple-500/20 hover:shadow-xl transition">
            Get Started
          </button>
        </m.div>

        {/* Pro Plan */}
        <m.div
          whileHover={{
            y: -10,
            scale: 1.05,
          }}
          transition={cardTransition}
          className="relative bg-gradient-to-b from-purple-500/20 to-blue-500/10 border border-purple-500/30 rounded-3xl p-8 backdrop-blur shadow-2xl hover:border-purple-500/40 hover:shadow-purple-500/20 hover:shadow-2xl transition duration-300"
        >
          <div className="absolute top-4 right-4 bg-purple-500 text-white text-xs px-3 py-1 rounded-full">
            Most Popular
          </div>

          <h3 className="text-2xl font-semibold">Pro</h3>

          <p className="text-gray-300 mt-4">
            Advanced AI tools for scaling businesses.
          </p>

          <div className="mt-8">
            <span className="text-4xl md:text-5xl font-bold">$49</span>
            <span className="text-gray-300">/month</span>
          </div>

          <ul className="mt-8 space-y-4 text-gray-200">
            <li>✔ Everything in Starter</li>
            <li>✔ Advanced AI Analytics</li>
            <li>✔ Smart Automation Agents</li>
            <li>✔ Priority Support</li>
          </ul>

          <button className="w-full mt-10 bg-white text-black py-3 rounded-2xl font-semibold hover:shadow-purple-500/20 hover:shadow-xl transition">
            Start Free Trial
          </button>
        </m.div>

        {/* Enterprise Plan */}
        <m.div
          whileHover={{
            y: -10,
            scale: 1.03,
          }}
          transition={cardTransition}
          className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur hover:border-purple-500/40 hover:shadow-purple-500/20 hover:shadow-2xl transition duration-300"
        >
          <h3 className="text-2xl font-semibold">Enterprise</h3>

          <p className="text-gray-400 mt-4">
            Tailored AI solutions for large organizations.
          </p>

          <div className="mt-8">
            <span className="text-4xl md:text-5xl font-bold">$99</span>
            <span className="text-gray-400">/month</span>
          </div>

          <ul className="mt-8 space-y-4 text-gray-300">
            <li>✔ Unlimited AI Workflows</li>
            <li>✔ Dedicated AI Consultant</li>
            <li>✔ Enterprise Security</li>
            <li>✔ 24/7 Premium Support</li>
          </ul>

          <button className="w-full mt-10 border border-white/20 py-3 rounded-2xl font-semibold hover:bg-white/10 hover:shadow-purple-500/20 hover:shadow-xl transition">
            Contact Sales
          </button>
        </m.div>
      </div>
    </section>
  );
}
