import { PenTool, Zap, TrendingUp, DollarSign, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { TiltCard } from "./TiltCard";
import { FloatingOrb } from "./ParallaxSection";

const services = [
  {
    icon: PenTool,
    color: "#22d3ee",
    bgColor: "rgba(34, 211, 238, 0.12)",
    title: "Content & Social",
    description:
      "We create, schedule, and manage your content across all platforms — blogs, LinkedIn, Instagram, and beyond — so your brand stays active and consistent.",
    features: ["Content strategy", "Copywriting & design", "Scheduling & publishing", "Analytics reporting"],
  },
  {
    icon: Zap,
    color: "#34d399",
    bgColor: "rgba(52, 211, 153, 0.12)",
    title: "AI Automation",
    description:
      "We build custom AI-powered workflows that eliminate repetitive tasks, streamline operations, and give your team back hours every week.",
    features: ["CRM automation", "Email sequences", "Lead routing", "AI-powered chatbots"],
  },
  {
    icon: TrendingUp,
    color: "#a78bfa",
    bgColor: "rgba(167, 139, 250, 0.12)",
    title: "Lead Generation",
    description:
      "We build and run outbound systems that fill your pipeline with qualified prospects, so your sales team can focus on closing.",
    features: ["Outbound campaigns", "LinkedIn outreach", "Cold email sequences", "Pipeline management"],
  },
  {
    icon: DollarSign,
    color: "#fb923c",
    bgColor: "rgba(251, 146, 60, 0.12)",
    title: "Financial Systems",
    description:
      "We set up and manage your bookkeeping, reporting, and financial dashboards — giving you a real-time view of your business health.",
    features: ["Bookkeeping & reconciliation", "P&L dashboards", "Cash flow tracking", "Monthly financial reports"],
  },
];

export function Services() {
  return (
    <section
      id="services"
      className="relative py-24 px-6 md:px-10 overflow-hidden"
      style={{ background: "transparent" }}
    >
      {/* Floating orbs */}
      <FloatingOrb color="#22d3ee" size={350} top="-5%" right="5%" delay={1} />
      <FloatingOrb color="#34d399" size={280} bottom="0%" left="0%" delay={3} />

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
            style={{ background: "rgba(6,182,212,0.1)", color: "#67e8f9", border: "1px solid rgba(6,182,212,0.2)" }}
          >
            Our Services
          </span>
          <h2
            className="text-white mb-4"
            style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, lineHeight: 1.15 }}
          >
            Everything your business needs
            <br />
            <span style={{ color: "#22d3ee" }}>to grow and scale</span>
          </h2>
          <p className="text-gray-400 max-w-lg mx-auto">
            One team handles it all — no juggling multiple agencies or freelancers.
            Just one cohesive growth partner.
          </p>
        </motion.div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 60, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: i * 0.12 }}
            >
              <TiltCard
                intensity={8}
                style={{
                  borderRadius: 16,
                  background: "rgba(13, 21, 40, 0.75)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  backdropFilter: "blur(12px)",
                  padding: 32,
                  cursor: "default",
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: s.bgColor }}
                >
                  <s.icon size={22} style={{ color: s.color }} />
                </div>
                <h3 className="text-white mb-3" style={{ fontSize: "1.2rem", fontWeight: 700 }}>
                  {s.title}
                </h3>
                <p className="text-gray-400 mb-5 text-sm" style={{ lineHeight: 1.7 }}>
                  {s.description}
                </p>
                <ul className="space-y-2 mb-5">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-gray-300">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: s.color }} />
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  className="flex items-center gap-1.5 text-sm transition-all hover:gap-3"
                  style={{ background: "none", border: "none", color: s.color, cursor: "pointer" }}
                >
                  Learn more <ArrowRight size={14} />
                </button>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
