import { Check } from "lucide-react";
import { useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { TiltCard } from "./TiltCard";
import { FloatingOrb } from "./ParallaxSection";

const plans = [
  {
    name: "Starter", monthly: 399, annual: 319,
    tagline: "For early-stage businesses getting started.", color: "#22d3ee",
    features: ["8 content pieces/month", "Social scheduling", "Basic CRM automation", "Monthly financial report", "Email support", "Onboarding call"],
    cta: "Get Started",
  },
  {
    name: "Growth", monthly: 999, annual: 799, popular: true,
    tagline: "For growing teams ready to scale operations.", color: "#34d399",
    features: ["24 content pieces/month", "Full social management", "Advanced AI automation", "Lead generation campaigns", "Real-time financial dashboard", "Dedicated account manager", "Weekly check-in calls", "Priority support"],
    cta: "Start Growing",
  },
  {
    name: "Scale", monthly: 1299, annual: 1039,
    tagline: "For established businesses with complex needs.", color: "#a78bfa",
    features: ["Unlimited content", "Omni-channel social strategy", "Custom AI workflow builds", "Full outbound sales system", "CFO-level financial oversight", "Dedicated team of 3", "Daily standups available", "SLA guarantees", "White-glove onboarding"],
    cta: "Let's Talk",
  },
];

export function Pricing() {
  const [annual, setAnnual] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section
      id="pricing"
      ref={ref}
      className="relative py-24 px-6 md:px-10 overflow-hidden"
      style={{ background: "transparent" }}
    >
      {/* Animated parallax grid */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: bgY, zIndex: 0 }}
      >
        <div
          className="w-full h-full opacity-40"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(34,211,238,0.08) 1px, transparent 0)`,
            backgroundSize: "50px 50px",
          }}
        />
      </motion.div>

      <FloatingOrb color="#34d399" size={450} top="-10%" left="30%" delay={1} />
      <FloatingOrb color="#a78bfa" size={300} bottom="5%" right="5%" delay={3} />

      <div className="relative max-w-7xl mx-auto" style={{ zIndex: 2 }}>
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <span
            className="inline-block px-4 py-1.5 rounded-full text-sm mb-4"
            style={{ background: "rgba(34,211,238,0.1)", color: "#67e8f9", border: "1px solid rgba(34,211,238,0.2)" }}
          >
            Pricing
          </span>
          <h2
            className="text-white mb-4"
            style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, lineHeight: 1.15 }}
          >
            Simple, transparent
            <br />
            <span style={{ color: "#22d3ee" }}>monthly retainers</span>
          </h2>
          <p className="text-gray-400 max-w-md mx-auto mb-8">
            No surprise fees. No scope creep. Just clear deliverables and measurable results.
          </p>

          {/* Toggle */}
          <div
            className="inline-flex items-center gap-3 p-1 rounded-full"
            style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
          >
            {["Monthly", "Annual"].map((opt) => (
              <motion.button
                key={opt}
                onClick={() => setAnnual(opt === "Annual")}
                className="px-5 py-2 rounded-full text-sm flex items-center gap-2"
                animate={{ background: (opt === "Annual") === annual ? "rgba(6,182,212,0.2)" : "transparent" }}
                style={{
                  color: (opt === "Annual") === annual ? "#22d3ee" : "#6b7280",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                {opt}
                {opt === "Annual" && (
                  <span className="px-2 py-0.5 rounded-full text-xs" style={{ background: "rgba(52,211,153,0.15)", color: "#34d399" }}>
                    Save 20%
                  </span>
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 80, scale: 0.92 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: i * 0.12 }}
            >
              <TiltCard
                intensity={plan.popular ? 10 : 7}
                style={{
                  borderRadius: 16,
                  background: "rgba(13, 21, 40, 0.85)",
                  border: plan.popular ? `1px solid ${plan.color}50` : "1px solid rgba(255,255,255,0.07)",
                  backdropFilter: "blur(16px)",
                  boxShadow: plan.popular ? `0 0 50px ${plan.color}20` : "none",
                  padding: 32,
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {plan.popular && (
                  <div
                    className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-semibold"
                    style={{ background: plan.color, color: "#000" }}
                  >
                    Most Popular
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-white mb-1" style={{ fontSize: "1.2rem", fontWeight: 700 }}>{plan.name}</h3>
                  <p className="text-gray-400 text-sm mb-5">{plan.tagline}</p>
                  <div className="flex items-end gap-1 mb-1">
                    <motion.span
                      key={annual ? "annual" : "monthly"}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-white"
                      style={{ fontSize: "2.5rem", fontWeight: 800, lineHeight: 1 }}
                    >
                      ${(annual ? plan.annual : plan.monthly).toLocaleString()}
                    </motion.span>
                    <span className="text-gray-400 text-sm mb-1">/mo</span>
                  </div>
                  {annual && (
                    <p className="text-xs" style={{ color: "#34d399" }}>
                      Save ${((plan.monthly - plan.annual) * 12).toLocaleString()}/yr billed annually
                    </p>
                  )}
                </div>

                <ul className="space-y-3 flex-1 mb-8">
                  {plan.features.map((f, fi) => (
                    <motion.li
                      key={f}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 + fi * 0.04 }}
                      className="flex items-start gap-2.5 text-sm text-gray-300"
                    >
                      <Check size={15} className="mt-0.5 flex-shrink-0" style={{ color: plan.color }} />
                      {f}
                    </motion.li>
                  ))}
                </ul>

                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => { const el = document.getElementById("contact"); if (el) el.scrollIntoView({ behavior: "smooth" }); }}
                  className="w-full py-3.5 rounded-full text-sm font-semibold"
                  style={{
                    background: plan.popular ? `linear-gradient(135deg, ${plan.color}, ${plan.color}aa)` : "rgba(255,255,255,0.06)",
                    color: plan.popular ? "#000" : "#fff",
                    border: plan.popular ? "none" : "1px solid rgba(255,255,255,0.12)",
                    cursor: "pointer",
                  }}
                >
                  {plan.cta}
                </motion.button>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
