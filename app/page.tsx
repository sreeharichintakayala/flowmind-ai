"use client";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-6 border-b border-white/10">
        <h1 className="text-2xl font-bold">FlowMind AI</h1>

        <button className="bg-white text-black px-5 py-2 rounded-full font-medium hover:scale-105 transition hover:shadow-purple-500/20 hover:shadow-xl">
          Get Started
        </button>
      </nav>

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center px-4 md:px-6 pt:24 md:pt-32 overflow-hidden">
        {/* Gradient Glow Backgrounds */}

        <div className="absolute top-[-150px] left-[-120px] w-[400px] h-[400px] bg-purple-500/30 rounded-full blur-3xl" />

        <div className="absolute top-[50px] right-[-100px] w-[350px] h-[350px] bg-blue-500/30 rounded-full blur-3xl" />

        <div className="absolute bottom-[-120px] w-[500px] h-[300px] bg-cyan-500/20 rounded-full blur-3xl" />
        <div className="relative z-10 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white/10 border border-white/10 rounded-full px-4 py-2 text-sm mb-6 backdrop-blur"
          >
            AI-Powered Productivity Platform
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold max-w-3xl leading-tight"
          >
            Automate Your Workflow With Intelligent AI
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-gray-400 text-lg mt-6 max-w-2xl"
          >
            Streamline tasks, manage projects, generate content, and boost team
            productivity with next-generation AI automation tools.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex gap-4 mt-10"
          >
            <button className="flex flex-col sm:flex-row gap-4 mt-10 w-full sm:w-auto bg-white text-black w-full sm:w-auto px-6 py-3 rounded-full font-semibold flex items-center gap-2 hover:scale-105 transition hover:shadow-purple-500/20 hover:shadow-xl">
              Start Free Trial
              <ArrowRight size={18} />
            </button>

            <button className="flex flex-col sm:flex-row gap-4 mt-10 w-full sm:w-auto border border-white/20 w-full sm:w-auto px-6 py-3 rounded-full hover:bg-white/10 transition hover:shadow-purple-500/20 hover:shadow-xl">
              Watch Demo
            </button>
          </motion.div>

          {/* Dashboard Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            whileHover={{ scale: 1.01 }}
            className="mt-20 w-full max-w-5xl rounded-3xl border border-white/10 bg-white/5 backdrop-blur p-8 shadow-2xl"
          >
            {/* Floating Dashboard glow */}
            <div className="absolute top-10 right-10 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-10 left-10 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div
                whileHover={{
                  y: -8,
                  scale: 1.03,
                }}
                transition={{ type: "spring", stiffness: 200 }}
                className="bg-black/40 p-6 rounded-2xl border border-white/10"
              >
                <h3 className="text-gray-400">Tasks Automated</h3>
                <p className="text-4xl font-bold mt-4">12K+</p>
              </motion.div>

              <motion.div
                whileHover={{
                  y: -8,
                  scale: 1.03,
                }}
                transition={{ type: "spring", stiffness: 200 }}
                className="bg-black/40 p-6 rounded-2xl border border-white/10"
              >
                <h3 className="text-gray-400">Team Productivity</h3>
                <p className="text-4xl font-bold mt-4">87%</p>
              </motion.div>

              <motion.div
                whileHover={{
                  y: -8,
                  scale: 1.03,
                }}
                transition={{ type: "spring", stiffness: 200 }}
                className="bg-black/40 p-6 rounded-2xl border border-white/10"
              >
                <h3 className="text-gray-400">AI Workflows</h3>
                <p className="text-4xl font-bold mt-4">350+</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
      {/* Features Section */}

      <section className="px-4 md:px-6 py-32 bg-black">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold">
            Powerful AI Features
          </h2>

          <p className="text-gray-400 mt-6 text-lg">
            Everything your team needs to automate workflows, improve
            productivity, and scale operations using AI.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 max-w-6xl mx-auto">
          <motion.div
            whileHover={{
              y: -10,
              scale: 1.03,
            }}
            transition={{ type: "spring", stiffness: 200 }}
            className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition"
          >
            <h3 className="text-2xl font-semibold">AI Workflow Automation</h3>

            <p className="text-gray-400 mt-4">
              Automate repetitive tasks and optimize business processes with
              intelligent AI agents.
            </p>
          </motion.div>

          <motion.div
            whileHover={{
              y: -10,
              scale: 1.03,
            }}
            transition={{ type: "spring", stiffness: 200 }}
            className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition"
          >
            <h3 className="text-2xl font-semibold">Smart Analytics</h3>

            <p className="text-gray-400 mt-4">
              Gain actionable insights using real-time analytics and predictive
              AI-powered reports.
            </p>
          </motion.div>

          <motion.div
            whileHover={{
              y: -10,
              scale: 1.03,
            }}
            transition={{ type: "spring", stiffness: 200 }}
            className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition"
          >
            <h3 className="text-2xl font-semibold">AI Assistant</h3>

            <p className="text-gray-400 mt-4">
              Interact with an intelligent assistant that helps manage tasks,
              content, and communication.
            </p>
          </motion.div>
        </div>
      </section>
      {/* Testimonials Section */}

      <section className="px-4 md:px-6 py-32 bg-black">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold">
            Trusted by Modern Teams
          </h2>

          <p className="text-gray-400 mt-6 text-lg">
            Thousands of businesses use FlowMind AI to automate workflows,
            improve collaboration, and scale productivity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 max-w-6xl mx-auto">
          <motion.div
            whileHover={{
              y: -10,
              scale: 1.03,
            }}
            transition={{ type: "spring", stiffness: 200 }}
            className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur"
          >
            <p className="text-gray-300 leading-relaxed">
              “FlowMind AI completely transformed how our team handles
              repetitive workflows. Productivity increased instantly.”
            </p>

            <div className="mt-6">
              <h4 className="font-semibold">Sarah Mitchell</h4>
              <p className="text-gray-500 text-sm">Product Manager</p>
            </div>
          </motion.div>

          <motion.div
            whileHover={{
              y: -10,
              scale: 1.03,
            }}
            transition={{ type: "spring", stiffness: 200 }}
            className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur"
          >
            <p className="text-gray-300 leading-relaxed">
              “The AI automation tools saved our company dozens of hours every
              single week. Highly intuitive platform.”
            </p>

            <div className="mt-6">
              <h4 className="font-semibold">David Chen</h4>
              <p className="text-gray-500 text-sm">Startup Founder</p>
            </div>
          </motion.div>

          <motion.div
            whileHover={{
              y: -10,
              scale: 1.03,
            }}
            transition={{ type: "spring", stiffness: 200 }}
            className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur"
          >
            <p className="text-gray-300 leading-relaxed">
              “Beautiful interface, powerful automation, and seamless
              collaboration features. Exactly what modern teams need.”
            </p>

            <div className="mt-6">
              <h4 className="font-semibold">Emily Rodriguez</h4>
              <p className="text-gray-500 text-sm">Operations Lead</p>
            </div>
          </motion.div>
        </div>
      </section>
      {/* Pricing Section */}

      <section className="px-4 md:px-6 py-32 bg-black">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold">Simple Pricing</h2>

          <p className="text-gray-400 mt-6 text-lg">
            Flexible plans designed for startups, teams, and enterprises.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-20 max-w-6xl mx-auto">
          {/* Starter Plan */}
          <motion.div
            whileHover={{
              y: -10,
              scale: 1.03,
            }}
            transition={{ type: "spring", stiffness: 200 }}
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
          </motion.div>

          {/* Pro Plan */}
          <motion.div
            whileHover={{
              y: -10,
              scale: 1.05,
            }}
            transition={{ type: "spring", stiffness: 200 }}
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
          </motion.div>

          {/* Enterprise Plan */}
          <motion.div
            whileHover={{
              y: -10,
              scale: 1.03,
            }}
            transition={{ type: "spring", stiffness: 200 }}
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
          </motion.div>
        </div>
      </section>
      {/* FAQ Section */}

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
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur"
          >
            <h3 className="text-xl font-semibold">What is FlowMind AI?</h3>

            <p className="text-gray-400 mt-4">
              FlowMind AI is an AI-powered productivity platform that helps
              businesses automate workflows, manage tasks, and improve
              collaboration.
            </p>
          </motion.div>

          <motion.div
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
          </motion.div>

          <motion.div
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
          </motion.div>
        </div>
      </section>
      {/* Footer */}

      <footer className="border-t border-white/10 px-4 md:px-6 py-12 bg-black">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-bold">FlowMind AI</h2>

            <p className="text-gray-500 mt-2">
              AI-powered productivity for modern teams.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-gray-400">
            <a href="#" className="hover:text-white transition">
              Features
            </a>

            <a href="#" className="hover:text-white transition">
              Pricing
            </a>

            <a href="#" className="hover:text-white transition">
              FAQ
            </a>

            <a href="#" className="hover:text-white transition">
              Contact
            </a>
          </div>
        </div>

        <div className="text-center text-gray-600 mt-10 text-sm">
          © 2026 FlowMind AI. All rights reserved.
        </div>
      </footer>
    </main>
  );
}
