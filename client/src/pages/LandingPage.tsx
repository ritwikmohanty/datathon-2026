import { motion, useScroll, useTransform, useSpring, type Variants } from "framer-motion"
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
  Sparkles,
  TrendingUp,
  ChevronRight,
  CheckCircle2,
} from "lucide-react"

// ─── Google Font injection (Instrument Serif for display) ──
const fontStyle = `
  @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap');
`

interface LandingPageProps {
  onLaunchDashboard: () => void
}

// --- Animation variants ---
const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
}
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
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

// ─── Dot matrix pattern ────────────────────────────
function DotMatrix({ opacity = 0.05 }: { opacity?: number }) {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg" style={{ opacity }}>
      <defs>
        <pattern id="lp-dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="currentColor" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#lp-dots)" />
    </svg>
  )
}

// ─── Cross-hatch grid pattern ──────────────────────
function GridPattern({ opacity = 0.04 }: { opacity?: number }) {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg" style={{ opacity }}>
      <defs>
        <pattern id="lp-grid" x="0" y="0" width="48" height="48" patternUnits="userSpaceOnUse">
          <path d="M48 0 V48 H0" fill="none" stroke="currentColor" strokeWidth="0.75" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#lp-grid)" />
    </svg>
  )
}

// ─── Data ───────────────────────────────────────────
const features = [
  {
    icon: Network,
    title: "Knowledge Graph",
    desc: "Dynamic Neo4j dependency mapping with interactive 3D visualization. Real-time conflict detection and expertise clustering.",
    tag: "NEO4J · 3D",
  },
  {
    icon: Brain,
    title: "Smart Allocation",
    desc: "LangChain-powered task assignment. Epics decompose into stories based on developer capacity and graph insights.",
    tag: "LANGCHAIN · AI",
  },
  {
    icon: Activity,
    title: "Delay Prediction",
    desc: "scikit-learn models forecast critical-path delays from commit velocity and sprint burndown. 40% fewer missed deadlines.",
    tag: "ML · SCIKIT",
  },
  {
    icon: FileText,
    title: "Meeting Intelligence",
    desc: "AI transcribes standups, extracts action items, and auto-generates Jira tickets with full hierarchy and assignments.",
    tag: "AUTO-TICKET",
  },
  {
    icon: Mic,
    title: "Voice Assistant",
    desc: "Ask in English or regional languages powered by Sarvam AI. Get spoken responses with live data visualizations.",
    tag: "SARVAM AI",
  },
  {
    icon: DollarSign,
    title: "Financial Intelligence",
    desc: "Sprint-level CapEx/OpEx tracking, budget vs. actual, ROI per feature, and trajectory-based forecasting.",
    tag: "CAPEX · OPEX",
  },
  {
    icon: Users,
    title: "HR Analytics",
    desc: "AI-generated appraisal summaries, promotion readiness scores, and retention risk analysis from real contribution data.",
    tag: "AI REPORTS",
  },
  {
    icon: Shield,
    title: "Role Dashboards",
    desc: "Tailored views for Project Managers, HR, and Executives. Each role sees the exact metrics that drive their decisions.",
    tag: "RBAC",
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
  { n: "01", title: "Ingest", items: ["GitHub Webhooks", "Jira Sync", "Transcripts", "Voice Input"], icon: GitBranch },
  { n: "02", title: "Process", items: ["Knowledge Graph", "LLM Chains", "Delay Models", "Cost Engine"], icon: Layers },
  { n: "03", title: "Predict", items: ["Path Analysis", "Allocation AI", "Risk Scoring", "NLP Pipeline"], icon: Brain },
  { n: "04", title: "Present", items: ["Role Dashboards", "3D Graph", "Voice UX", "Live Alerts"], icon: Target },
]

// ─── Main Component ──────────────────────────────────
export default function LandingPage({ onLaunchDashboard }: LandingPageProps) {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] })
  const rawY = useTransform(scrollYProgress, [0, 1], [0, 80])
  const heroY = useSpring(rawY, { stiffness: 80, damping: 20 })
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <>
      <style>{fontStyle}</style>
      <div className="bg-background text-foreground overflow-x-hidden">

        {/* ═══ NAVBAR ════════════════════════════════════════ */}
        <nav className="fixed top-0 w-full z-50 bg-background/95 backdrop-blur-md border-b-2 border-foreground">
          <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-accent flex items-center justify-center">
                <Zap className="w-4 h-4 text-accent-foreground" />
              </div>
              <span className="font-mono text-sm font-bold tracking-[0.15em] uppercase">
                Synth<span className="text-accent">AI</span>
              </span>
            </div>

            <div className="hidden md:flex items-center gap-8 text-[11px] font-mono uppercase tracking-[0.18em] text-muted-foreground">
              <a href="#features" className="hover:text-foreground transition-colors">Features</a>
              <a href="#architecture" className="hover:text-foreground transition-colors">Architecture</a>
              <a href="#impact" className="hover:text-foreground transition-colors">Impact</a>
            </div>

            <button
              onClick={onLaunchDashboard}
              className="flex items-center gap-2 px-5 py-2 text-[11px] font-mono uppercase tracking-[0.15em] border-2 border-foreground bg-foreground text-background hover:bg-accent hover:border-accent transition-all duration-200 shadow-[3px_3px_0px_0px_hsl(var(--accent))]"
            >
              Launch Dashboard
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </nav>

        {/* ═══ HERO ═══════════════════════════════════════════ */}
        <section
          ref={heroRef}
          className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-background"
        >
          {/* Dot matrix */}
          <div className="text-foreground">
            <DotMatrix opacity={0.05} />
          </div>

          {/* Accent glow blobs */}
          <div
            className="absolute pointer-events-none"
            style={{
              right: "0%", top: "20%",
              width: 500, height: 500,
              background: "radial-gradient(circle, hsl(217 100% 50% / 0.07) 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute pointer-events-none"
            style={{
              left: "5%", bottom: "15%",
              width: 350, height: 350,
              background: "radial-gradient(circle, hsl(217 100% 50% / 0.04) 0%, transparent 70%)",
            }}
          />

          <motion.div
            style={{ y: heroY, opacity: heroOpacity }}
            className="relative z-10 max-w-7xl mx-auto px-6 w-full py-20"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-center">

              {/* ── Left: Copy ───────────────────────────────── */}
              <motion.div variants={stagger} initial="hidden" animate="show">
                <motion.div variants={fadeUp} className="mb-7">
                  <span className="inline-flex items-center gap-2 px-3.5 py-1.5 text-[10px] font-mono uppercase tracking-[0.22em] border-2 border-accent/40 text-accent bg-accent/5">
                    <Sparkles className="w-3 h-3" />
                    AI-Driven Enterprise Intelligence
                  </span>
                </motion.div>

                <motion.h1
                  variants={fadeUp}
                  className="leading-[1.02] tracking-tight mb-6"
                  style={{
                    fontFamily: "'Instrument Serif', serif",
                    fontSize: "clamp(2.8rem, 5vw, 5rem)",
                    fontWeight: 400,
                  }}
                >
                  Turn raw signals
                  <br />
                  into delivery
                  <br />
                  <span
                    className="italic"
                    style={{ color: "hsl(var(--accent))" }}
                  >
                    intelligence.
                  </span>
                </motion.h1>

                <motion.p
                  variants={fadeUp}
                  className="text-base leading-[1.85] text-muted-foreground mb-8 max-w-lg font-mono"
                >
                  Transform commits, tickets, and meetings into actionable business
                  intelligence. Predict delays before they happen. Allocate the right
                  people with AI. Ship on time, every time.
                </motion.p>

                <motion.div variants={fadeUp} className="flex flex-wrap gap-4 mb-10">
                  <button
                    onClick={onLaunchDashboard}
                    className="group flex items-center gap-3 px-7 py-3.5 text-xs font-mono uppercase tracking-[0.15em] border-2 border-foreground bg-foreground text-background hover:bg-accent hover:border-accent transition-all duration-200 shadow-[4px_4px_0px_0px_hsl(var(--accent))] hover:shadow-[5px_5px_0px_0px_hsl(var(--foreground))]"
                  >
                    Open Command Center
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <a
                    href="#features"
                    className="flex items-center gap-2 px-7 py-3.5 text-xs font-mono uppercase tracking-[0.15em] border-2 border-border hover:border-foreground transition-all duration-200"
                  >
                    Explore Features
                  </a>
                </motion.div>

                {/* Checklist */}
                <motion.ul variants={fadeUp} className="space-y-2">
                  {["Event-driven GitHub & Jira ingestion", "3D knowledge graph with Neo4j", "40% fewer missed deadlines via ML"].map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-xs font-mono text-muted-foreground">
                      <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0" />
                      {item}
                    </li>
                  ))}
                </motion.ul>
              </motion.div>

              {/* ── Right: Product screenshot ─────────────────── */}
              <motion.div
                initial={{ opacity: 0, y: 48 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="relative hidden lg:block"
              >
                {/* Floating badge */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2, duration: 0.6 }}
                  className="absolute -top-4 -right-2 z-20 border-2 border-foreground bg-background px-3 py-2 shadow-[3px_3px_0px_0px_hsl(var(--accent))]"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[10px] font-mono uppercase tracking-wider">Allocation Complete</span>
                  </div>
                </motion.div>

                {/* Floating stat pill */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.5, duration: 0.6 }}
                  className="absolute -bottom-4 -left-2 z-20 border-2 border-foreground bg-accent text-accent-foreground px-4 py-2 shadow-[3px_3px_0px_0px_hsl(var(--foreground))]"
                >
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider">AI assigned 4 tasks · 80h saved</span>
                  </div>
                </motion.div>

                {/* Browser chrome frame */}
                <div className="border-2 border-foreground bg-background shadow-[8px_8px_0px_0px_hsl(var(--foreground))]">
                  {/* Title bar */}
                  <div className="flex items-center gap-2 px-4 py-2.5 border-b-2 border-foreground bg-muted/50">
                    <div className="flex gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-destructive/70" />
                      <span className="w-2.5 h-2.5 rounded-full bg-warning/70" />
                      <span className="w-2.5 h-2.5 rounded-full bg-success/70" />
                    </div>
                    <div className="flex-1 mx-4 bg-background border border-border px-3 py-0.5">
                      <span className="text-[10px] font-mono text-muted-foreground">localhost:5173 — Allocation Graph</span>
                    </div>
                    <div className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse" />
                  </div>
                  {/* Screenshot */}
                  <div className="overflow-hidden">
                    <img
                      src="/image.png"
                      alt="SynthAI Allocation Graph — AI-powered task assignment"
                      className="w-full block"
                      style={{ maxHeight: 380, objectFit: "cover", objectPosition: "top" }}
                    />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Tech stack chips */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.6 }}
              className="flex flex-wrap gap-2 mt-16 pt-10 border-t-2 border-border"
            >
              <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground mr-2 self-center">Built with:</span>
              {techStack.map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 text-[9px] font-mono uppercase tracking-wider text-muted-foreground border border-border bg-muted/40 hover:border-accent hover:text-accent transition-colors duration-200 cursor-default"
                >
                  {t}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* Scroll cue */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="w-px h-10 bg-linear-to-b from-accent to-transparent"
            />
            <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-muted-foreground">Scroll</span>
          </motion.div>
        </section>

        {/* ═══ IMPACT STATS (inverted) ═════════════════════════ */}
        <section
          id="impact"
          className="border-y-2 border-foreground bg-foreground text-background relative overflow-hidden"
        >
          <div className="text-background/10">
            <DotMatrix opacity={0.08} />
          </div>
          <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className={`p-10 text-center ${i < 3 ? "border-r border-background/10" : ""} ${i < 2 ? "border-b md:border-b-0 border-background/10" : ""}`}
              >
                <div className="text-4xl md:text-5xl font-bold font-mono mb-2 text-accent">
                  <AnimCounter to={s.value} suffix={s.suffix} />
                </div>
                <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-background/50">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ═══ FEATURES 4×2 GRID ════════════════════════════════ */}
        <section
          id="features"
          className="relative py-28 bg-background overflow-hidden"
        >
          <div className="text-foreground">
            <GridPattern opacity={0.035} />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-end justify-between mb-14 flex-wrap gap-6"
            >
              <div>
                <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-accent mb-3">Platform Capabilities</p>
                <h2
                  style={{
                    fontFamily: "'Instrument Serif', serif",
                    fontSize: "clamp(2rem, 3.5vw, 3rem)",
                    fontWeight: 400,
                  }}
                >
                  Everything you need.{" "}
                  <span className="italic text-muted-foreground">Nothing you don't.</span>
                </h2>
              </div>
              <p className="text-sm font-mono text-muted-foreground max-w-xs">
                Eight modules. One platform. Zero context switching.
              </p>
            </motion.div>

            {/* 4 × 2 uniform grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {features.map((feat, i) => (
                <motion.div
                  key={feat.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ delay: i * 0.055, duration: 0.5 }}
                  className="group relative border-2 border-border hover:border-foreground bg-card p-6 flex flex-col gap-4 transition-all duration-300 hover:shadow-[4px_4px_0px_0px_hsl(var(--foreground))] cursor-default"
                >
                  {/* Subtle accent sweep on hover */}
                  <div className="absolute inset-0 bg-accent/3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                  <div className="relative z-10 flex items-start justify-between">
                    <div className="p-2.5 border-2 border-border bg-background group-hover:border-foreground group-hover:bg-foreground group-hover:text-background transition-all duration-200">
                      <feat.icon className="w-4 h-4" />
                    </div>
                    <span className="text-[8px] font-mono uppercase tracking-[0.15em] text-muted-foreground border border-border px-2 py-0.5 group-hover:border-accent group-hover:text-accent transition-colors duration-200">
                      {feat.tag}
                    </span>
                  </div>

                  <div className="relative z-10">
                    <h3 className="text-sm font-bold mb-1.5">{feat.title}</h3>
                    <p className="text-[12px] text-muted-foreground leading-relaxed">{feat.desc}</p>
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
          style={{ background: "hsl(var(--muted) / 0.3)" }}
        >
          <div
            className="absolute top-0 left-0 w-full h-0.5"
            style={{ background: "linear-gradient(90deg, transparent, hsl(var(--accent) / 0.5) 50%, transparent)" }}
          />
          <div
            className="absolute bottom-0 left-0 w-full h-0.5"
            style={{ background: "linear-gradient(90deg, transparent, hsl(var(--accent) / 0.5) 50%, transparent)" }}
          />
          <div className="text-foreground">
            <DotMatrix opacity={0.04} />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-accent mb-3">Technical Architecture</p>
              <h2
                style={{
                  fontFamily: "'Instrument Serif', serif",
                  fontSize: "clamp(2rem, 3.5vw, 3rem)",
                  fontWeight: 400,
                }}
              >
                Built for scale.{" "}
                <span className="italic text-muted-foreground">Event-driven by design.</span>
              </h2>
            </motion.div>

            {/* Pipeline */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-0 relative">
              {/* Gradient connector */}
              <div
                className="hidden md:block absolute top-9.5 left-[calc(12.5%+8px)] right-[calc(12.5%+8px)] h-0.5 z-0"
                style={{ background: "linear-gradient(90deg, hsl(var(--accent)), hsl(var(--accent) / 0.2))" }}
              />

              {pipelineLayers.map((l, i) => (
                <motion.div
                  key={l.title}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12, duration: 0.55 }}
                  className="flex flex-col items-center text-center px-4 pb-8"
                >
                  {/* Node circle */}
                  <div className="relative z-10 w-19 h-19 flex items-center justify-center mb-6 border-2 border-foreground bg-background shadow-[3px_3px_0px_0px_hsl(var(--accent))]">
                    <l.icon className="w-7 h-7" />
                    <span className="absolute -top-3 -right-3 bg-accent text-accent-foreground text-[9px] font-mono font-bold px-1.5 py-0.5">
                      {l.n}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold font-mono uppercase tracking-wider mb-4">{l.title}</h3>

                  <div className="w-full border-2 border-border bg-card p-4">
                    {l.items.map((item, j) => (
                      <div
                        key={item}
                        className={`text-[11px] font-mono py-1.5 flex items-center gap-2 text-left ${j < l.items.length - 1 ? "border-b border-border" : ""}`}
                      >
                        <span className="w-1 h-1 bg-accent rounded-full shrink-0" />
                        <span className="text-muted-foreground">{item}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ HOW IT WORKS ════════════════════════════════════ */}
        <section className="relative py-28 bg-background overflow-hidden">
          <div className="text-foreground">
            <GridPattern opacity={0.035} />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-accent mb-3">Workflow</p>
              <h2
                style={{
                  fontFamily: "'Instrument Serif', serif",
                  fontSize: "clamp(2rem, 3.5vw, 3rem)",
                  fontWeight: 400,
                }}
              >
                From chaos{" "}
                <span className="italic text-muted-foreground">to clarity.</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              {[
                {
                  n: "01",
                  title: "Ingest & Map",
                  desc: "Connect GitHub and Jira. The platform builds a living knowledge graph of your codebase, team, and all project dependencies automatically.",
                  icon: GitBranch,
                },
                {
                  n: "02",
                  title: "Analyze & Predict",
                  desc: "AI models continuously analyze velocity, workload, and dependency signals. Get proactive alerts before deadlines slip — not after.",
                  icon: TrendingUp,
                },
                {
                  n: "03",
                  title: "Act & Optimize",
                  desc: "Smart allocation assigns the right people. Meeting bots auto-generate Jira tickets. Voice queries surface insights hands-free.",
                  icon: Zap,
                },
              ].map((step, i) => (
                <motion.div
                  key={step.n}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.13, duration: 0.55 }}
                  className="relative border-2 border-border bg-card p-7 hover:border-foreground hover:shadow-[4px_4px_0px_0px_hsl(var(--foreground))] transition-all duration-300"
                >
                  {/* Ghost number */}
                  <span
                    className="absolute -top-5 -right-2 text-[80px] font-bold font-mono leading-none select-none pointer-events-none"
                    style={{ color: "hsl(var(--muted))", zIndex: 0 }}
                  >
                    {step.n}
                  </span>
                  <div className="relative z-10">
                    <div className="p-3 border-2 border-foreground bg-foreground text-background inline-block mb-5">
                      <step.icon className="w-5 h-5" />
                    </div>
                    <div className="text-[9px] font-mono uppercase tracking-[0.2em] text-accent mb-2">Step {step.n}</div>
                    <h3 className="text-lg font-bold mb-3">{step.title}</h3>
                    <p className="text-sm font-mono text-muted-foreground leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ CTA (inverted) ══════════════════════════════════ */}
        <section className="relative py-32 bg-foreground text-background overflow-hidden border-t-2 border-foreground">
          <div className="text-background/10">
            <DotMatrix opacity={0.07} />
          </div>
          {/* Accent glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 60% 80% at 50% 50%, hsl(217 100% 50% / 0.1) 0%, transparent 70%)" }}
          />

          <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65 }}
            >
              <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-accent mb-6">Ready to ship?</p>
              <h2
                className="mb-6 leading-tight"
                style={{
                  fontFamily: "'Instrument Serif', serif",
                  fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                  fontWeight: 400,
                }}
              >
                Stop guessing.
                <br />
                Start{" "}
                <span className="italic text-accent">shipping.</span>
              </h2>
              <p className="text-sm font-mono text-background/50 max-w-lg mx-auto mb-10">
                Your engineering data already has the answers.
                Let AI surface them before your next standup.
              </p>

              <button
                onClick={onLaunchDashboard}
                className="group inline-flex items-center gap-3 px-10 py-4 text-xs font-mono uppercase tracking-[0.18em] font-bold border-2 border-background bg-background text-foreground hover:bg-accent hover:text-accent-foreground hover:border-accent transition-all duration-300 shadow-[5px_5px_0px_0px_hsl(var(--accent))]"
              >
                Launch Command Center
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </div>
        </section>

        {/* ═══ FOOTER ════════════════════════════════════════════ */}
        <footer className="border-t-2 border-border bg-background py-7">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-accent flex items-center justify-center">
                <Zap className="w-3 h-3 text-accent-foreground" />
              </div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
                SynthAI — Enterprise Delivery Intelligence
              </span>
            </div>
            <div className="flex items-center gap-5 text-[10px] font-mono text-muted-foreground">
              {["React 18", "Node.js", "Neo4j", "LangChain"].map((t, i, arr) => (
                <span key={t} className="flex items-center gap-5">
                  {t}
                  {i < arr.length - 1 && <span className="text-border">·</span>}
                </span>
              ))}
            </div>
          </div>
        </footer>

      </div>
    </>
  )
}
