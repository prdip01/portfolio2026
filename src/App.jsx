import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Github,
  Instagram,
  Menu,
  X,
  ArrowUpRight,
  Calendar,
  Bookmark,
  LayoutGrid,
  Terminal,
  Activity,
  ShieldCheck,
  Cpu,
  Database,
  Brain,
  Code2,
  Box,
  BookOpen,
} from 'lucide-react';
import PerspectiveGrid from './components/PerspectiveGrid';

/* ─── Shared animation presets ─────────────────────────────── */
const reveal = {
  initial:    { opacity: 0, y: 28 },
  whileInView:{ opacity: 1, y: 0  },
  viewport:   { once: true, margin: '-80px' },
  transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
};

/* ─── Minimal pill tag ──────────────────────────────────────── */
const Tag = ({ label }) => (
  <span className="inline-flex items-center px-2.5 py-0.5 text-[11px] font-mono font-medium
    bg-pinkSurface border border-pinkBorder text-brandMagenta rounded-sm tracking-wide">
    {label}
  </span>
);

/* ─── Section header ─────────────────────────────────────────── */
const SectionLabel = ({ index, title }) => (
  <div className="flex items-center gap-4 mb-12">
    <span className="font-mono text-[10px] text-inkMuted tracking-[0.2em]">
      0{index}
    </span>
    <div className="flex-1 h-px bg-pinkBorder" />
    <h2 className="font-display font-bold text-xs tracking-[0.3em] text-inkSecondary uppercase">
      {title}
    </h2>
  </div>
);

/* ────────────────────────────────────────────────────────────────
   APP
──────────────────────────────────────────────────────────────── */
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { label: 'About',      href: '#about'      },
    { label: 'Skills',     href: '#skills'     },
    { label: 'Projects',   href: '#projects'   },
    { label: 'Experience', href: '#experience' },
    { label: 'Education',  href: '#education'  },
    { label: 'Contact',    href: '#contact'    },
  ];

  return (
    <div className="relative min-h-screen bg-pinkBase text-inkPrimary font-sans overflow-x-hidden">

      {/* ── 3D Perspective Grid background ── */}
      <PerspectiveGrid />

      {/* ── Soft radial bloom at top ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0"
        style={{ zIndex: 1 }}
      >
        <div className="absolute -top-32 -left-24 w-[520px] h-[520px] rounded-full
          bg-gradient-radial from-pink-200/50 via-pink-100/20 to-transparent
          blur-3xl" />
        <div className="absolute top-1/3 -right-20 w-[380px] h-[380px] rounded-full
          bg-gradient-radial from-violet-200/40 via-violet-100/10 to-transparent
          blur-3xl" />
      </div>

      {/* ================================================================
          HEADER
          ================================================================ */}
      <header
        className="sticky top-0 w-full z-50
          bg-pinkLight/80 backdrop-blur-xl
          border-b border-pinkBorder/60"
      >
        <div className="max-w-6xl mx-auto px-6 md:px-10 h-14 flex items-center justify-between">

          {/* Logo — प्र favicon mark */}
          <a href="#home"
            className="flex items-center gap-2 group"
            aria-label="Pradeep Kumar Home">
            <img
              src="/favicon.svg"
              alt="प्र"
              width={30}
              height={30}
              className="rounded-md group-hover:opacity-80 transition-opacity duration-200"
            />
            <span className="font-display font-extrabold text-sm tracking-[0.18em] text-inkPrimary
              group-hover:text-brandMagenta transition-colors duration-300">
              Pradeep<span className="text-brandMagenta">.</span>
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map(l => (
              <a key={l.label} href={l.href}
                className="text-xs font-medium tracking-wide text-inkSecondary
                  hover:text-brandMagenta transition-colors duration-200 relative group">
                {l.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-brandMagenta
                  group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>

          {/* CTA — desktop */}
          <a href="mailto:iamprdip160@gmail.com"
            className="hidden md:inline-flex items-center gap-1.5 px-4 py-1.5
              border border-pinkBorder text-xs font-medium text-inkSecondary
              hover:border-brandMagenta hover:text-brandMagenta
              transition-all duration-200 rounded-sm">
            <Mail size={12} /> Say hello
          </a>

          {/* Hamburger — mobile */}
          <button
            className="md:hidden p-1.5 text-inkSecondary hover:text-brandMagenta transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      {/* Mobile nav drawer */}
      {menuOpen && (
        <nav className="fixed inset-0 top-14 z-40 bg-pinkLight/95 backdrop-blur-2xl
          border-b border-pinkBorder flex flex-col px-8 py-10 gap-6 md:hidden">
          {navLinks.map(l => (
            <a key={l.label} href={l.href}
              onClick={() => setMenuOpen(false)}
              className="font-display text-2xl font-bold text-inkPrimary
                hover:text-brandMagenta transition-colors border-b border-pinkBorder pb-4">
              {l.label}
            </a>
          ))}
        </nav>
      )}

      {/* ================================================================
          MAIN
          ================================================================ */}
      <main className="relative z-10 max-w-6xl mx-auto px-6 md:px-10">

        {/* ── HERO ── */}
        <section
          id="home"
          className="min-h-[calc(100vh-56px)] flex flex-col justify-center
            pt-12 pb-20 gap-8"
        >
          {/* Status chip */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 self-start"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-[10px] tracking-[0.25em] text-inkMuted uppercase">
              Available for opportunities · B.Tech CSE 2026
            </span>
          </motion.div>

          {/* Name block */}
          <div className="space-y-2">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-extrabold leading-[0.88] tracking-tight
                text-[clamp(3.8rem,10vw,8.5rem)] text-inkPrimary"
            >
              Pradeep
              <br />
              <span className="animate-shimmer">Kumar</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="font-display text-[clamp(1rem,2.5vw,1.5rem)] font-medium
                text-inkSecondary tracking-wide"
            >
              Data Scientist &amp; Web Developer
            </motion.p>
          </div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="max-w-xl text-base md:text-lg text-inkSecondary leading-relaxed font-light"
          >
            Code. Create. Simplify. Hi, I build technology that makes everyday tasks easier.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap gap-4 items-center"
          >
            <a href="#projects"
              className="inline-flex items-center gap-2 px-6 py-2.5
                bg-brandMagenta text-white text-sm font-semibold
                rounded-sm shadow-lg shadow-pink-300/40
                hover:bg-brandViolet transition-all duration-300 group">
              View Projects
              <ArrowUpRight size={15}
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            <a href="https://github.com/prdip01"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5
                border border-pinkBorder text-sm font-medium text-inkSecondary
                rounded-sm hover:border-brandMagenta hover:text-brandMagenta
                transition-all duration-300">
              <Github size={15} /> GitHub
            </a>
          </motion.div>

          {/* Contact pill */}
          <motion.a
            href="mailto:iamprdip160@gmail.com"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.65 }}
            className="inline-flex items-center gap-2 self-start
              font-mono text-xs text-inkMuted hover:text-brandMagenta transition-colors"
          >
            <Mail size={12} className="text-brandMagenta" />
            iamprdip160@gmail.com
          </motion.a>

          {/* 3D decorative floating card */}
          <div className="hidden lg:block absolute right-8 top-1/4 card-3d">
            <div className="card-3d-inner w-64 p-6 bg-white/60 backdrop-blur-md
              border border-pinkBorder rounded-lg shadow-xl shadow-pink-200/40
              animate-float3d-slow">
              <div className="flex items-center gap-2 mb-4">
                <Bookmark size={14} className="text-brandMagenta fill-brandMagenta/20" />
                <span className="font-mono text-[9px] text-inkMuted tracking-widest">PROFILE_STATS</span>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {[['03', 'Projects'], ['02', 'Internships'], ['6 wk', 'ML Training'], ['∞', 'Curiosity']].map(([n, l]) => (
                  <div key={l} className="bg-pinkSurface rounded-sm p-2 text-center">
                    <div className="font-display font-bold text-base text-brandMagenta">{n}</div>
                    <div className="font-mono text-[8px] text-inkMuted mt-0.5 leading-tight">{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>


        {/* ── ABOUT ── */}
        <section id="about" className="py-24 border-t border-pinkBorder/50">
          <SectionLabel index={1} title="About" />
          <motion.div {...reveal}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

            {/* Left: Photo + Pull quote */}
            <div className="lg:col-span-5 flex flex-col items-start gap-8">
              {/* Circular photo avatar */}
              <div className="relative">
                <div className="w-44 h-44 md:w-52 md:h-52 rounded-full overflow-hidden
                  border-4 border-pinkBorder shadow-xl shadow-pink-200/50
                  bg-gradient-to-br from-pinkSurface to-pink-200
                  flex items-center justify-center">
                  <img
                    src="/photo.jpg"
                    alt="Pradeep Kumar"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                {/* Decorative ring */}
                <div className="absolute -inset-1.5 rounded-full border border-dashed
                  border-brandMagenta/30 animate-spin" style={{ animationDuration: '20s' }} />
              </div>

              <blockquote className="font-display font-bold text-2xl md:text-3xl
                text-inkPrimary leading-tight tracking-tight">
                "Building at the intersection of deep learning and{' '}
                <span className="text-brandMagenta">human-centric design.</span>"
              </blockquote>
            </div>

            {/* Bio */}
            <div className="lg:col-span-7 space-y-5 text-inkSecondary leading-relaxed">
              <p>
                B.Tech Computer Science student at Government Engineering College (GEC)
                Palamu, affiliated with Jharkhand University of Technology. Specialised in
                Artificial Intelligence, Machine Learning pipelines, and full-stack web
                development.
              </p>
              <p>
                My work spans building deep learning classification systems for medical
                imaging (skin lesion detection via EfficientNet), NLP-based text classifiers,
                and clean web dashboards. Based in Chas, Bokaro, Jharkhand.
              </p>

              {/* Stats — no CGPA */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-pinkBorder">
                {[
                  ['03',   'Projects'],
                  ['02',   'Internships'],
                  ['6 wk', 'ML Training'],
                ].map(([num, label]) => (
                  <div key={label}>
                    <div className="font-display font-extrabold text-3xl text-brandMagenta">
                      {num}
                    </div>
                    <div className="font-mono text-[10px] text-inkMuted tracking-widest mt-1 uppercase">
                      {label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>


        {/* ── SKILLS ── */}
        <section id="skills" className="py-24 border-t border-pinkBorder/50">
          <SectionLabel index={2} title="Skills" />

          {/* Desktop grid */}
          <motion.div {...reveal}
            className="hidden md:grid grid-cols-5 gap-px bg-pinkBorder/40 border border-pinkBorder/40 rounded-sm overflow-hidden">
            {[
              { icon: <Terminal size={14}/>,    title: 'Languages',  items: ['Python', 'SQL'] },
              { icon: <LayoutGrid size={14}/>,  title: 'Web',        items: ['HTML / CSS', 'JavaScript', 'React'] },
              { icon: <Database size={14}/>,    title: 'Databases',  items: ['MySQL', 'MongoDB'] },
              { icon: <Activity size={14}/>,    title: 'Tools',      items: ['Git & GitHub', 'VS Code', 'Power BI'] },
              { icon: <ShieldCheck size={14}/>, title: 'Concepts',   items: ['Data Science', 'DSA / OOPs', 'REST / SDLC'] },
            ].map(({ icon, title, items }) => (
              <div key={title}
                className="bg-pinkLight p-6 hover:bg-white/80 transition-colors duration-200 group">
                <h3 className="flex items-center gap-1.5 font-mono text-[10px] text-brandMagenta
                  tracking-widest uppercase mb-5">
                  {icon} {title}
                </h3>
                <ul className="space-y-3">
                  {items.map(skill => (
                    <li key={skill}
                      className="flex items-center gap-2 font-display text-sm font-semibold
                        text-inkPrimary group-hover:text-brandMagenta transition-colors duration-200">
                      <span className="w-1 h-1 rounded-full bg-brandMagenta/40 group-hover:bg-brandMagenta
                        transition-colors flex-shrink-0" />
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.div>

          {/* Mobile marquee */}
          <div className="md:hidden overflow-hidden border border-pinkBorder bg-pinkLight py-3 rounded-sm relative">
            <div className="absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-pinkLight to-transparent z-10" />
            <div className="absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-pinkLight to-transparent z-10" />
            <div className="animate-marquee whitespace-nowrap flex gap-6">
              {['Python','SQL','HTML/CSS','JavaScript','React','MySQL','MongoDB',
                'Git','VS Code','Power BI','Data Science','DSA','OOPs','REST APIs',
                'Python','SQL','HTML/CSS','JavaScript','React','MySQL',].map((s, i) => (
                <span key={i} className="font-display font-semibold text-sm text-inkSecondary
                  flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brandMagenta/50" />
                  {s}
                </span>
              ))}
            </div>
          </div>
        </section>


        {/* ── PROJECTS ── */}
        <section id="projects" className="py-24 border-t border-pinkBorder/50">
          <SectionLabel index={3} title="Selected Projects" />

          <motion.div {...reveal} className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* DermAI — large */}
            <div className="md:col-span-2 card-3d group">
              <div className="card-3d-inner bg-white/70 backdrop-blur-sm border border-pinkBorder
                rounded-lg p-7 md:p-9 flex flex-col md:flex-row gap-8
                shadow-sm hover:shadow-md hover:shadow-pink-200/40 transition-all duration-300
                hover:border-brandMagenta/30">

                <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[10px] text-brandMagenta tracking-[0.2em]">01</span>
                    <span className="h-px flex-1 bg-pinkBorder max-w-[60px]" />
                    <Tag label="Deep Learning" />
                  </div>
                  <h3 className="font-display font-bold text-2xl md:text-3xl text-inkPrimary
                    group-hover:text-brandMagenta transition-colors duration-300">
                    DERM AI
                  </h3>
                  <p className="text-inkSecondary text-sm md:text-base leading-relaxed">
                    Skin cancer detection engine trained on HAM10000. Employs EfficientNetB0
                    transfer learning for 7-class lesion classification. Includes Grad-CAM
                    visual explainability and is Docker containerized with CI/CD deployment.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {['Python', 'TensorFlow', 'Flask', 'Docker', 'EfficientNet'].map(t => (
                      <Tag key={t} label={t} />
                    ))}
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center md:w-44 flex-shrink-0
                  bg-pinkSurface rounded-md p-6 space-y-3">
                  <Cpu size={36} className="text-brandMagenta opacity-60" />
                  <a href="https://github.com/prdip01/dermadrishti" target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-mono text-[11px]
                      text-inkSecondary hover:text-brandMagenta transition-colors">
                    CODE <ArrowUpRight size={12} />
                  </a>
                </div>
              </div>
            </div>

            {/* HabitFlow */}
            <div className="card-3d group">
              <div className="card-3d-inner bg-white/70 backdrop-blur-sm border border-pinkBorder
                rounded-lg p-7 flex flex-col gap-4 h-full
                shadow-sm hover:shadow-md hover:shadow-pink-200/40 transition-all duration-300
                hover:border-brandMagenta/30">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[10px] text-brandMagenta tracking-[0.2em]">02</span>
                  <Tag label="Web App" />
                </div>
                <h3 className="font-display font-bold text-xl text-inkPrimary
                  group-hover:text-brandMagenta transition-colors duration-300">
                  HABITFLOW
                </h3>
                <p className="text-inkSecondary text-sm leading-relaxed flex-1">
                  Vanilla JS habit tracker with Chart.js dashboards (line, bar, donut).
                  HTML5 LocalStorage persistence. JSON import/export engine.
                </p>
                <div className="flex flex-wrap gap-2">
                  {['JavaScript', 'Chart.js', 'CSS'].map(t => <Tag key={t} label={t} />)}
                </div>
                <a href="https://github.com/prdip01/habitflow" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-mono text-[11px]
                    text-inkSecondary hover:text-brandMagenta transition-colors self-start">
                  VIEW CODE <ArrowUpRight size={12} />
                </a>
              </div>
            </div>

            {/* Spam Detection */}
            <div className="card-3d group">
              <div className="card-3d-inner bg-white/70 backdrop-blur-sm border border-pinkBorder
                rounded-lg p-7 flex flex-col gap-4 h-full
                shadow-sm hover:shadow-md hover:shadow-pink-200/40 transition-all duration-300
                hover:border-brandMagenta/30">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[10px] text-brandMagenta tracking-[0.2em]">03</span>
                  <Tag label="NLP / ML" />
                </div>
                <h3 className="font-display font-bold text-xl text-inkPrimary
                  group-hover:text-brandMagenta transition-colors duration-300">
                  SPAM DETECTION
                </h3>
                <p className="text-inkSecondary text-sm leading-relaxed flex-1">
                  NLP-based spam classifier using TF-IDF feature extraction and
                  Python ML algorithms for high-precision text categorisation.
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Python', 'NLP', 'Machine Learning'].map(t => <Tag key={t} label={t} />)}
                </div>
                <a href="https://github.com/prdip01/spamEmailfinder" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-mono text-[11px]
                    text-inkSecondary hover:text-brandMagenta transition-colors self-start">
                  VIEW CODE <ArrowUpRight size={12} />
                </a>
              </div>
            </div>

          </motion.div>
        </section>


        {/* ── EXPERIENCE ── */}
        <section id="experience" className="py-24 border-t border-pinkBorder/50">
          <SectionLabel index={4} title="Experience" />

          <motion.div {...reveal}
            className="relative border-l border-pinkBorder/70 ml-3 pl-8 space-y-12">
            {[
              {
                period: '4 Weeks × 2',
                role: 'Web Development Intern',
                org: 'CodSoft',
                color: 'brandMagenta',
                desc: 'Built responsive frontend projects with HTML, CSS, and JavaScript under mentorship. Implemented cross-browser compatible layouts and mobile-first components.',
              },
              {
                period: '6 Weeks',
                role: 'Data Structures & ML Training',
                org: 'Ardent Computech Pvt. Ltd.',
                color: 'brandViolet',
                desc: 'Intensive DSA and ML training — implemented supervised learning pipelines, studied core algorithms, and applied OOP principles to structure ML workflows.',
              },
            ].map((item) => (
              <div key={item.role} className="relative">
                <div className={`absolute -left-[39px] top-1.5 w-3.5 h-3.5 rounded-full border-2
                  bg-pinkLight border-${item.color}`} />
                <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
                  <div className="md:col-span-3">
                    <span className="font-mono text-[10px] text-brandMagenta tracking-widest
                      flex items-center gap-1.5">
                      <Calendar size={11} /> {item.period}
                    </span>
                    <h3 className="font-display font-bold text-base text-inkPrimary mt-1">
                      {item.role}
                    </h3>
                    <p className="font-mono text-[10px] text-inkMuted mt-0.5">{item.org}</p>
                  </div>
                  <div className="md:col-span-9">
                    <p className="text-sm text-inkSecondary leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </section>


        {/* ── EDUCATION ── */}
        <section id="education" className="py-24 border-t border-pinkBorder/50">
          <SectionLabel index={5} title="Education" />

          <motion.div {...reveal}
            className="overflow-x-auto no-scrollbar rounded-sm border border-pinkBorder">
            <table className="w-full text-left text-sm min-w-[500px] bg-white/50">
              <thead className="border-b border-pinkBorder bg-pinkSurface/60">
                <tr className="font-mono text-[10px] text-inkMuted tracking-[0.18em] uppercase">
                  <th className="px-6 py-4 font-normal">Qualification</th>
                  <th className="px-6 py-4 font-normal">Institution</th>
                  <th className="px-6 py-4 font-normal">Duration</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-pinkSurface/30 transition-colors">
                  <td className="px-6 py-6">
                    <div className="font-display font-bold text-inkPrimary text-base">
                      B.Tech — Computer Science &amp; Engineering
                    </div>
                    <div className="font-mono text-[10px] text-brandMagenta mt-2">
                      DSA · AI · ML · OS · Computer Graphics · Compiler Design
                    </div>
                  </td>
                  <td className="px-6 py-6 text-inkSecondary">
                    Government Engineering College (GEC) Palamu
                    <span className="block font-mono text-[10px] text-inkMuted mt-1">JUT (Jharkhand University of Technology)</span>
                  </td>
                  <td className="px-6 py-6 text-inkSecondary font-mono text-sm">2022 – 2026</td>
                </tr>
              </tbody>
            </table>
          </motion.div>
        </section>


        {/* ── ACHIEVEMENTS ── */}
        <section className="py-16 border-t border-pinkBorder/50">
          <motion.div {...reveal}
            className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-3">
              <span className="font-mono text-[10px] text-inkMuted tracking-[0.25em] uppercase">
                / currently exploring
              </span>
            </div>
            <ul className="md:col-span-9 space-y-5">
              {[
                {
                  icon: <Brain size={16} className="text-brandMagenta shrink-0 mt-0.5" />,
                  text: 'Exploring LLM fine-tuning with LoRA and building RAG pipelines for domain-specific AI applications',
                },
                {
                  icon: <Code2 size={16} className="text-brandMagenta shrink-0 mt-0.5" />,
                  text: 'Learning Rust for systems programming and high-performance computing',
                },
                {
                  icon: <Box size={16} className="text-brandMagenta shrink-0 mt-0.5" />,
                  text: 'Experimenting with Three.js for creative coding and interactive web experiences',
                },
                {
                  icon: <BookOpen size={16} className="text-brandMagenta shrink-0 mt-0.5" />,
                  text: "Reading: 'Designing Data-Intensive Applications' by Martin Kleppmann",
                },
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-inkSecondary">
                  {item.icon}
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </section>


        {/* ── CONTACT / FOOTER ── */}
        <footer id="contact" className="py-20 border-t border-pinkBorder/50">
          <motion.div {...reveal} className="grid grid-cols-1 md:grid-cols-12 gap-12 items-end">

            <div className="md:col-span-8 space-y-6">
              <h2 className="font-display font-extrabold leading-tight tracking-tight
                text-[clamp(2.4rem,6vw,5rem)] text-inkPrimary">
                Let's build something<br />
                <span className="animate-shimmer">weird</span> together.
              </h2>
              <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
                <a href="mailto:iamprdip160@gmail.com"
                  className="inline-flex items-center gap-2 px-5 py-2.5
                    bg-brandMagenta text-white text-sm font-semibold rounded-sm
                    shadow-lg shadow-pink-300/30 hover:bg-brandViolet
                    transition-all duration-300">
                  <Mail size={15} /> iamprdip160@gmail.com
                </a>
                <a href="https://github.com/prdip01" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5
                    border border-pinkBorder text-sm font-medium text-inkSecondary
                    rounded-sm hover:border-brandMagenta hover:text-brandMagenta
                    transition-all duration-300">
                  <Github size={15} /> github.com/prdip01
                </a>
                <a href="https://www.instagram.com/prdip01?igsh=YjJqYTc5cTFjemFk&utm_source=qr"
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5
                    border border-pinkBorder text-sm font-medium text-inkSecondary
                    rounded-sm hover:border-brandMagenta hover:text-brandMagenta
                    transition-all duration-300">
                  <Instagram size={15} /> @prdip01
                </a>
              </div>
            </div>

            <div className="md:col-span-4 md:text-right space-y-2">
              <p className="font-display font-bold text-lg text-inkPrimary">Pradeep Kumar</p>
              <p className="font-mono text-[10px] text-inkMuted tracking-widest">
                GEC Palamu · JUT<br />
                Chas, Bokaro, Jharkhand
              </p>
              <p className="font-mono text-[10px] text-inkMuted mt-4">
                Made by ❤️ Pradeep Kumar
              </p>
              <a href="#home"
                className="inline-flex items-center gap-1 font-mono text-[10px]
                  text-brandMagenta hover:text-brandViolet transition-colors mt-2">
                Back to top ↑
              </a>
            </div>

          </motion.div>
        </footer>

      </main>
    </div>
  );
}
