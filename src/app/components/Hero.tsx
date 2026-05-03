import { CheckCircle, BarChart2, Users } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { TiltCard } from "./TiltCard";
import { FloatingOrb } from "./ParallaxSection";

const TEAM_IMG = "https://images.unsplash.com/photo-1758691737467-fe12934ddc58?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwdGVhbSUyMHdvcmtpbmclMjB0b2dldGhlciUyMGxhcHRvcCUyMG9mZmljZXxlbnwxfHx8fDE3Nzc2MTE4OTJ8MA&ixlib=rb-4.1.0&q=80&w=1080";

const badges = ["Content & Social", "AI Automation", "Lead Generation", "Financial Systems"];

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const cardsY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id.toLowerCase());
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={ref}
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "transparent" }}
    >
      {/* Extra glow orbs for hero */}
      <FloatingOrb color="#06b6d4" size={500} top="10%" left="-10%" delay={0} />
      <FloatingOrb color="#10b981" size={400} top="30%" right="-8%" delay={2} />
      <FloatingOrb color="#a78bfa" size={300} bottom="10%" left="30%" delay={4} />

      <div className="relative w-full max-w-7xl mx-auto px-6 md:px-10 pt-28 pb-16 flex flex-col lg:flex-row items-center gap-12" style={{ zIndex: 2 }}>
        {/* Left Content */}
        <motion.div
          className="flex-1 max-w-xl"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          {/* Tag */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-7 text-sm"
            style={{ background: "rgba(6, 182, 212, 0.1)", border: "1px solid rgba(6, 182, 212, 0.25)", color: "#67e8f9" }}
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            Full-Service Remote Growth Agency
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white mb-5"
            style={{ fontSize: "clamp(2.4rem, 5vw, 3.8rem)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.02em" }}
          >
            One team.{" "}
            <br />
            <span style={{ color: "#22d3ee" }}>Content,</span>
            <br />
            <span style={{ color: "#34d399" }}>automation,</span>
            {" "}and
            <br />
            financial ops —
            <br />
            all handled.
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="text-gray-400 mb-8 max-w-md"
            style={{ lineHeight: 1.7 }}
          >
            GrowthNest Studio helps growing businesses show up consistently, run
            efficiently, and stay financially in control — without hiring three
            separate teams.
          </motion.p>

          {/* Badge grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="flex flex-wrap gap-2 mb-10"
          >
            {badges.map((b, i) => (
              <motion.span
                key={b}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.55 + i * 0.08 }}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm text-gray-300"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
              >
                <CheckCircle size={14} className="text-cyan-400" />
                {b}
              </motion.span>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="flex flex-wrap gap-3"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => scrollTo("contact")}
              className="px-7 py-3.5 rounded-full text-white font-medium"
              style={{ background: "linear-gradient(135deg, #06b6d4, #0891b2)", border: "none", cursor: "pointer" }}
            >
              Start a Project
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => scrollTo("work")}
              className="px-7 py-3.5 rounded-full text-white font-medium"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", cursor: "pointer" }}
            >
              View Our Work
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Right — Dashboard Cards */}
        <motion.div
          className="flex-1 relative flex justify-center items-center w-full min-h-[420px] lg:min-h-[520px]"
          style={{ y: cardsY, zIndex: 2 }}
        >
          {/* Main Client Overview Card */}
          <motion.div
            initial={{ opacity: 0, x: 60, rotateY: -15 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: "easeOut" }}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-60%, -45%)",
              zIndex: 20,
            }}
          >
            <TiltCard
              style={{
                width: 288,
                borderRadius: 16,
                background: "rgba(13, 21, 40, 0.92)",
                border: "1px solid rgba(255,255,255,0.1)",
                backdropFilter: "blur(20px)",
                boxShadow: "0 25px 60px rgba(6,182,212,0.15)",
                padding: 20,
              }}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-white text-sm font-semibold">Client Overview</span>
                <span className="flex items-center gap-1 text-xs text-green-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  Live
                </span>
              </div>
              <div className="rounded-xl overflow-hidden mb-4 h-32">
                <img src={TEAM_IMG} alt="Team" className="w-full h-full object-cover" />
              </div>
              <div className="space-y-2.5">
                {[
                  { label: "Content published", value: "24 / mo", color: "#22d3ee" },
                  { label: "Leads generated", value: "183", color: "#34d399" },
                  { label: "Revenue tracked", value: "$12.4k", color: "#a78bfa" },
                ].map((row) => (
                  <div key={row.label} className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 text-gray-400">
                      <span className="w-2 h-2 rounded-full" style={{ background: row.color }} />
                      {row.label}
                    </span>
                    <span className="text-white font-medium">{row.value}</span>
                  </div>
                ))}
              </div>
            </TiltCard>
          </motion.div>

          {/* Leads Card */}
          <motion.div
            initial={{ opacity: 0, x: -40, y: 40 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            style={{ position: "absolute", bottom: "10%", left: "5%", zIndex: 10 }}
          >
            <TiltCard
              style={{
                width: 208,
                borderRadius: 16,
                background: "rgba(13, 21, 40, 0.92)",
                border: "1px solid rgba(255,255,255,0.1)",
                backdropFilter: "blur(20px)",
                boxShadow: "0 20px 50px rgba(52,211,153,0.12)",
                padding: 20,
              }}
            >
              <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3" style={{ background: "rgba(52, 211, 153, 0.15)" }}>
                <Users size={18} className="text-green-400" />
              </div>
              <div className="text-white mb-1" style={{ fontSize: "1.8rem", fontWeight: 700, lineHeight: 1 }}>183</div>
              <div className="text-gray-400 text-xs mb-1">Leads This Month</div>
              <div className="text-green-400 text-xs">+42% vs last month</div>
            </TiltCard>
          </motion.div>

          {/* Monthly Growth Card */}
          <motion.div
            initial={{ opacity: 0, x: 40, y: -40 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            style={{ position: "absolute", top: "5%", right: "0%", zIndex: 30 }}
          >
            <TiltCard
              style={{
                width: 208,
                borderRadius: 16,
                background: "rgba(13, 21, 40, 0.92)",
                border: "1px solid rgba(255,255,255,0.1)",
                backdropFilter: "blur(20px)",
                boxShadow: "0 20px 50px rgba(6,182,212,0.12)",
                padding: 20,
              }}
            >
              <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3" style={{ background: "rgba(6, 182, 212, 0.15)" }}>
                <BarChart2 size={18} className="text-cyan-400" />
              </div>
              <div className="flex items-end gap-1 mb-3 h-10">
                {[40, 60, 45, 75, 55, 90, 80].map((h, i) => (
                  <motion.div
                    key={i}
                    className="flex-1 rounded-sm"
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ delay: 0.8 + i * 0.07, duration: 0.5 }}
                    style={{
                      background: i === 5 ? "linear-gradient(to top, #06b6d4, #22d3ee)" : "rgba(6,182,212,0.25)",
                    }}
                  />
                ))}
              </div>
              <div className="text-white mb-0.5" style={{ fontSize: "1.6rem", fontWeight: 700, lineHeight: 1 }}>+38%</div>
              <div className="text-gray-400 text-xs">Monthly Growth</div>
            </TiltCard>
          </motion.div>

          {/* Revenue Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.75 }}
            style={{ position: "absolute", bottom: "5%", right: "5%", zIndex: 10 }}
          >
            <TiltCard
              style={{
                width: 176,
                borderRadius: 16,
                background: "rgba(13, 21, 40, 0.92)",
                border: "1px solid rgba(255,255,255,0.1)",
                backdropFilter: "blur(20px)",
                padding: 16,
              }}
            >
              <div className="text-gray-400 text-xs mb-1">Revenue Tracked</div>
              <div className="text-white font-bold" style={{ fontSize: "1.4rem" }}>$12.4k</div>
              <div className="text-xs text-purple-400 mt-1">Books fully updated</div>
            </TiltCard>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 1.5 }}
        style={{ zIndex: 2 }}
      >
        <span className="text-white text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          className="w-px h-8 bg-white"
          animate={{ scaleY: [1, 0.3, 1], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </motion.div>
    </section>
  );
}
