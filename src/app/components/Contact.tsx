import { useState } from "react";
import { motion } from "motion/react";
import { Mail, Calendar, Clock, User, Briefcase, Timer, MessageCircle } from "lucide-react";
import { FloatingOrb } from "./ParallaxSection";

const WEBHOOK_URL = "https://hook.eu1.make.com/xmyqmhi2babd3g2znsco6xadac18ebq7";

const services = [
  "Content & Social",
  "AI Automation",
  "Lead Generation",
  "Financial Systems",
  "Full Package",
];

const durations = [
  { label: "30 min", value: "30" },
  { label: "1 hour", value: "60" },
  { label: "1.5 hrs", value: "90" },
  { label: "2 hours", value: "120" },
];

export function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    service: "",
    date: "",
    time: "",
    duration: "",
    contactMethod: "whatsapp",
    contactHandle: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } catch (err) {
      console.error("Failed to send:", err);
    }
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      className="relative py-24 px-6 md:px-10 overflow-hidden"
      style={{ background: "transparent" }}
    >
      <FloatingOrb color="#06b6d4" size={400} top="10%" right="5%" delay={1} />
      <FloatingOrb color="#8b5cf6" size={300} bottom="10%" left="5%" delay={3} />

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
            style={{ background: "rgba(6,182,212,0.1)", color: "#22d3ee", border: "1px solid rgba(6,182,212,0.2)" }}
          >
            Book a Meeting
          </span>
          <h2 className="text-white mb-4" style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, lineHeight: 1.15 }}>
            Schedule a free<br />
            <span style={{ color: "#06b6d4" }}>discovery call</span>
          </h2>
          <p className="text-gray-400 max-w-lg mx-auto">
            Pick a date and time that works for you. We'll confirm your appointment and send a calendar invite straight to your email.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left — Info */}
          <motion.div
            className="flex flex-col gap-5"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
          >
            {/* Email */}
            <div
              className="flex items-start gap-4 p-5 rounded-2xl"
              style={{ background: "rgba(13,21,40,0.7)", border: "1px solid rgba(255,255,255,0.06)", backdropFilter: "blur(12px)" }}
            >
              <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(6,182,212,0.12)" }}>
                <Mail size={20} color="#22d3ee" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm mb-0.5">Email Us</p>
                <p className="text-gray-500 text-xs mb-1">We respond within 24 hours.</p>
                <a href="mailto:art.onlinee88@gmail.com" style={{ color: "#22d3ee", textDecoration: "none", fontSize: "0.9rem" }}>
                  art.onlinee88@gmail.com
                </a>
              </div>
            </div>

            {/* How it works */}
            <div
              className="p-5 rounded-2xl"
              style={{ background: "rgba(6,182,212,0.06)", border: "1px solid rgba(6,182,212,0.15)" }}
            >
              <p className="text-cyan-300 text-sm font-semibold mb-3">📅 How it works</p>
              <ol className="text-gray-400 text-sm space-y-2 list-decimal list-inside">
                <li>Fill out the form with your preferred schedule</li>
                <li>We check availability on our calendar</li>
                <li>You receive a Gmail confirmation</li>
                <li>We meet at the scheduled time!</li>
              </ol>
            </div>

            {/* Response time */}
            <div
              className="p-5 rounded-2xl"
              style={{ background: "rgba(52,211,153,0.06)", border: "1px solid rgba(52,211,153,0.15)" }}
            >
              <p className="text-emerald-300 text-sm font-semibold mb-1">⚡ Fast Response</p>
              <p className="text-gray-400 text-sm">We confirm all appointments within 24 hours of submission.</p>
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
          >
            <div
              className="p-8 rounded-3xl"
              style={{ background: "rgba(13,21,40,0.8)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(16px)" }}
            >
              {submitted ? (
                <div className="text-center py-10">
                  <div className="text-5xl mb-4">🎉</div>
                  <h3 className="text-white text-xl font-bold mb-2">Request Sent!</h3>
                  <p className="text-gray-400 text-sm max-w-xs mx-auto">
                    We're checking our calendar and will send a confirmation to{" "}
                    <span style={{ color: "#22d3ee" }}>{form.email}</span> shortly!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">

                  {/* Name */}
                  <div>
                    <label className="text-gray-400 text-xs mb-1.5 flex items-center gap-1.5">
                      <User size={12} /> Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="John Doe"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl text-white text-sm outline-none"
                      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="text-gray-400 text-xs mb-1.5 flex items-center gap-1.5">
                      <Mail size={12} /> Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="john@company.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl text-white text-sm outline-none"
                      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                    />
                  </div>

                  {/* Service */}
                  <div>
                    <label className="text-gray-400 text-xs mb-1.5 flex items-center gap-1.5">
                      <Briefcase size={12} /> Service Interested In *
                    </label>
                    <select
                      required
                      value={form.service}
                      onChange={(e) => setForm({ ...form, service: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                      style={{ background: "rgba(13,21,40,0.9)", border: "1px solid rgba(255,255,255,0.1)", color: form.service ? "white" : "#9ca3af" }}
                    >
                      <option value="" disabled>Select a service...</option>
                      {services.map((s) => (
                        <option key={s} value={s} style={{ background: "#0d1528" }}>{s}</option>
                      ))}
                    </select>
                  </div>

                  {/* Date & Time */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-gray-400 text-xs mb-1.5 flex items-center gap-1.5">
                        <Calendar size={12} /> Preferred Date *
                      </label>
                      <input
                        type="date"
                        required
                        min={today}
                        value={form.date}
                        onChange={(e) => setForm({ ...form, date: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl text-white text-sm outline-none"
                        style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", colorScheme: "dark" }}
                      />
                    </div>
                    <div>
                      <label className="text-gray-400 text-xs mb-1.5 flex items-center gap-1.5">
                        <Clock size={12} /> Preferred Time *
                      </label>
                      <input
                        type="time"
                        required
                        value={form.time}
                        onChange={(e) => setForm({ ...form, time: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl text-white text-sm outline-none"
                        style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", colorScheme: "dark" }}
                      />
                    </div>
                  </div>

                  {/* Duration */}
                  <div>
                    <label className="text-gray-400 text-xs mb-1.5 flex items-center gap-1.5">
                      <Timer size={12} /> Meeting Duration *
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {durations.map((d) => (
                        <button
                          key={d.value}
                          type="button"
                          onClick={() => setForm({ ...form, duration: d.value })}
                          className="py-2.5 rounded-xl text-xs font-medium transition-all"
                          style={{
                            background: form.duration === d.value ? "linear-gradient(135deg, #06b6d4, #0891b2)" : "rgba(255,255,255,0.05)",
                            border: form.duration === d.value ? "1px solid #06b6d4" : "1px solid rgba(255,255,255,0.1)",
                            color: form.duration === d.value ? "white" : "#9ca3af",
                            cursor: "pointer",
                          }}
                        >
                          {d.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Contact Method */}
                  <div>
                    <label className="text-gray-400 text-xs mb-1.5 flex items-center gap-1.5">
                      <MessageCircle size={12} /> Preferred Contact Method *
                    </label>
                    {/* Toggle */}
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      {["whatsapp", "telegram"].map((method) => (
                        <button
                          key={method}
                          type="button"
                          onClick={() => setForm({ ...form, contactMethod: method, contactHandle: "" })}
                          className="py-2.5 rounded-xl text-xs font-medium transition-all flex items-center justify-center gap-1.5"
                          style={{
                            background: form.contactMethod === method ? "linear-gradient(135deg, #25d366, #128c7e)" : "rgba(255,255,255,0.05)",
                            border: form.contactMethod === method ? "1px solid #25d366" : "1px solid rgba(255,255,255,0.1)",
                            color: form.contactMethod === method ? "white" : "#9ca3af",
                            cursor: "pointer",
                          }}
                        >
                          {method === "whatsapp" ? "📱 WhatsApp" : "✈️ Telegram"}
                        </button>
                      ))}
                    </div>
                    <input
                      type="text"
                      required
                      placeholder={form.contactMethod === "whatsapp" ? "+63 912 345 6789" : "@yourusername"}
                      value={form.contactHandle}
                      onChange={(e) => setForm({ ...form, contactHandle: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl text-white text-sm outline-none"
                      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={loading || !form.duration}
                    className="w-full py-4 rounded-xl text-white font-semibold text-sm transition-opacity"
                    style={{
                      background: "linear-gradient(135deg, #06b6d4, #0891b2)",
                      opacity: loading || !form.duration ? 0.7 : 1,
                      cursor: loading || !form.duration ? "not-allowed" : "pointer",
                    }}
                  >
                    {loading ? "Sending Request..." : "📅 Book My Appointment"}
                  </button>

                  <p className="text-gray-500 text-xs text-center">
                    We'll confirm availability and send a calendar invite to your email.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}