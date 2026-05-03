import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { FloatingOrb } from "./ParallaxSection";

const steps = [
  { num: "01", color: "#22d3ee", title: "Discovery Call", description: "We start with a 30-minute strategy call to understand your business, your goals, and where the biggest growth opportunities lie." },
  { num: "02", color: "#34d399", title: "Custom Growth Plan", description: "We build a tailored roadmap for content, automation, lead generation, and financial systems — specific to your stage and industry." },
  { num: "03", color: "#a78bfa", title: "Onboarding & Setup", description: "We integrate into your tools and workflows within one week, with zero disruption. You get a dedicated team from day one." },
  { num: "04", color: "#fb923c", title: "Execution & Iteration", description: "We execute consistently, report weekly, and adapt based on performance data. You stay in the loop without being in the weeds." },
];

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section
      id="process"
      ref={ref}
      className="relative py-24 px-6 md:px-10 overflow-hidden"
      style={{ background: "transparent" }}
    >
      {/* Parallax grid overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: bgY, zIndex: 0 }}
      >
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(34,211,238,0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(34,211,238,0.04) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />
      </motion.div>

      <FloatingOrb color="#a78bfa" size={400} top="20%" left="40%" delay={2} />
      <FloatingOrb color="#22d3ee" size={250} bottom="5%" right="10%" delay={0} />

      <div className="relative max-w-7xl mx-auto" style={{ zIndex: 2 }}>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <span
            className="inline-block px-4 py-1.5 rounded-full text-sm mb-4"
            style={{ background: "rgba(52,211,153,0.1)", color: "#6ee7b7", border: "1px solid rgba(52,211,153,0.2)" }}
          >
            How It Works
          </span>
          <h2
            className="text-white mb-4"
            style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, lineHeight: 1.15 }}
          >
            From zero to fully operational
            <br />
            <span style={{ color: "#34d399" }}>in under a week</span>
          </h2>
          <p className="text-gray-400 max-w-md mx-auto">
            A streamlined onboarding built for busy founders who need results, not meetings.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 80, rotateX: 20 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: i * 0.15, ease: "easeOut" }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="relative rounded-2xl p-7 cursor-default"
              style={{
                background: "rgba(13, 21, 40, 0.75)",
                border: "1px solid rgba(255,255,255,0.07)",
                backdropFilter: "blur(12px)",
                boxShadow: `0 0 0 0 ${step.color}00`,
                transformStyle: "preserve-3d",
              }}
            >
              {/* Glow border on hover */}
              <motion.div
                className="absolute inset-0 rounded-2xl pointer-events-none"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                style={{ boxShadow: `0 0 30px ${step.color}25`, border: `1px solid ${step.color}30` }}
              />

              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold mb-5"
                style={{ background: `${step.color}18`, color: step.color, border: `1px solid ${step.color}40` }}
              >
                {step.num}
              </div>

              {i < steps.length - 1 && (
                <div
                  className="hidden lg:flex absolute top-[2.6rem] -right-3 z-10 w-6 h-6 items-center justify-center rounded-full"
                  style={{ background: "#070c1a", border: "1px solid rgba(255,255,255,0.1)" }}
                >
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 5h6M6 3l2 2-2 2" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}

              <h3 className="text-white mb-2" style={{ fontSize: "1.05rem", fontWeight: 700 }}>
                {step.title}
              </h3>
              <p className="text-gray-400 text-sm" style={{ lineHeight: 1.7 }}>
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
