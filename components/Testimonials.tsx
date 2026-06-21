"use client";

import { m } from "framer-motion";

export default function Testimonials() {
  const cardTransition = { type: "spring" as const, stiffness: 200 };

  return (
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
        <m.div
          whileHover={{
            y: -10,
            scale: 1.03,
          }}
          transition={cardTransition}
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
        </m.div>

        <m.div
          whileHover={{
            y: -10,
            scale: 1.03,
          }}
          transition={cardTransition}
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
        </m.div>

        <m.div
          whileHover={{
            y: -10,
            scale: 1.03,
          }}
          transition={cardTransition}
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
        </m.div>
      </div>
    </section>
  );
}
