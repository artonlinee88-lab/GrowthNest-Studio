import { useState } from "react";
import { motion } from "motion/react";
import { FloatingOrb } from "./ParallaxSection";
import { TiltCard } from "./TiltCard";

import saverioPng from "../../assets/team/saverio.png";
import saverioHoverPng from "../../assets/team/saverio-hover.png";
import rjPng from "../../assets/team/rj.png";
import rjHoverJpg from "../../assets/team/rj-hover.jpg";
import kayeJpg from "../../assets/team/kaye.jpg";
import kayeHoverJpg from "../../assets/team/kaye-hover.jpg";

const team = [
  {
    name: "Saverio Mejares Jr.",
    role: "CEO / Founder",
    image: saverioPng,
    hoverImage: saverioHoverPng,
    color: "#22d3ee",
    behance: "https://www.behance.net/saverio_mejares",
  },
  {
    name: "RJ Karl Cainoy",
    role: "COO",
    image: rjPng,
    hoverImage: rjHoverJpg,
    color: "#34d399",
    behance: null,
  },
  {
    name: "Kaye Lovely David",
    role: "CFO",
    image: kayeJpg,
    hoverImage: kayeHoverJpg,
    color: "#a78bfa",
    behance: null,
  },
];

function TeamCard({ member, index }: { member: typeof team[0]; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.93 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay: index * 0.15 }}
    >
      <TiltCard
        intensity={8}
        style={{
          borderRadius: 20,
          background: "rgba(13,21,40,0.80)",
          border: `1px solid ${member.color}30`,
          backdropFilter: "blur(16px)",
          boxShadow: `0 0 40px ${member.color}12`,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Photo with hover swap */}
        <div
          style={{ width: "100%", aspectRatio: "3/4", overflow: "hidden", position: "relative", cursor: "pointer" }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <img
            src={member.image}
            alt={member.name}
            style={{
              position: "absolute", inset: 0,
              width: "100%", height: "100%",
              objectFit: "cover", objectPosition: "top",
              transition: "opacity 0.5s ease",
              opacity: hovered ? 0 : 1,
            }}
          />
          <img
            src={member.hoverImage}
            alt={`${member.name} casual`}
            style={{
              position: "absolute", inset: 0,
              width: "100%", height: "100%",
              objectFit: "cover", objectPosition: "center",
              transition: "opacity 0.5s ease",
              opacity: hovered ? 1 : 0,
            }}
          />
        </div>

        {/* Name, Title & Behance */}
        <div
          className="px-5 py-4 text-center"
          style={{ borderTop: `1px solid ${member.color}20` }}
        >
          <h3 className="text-white font-bold mb-1" style={{ fontSize: "1rem" }}>
            {member.name}
          </h3>
          <p className="text-sm font-medium mb-3" style={{ color: member.color }}>
            {member.role}
          </p>
          {member.behance && (
            <a
              href={member.behance}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "6px 14px",
                borderRadius: "999px",
                fontSize: "0.75rem",
                fontWeight: 600,
                color: "#fff",
                background: "linear-gradient(135deg, #1769ff, #0050e6)",
                textDecoration: "none",
                transition: "opacity 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22 7h-7V5h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 3.211 3.483 3.312 4.588 2.029H23.726zm-7.726-3h3.427c-.123-1.979-1.141-2.589-1.8-2.589-.69 0-1.495.512-1.627 2.589zM7.995 11.994c1.024 0 1.839-.632 1.839-1.648 0-1.012-.815-1.648-1.839-1.648H4.03v3.296h3.965zm.406 3.895c1.183 0 1.98-.805 1.98-1.888 0-1.087-.797-1.9-1.98-1.9H4.03v3.788h4.371zM0 5.002h9.274c1.938 0 3.756 1.483 3.756 3.686 0 1.29-.554 2.254-1.426 2.912C12.938 12.338 13.5 13.526 13.5 15c0 2.507-1.842 4-4.183 4H0V5.002z"/>
              </svg>
              View Portfolio
            </a>
          )}
        </div>
      </TiltCard>
    </motion.div>
  );
}

export function About() {
  return (
    <section
      id="about"
      className="relative py-24 px-6 md:px-10 overflow-hidden"
      style={{ background: "transparent" }}
    >
      <FloatingOrb color="#fb923c" size={380} top="5%" left="5%" delay={1} />
      <FloatingOrb color="#22d3ee" size={300} bottom="10%" right="8%" delay={3} />

      <div className="relative max-w-7xl mx-auto" style={{ zIndex: 2 }}>
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <span
            className="inline-block px-4 py-1.5 rounded-full text-sm mb-4"
            style={{ background: "rgba(251,146,60,0.1)", color: "#fdba74", border: "1px solid rgba(251,146,60,0.2)" }}
          >
            About Us
          </span>
          <h2 className="text-white mb-4" style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, lineHeight: 1.15 }}>
            Built by operators<br />
            <span style={{ color: "#fb923c" }}>for operators</span>
          </h2>
          <p className="text-gray-400 max-w-lg mx-auto">
            We started GrowthNest Studio because we kept seeing the same problem: great businesses held back by fragmented tools, slow content, and financial blindspots.
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {team.map((member, i) => (
            <TeamCard key={member.name} member={member} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
