import { motion, useScroll, useTransform, useSpring, AnimatePresence, type Variants } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import {
  Network,
  Brain,
  Mic,
  FileText,
  DollarSign,
  Users,
  Zap,
  ArrowRight,
  GitBranch,
  Activity,
  Shield,
  Layers,
  Target,
  Clock,
  Sparkles,
  TrendingUp,
  ChevronRight,
} from "lucide-react"

// ─── Google Font injection ───────────────────────────
const fontStyle = `
  @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@300;400;500;600;700&display=swap');
`

interface LandingPageProps {
  onLaunchDashboard: () => void
}

// ─── Animation variants ─────────────────────────────
const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.2 } },
}
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65 } },
}
const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.5 } },
}

// ─── SVG Noise filter (inline, no external dep) ─────
function NoiseTexture() {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.035] mix-blend-overlay" xmlns="http://www.w3.org/2000/svg">
      <filter id="noise">
        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#noise)" />
    </svg>
  )
}

// ─── Animated counter ───────────────────────────────
function AnimCounter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useRef(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !inView.current) {
        inView.current = true
        let start = 0
        const step = () => {
          start += Math.ceil(to / 40)
          if (start >= to) { setVal(to); return }
          setVal(start)
          requestAnimationFrame(step)
        }
        requestAnimationFrame(step)
      }
    }, { threshold: 0.5 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [to])

  return <span ref={ref}>{val}{suffix}</span>
}

// ─── Data ───────────────────────────────────────────
const features = [
  {
    icon: Network,
    title: "Knowledge Graph Engine",
    desc: "Dynamic Neo4j dependency mapping with interactive 3D visualization. Detects merge conflicts, bottlenecks, and expertise clusters in real time.",
    tag: "NEO4J · 3D",
    color: "#0ea5e9",
    size: "large", // spans 2 cols on md
  },
  {
    icon: Brain,
    title: "Smart Resource Allocation",
    desc: "LangChain-powered task assignment. Watch the graph expand as epics decompose into actionable stories based on developer capacity.",
    tag: "LANGCHAIN",
    color: "#8b5cf6",
    size: "normal",
  },
  {
    icon: Activity,
    title: "Delay Prediction",
    desc: "scikit-learn models forecast critical-path delays. Reduce missed deadlines by 40%.",
    tag: "ML · SCIKIT",
    color: "#f59e0b",
    size: "normal",
  },
  {
    icon: FileText,
    title: "Meeting Intelligence",
    desc: "AI transcribes meetings and auto-generates Jira tickets with full hierarchy, assignments, and linked dependencies.",
    tag: "AUTO-TICKET",
    color: "#10b981",
    size: "normal",
  },
  {
    icon: Mic,
    title: "Voice Assistant",
    desc: "Ask in English or regional languages. Get spoken responses with live data via Sarvam AI.",
    tag: "SARVAM AI",
    color: "#f43f5e",
    size: "normal",
  },
  {
    icon: DollarSign,
    title: "Financial Intelligence",
    desc: "Sprint-level CapEx/OpEx, budget vs. actual, ROI per feature, and financial forecasting.",
    tag: "CAPEX · OPEX",
    color: "#06b6d4",
    size: "normal",
  },
  {
    icon: Users,
    title: "HR Analytics",
    desc: "AI-generated appraisal summaries, promotion readiness, and retention risk scores from real contribution data.",
    tag: "AI REPORTS",
    color: "#6366f1",
    size: "normal",
  },
  {
    icon: Shield,
    title: "Role-Based Dashboards",
    desc: "Tailored views for PMs, HR, and Executives. Every role sees exactly the metrics that drive their decisions.",
    tag: "RBAC",
    color: "#64748b",
    size: "normal",
  },
]

const stats = [
  { value: 40, suffix: "%", label: "Fewer missed deadlines" },
  { value: 3, suffix: "×", label: "Faster resource allocation" },
  { value: 7, suffix: "+", label: "Integrated AI services" },
  { value: 100, suffix: "%", label: "Audit-trail coverage" },
]

const techStack = [
  "React 18", "Node.js", "Neo4j", "MongoDB", "LangChain",
  "Gemini", "Three.js", "Flask", "Sarvam AI", "scikit-learn",
  "Jira API", "GitHub API",
]

const pipelineLayers = [
  { n: "01", title: "Ingest", items: ["GitHub Webhooks", "Jira Sync", "Transcripts", "Voice Input"], icon: GitBranch, col: "#0ea5e9" },
  { n: "02", title: "Process", items: ["Knowledge Graph", "LLM Chains", "Delay Models", "Cost Engine"], icon: Layers, col: "#8b5cf6" },
  { n: "03", title: "Predict", items: ["Path Analysis", "Allocation AI", "Risk Scoring", "NLP Pipeline"], icon: Brain, col: "#f59e0b" },
  { n: "04", title: "Present", items: ["Role Dashboards", "3D Graph", "Voice UX", "Live Alerts"], icon: Target, col: "#10b981" },
]

// ─── Isometric grid SVG background ──────────────────
function IsometricGrid() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ opacity: 0.07 }}
    >
      <defs>
        <pattern id="iso" x="0" y="0" width="60" height="34.64" patternUnits="userSpaceOnUse">
          <path d="M30 0 L60 17.32 L30 34.64 L0 17.32 Z" fill="none" stroke="currentColor" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#iso)" />
    </svg>
  )
}

// ─── Dot matrix background ───────────────────────────
function DotMatrix({ opacity = 0.06 }: { opacity?: number }) {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ opacity }}
    >
      <defs>
        <pattern id="dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="currentColor" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#dots)" />
    </svg>
  )
}

// ─── Main Component ──────────────────────────────────
export default function LandingPage({ onLaunchDashboard }: LandingPageProps) {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] })
  const rawY = useTransform(scrollYProgress, [0, 1], [0, 100])
  const heroY = useSpring(rawY, { stiffness: 80, damping: 20 })
  const heroOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0])

  return (
    <>
      <style>{fontStyle}</style>
      <div
        className="bg-[#080a0f] text-white overflow-x-hidden"
        style={{ fontFamily: "'JetBrains Mono', monospace" }}
      >

        {/* ═══ NAVBAR ════════════════════════════════════════ */}
        <nav className="fixed top-0 w-full z-50 bg-[#080a0f]/90 backdrop-blur-xl border-b border-white/6">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div 
              className="flex items-baseline cursor-default select-none"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              <span className="text-2xl italic text-[#0ea5e9] tracking-tight">Synth</span>
              <span className="text-xl font-bold ml-0.5 text-white/90 transform -translate-y-[1px]">AI</span>
            </div>

            <div className="hidden md:flex items-center gap-8 text-[11px] uppercase tracking-[0.18em] text-white/40">
              <a href="#features" className="hover:text-white transition-colors duration-200">Features</a>
              <a href="#architecture" className="hover:text-white transition-colors duration-200">Architecture</a>
              <a href="#impact" className="hover:text-white transition-colors duration-200">Impact</a>
            </div>

            <button
              onClick={onLaunchDashboard}
              className="group flex items-center gap-2 px-5 py-2.5 text-[11px] uppercase tracking-[0.15em] bg-[#0ea5e9] text-white font-semibold hover:bg-white hover:text-[#080a0f] transition-all duration-300"
              style={{ clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))" }}
            >
              Launch Dashboard
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </nav>

        {/* ═══ HERO ═══════════════════════════════════════════ */}
        <section
          ref={heroRef}
          className="relative min-h-screen flex items-center pt-24 overflow-hidden"
          style={{ background: "radial-gradient(ellipse 80% 60% at 60% 40%, #0c1829 0%, #080a0f 60%)" }}
        >
          <IsometricGrid />
          <NoiseTexture />

          {/* Blue radial glow */}
          <div
            className="absolute pointer-events-none"
            style={{
              right: "5%", top: "15%",
              width: 600, height: 600,
              background: "radial-gradient(circle, rgba(14,165,233,0.13) 0%, transparent 70%)",
              filter: "blur(40px)",
            }}
          />
          {/* Faint amber bottom-left */}
          <div
            className="absolute pointer-events-none"
            style={{
              left: "-10%", bottom: "10%",
              width: 400, height: 400,
              background: "radial-gradient(circle, rgba(245,158,11,0.06) 0%, transparent 70%)",
              filter: "blur(60px)",
            }}
          />

          <motion.div
            style={{ y: heroY, opacity: heroOpacity }}
            className="relative z-10 max-w-7xl mx-auto px-6 w-full py-16"
          >
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-16 items-center">
              {/* Left: Copy */}
              <motion.div variants={stagger} initial="hidden" animate="show">
                <motion.div variants={fadeUp} className="mb-8">
                  <span
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 text-[10px] uppercase tracking-[0.22em] border text-[#0ea5e9]"
                    style={{ borderColor: "rgba(14,165,233,0.35)", background: "rgba(14,165,233,0.07)" }}
                  >
                    <Sparkles className="w-3 h-3" />
                    AI-Driven Enterprise Intelligence
                  </span>
                </motion.div>

                <motion.h1
                  variants={fadeUp}
                  className="leading-[1.02] tracking-tight mb-6"
                  style={{
                    fontFamily: "'Instrument Serif', serif",
                    fontSize: "clamp(3rem, 6vw, 5.5rem)",
                    fontWeight: 400,
                    color: "#f8fafc",
                  }}
                >
                  Turn raw signals
                  <br />
                  into delivery
                  <br />
                  <span className="italic relative inline-block" style={{ color: "#0ea5e9" }}>
                    intelligence.
                    <svg className="absolute -bottom-2 left-0 w-full" height="6" viewBox="0 0 200 6" preserveAspectRatio="none">
                      <path d="M0 3 Q50 0.5 100 3 Q150 5.5 200 3" stroke="#0ea5e9" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeOpacity="0.65" />
                    </svg>
                  </span>
                </motion.h1>

                <motion.p
                  variants={fadeUp}
                  className="text-[15px] leading-[1.8] mb-10 max-w-lg"
                  style={{ color: "rgba(248,250,252,0.5)", fontFamily: "'JetBrains Mono', monospace" }}
                >
                  Transform commits, tickets, and meetings into actionable business intelligence.
                  Predict delays before they happen. Ship on time, every time.
                </motion.p>

                <motion.div variants={fadeUp} className="flex flex-wrap gap-4 mb-12">
                  <button
                    onClick={onLaunchDashboard}
                    className="group flex items-center gap-3 px-8 py-4 text-[12px] uppercase tracking-[0.15em] font-semibold transition-all duration-300"
                    style={{
                      background: "#0ea5e9",
                      color: "#fff",
                      clipPath: "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))",
                      boxShadow: "0 0 40px rgba(14,165,233,0.3)",
                    }}
                    onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 0 60px rgba(14,165,233,0.5)")}
                    onMouseLeave={e => (e.currentTarget.style.boxShadow = "0 0 40px rgba(14,165,233,0.3)")}
                  >
                    Open Command Center
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <a
                    href="#features"
                    className="flex items-center gap-2 px-8 py-4 text-[12px] uppercase tracking-[0.15em] border hover:bg-white/5 transition-all duration-200"
                    style={{ borderColor: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.6)" }}
                  >
                    Explore Features
                  </a>
                </motion.div>

                {/* Inline metric row */}
                <motion.div
                  variants={fadeUp}
                  className="flex items-stretch mb-10"
                  style={{ border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)" }}
                >
                  {[
                    { val: "40%", label: "Fewer delays" },
                    { val: "3×", label: "Faster allocation" },
                    { val: "7+", label: "AI agents" },
                  ].map((m, i) => (
                    <div
                      key={m.label}
                      className="flex-1 px-4 py-3 text-center"
                      style={{ borderRight: i < 2 ? "1px solid rgba(255,255,255,0.08)" : "none" }}
                    >
                      <div className="text-lg font-bold tabular-nums mb-0.5" style={{ color: "#0ea5e9", fontFamily: "'JetBrains Mono', monospace" }}>{m.val}</div>
                      <div className="text-[9px] uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.3)" }}>{m.label}</div>
                    </div>
                  ))}
                </motion.div>

                {/* Tech Chips */}
                <motion.div variants={fadeUp} className="flex flex-wrap gap-2">
                  {techStack.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 text-[9px] uppercase tracking-[0.15em]"
                      style={{ color: "rgba(255,255,255,0.3)", border: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.02)" }}
                    >
                      {t}
                    </span>
                  ))}
                </motion.div>
              </motion.div>

              {/* Right: Product screenshot */}
              <motion.div
                initial={{ opacity: 0, y: 48 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
                className="hidden xl:block relative"
              >
                {/* Ambient glow */}
                <div
                  className="absolute pointer-events-none -z-10"
                  style={{
                    inset: "-40px",
                    background: "radial-gradient(ellipse at center, rgba(139,92,246,0.22) 0%, rgba(14,165,233,0.12) 40%, transparent 70%)",
                    filter: "blur(28px)",
                  }}
                />

                {/* Top-right badge: Allocation Complete */}
                <motion.div
                  initial={{ opacity: 0, x: 20, y: -8 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ delay: 1.3, duration: 0.5 }}
                  className="absolute -top-5 right-6 z-20 flex items-center gap-2 px-3 py-1.5"
                  style={{
                    background: "rgba(8,10,15,0.95)",
                    border: "1px solid rgba(40,202,65,0.45)",
                    boxShadow: "0 0 20px rgba(40,202,65,0.18)",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-[#28ca41] animate-pulse" />
                  <span className="text-[10px] uppercase tracking-wider" style={{ color: "#28ca41" }}>Allocation Complete</span>
                </motion.div>

                {/* Bottom-left badge: tasks saved */}
                <motion.div
                  initial={{ opacity: 0, x: -20, y: 8 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ delay: 1.65, duration: 0.5 }}
                  className="absolute -bottom-5 left-6 z-20 flex items-center gap-2 px-3 py-1.5"
                  style={{
                    background: "rgba(14,165,233,0.12)",
                    border: "1px solid rgba(14,165,233,0.45)",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  <TrendingUp className="w-3.5 h-3.5" style={{ color: "#0ea5e9" }} />
                  <span className="text-[10px] uppercase tracking-wider font-semibold" style={{ color: "#0ea5e9" }}>AI assigned 4 tasks · 80h saved</span>
                </motion.div>

                {/* Side badge: Live */}
                <motion.div
                  initial={{ opacity: 0, x: 14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.95, duration: 0.5 }}
                  className="absolute top-1/2 -right-4 -translate-y-1/2 z-20 flex flex-col items-center gap-1.5 px-2.5 py-3"
                  style={{
                    background: "rgba(8,10,15,0.95)",
                    border: "1px solid rgba(14,165,233,0.3)",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  <Activity className="w-3 h-3" style={{ color: "#0ea5e9" }} />
                  <span
                    className="text-[8px] uppercase tracking-widest"
                    style={{ writingMode: "vertical-rl", color: "rgba(14,165,233,0.65)" }}
                  >Live</span>
                </motion.div>

                {/* Floating browser frame */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
                  style={{
                    border: "1px solid rgba(255,255,255,0.1)",
                    background: "#0d1117",
                    boxShadow: "0 0 0 1px rgba(139,92,246,0.15), 0 32px 80px rgba(0,0,0,0.7), 0 0 60px rgba(139,92,246,0.12)",
                  }}
                >
                  {/* Browser title bar */}
                  <div
                    className="flex items-center gap-2 px-4 py-2.5"
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.02)" }}
                  >
                    <div className="flex gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#28ca41]" />
                    </div>
                    <div
                      className="flex-1 mx-3 px-3 py-0.5"
                      style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
                    >
                      <span className="text-[10px] tracking-widest" style={{ color: "rgba(255,255,255,0.3)" }}>localhost:5173 — Allocation Graph</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-[#0ea5e9] animate-pulse" />
                      <span className="text-[9px] uppercase tracking-widest" style={{ color: "rgba(14,165,233,0.7)" }}>live</span>
                    </div>
                  </div>
                  {/* Screenshot */}
                  <div className="overflow-hidden">
                    <img
                      src="/image.png"
                      alt="SynthAI Allocation Graph — AI-powered task assignment"
                      className="w-full block"
                      style={{ maxHeight: 400, objectFit: "cover", objectPosition: "top" }}
                    />
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          {/* Scroll cue */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <span className="text-[9px] uppercase tracking-[0.25em]" style={{ color: "rgba(255,255,255,0.2)" }}>Scroll</span>
            <motion.div
              animate={{ y: [0, 7, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="w-px h-8"
              style={{ background: "linear-gradient(to bottom, rgba(14,165,233,0.6), transparent)" }}
            />
          </motion.div>
        </section>

        {/* ═══ IMPACT STATS ════════════════════════════════════ */}
        <section
          id="impact"
          className="relative overflow-hidden"
          style={{ background: "#0d1117", borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}
        >
          <DotMatrix opacity={0.04} />
          <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px" style={{ background: "rgba(255,255,255,0.06)" }}>
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="flex flex-col items-center py-10 px-6"
                  style={{ background: "#0d1117" }}
                >
                  <div
                    className="text-4xl md:text-5xl font-bold mb-2 tabular-nums"
                    style={{ color: "#0ea5e9", fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    <AnimCounter to={s.value} suffix={s.suffix} />
                  </div>
                  <div className="text-[10px] uppercase tracking-[0.18em] text-center" style={{ color: "rgba(255,255,255,0.35)" }}>{s.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ FEATURES (Bento) ════════════════════════════════ */}
        <section
          id="features"
          className="relative py-28 overflow-hidden"
          style={{ background: "#080a0f" }}
        >
          {/* Diagonal rule */}
          <div
            className="absolute top-0 left-0 w-full h-px"
            style={{ background: "linear-gradient(90deg, transparent, rgba(14,165,233,0.4) 40%, rgba(139,92,246,0.4) 70%, transparent)" }}
          />
          <NoiseTexture />

          <div className="relative z-10 max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-end justify-between mb-16 flex-wrap gap-6"
            >
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] mb-3" style={{ color: "#0ea5e9" }}>
                  Platform Capabilities
                </p>
                <h2
                  className="leading-tight"
                  style={{
                    fontFamily: "'Instrument Serif', serif",
                    fontSize: "clamp(2.2rem, 4vw, 3.5rem)",
                    fontWeight: 400,
                    color: "#f8fafc",
                  }}
                >
                  Everything you need.<br />
                  <span className="italic" style={{ color: "rgba(248,250,252,0.45)" }}>Nothing you don't.</span>
                </h2>
              </div>
              <p className="text-sm max-w-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
                Eight integrated modules that transform how engineering teams plan, execute, and deliver.
              </p>
            </motion.div>

            {/* 4×2 uniform grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              {features.map((feat, i) => (
                <motion.div
                  key={feat.title}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: i * 0.05, duration: 0.55 }}
                  className="group relative overflow-hidden p-6 flex flex-col justify-between min-h-50 cursor-default"
                  style={{
                    background: "#0d1117",
                    border: "1px solid rgba(255,255,255,0.07)",
                    transition: "border-color 0.3s, box-shadow 0.3s",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = feat.color + "55"
                    e.currentTarget.style.boxShadow = `0 0 30px ${feat.color}14`
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"
                    e.currentTarget.style.boxShadow = "none"
                  }}
                >
                  {/* Color sweep on hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ background: `radial-gradient(ellipse at top left, ${feat.color}12 0%, transparent 70%)` }}
                  />

                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-5">
                      <div
                        className="w-10 h-10 flex items-center justify-center"
                        style={{ background: feat.color + "18", border: `1px solid ${feat.color}40` }}
                      >
                        <feat.icon className="w-5 h-5" style={{ color: feat.color }} />
                      </div>
                      <span
                        className="text-[9px] uppercase tracking-[0.15em] px-2 py-0.5"
                        style={{ color: feat.color, border: `1px solid ${feat.color}40`, background: feat.color + "0d" }}
                      >
                        {feat.tag}
                      </span>
                    </div>
                    <h3 className="text-base font-semibold mb-2" style={{ color: "#f1f5f9" }}>
                      {feat.title}
                    </h3>
                    <p className="text-[13px] leading-relaxed" style={{ color: "rgba(255,255,255,0.4)" }}>
                      {feat.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ ARCHITECTURE PIPELINE ═══════════════════════════ */}
        <section
          id="architecture"
          className="relative py-28 overflow-hidden"
          style={{ background: "#0a0c12" }}
        >
          {/* Top + bottom edge rules */}
          <div
            className="absolute top-0 left-0 w-full h-px"
            style={{ background: "linear-gradient(90deg, transparent, rgba(245,158,11,0.45) 50%, transparent)" }}
          />
          <div
            className="absolute bottom-0 left-0 w-full h-px"
            style={{ background: "linear-gradient(90deg, transparent, rgba(14,165,233,0.25) 50%, transparent)" }}
          />

          {/* Circuit background */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.035]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="circuit" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                <path d="M0 40 H80 M40 0 V80" stroke="currentColor" strokeWidth="0.5" fill="none" />
                <circle cx="40" cy="40" r="2" fill="currentColor" />
                <circle cx="0" cy="40" r="1.5" fill="currentColor" />
                <circle cx="80" cy="40" r="1.5" fill="currentColor" />
                <circle cx="40" cy="0" r="1.5" fill="currentColor" />
                <circle cx="40" cy="80" r="1.5" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#circuit)" />
          </svg>
          <NoiseTexture />

          {/* Ambient glow */}
          <div
            className="absolute pointer-events-none"
            style={{
              left: "50%", top: "30%",
              transform: "translate(-50%, -50%)",
              width: 800, height: 400,
              background: "radial-gradient(ellipse, rgba(245,158,11,0.06) 0%, rgba(14,165,233,0.04) 40%, transparent 70%)",
              filter: "blur(40px)",
            }}
          />

          <div className="relative z-10 max-w-7xl mx-auto px-6">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="h-px w-12" style={{ background: "rgba(245,158,11,0.5)" }} />
                <p className="text-[10px] uppercase tracking-[0.3em]" style={{ color: "#f59e0b" }}>
                  Technical Architecture
                </p>
                <div className="h-px w-12" style={{ background: "rgba(245,158,11,0.5)" }} />
              </div>
              <h2
                className="mb-4"
                style={{
                  fontFamily: "'Instrument Serif', serif",
                  fontSize: "clamp(2.2rem, 4vw, 3.5rem)",
                  fontWeight: 400,
                  color: "#f8fafc",
                }}
              >
                Built for scale.{" "}
                <span className="italic" style={{ color: "rgba(248,250,252,0.4)" }}>Event-driven by design.</span>
              </h2>
              <p className="text-sm max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.35)", fontFamily: "'JetBrains Mono', monospace" }}>
                Four orchestrated layers transform raw engineering signals into actionable intelligence — in real time.
              </p>
            </motion.div>

            {/* ── Stage pipeline row ─────────────────────────────── */}
            <div className="relative mb-6">
              {/* Horizontal connector beam */}
              <div
                className="hidden md:block absolute z-0"
                style={{
                  top: 44,
                  left: "calc(12.5% + 28px)",
                  right: "calc(12.5% + 28px)",
                  height: 2,
                  background: "linear-gradient(90deg, #0ea5e9 0%, #8b5cf6 33%, #f59e0b 66%, #10b981 100%)",
                  opacity: 0.5,
                }}
              />
              {/* Arrow heads */}
              {[0, 1, 2].map(i => (
                <div
                  key={i}
                  className="hidden md:block absolute z-10"
                  style={{
                    top: 37,
                    left: `calc(${25 * (i + 1)}% - 6px)`,
                    width: 0, height: 0,
                    borderTop: "8px solid transparent",
                    borderBottom: "8px solid transparent",
                    borderLeft: `10px solid ${["#8b5cf6", "#f59e0b", "#10b981"][i]}`,
                    opacity: 0.7,
                  }}
                />
              ))}

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative z-10">
                {pipelineLayers.map((l, i) => (
                  <motion.div
                    key={l.title}
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.13, duration: 0.6 }}
                    className="flex flex-col items-center text-center"
                  >
                    {/* Stage node */}
                    <div
                      className="relative w-22 h-22 flex flex-col items-center justify-center mb-5"
                      style={{
                        backgroundImage: `linear-gradient(135deg, ${l.col}18 0%, ${l.col}08 100%)`,
                        backgroundColor: "#0a0c12",
                        border: `1.5px solid ${l.col}50`,
                        boxShadow: `0 0 28px ${l.col}22, inset 0 0 20px ${l.col}08`,
                      }}
                    >
                      <l.icon className="w-6 h-6 mb-1" style={{ color: l.col }} />
                      <span
                        className="text-[9px] uppercase tracking-widest font-bold"
                        style={{ color: l.col + "cc" }}
                      >{l.n}</span>
                      {/* Corner accents */}
                      <span className="absolute top-1 left-1 w-2 h-2 border-t border-l" style={{ borderColor: l.col + "80" }} />
                      <span className="absolute top-1 right-1 w-2 h-2 border-t border-r" style={{ borderColor: l.col + "80" }} />
                      <span className="absolute bottom-1 left-1 w-2 h-2 border-b border-l" style={{ borderColor: l.col + "80" }} />
                      <span className="absolute bottom-1 right-1 w-2 h-2 border-b border-r" style={{ borderColor: l.col + "80" }} />
                    </div>

                    <h3 className="text-sm font-bold uppercase tracking-wider mb-1" style={{ color: "#f1f5f9" }}>
                      {l.title}
                    </h3>
                    <p className="text-[11px] font-mono" style={{ color: l.col + "99" }}>Layer {l.n}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* ── Detail cards row ──────────────────────────────── */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-14">
              {pipelineLayers.map((l, i) => (
                <motion.div
                  key={l.title + "-detail"}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.55 }}
                  className="p-4 relative overflow-hidden"
                  style={{
                    background: "rgba(255,255,255,0.015)",
                    border: `1px solid ${l.col}28`,
                    borderTop: `2px solid ${l.col}60`,
                  }}
                >
                  {l.items.map((item, j) => (
                    <div
                      key={item}
                      className="flex items-center gap-2.5 py-1.5 text-[11px] font-mono"
                      style={{
                        color: "rgba(255,255,255,0.5)",
                        borderBottom: j < l.items.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                      }}
                    >
                      <span
                        className="shrink-0 w-4 h-4 flex items-center justify-center text-[8px] font-bold"
                        style={{ background: l.col + "20", color: l.col, border: `1px solid ${l.col}40` }}
                      >
                        {j + 1}
                      </span>
                      {item}
                    </div>
                  ))}
                </motion.div>
              ))}
            </div>

            {/* ── Bottom callout row ────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.55 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              {[
                {
                  label: "Event Loop",
                  value: "< 200ms",
                  sub: "GitHub webhook → graph update latency",
                  col: "#0ea5e9",
                  icon: Activity,
                },
                {
                  label: "LLM Chains",
                  value: "4-stage",
                  sub: "Sequential reasoning: ingest → rank → assign → explain",
                  col: "#8b5cf6",
                  icon: Brain,
                },
                {
                  label: "Data Sources",
                  value: "6+",
                  sub: "GitHub, Jira, voice, transcripts, HR, finance",
                  col: "#10b981",
                  icon: Layers,
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-start gap-4 p-5"
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    borderLeft: `3px solid ${stat.col}`,
                  }}
                >
                  <div
                    className="shrink-0 w-10 h-10 flex items-center justify-center mt-0.5"
                    style={{ background: stat.col + "15", border: `1px solid ${stat.col}35` }}
                  >
                    <stat.icon className="w-4.5 h-4.5" style={{ color: stat.col }} />
                  </div>
                  <div>
                    <div className="text-[9px] uppercase tracking-[0.2em] mb-0.5 font-mono" style={{ color: stat.col + "99" }}>{stat.label}</div>
                    <div className="text-2xl font-bold font-mono mb-1" style={{ color: stat.col }}>{stat.value}</div>
                    <div className="text-[11px] leading-relaxed" style={{ color: "rgba(255,255,255,0.35)" }}>{stat.sub}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ═══ HOW IT WORKS ════════════════════════════════════ */}
        <section
          className="relative py-28 overflow-hidden"
          style={{ background: "#080a0f" }}
        >
          <div
            className="absolute top-0 left-0 w-full h-px"
            style={{ background: "linear-gradient(90deg, transparent, rgba(139,92,246,0.5) 50%, transparent)" }}
          />
          <DotMatrix opacity={0.035} />

          <div className="relative z-10 max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <p className="text-[10px] uppercase tracking-[0.25em] mb-3" style={{ color: "#8b5cf6" }}>Workflow</p>
              <h2
                style={{
                  fontFamily: "'Instrument Serif', serif",
                  fontSize: "clamp(2.2rem, 4vw, 3.5rem)",
                  fontWeight: 400,
                  color: "#f8fafc",
                }}
              >
                From chaos{" "}
                <span className="italic" style={{ color: "rgba(248,250,252,0.4)" }}>to clarity.</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              {[
                {
                  n: "01",
                  title: "Ingest & Map",
                  desc: "Connect GitHub and Jira. The platform builds a living knowledge graph of your codebase, team, and all project dependencies automatically.",
                  col: "#0ea5e9",
                  icon: GitBranch,
                },
                {
                  n: "02",
                  title: "Analyze & Predict",
                  desc: "AI models continuously analyze velocity, workload, and dependency signals. Get proactive alerts before deadlines slip — not after.",
                  col: "#f59e0b",
                  icon: TrendingUp,
                },
                {
                  n: "03",
                  title: "Act & Optimize",
                  desc: "Smart allocation assigns the right people. Meeting bots auto-generate Jira tickets. Voice queries surface insights hands-free.",
                  col: "#10b981",
                  icon: Zap,
                },
              ].map((step, i) => (
                <motion.div
                  key={step.n}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.13, duration: 0.6 }}
                  className="relative"
                >
                  {/* Large ghost number */}
                  <div
                    className="text-[120px] leading-none font-bold select-none absolute -top-8 -left-2 pointer-events-none"
                    style={{
                      color: step.col,
                      opacity: 0.06,
                      fontFamily: "'JetBrains Mono', monospace",
                    }}
                  >
                    {step.n}
                  </div>
                  <div className="relative z-10">
                    <div
                      className="w-12 h-12 flex items-center justify-center mb-5"
                      style={{ background: step.col + "15", border: `1px solid ${step.col}40` }}
                    >
                      <step.icon className="w-5 h-5" style={{ color: step.col }} />
                    </div>
                    <div className="text-[9px] uppercase tracking-[0.2em] mb-2 font-medium" style={{ color: step.col }}>
                      Step {step.n}
                    </div>
                    <h3 className="text-lg font-semibold mb-3" style={{ color: "#f1f5f9" }}>{step.title}</h3>
                    <p className="text-[13px] leading-[1.8]" style={{ color: "rgba(255,255,255,0.4)" }}>{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ CTA ══════════════════════════════════════════════ */}
        <section
          className="relative py-36 overflow-hidden"
          style={{ background: "#0d1117" }}
        >
          {/* Top edge line */}
          <div
            className="absolute top-0 left-0 w-full h-px"
            style={{ background: "linear-gradient(90deg, transparent, rgba(14,165,233,0.6) 30%, rgba(139,92,246,0.6) 70%, transparent)" }}
          />
          <IsometricGrid />
          <NoiseTexture />

          {/* Central glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 60% 70% at 50% 50%, rgba(14,165,233,0.07) 0%, transparent 70%)" }}
          />

          <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <p className="text-[10px] uppercase tracking-[0.25em] mb-6" style={{ color: "#0ea5e9" }}>
                Ready to ship?
              </p>
              <h2
                className="mb-6 leading-[1.05]"
                style={{
                  fontFamily: "'Instrument Serif', serif",
                  fontSize: "clamp(2.8rem, 5vw, 4.5rem)",
                  fontWeight: 400,
                  color: "#f8fafc",
                }}
              >
                Stop guessing.
                <br />
                Start{" "}
                <span className="italic" style={{ color: "#0ea5e9" }}>shipping.</span>
              </h2>
              <p
                className="text-sm mb-10 leading-relaxed"
                style={{ color: "rgba(255,255,255,0.35)" }}
              >
                Your engineering data already has the answers.
                <br />
                Let AI surface them before your next standup.
              </p>

              <button
                onClick={onLaunchDashboard}
                className="group inline-flex items-center gap-3 px-10 py-5 text-[12px] uppercase tracking-[0.2em] font-semibold transition-all duration-300"
                style={{
                  background: "transparent",
                  color: "#0ea5e9",
                  border: "1px solid rgba(14,165,233,0.5)",
                  clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))",
                  boxShadow: "inset 0 0 0 0 #0ea5e9",
                  transition: "all 0.35s ease",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = "#0ea5e9"
                  e.currentTarget.style.color = "#080a0f"
                  e.currentTarget.style.boxShadow = "0 0 50px rgba(14,165,233,0.4)"
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = "transparent"
                  e.currentTarget.style.color = "#0ea5e9"
                  e.currentTarget.style.boxShadow = "none"
                }}
              >
                Launch Command Center
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </div>
        </section>

        {/* ═══ FOOTER ════════════════════════════════════════════ */}
        <footer
          className="relative py-8 overflow-hidden"
          style={{ background: "#080a0f", borderTop: "1px solid rgba(255,255,255,0.05)" }}
        >
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div 
              className="flex items-baseline cursor-default select-none"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              <span className="text-xl italic text-[#0ea5e9]/70 tracking-tight">Synth</span>
              <span className="text-lg font-bold ml-0.5 text-white/30 transform -translate-y-[1px]">AI</span>
              <span className="ml-4 text-[10px] uppercase tracking-[0.25em]" style={{ color: "rgba(255,255,255,0.15)", fontFamily: "'JetBrains Mono', monospace" }}>
                Enterprise Delivery Intelligence
              </span>
            </div>
            <div className="flex items-center gap-4 text-[10px] uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.2)" }}>
              {["React 18", "Node.js", "Neo4j", "LangChain"].map((t, i, arr) => (
                <span key={t} className="flex items-center gap-4">
                  {t}
                  {i < arr.length - 1 && <span style={{ color: "rgba(255,255,255,0.1)" }}>·</span>}
                </span>
              ))}
            </div>
          </div>
        </footer>

      </div>
    </>
  )
}
