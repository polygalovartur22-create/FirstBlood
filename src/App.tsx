import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import "@fontsource/road-rage/400.css";

/* ───────────── DATA (сохранили для будущего возврата) ───────────── */

export const TEAMS = [
  { name: "Team Phantom", tag: "PHM", region: "CIS", seed: 1 },
  { name: "Shadow Wolves", tag: "SHW", region: "EU", seed: 2 },
  { name: "Crimson Tide", tag: "CRT", region: "CIS", seed: 3 },
  { name: "Northern Lights", tag: "NLG", region: "EU", seed: 4 },
  { name: "Dark Horizon", tag: "DHZ", region: "CIS", seed: 5 },
  { name: "Apex Predators", tag: "APX", region: "SEA", seed: 6 },
  { name: "Eternal Flame", tag: "ETF", region: "CIS", seed: 7 },
  { name: "Ice Breakers", tag: "ICB", region: "EU", seed: 8 },
];

export const MATCHES_DAY1 = [
  { id: 1, teamA: "TBD", tagA: "---", scoreA: "-", teamB: "TBD", tagB: "---", scoreB: "-", time: "18:00", stage: "Групповой этап" },
  { id: 2, teamA: "TBD", tagA: "---", scoreA: "-", teamB: "TBD", tagB: "---", scoreB: "-", time: "19:00", stage: "Групповой этап" },
  { id: 3, teamA: "TBD", tagA: "---", scoreA: "-", teamB: "TBD", tagB: "---", scoreB: "-", time: "20:00", stage: "Групповой этап" },
  { id: 4, teamA: "TBD", tagA: "---", scoreA: "-", teamB: "TBD", tagB: "---", scoreB: "-", time: "21:00", stage: "Групповой этап" },
];

export const MATCHES_DAY2 = [
  { id: 5, teamA: "TBD", tagA: "---", scoreA: "-", teamB: "TBD", tagB: "---", scoreB: "-", time: "13:00", stage: "Полуфинал BO3" },
  { id: 6, teamA: "TBD", tagA: "---", scoreA: "-", teamB: "TBD", tagB: "---", scoreB: "-", time: "16:00", stage: "Полуфинал BO3" },
];

export const MATCHES_DAY3 = [
  { id: 7, teamA: "TBD", tagA: "---", scoreA: "-", teamB: "TBD", tagB: "---", scoreB: "-", time: "12:00", stage: "Матч за 3-е место" },
  { id: 8, teamA: "TBD", tagA: "---", scoreA: "-", teamB: "TBD", tagB: "---", scoreB: "-", time: "15:00", stage: "Гранд-финал BO3" },
];

/* ───────────── NAV LINKS ───────────── */

const NAV_LINKS = [
  { label: "Главная", href: "#hero" },
  { label: "О турнире", href: "#about" },
  { label: "Расписание", href: "#schedule" },
  /* { label: "Команды", href: "#teams" }, — временно скрыто */
  { label: "Призы", href: "#prizes" },
  { label: "Регистрация", href: "#register" },
  { label: "Контакты", href: "#contacts" },
];

/* ───────────── ANIMATED SECTION WRAPPER ───────────── */

function Section({ children, id, className = "" }: { children: React.ReactNode; id?: string; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.section
      ref={ref}
      id={id}
      className={className}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {children}
    </motion.section>
  );
}

/* ───────────── MATCH CARD (сохранили для будущего) ───────────── */

export function MatchCard({ m }: { m: typeof MATCHES_DAY1[0] }) {
  const isFinal = m.stage.includes("финал") || m.stage.includes("Финал");
  return (
    <div className="relative group bg-gradient-to-br from-[#151515] to-[#0d0d0d] border border-white/5 rounded-xl overflow-hidden hover:border-red-500/30 transition-all duration-500">
      <div className={`text-center text-[11px] font-bold tracking-[0.2em] uppercase pt-4 pb-2 ${isFinal ? "text-red-500" : "text-white/40"}`}>
        {m.stage}
      </div>
      <div className="flex items-center justify-between px-4 pb-4 gap-2">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="w-9 h-9 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-[10px] font-black text-red-400 shrink-0">
            {m.tagA}
          </div>
          <span className="text-sm font-semibold text-white truncate">{m.teamA}</span>
        </div>
        <div className="flex items-center gap-2 shrink-0 px-3">
          <span className="text-lg font-black text-white">{m.scoreA}</span>
          <span className="text-xs text-white/20">:</span>
          <span className="text-lg font-black text-white">{m.scoreB}</span>
        </div>
        <div className="flex items-center gap-3 flex-1 min-w-0 justify-end">
          <span className="text-sm font-semibold text-white truncate text-right">{m.teamB}</span>
          <div className="w-9 h-9 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-[10px] font-black text-red-400 shrink-0">
            {m.tagB}
          </div>
        </div>
      </div>
      <div className="text-center pb-3 text-xs text-white/30 font-mono">{m.time} MSK</div>
      <div className="absolute inset-0 bg-gradient-to-t from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </div>
  );
}

/* ───────────── TEAM CARD (сохранили для будущего) ───────────── */

export function TeamCard({ team }: { team: typeof TEAMS[0] }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -4 }}
      className="relative group bg-gradient-to-br from-[#151515] to-[#0d0d0d] border border-white/5 rounded-xl p-5 text-center hover:border-red-500/30 transition-all duration-500 overflow-hidden"
    >
      <div className="absolute top-2 right-3 text-[10px] font-mono text-white/10">#{team.seed}</div>
      <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-red-500/20 to-red-900/10 border border-red-500/20 flex items-center justify-center mb-4 group-hover:from-red-500/30 group-hover:border-red-500/40 transition-all duration-500">
        <span className="text-lg font-black text-red-400">{team.tag}</span>
      </div>
      <h4 className="text-sm font-bold text-white mb-1">{team.name}</h4>
      <span className="text-[11px] tracking-[0.15em] uppercase text-white/30">{team.region}</span>
      <div className="absolute inset-0 bg-gradient-to-t from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </motion.div>
  );
}

/* ───────────── COUNTER ANIMATION ───────────── */

function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let current = 0;
    const step = Math.max(1, Math.floor(target / 60));
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, 20);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

/* ═══════════════════════════════════════ */
/* ═══════════ APP COMPONENT ═════════════ */
/* ═══════════════════════════════════════ */

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scroll = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-[#0a0a0a] text-white font-sans antialiased selection:bg-red-500/30 selection:text-white">

      {/* ══════════ GLOBAL STYLES ══════════ */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Orbitron:wght@400;500;600;700;800;900&family=Russo+One&display=swap');

        html { scroll-behavior: smooth; }
        body { overflow-x: hidden; }

        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0a0a0a; }
        ::-webkit-scrollbar-thumb { background: #e30613; border-radius: 3px; }

        .font-orbitron { font-family: 'Orbitron', sans-serif; }
        .font-aggressive {
          font-family: 'Road Rage', 'Russo One', sans-serif;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          display: inline-block;
        }
        .text-blood {
          text-shadow: 0 0 10px rgba(220,38,38,0.6), 0 0 40px rgba(220,38,38,0.3), 0 0 80px rgba(220,38,38,0.15), 0 4px 12px rgba(0,0,0,0.8);
        }
        .text-blood-sm {
          text-shadow: 0 0 8px rgba(220,38,38,0.5), 0 0 24px rgba(220,38,38,0.2);
        }

        @keyframes pulse-red {
          0%, 100% { box-shadow: 0 0 20px rgba(227,6,19,0.3); }
          50% { box-shadow: 0 0 40px rgba(227,6,19,0.6); }
        }
        .pulse-red { animation: pulse-red 2s ease-in-out infinite; }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .float { animation: float 3s ease-in-out infinite; }

        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }

        @keyframes glow-text {
          0%, 100% { text-shadow: 0 0 10px rgba(227,6,19,0.5), 0 0 30px rgba(227,6,19,0.2); }
          50% { text-shadow: 0 0 20px rgba(227,6,19,0.8), 0 0 60px rgba(227,6,19,0.4); }
        }
        .glow-text { animation: glow-text 3s ease-in-out infinite; }

        .grid-bg {
          background-image:
            linear-gradient(rgba(227,6,19,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(227,6,19,0.03) 1px, transparent 1px);
          background-size: 60px 60px;
        }
      `}</style>

      {/* SVG distortion filter for aggressive text */}
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <filter id="aggressive-text">
            <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" />
          </filter>
        </defs>
      </svg>

      {/* ══════════ HEADER ══════════ */}
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled ? "bg-black/80 backdrop-blur-xl border-b border-white/5" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <a href="#hero" onClick={() => scroll("#hero")} className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg bg-red-600 flex items-center justify-center group-hover:bg-red-500 transition-colors">
              <span className="font-orbitron font-black text-white text-sm">D2</span>
            </div>
            <span className="font-aggressive text-xl tracking-wider hidden sm:block text-blood-sm">
              ПЕРВАЯ<span className="text-red-500">КРОВЬ</span>
            </span>
          </a>

          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((l) => (
              <button
                key={l.href}
                onClick={() => scroll(l.href)}
                className="px-3 py-2 text-[13px] font-medium tracking-wide text-white/60 hover:text-red-400 transition-colors duration-300 relative group"
              >
                {l.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-red-500 group-hover:w-full transition-all duration-300" />
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => scroll("#register")}
              className="hidden md:block px-5 py-2 bg-red-600 hover:bg-red-500 text-white text-sm font-bold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-red-500/25"
            >
              Записаться
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5"
            >
              <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </button>
          </div>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-black/95 backdrop-blur-xl border-t border-white/5 overflow-hidden"
            >
              <nav className="flex flex-col p-6 gap-1">
                {NAV_LINKS.map((l, i) => (
                  <motion.button
                    key={l.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => scroll(l.href)}
                    className="text-left px-4 py-3 text-white/70 hover:text-red-400 hover:bg-white/5 rounded-lg transition-all text-sm font-medium"
                  >
                    {l.label}
                  </motion.button>
                ))}
                <button
                  onClick={() => scroll("#register")}
                  className="mt-4 px-5 py-3 bg-red-600 hover:bg-red-500 text-white font-bold rounded-lg transition-all"
                >
                  Записаться на турнир
                </button>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ══════════ HERO ══════════ */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/dota-hero.jpg"
            alt="Dota 2 Tournament"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-[#0a0a0a]/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-red-900/10 to-transparent" />
        </div>

        <div className="absolute inset-0 grid-bg opacity-50" />

        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.03]">
          <div className="w-full h-[2px] bg-red-500" style={{ animation: "scanline 8s linear infinite" }} />
        </div>

        <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-red-500/20 to-transparent hidden lg:block" />
        <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-red-500/20 to-transparent hidden lg:block" />

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 border border-red-500/30 rounded-full mb-8 bg-red-500/5"
          >
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-red-400">
              Приём заявок открыт
            </span>
          </motion.div>

          {/* Main title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-aggressive text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1] mb-6 tracking-wider text-blood"
          >
            <span className="text-white">ПЕРВАЯ</span>{" "}
            <span className="text-red-500">КРОВЬ</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg sm:text-xl md:text-2xl text-white/60 font-light max-w-2xl mx-auto mb-4 leading-relaxed"
          >
            Молодёжный турнир по Dota 2 · Олимпийская система
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="text-base sm:text-lg text-white/40 max-w-xl mx-auto mb-10"
          >
            Призовой фонд <span className="text-red-400 font-bold">20 000 – 25 000 ₽</span> · 4 команды · Полуфиналы → Финал
          </motion.p>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 mb-12"
          >
            {[
              { icon: "🏆", value: "20–25 тыс. ₽", label: "Призовой фонд" },
              { icon: "👥", value: "4 команды", label: "Участники" },
              { icon: "⚔️", value: "BO1", label: "Формат" },
              { icon: "🎮", value: "5 × 5", label: "Состав" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-2xl mb-1">{s.icon}</div>
                <div className="text-sm sm:text-base font-bold text-white">{s.value}</div>
                <div className="text-[11px] tracking-wider uppercase text-white/30">{s.label}</div>
              </div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              onClick={() => scroll("#register")}
              className="px-8 py-4 bg-red-600 hover:bg-red-500 text-white font-bold text-base rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-red-500/30 pulse-red"
            >
              🎮 Записаться на турнир
            </button>
            <button
              onClick={() => scroll("#about")}
              className="px-8 py-4 border border-white/20 hover:border-red-500/50 text-white/80 hover:text-white font-semibold text-base rounded-xl transition-all duration-300 hover:bg-white/5"
            >
              Подробные правила ↓
            </button>
          </motion.div>

          {/* Sponsor badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="mt-12 inline-flex items-center gap-2 px-4 py-2 bg-white/[0.03] border border-white/5 rounded-lg"
          >
            <span className="text-[11px] tracking-[0.15em] uppercase text-white/30">При поддержке:</span>
            <span className="text-sm font-semibold text-white/60">Молодёжное отделение ЛДПР Алтайского края</span>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center pt-2">
            <div className="w-1 h-2 rounded-full bg-red-500" />
          </div>
        </motion.div>
      </section>

      {/* ══════════ ABOUT ══════════ */}
      <Section id="about" className="relative py-28 sm:py-36 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-red-500 font-orbitron font-bold text-sm">01</span>
            <div className="h-px w-12 bg-red-500/40" />
            <span className="text-[11px] tracking-[0.3em] uppercase text-white/30">О турнире</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Text side */}
            <div>
              <h2 className="font-orbitron font-bold text-3xl sm:text-4xl md:text-5xl mb-8 leading-tight">
                Турнир<br />
                <span className="text-red-500">Первая</span><br />Кровь
              </h2>

              <p className="text-white/60 text-base sm:text-lg leading-relaxed mb-6">
                Мы запускаем <span className="text-white font-semibold">молодёжный турнир по Dota 2</span> — 
                4 команды сразятся по олимпийской системе за <span className="text-red-400 font-semibold">20 000 – 25 000 ₽</span> призового фонда.
              </p>

              <p className="text-white/40 text-base leading-relaxed mb-10">
                Наша цель — дать молодёжи возможность поиграть по-взрослому: 
                показать себя, почувствовать драйв соревнований и выиграть реальные деньги.
              </p>

              {/* Feature list */}
              <div className="space-y-5">
                {[
                  { num: "01", title: "Участники", desc: "4 команды по 5 игроков. Молодёжный турнир — школьники и студенты." },
                  { num: "02", title: "Формат турнира", desc: "Олимпийская система: 2 полуфинала BO1 → матч за 3-е место BO1 → гранд-финал BO1. Проигравшие в полуфиналах играют за бронзу." },
                  { num: "03", title: "Призовой фонд", desc: "1 место — 12–15 тыс. ₽ · 2 место — 7–8 тыс. ₽ · 3 место — 2–3 тыс. ₽ · 4 место — 2–3 тыс. ₽." },
                ].map((f) => (
                  <div key={f.num} className="flex gap-5 group">
                    <span className="font-orbitron text-red-500/60 font-bold text-sm shrink-0 pt-1 group-hover:text-red-400 transition-colors">{f.num}</span>
                    <div>
                      <h4 className="font-bold text-white mb-1 group-hover:text-red-400 transition-colors">{f.title}</h4>
                      <p className="text-white/40 text-sm leading-relaxed">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Image side */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden border border-white/5 group">
                <img
                  src="/images/dota-arena.jpg"
                  alt="Tournament Arena"
                  className="w-full h-[500px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-sm font-semibold text-white/70">4 команды · Олимпийская система · BO1</span>
                  </div>
                </div>
              </div>

              <div className="absolute -top-4 -right-4 w-32 h-32 border-t-2 border-r-2 border-red-500/20 rounded-tr-2xl pointer-events-none" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 border-b-2 border-l-2 border-red-500/20 rounded-bl-2xl pointer-events-none" />
            </div>
          </div>
        </div>
      </Section>

      {/* ══════════ STATS BAR ══════════ */}
      <Section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-900/10 via-red-600/5 to-red-900/10" />
        <div className="absolute inset-0 border-y border-red-500/10" />
        <div className="relative max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: 25000, suffix: " ₽", label: "Призовой фонд" },
            { value: 4, suffix: "", label: "Команды" },
            { value: 5, suffix: "×5", label: "Формат" },
            { value: 4, suffix: " места", label: "Призовых" },
          ].map((s) => (
            <div key={s.label}>
              <div className="font-orbitron text-3xl sm:text-4xl md:text-5xl font-black text-red-500 mb-2">
                <Counter target={s.value} suffix={s.suffix} />
              </div>
              <div className="text-[11px] tracking-[0.2em] uppercase text-white/30">{s.label}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* ══════════ SCHEDULE ══════════ */}
      <Section id="schedule" className="relative py-28 sm:py-36 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-red-500 font-orbitron font-bold text-sm">02</span>
            <div className="h-px w-12 bg-red-500/40" />
            <span className="text-[11px] tracking-[0.3em] uppercase text-white/30">Расписание и результаты</span>
          </div>
          <h2 className="font-orbitron font-bold text-3xl sm:text-4xl md:text-5xl mb-4">
            Расписание <span className="text-red-500">матчей</span>
          </h2>
          <p className="text-white/40 text-lg mb-14 max-w-xl">
            Турнирная сетка и результаты обновляются в реальном времени.
          </p>

          {/* Tournament bracket */}
          <div className="mb-14">
            <div className="flex items-center gap-3 mb-6">
              <div className="px-4 py-1.5 bg-red-500/10 border border-red-500/20 rounded-lg">
                <span className="font-orbitron text-sm font-bold text-red-400">СЕТКА</span>
              </div>
              <span className="text-white/30 text-sm">Олимпийская система · Все матчи BO1</span>
            </div>
            <div className="bg-gradient-to-br from-[#151515] to-[#0d0d0d] border border-white/5 rounded-2xl p-6 sm:p-8">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-white mb-3 flex items-center gap-2">
                    <span className="text-red-400">📋</span> Формат
                  </h4>
                  <ul className="space-y-2 text-sm text-white/50">
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 mt-1">▸</span>
                      4 команды — олимпийская система (на вылет)
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 mt-1">▸</span>
                      Полуфиналы: 2 пары по системе BO1
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 mt-1">▸</span>
                      Проигравшие играют матч за 3-е место BO1
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 mt-1">▸</span>
                      Победители полуфиналов — в гранд-финал BO1
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-white mb-3 flex items-center gap-2">
                    <span className="text-red-400">📊</span> Схема турнира
                  </h4>
                  <div className="bg-white/[0.02] border border-white/5 rounded-xl p-4 text-center">
                    <div className="text-white/50 text-sm font-semibold mb-3">Полуфиналы</div>
                    <div className="flex items-center justify-center gap-3 mb-3">
                      <div className="px-3 py-2 bg-red-500/10 border border-red-500/20 rounded-lg text-xs font-bold text-red-400">Команда 1</div>
                      <span className="text-white/30 text-xs">VS</span>
                      <div className="px-3 py-2 bg-red-500/10 border border-red-500/20 rounded-lg text-xs font-bold text-red-400">Команда 2</div>
                    </div>
                    <div className="flex items-center justify-center gap-3 mb-4">
                      <div className="px-3 py-2 bg-red-500/10 border border-red-500/20 rounded-lg text-xs font-bold text-red-400">Команда 3</div>
                      <span className="text-white/30 text-xs">VS</span>
                      <div className="px-3 py-2 bg-red-500/10 border border-red-500/20 rounded-lg text-xs font-bold text-red-400">Команда 4</div>
                    </div>
                    <div className="text-white/20 text-xs mb-2">↓</div>
                    <div className="flex items-center justify-center gap-6">
                      <div>
                        <div className="text-[10px] text-white/30 uppercase tracking-wider mb-1">За 3-е место</div>
                        <div className="px-3 py-1.5 bg-orange-500/10 border border-orange-500/20 rounded-lg text-[11px] font-bold text-orange-400">3 vs 4</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-white/30 uppercase tracking-wider mb-1">Финал</div>
                        <div className="px-3 py-1.5 bg-yellow-500/10 border border-yellow-500/20 rounded-lg text-[11px] font-bold text-yellow-400">1 vs 2</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Offline final */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="px-4 py-1.5 bg-red-500/10 border border-red-500/20 rounded-lg">
                <span className="font-orbitron text-sm font-bold text-red-400">МАТЧИ</span>
              </div>
              <span className="text-white/30 text-sm">Турнирная сетка · Все матчи BO1</span>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { time: "Матч 1", stage: "Полуфинал #1", format: "BO1", teams: "Команда 1 vs Команда 4" },
                { time: "Матч 2", stage: "Полуфинал #2", format: "BO1", teams: "Команда 2 vs Команда 3" },
                { time: "Матч 3", stage: "За 3-е место", format: "BO1", teams: "Проигравшие ПФ" },
                { time: "Матч 4", stage: "Гранд-финал", format: "BO1", teams: "Победители ПФ" },
              ].map((match, idx) => (
                <div key={idx} className={`relative group bg-gradient-to-br from-[#151515] to-[#0d0d0d] border rounded-xl p-5 hover:border-red-500/30 transition-all duration-500 ${idx === 3 ? "border-red-500/20" : "border-white/5"}`}>
                  <div className={`text-[11px] font-bold tracking-[0.15em] uppercase mb-2 ${idx === 3 ? "text-red-500" : "text-red-500/60"}`}>{match.stage}</div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white/80 text-sm font-semibold">{match.teams}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/30 font-mono">{match.time}</span>
                    <span className="px-2 py-0.5 bg-red-500/10 border border-red-500/20 rounded text-[10px] font-bold text-red-400">{match.format}</span>
                  </div>
                  {idx === 3 && <div className="mt-2 text-center text-yellow-400/60 text-[10px] tracking-wider uppercase">🏆 Главный матч</div>}
                  <div className="absolute inset-0 bg-gradient-to-t from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-xl" />
                </div>
              ))}
            </div>

            {/* Distribution */}
            <div className="mt-6">
              <div className="relative group bg-gradient-to-r from-red-900/20 via-[#151515] to-red-900/20 border border-red-500/20 rounded-xl p-6 hover:border-red-500/40 transition-all duration-500 text-center">
                <div className="text-xs font-bold tracking-[0.2em] uppercase text-red-500 mb-3">Распределение мест</div>
                <div className="flex items-center justify-center gap-6 flex-wrap">
                  <div className="text-center">
                    <div className="text-yellow-400 text-lg">🥇</div>
                    <div className="text-white/60 text-xs">1 место</div>
                    <div className="text-yellow-400/80 text-xs font-bold">Победитель финала</div>
                  </div>
                  <div className="text-center">
                    <div className="text-gray-300 text-lg">🥈</div>
                    <div className="text-white/60 text-xs">2 место</div>
                    <div className="text-gray-400/80 text-xs font-bold">Финалист</div>
                  </div>
                  <div className="text-center">
                    <div className="text-orange-400 text-lg">🥉</div>
                    <div className="text-white/60 text-xs">3 место</div>
                    <div className="text-orange-400/80 text-xs font-bold">Победитель за 3-е</div>
                  </div>
                  <div className="text-center">
                    <div className="text-white/30 text-lg">4️⃣</div>
                    <div className="text-white/60 text-xs">4 место</div>
                    <div className="text-white/30 text-xs font-bold">Проигравший за 3-е</div>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-xl" />
              </div>
            </div>
          </div>

          {/* Note */}
          <div className="mt-10 bg-white/[0.02] border border-white/5 rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <span className="text-2xl">📍</span>
            <div>
              <div className="font-semibold text-white text-sm mb-1">Место проведения</div>
              <div className="text-white/40 text-sm">Точное место и время будут уточнены дополнительно</div>
            </div>
          </div>
        </div>
      </Section>

      {/* ══════════ TEAMS — временно скрыто ══════════ */}
      {/*
      <Section id="teams" className="relative py-28 sm:py-36 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-900/5 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-red-500 font-orbitron font-bold text-sm">03</span>
            <div className="h-px w-12 bg-red-500/40" />
            <span className="text-[11px] tracking-[0.3em] uppercase text-white/30">Команды</span>
          </div>
          <h2 className="font-orbitron font-bold text-3xl sm:text-4xl md:text-5xl mb-4">
            Участники <span className="text-red-500">турнира</span>
          </h2>
          <p className="text-white/40 text-lg mb-14 max-w-xl">
            Восемь сильнейших команд сразятся за чемпионский титул и призовой фонд.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {TEAMS.map((team) => (
              <TeamCard key={team.name} team={team} />
            ))}
          </div>
        </div>
      </Section>
      */}

      {/* ══════════ PRIZES ══════════ */}
      <Section id="prizes" className="relative py-28 sm:py-36 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="relative max-w-5xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-red-500 font-orbitron font-bold text-sm">03</span>
            <div className="h-px w-12 bg-red-500/40" />
            <span className="text-[11px] tracking-[0.3em] uppercase text-white/30">Призы</span>
          </div>

          <h2 className="font-orbitron font-bold text-3xl sm:text-4xl md:text-5xl mb-4 text-center">
            Призовой <span className="text-red-500">фонд</span>
          </h2>
          <p className="text-white/40 text-lg mb-16 text-center max-w-lg mx-auto">
            20 000 – 25 000 ₽ распределяются между лучшими командами турнира
          </p>

          {/* Trophy image */}
          <div className="flex justify-center mb-16">
            <div className="relative float">
              <img
                src="/images/dota-trophy.jpg"
                alt="Tournament Trophy"
                className="w-48 h-48 sm:w-64 sm:h-64 object-cover rounded-full border-2 border-red-500/20 shadow-2xl shadow-red-500/10"
              />
              <div className="absolute -inset-2 rounded-full border border-red-500/10 animate-pulse" />
            </div>
          </div>

          {/* Prize cards */}
          <div className="grid sm:grid-cols-3 gap-6">
            {/* 1st place */}
            <motion.div
              whileHover={{ scale: 1.03, y: -8 }}
              className="relative bg-gradient-to-br from-yellow-500/10 to-transparent border border-yellow-500/20 rounded-2xl p-8 text-center overflow-hidden group"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-500 to-yellow-300" />
              <div className="text-5xl mb-4">🥇</div>
              <div className="font-orbitron text-3xl sm:text-4xl font-black text-yellow-400 mb-2">12–15 тыс. ₽</div>
              <div className="text-sm font-bold text-white/70 mb-1">1-е место</div>
              <div className="text-xs text-white/30">Чемпионский титул «Первая Кровь»</div>
              <div className="absolute inset-0 bg-gradient-to-t from-yellow-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>

            {/* 2nd place */}
            <motion.div
              whileHover={{ scale: 1.03, y: -8 }}
              className="relative bg-gradient-to-br from-gray-400/10 to-transparent border border-gray-400/20 rounded-2xl p-8 text-center overflow-hidden group"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gray-400 to-gray-300" />
              <div className="text-5xl mb-4">🥈</div>
              <div className="font-orbitron text-3xl sm:text-4xl font-black text-gray-300 mb-2">7–8 тыс. ₽</div>
              <div className="text-sm font-bold text-white/70 mb-1">2-е место</div>
              <div className="text-xs text-white/30">Серебряный статус</div>
              <div className="absolute inset-0 bg-gradient-to-t from-gray-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>

            {/* 3-4th places */}
            <motion.div
              whileHover={{ scale: 1.03, y: -8 }}
              className="relative bg-gradient-to-br from-orange-500/10 to-transparent border border-orange-500/20 rounded-2xl p-8 text-center overflow-hidden group"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-600 to-orange-400" />
              <div className="text-5xl mb-4">🥉</div>
              <div className="font-orbitron text-3xl sm:text-4xl font-black text-orange-400 mb-2">2–3 тыс. ₽</div>
              <div className="text-sm font-bold text-white/70 mb-1">3–4-е места</div>
              <div className="text-xs text-white/30">Бронзовая награда каждому</div>
              <div className="absolute inset-0 bg-gradient-to-t from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          </div>
        </div>
      </Section>

      {/* ══════════ REGISTRATION ══════════ */}
      <Section id="register" className="relative py-28 sm:py-36 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-red-900/5 via-black to-transparent" />
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="relative max-w-4xl mx-auto px-6">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-12 bg-red-500/40" />
            <span className="text-red-500 font-orbitron font-bold text-sm">04</span>
            <div className="h-px w-12 bg-red-500/40" />
          </div>

          <h2 className="font-orbitron font-bold text-3xl sm:text-4xl md:text-5xl mb-4 text-center">
            Записаться <span className="text-red-500">на турнир</span>
          </h2>
          <p className="text-white/40 text-lg mb-6 text-center max-w-xl mx-auto">
            Заполните заявку на команду (5 человек). Поля, отмеченные <span className="text-red-400">*</span>, обязательны.
          </p>

          {/* Info badges */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {[
              "🆓 Бесплатная регистрация",
              "👥 4 команды · 5 игроков",
              "📝 Заявка — 24 часа",
              "⏰ Места ограничены",
            ].map((t) => (
              <span key={t} className="px-4 py-1.5 bg-red-500/10 border border-red-500/20 rounded-full text-xs font-semibold text-red-400">
                {t}
              </span>
            ))}
          </div>

          {/* ─── REGISTRATION FORM ─── */}
          <form
            id="reg-form"
            action="https://formspree.io/f/mdapdwwv"
            method="POST"
            className="space-y-8"
          >
            {/* ── TEAM NAME ── */}
            <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 sm:p-8 hover:border-red-500/10 transition-colors">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-lg">🛡️</div>
                <h3 className="font-bold text-white text-lg">Название команды <span className="text-red-400">*</span></h3>
              </div>
              <input
                type="text"
                name="team_name"
                required
                placeholder="Например: Team Liquid"
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-4 text-white placeholder-white/20 focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/20 transition-all text-base"
              />
            </div>

            {/* ── CAPTAIN BLOCK ── */}
            <div className="bg-white/[0.02] border border-red-500/10 rounded-2xl p-6 sm:p-8 relative overflow-hidden">
              {/* Decorative top bar */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-red-500 to-transparent" />
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-red-500/15 border border-red-500/25 flex items-center justify-center text-lg">👑</div>
                <div>
                  <h3 className="font-bold text-white text-lg">Капитан команды</h3>
                  <p className="text-white/30 text-xs">Лидер — заполняется обязательно</p>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/40 text-xs font-semibold uppercase tracking-wider mb-2">Имя <span className="text-red-400">*</span></label>
                  <input
                    type="text"
                    name="captain_name"
                    required
                    placeholder="Имя капитана"
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder-white/20 focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-white/40 text-xs font-semibold uppercase tracking-wider mb-2">Telegram <span className="text-red-400">*</span></label>
                  <input
                    type="text"
                    name="captain_telegram"
                    required
                    placeholder="@username"
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder-white/20 focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-white/40 text-xs font-semibold uppercase tracking-wider mb-2">Discord</label>
                  <input
                    type="text"
                    name="captain_discord"
                    placeholder="username#0000 или —"
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder-white/20 focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-white/40 text-xs font-semibold uppercase tracking-wider mb-2">Телефон <span className="text-red-400">*</span></label>
                  <input
                    type="tel"
                    name="captain_phone"
                    required
                    placeholder="+7 (___) ___-__-__"
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder-white/20 focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/20 transition-all"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-white/40 text-xs font-semibold uppercase tracking-wider mb-2">Steam ID <span className="text-red-400">*</span></label>
                  <input
                    type="text"
                    name="captain_steam"
                    required
                    placeholder="https://steamcommunity.com/id/... или STEAM_0:..."
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder-white/20 focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/20 transition-all"
                  />
                </div>
              </div>
            </div>

            {/* ── PLAYER SLOTS (2–5) ── */}
            {[2, 3, 4, 5].map((num) => (
              <div
                key={num}
                className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 sm:p-8 hover:border-white/10 transition-colors"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center font-orbitron font-bold text-white/60 text-sm">
                    {num}
                  </div>
                  <div>
                    <h3 className="font-bold text-white/80 text-base">Игрок {num}</h3>
                    <p className="text-white/25 text-xs">
                      {num === 2 ? "Обязательный слот" : "Участник команды"}
                    </p>
                  </div>
                </div>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-white/40 text-xs font-semibold uppercase tracking-wider mb-2">
                      Имя {num === 2 && <span className="text-red-400">*</span>}
                    </label>
                    <input
                      type="text"
                      name={`player${num}_name`}
                      required={num === 2}
                      placeholder="Имя игрока"
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder-white/20 focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/20 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-white/40 text-xs font-semibold uppercase tracking-wider mb-2">
                      Steam ID {num === 2 && <span className="text-red-400">*</span>}
                    </label>
                    <input
                      type="text"
                      name={`player${num}_steam`}
                      required={num === 2}
                      placeholder="Steam ID"
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder-white/20 focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/20 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-white/40 text-xs font-semibold uppercase tracking-wider mb-2">Discord</label>
                    <input
                      type="text"
                      name={`player${num}_discord`}
                      placeholder="username#0000 или —"
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder-white/20 focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/20 transition-all"
                    />
                  </div>
                </div>
              </div>
            ))}

            {/* ── COMMENT ── */}
            <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-lg">💬</div>
                <h3 className="font-bold text-white/80 text-base">Комментарий</h3>
              </div>
              <textarea
                name="comment"
                rows={3}
                placeholder="Опыт команды, пожелания, вопросы..."
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-4 text-white placeholder-white/20 focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/20 transition-all resize-none"
              />
            </div>

            {/* ── SUBMIT BUTTON ── */}
            <div className="text-center pt-4">
              <motion.button
                type="submit"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-12 py-5 bg-red-600 hover:bg-red-500 text-white font-bold text-lg rounded-xl transition-all duration-300 hover:shadow-2xl hover:shadow-red-500/30 pulse-red w-full sm:w-auto"
              >
                🎮 ОТПРАВИТЬ ЗАЯВКУ
              </motion.button>
              <p className="text-white/20 text-xs mt-4 max-w-md mx-auto">
                Количество мест ограничено — 4 команды. Заявка подтверждается в течение 24 часов. Нажимая кнопку, вы соглашаетесь с правилами турнира.
              </p>
            </div>
          </form>
        </div>
      </Section>

      {/* ══════════ ADDITIONAL INFO ══════════ */}
      <Section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-900/5 via-transparent to-red-900/5" />
        <div className="absolute inset-0 border-y border-white/5" />
        <div className="relative max-w-5xl mx-auto px-6">
          <h3 className="font-orbitron font-bold text-xl sm:text-2xl mb-8 text-center">
            📢 Полезные <span className="text-red-500">ссылки</span>
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: "📋", title: "Правила турнира", desc: "Полный регламент и формат", link: "#" },
              { icon: "💬", title: "Discord-сервер", desc: "Матчи, общение, лобби", link: "#" },
              { icon: "📱", title: "Telegram-канал", desc: "Новости и трансляции", link: "#" },
              { icon: "📞", title: "Организатор", desc: "Связаться напрямую", link: "#" },
            ].map((item) => (
              <a
                key={item.title}
                href={item.link}
                className="group bg-white/[0.02] border border-white/5 rounded-xl p-5 hover:border-red-500/20 transition-all duration-300 hover:bg-white/[0.04] block"
              >
                <span className="text-2xl mb-3 block">{item.icon}</span>
                <h4 className="font-bold text-white text-sm mb-1 group-hover:text-red-400 transition-colors">{item.title}</h4>
                <p className="text-white/30 text-xs">{item.desc}</p>
              </a>
            ))}
          </div>
        </div>
      </Section>

      {/* ══════════ CONTACTS ══════════ */}
      <Section id="contacts" className="relative py-28 sm:py-36 overflow-hidden">
        <div className="relative max-w-5xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-red-500 font-orbitron font-bold text-sm">05</span>
            <div className="h-px w-12 bg-red-500/40" />
            <span className="text-[11px] tracking-[0.3em] uppercase text-white/30">Контакты</span>
          </div>

          <h2 className="font-orbitron font-bold text-3xl sm:text-4xl md:text-5xl mb-14">
            Свяжитесь <span className="text-red-500">с нами</span>
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: "📧", title: "Email", value: "pervayakrov@tournament.com", sub: "Ответим в течение 24 часов" },
              { icon: "💬", title: "Discord", value: "discord.gg/pervayakrov", sub: "Онлайн-поддержка и лобби" },
              { icon: "📱", title: "Telegram", value: "@pervaya_krov", sub: "Быстрая связь с организаторами" },
            ].map((c) => (
              <div key={c.title} className="bg-white/[0.02] border border-white/5 rounded-xl p-6 hover:border-red-500/20 transition-all duration-300 group">
                <span className="text-3xl mb-4 block">{c.icon}</span>
                <h4 className="font-bold text-white mb-1 group-hover:text-red-400 transition-colors">{c.title}</h4>
                <p className="text-red-400 text-sm font-semibold mb-1">{c.value}</p>
                <p className="text-white/30 text-xs">{c.sub}</p>
              </div>
            ))}
          </div>

          {/* Sponsor */}
          <div className="mt-20 text-center">
            <p className="text-[11px] tracking-[0.3em] uppercase text-white/20 mb-8">При поддержке</p>
            <div className="inline-flex items-center gap-4 px-8 py-4 bg-white/[0.03] border border-white/5 rounded-xl">
              <span className="text-2xl">🏛️</span>
              <div className="text-left">
                <div className="font-bold text-white/70 text-sm">Молодёжное отделение ЛДПР</div>
                <div className="text-white/30 text-xs">Алтайский край</div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ══════════ FOOTER ══════════ */}
      <footer className="border-t border-white/5 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid sm:grid-cols-3 gap-10 mb-10">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center">
                  <span className="font-orbitron font-black text-white text-xs">D2</span>
                </div>
                <span className="font-aggressive tracking-wider text-blood-sm">
                  ПЕРВАЯ<span className="text-red-500">КРОВЬ</span>
                </span>
              </div>
              <p className="text-white/30 text-sm leading-relaxed">
                Молодёжный турнир по Dota 2.<br />
                4 команды. Олимпийская система. BO1.
              </p>
            </div>

            <div>
              <h5 className="text-[11px] tracking-[0.2em] uppercase text-white/30 mb-4">Навигация</h5>
              <div className="grid grid-cols-2 gap-2">
                {NAV_LINKS.map((l) => (
                  <button
                    key={l.href}
                    onClick={() => scroll(l.href)}
                    className="text-left text-sm text-white/40 hover:text-red-400 transition-colors"
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h5 className="text-[11px] tracking-[0.2em] uppercase text-white/30 mb-4">Следите за нами</h5>
              <div className="flex gap-3">
                {["Twitch", "Discord", "Telegram", "VK"].map((s) => (
                  <span
                    key={s}
                    className="px-3 py-1.5 bg-white/5 border border-white/5 rounded-lg text-xs text-white/40 hover:text-red-400 hover:border-red-500/20 transition-all cursor-pointer"
                  >
                    {s}
                  </span>
                ))}
              </div>
              <div className="mt-4">
                <p className="text-white/20 text-xs">
                  Организатор: при поддержке Молодёжного отделения ЛДПР Алтайского края
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white/20 text-xs">© 2025 Первая Кровь. Все права защищены.</p>
            <p className="text-white/20 text-xs">Dota 2 является зарегистрированной торговой маркой Valve Corporation.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
