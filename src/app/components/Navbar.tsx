import { useState } from "react";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = ["Services", "Work", "Process", "About", "Contact"];

  const scrollTo = (id: string) => {
    const el = document.getElementById(id.toLowerCase());
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-4"
      style={{ background: "rgba(7, 12, 26, 0.85)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
    >
      {/* Logo */}
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center"
          style={{ background: "linear-gradient(135deg, #06b6d4, #10b981)" }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M3 17l4-8 4 4 4-6 4 10" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <span className="text-white font-semibold text-lg">
          GrowthNest{" "}
          <span style={{ color: "#06b6d4" }}>Studio</span>
        </span>
      </div>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center gap-7">
        {links.map((link) => (
          <button
            key={link}
            onClick={() => scrollTo(link)}
            className="text-sm text-gray-300 hover:text-white transition-colors"
            style={{ background: "none", border: "none", cursor: "pointer" }}
          >
            {link}
          </button>
        ))}
      </div>

      {/* CTA */}
      <button
        onClick={() => scrollTo("Contact")}
        className="hidden md:block px-5 py-2.5 rounded-full text-sm text-white font-medium transition-opacity hover:opacity-90"
        style={{ background: "linear-gradient(135deg, #06b6d4, #0891b2)" }}
      >
        Start a Project
      </button>

      {/* Mobile Toggle */}
      <button
        className="md:hidden text-white"
        onClick={() => setMobileOpen(!mobileOpen)}
        style={{ background: "none", border: "none", cursor: "pointer" }}
      >
        {mobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          className="absolute top-full left-0 right-0 flex flex-col gap-4 px-6 py-6"
          style={{ background: "#070c1a", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
        >
          {links.map((link) => (
            <button
              key={link}
              onClick={() => scrollTo(link)}
              className="text-left text-gray-300 hover:text-white transition-colors py-1"
              style={{ background: "none", border: "none", cursor: "pointer" }}
            >
              {link}
            </button>
          ))}
          <button
            onClick={() => scrollTo("Contact")}
            className="w-full py-3 rounded-full text-sm text-white font-medium"
            style={{ background: "linear-gradient(135deg, #06b6d4, #0891b2)" }}
          >
            Start a Project
          </button>
        </div>
      )}
    </nav>
  );
}
