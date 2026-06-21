export default function Footer() {
  return (
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
  );
}
