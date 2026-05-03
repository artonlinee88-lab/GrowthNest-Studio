import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { FloatingOrb } from "./ParallaxSection";

const CONTENT_IMG = "https://images.unsplash.com/photo-1769596722541-40dedee6789d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW50JTIwbWFya2V0aW5nJTIwc29jaWFsJTIwbWVkaWElMjBzdHJhdGVneXxlbnwxfHx8fDE3Nzc2MTE4OTR8MA&ixlib=rb-4.1.0&q=80&w=1080";
const AUTO_IMG = "https://images.unsplash.com/photo-1759752393975-7ca7b302fcc6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGF1dG9tYXRpb24lMjB3b3JrZmxvdyUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzc3NjExODk1fDA&ixlib=rb-4.1.0&q=80&w=1080";
const FIN_IMG = "https://images.unsplash.com/photo-1758691736483-5f600b509962?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5hbmNpYWwlMjBwbGFubmluZyUyMGJ1c2luZXNzJTIwcmV2ZW51ZSUyMGdyb3d0aHxlbnwxfHx8fDE3Nzc2MTE4OTV8MA&ixlib=rb-4.1.0&q=80&w=1080";

const cases = [
  {
    tag: "Content & Lead Gen", tagColor: "#22d3ee",
    title: "SaaS Startup Grows Pipeline by 3x in 90 Days",
    description: "We rebuilt their content strategy, launched a LinkedIn outreach campaign, and automated follow-up sequences — resulting in 183 qualified leads in the first quarter.",
    stats: [{ label: "Leads Generated", value: "183" }, { label: "MRR Growth", value: "+62%" }, { label: "Time Saved", value: "14 hrs/wk" }],
    image: CONTENT_IMG,
  },
  {
    tag: "AI Automation", tagColor: "#34d399",
    title: "E-commerce Brand Saves 20 Hours Per Week with AI Workflows",
    description: "We mapped their manual processes, built custom Zapier + AI automations, and deployed a smart inbox triage system — eliminating repetitive work entirely.",
    stats: [{ label: "Hours Saved", value: "20/wk" }, { label: "Response Time", value: "-78%" }, { label: "ROI in 60 days", value: "4.2x" }],
    image: AUTO_IMG,
  },
  {
    tag: "Financial Systems", tagColor: "#fb923c",
    title: "Consulting Firm Gets Full Financial Visibility in 2 Weeks",
    description: "We set up their Chart of Accounts, connected their payment tools, and built a real-time P&L dashboard — giving the founders clarity they never had before.",
    stats: [{ label: "Revenue Tracked", value: "$12.4k/mo" }, { label: "Books Updated", value: "Real-time" }, { label: "Setup Time", value: "2 Weeks" }],
    image: FIN_IMG,
  },
];

function WorkImagePane({ image, tagColor }: { image: string; tagColor: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <motion.div
      ref={ref}
      className="md:w-2/5 h-52 md:h-auto overflow-hidden flex-shrink-0 relative"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7 }}
    >
      <motion.img src={image} alt="" className="w-full h-full object-cover" style={{ y: imgY, scale: 1.3 }} />
      <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${tagColor}20, transparent 60%)` }} />
    </motion.div>
  );
}

export function Work() {
  return (
    <section
      id="work"
      className="relative py-24 px-6 md:px-10 overflow-hidden"
      style={{ background: "transparent" }}
    >
      <FloatingOrb color="#22d3ee" size={320} top="10%" left="5%" delay={0.5} />
      <FloatingOrb color="#fb923c" size={280} bottom="10%" right="5%" delay={2.5} />

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
            style={{ background: "rgba(167,139,250,0.1)", color: "#c4b5fd", border: "1px solid rgba(167,139,250,0.2)" }}
          >
            Case Studies
          </span>
          <h2
            className="text-white mb-4"
            style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, lineHeight: 1.15 }}
          >
            Real results for <br />
            <span style={{ color: "#a78bfa" }}>real businesses</span>
          </h2>
          <p className="text-gray-400 max-w-md mx-auto">
            See how we've helped founders and teams achieve meaningful growth across industries.
          </p>
        </motion.div>

        <div className="space-y-6">
          {cases.map((c, i) => (
            <div
              key={c.title}
              className={`rounded-2xl overflow-hidden flex flex-col ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
              style={{ background: "rgba(13, 21, 40, 0.75)", border: "1px solid rgba(255,255,255,0.07)", backdropFilter: "blur(12px)" }}
            >
              <WorkImagePane image={c.image} tagColor={c.tagColor} />
              <motion.div
                className="flex-1 p-8 md:p-10 flex flex-col justify-center"
                initial={{ opacity: 0, x: i % 2 === 0 ? 40 : -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <span
                  className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-4 w-fit"
                  style={{ background: `${c.tagColor}18`, color: c.tagColor, border: `1px solid ${c.tagColor}30` }}
                >
                  {c.tag}
                </span>
                <h3 className="text-white mb-3" style={{ fontSize: "1.25rem", fontWeight: 700, lineHeight: 1.3 }}>
                  {c.title}
                </h3>
                <p className="text-gray-400 text-sm mb-6" style={{ lineHeight: 1.7 }}>
                  {c.description}
                </p>
                <div className="flex flex-wrap gap-6">
                  {c.stats.map((stat) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4 }}
                    >
                      <div className="text-white font-bold" style={{ fontSize: "1.4rem" }}>{stat.value}</div>
                      <div className="text-gray-500 text-xs">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
