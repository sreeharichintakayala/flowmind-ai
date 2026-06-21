export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-6 border-b border-white/10">
      <h1 className="text-2xl font-bold">FlowMind AI</h1>

      <button className="bg-white text-black px-5 py-2 rounded-full font-medium hover:scale-105 transition hover:shadow-purple-500/20 hover:shadow-xl">
        Get Started
      </button>
    </nav>
  );
}
