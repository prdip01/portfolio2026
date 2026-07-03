import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail, Github, Linkedin, Menu, X, ArrowUpRight, ExternalLink,
  Lock, Eye, EyeOff, Pencil, Trash2, Plus, Save, Globe, Settings,
  Brain, Code2, Box, BookOpen, Zap, Users, Code, User, FlaskConical,
  Link as LinkIcon, Image, RefreshCw
} from 'lucide-react';

/* ─── Animation presets ─────────────────────────────────── */
const fadeUp = {
  initial:    { opacity: 0, y: 30 },
  whileInView:{ opacity: 1, y:  0 },
  viewport:   { once: true, margin: '-60px' },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
};
const fadeIn = { ...fadeUp, initial: { opacity: 0, y: 0 } };

/* ─── Screenshot helper ─────────────────────────────────── */
const getScreenshot = (url) =>
  `https://image.thum.io/get/width/1200/crop/630/${url}`;

/* ─── Default Data ──────────────────────────────────────── */
const DEFAULT_PROFILE = {
  name: 'Pradeep Kumar',
  title: 'Data Scientist & Web Developer',
  bio: 'Code. Create. Simplify. I build technology that makes everyday tasks easier.',
  photo: '/photo.jpg',
  github: 'https://github.com/prdip01',
  linkedin: 'https://www.linkedin.com/in/pradeep-kumar-53a9502a6',
  email: 'iamprdip160@gmail.com'
};

const DEFAULT_PROJECTS = [
  {
    id: 1,
    name: 'Yatra OS',
    desc: 'A smart travel planning OS — plan trips, track expenses & explore destinations.',
    url: 'https://tripkaplaneer.netlify.app/',
    accent: '#8B5CF6',
    tag: 'Travel · Planning',
    icon: '✈️',
    banner: '/banners/yatra-os.png'
  },
  {
    id: 2,
    name: 'SSC CGL 2027 Tracker',
    desc: 'Productivity tracker for SSC CGL aspirants — study logs, progress charts & analytics.',
    url: 'https://cgltrackerbyprdip.netlify.app/',
    accent: '#6366F1',
    tag: 'Productivity · Exam Prep',
    icon: '📊',
    banner: '/banners/ssc-tracker.png'
  },
  {
    id: 3,
    name: 'Have It Flow',
    desc: 'Monthly habit & progress hub — build streaks, visualise consistency and stay accountable.',
    url: 'https://habittrracker.netlify.app/',
    accent: '#10B981',
    tag: 'Habits · Monthly Progress',
    icon: '🌊',
    banner: '/banners/habit-flow.png'
  },
  {
    id: 4,
    name: 'The Progress Planner',
    desc: 'Goal-first planner to break big dreams into daily action — built for focus and clarity.',
    url: 'https://progressplannerr.netlify.app/',
    accent: '#F59E0B',
    tag: 'Goals · Daily Planning',
    icon: '🎯',
    banner: '/banners/progress-planner.png'
  },
  {
    id: 5,
    name: 'Square Breaker',
    desc: 'Classic brick-breaker arcade game built in vanilla JavaScript — break squares, score big.',
    url: 'https://square-breaker.netlify.app/',
    accent: '#EF4444',
    tag: 'Game · Arcade',
    icon: '🟥',
    banner: '/banners/square-breaker.png'
  },
];

const DEFAULT_RESEARCH = [
  {
    id: 1,
    icon: '🧠',
    title: 'DermAI: Skin Lesion Classification',
    desc: 'A custom convolutional neural network achieving 93% accuracy on the HAM10000 skin cancer dataset.',
    link: 'https://github.com/prdip01'
  },
  {
    id: 2,
    icon: '📝',
    title: 'Low-resource NLP fine-tuning using LoRA',
    desc: 'Explored Parameter-Efficient Fine-Tuning (PEFT) strategies for LLMs on compute-constrained devices.',
    link: 'https://github.com/prdip01'
  },
  {
    id: 3,
    icon: '🩺',
    title: 'PneumoNet: Automated Pediatric Pneumonia Detection',
    desc: 'Transfer learning using ResNet50 on chest X-rays with Grad-CAM activation visualization.',
    link: 'https://github.com/prdip01'
  }
];

const SKILLS = [
  { logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',        label: 'Python' },
  { logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg',         label: 'Data Science' },
  { logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',           label: 'Web Dev' },
  { logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg', label: 'Machine Learning' },
  { logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',           label: 'SQL' },
  { logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',           label: 'React' },
  { logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',              label: 'Git & GitHub' },
  { logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', label: 'JavaScript' },
];

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLight, setIsLight] = useState(() => {
    try {
      const saved = localStorage.getItem('prdip_theme');
      return saved ? saved === 'light' : true; // Default to Light Mode
    } catch {
      return true;
    }
  });

  /* ── Admin state ── */
  const [adminOpen, setAdminOpen] = useState(false);
  const [adminPass, setAdminPass] = useState('');
  const [adminAuth, setAdminAuth] = useState(false);
  const [passErr, setPassErr] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [adminTab, setAdminTab] = useState('profile'); // profile | projects | research

  /* ── Content states ── */
  const [profile, setProfile] = useState(() => {
    try {
      const s = localStorage.getItem('prdip_profile');
      return s ? JSON.parse(s) : DEFAULT_PROFILE;
    } catch {
      return DEFAULT_PROFILE;
    }
  });

  const [liveProjects, setLiveProjects] = useState(() => {
    try {
      const s = localStorage.getItem('prdip_live_projects');
      return s ? JSON.parse(s) : DEFAULT_PROJECTS;
    } catch {
      return DEFAULT_PROJECTS;
    }
  });

  const [research, setResearch] = useState(() => {
    try {
      const s = localStorage.getItem('prdip_research');
      return s ? JSON.parse(s) : DEFAULT_RESEARCH;
    } catch {
      return DEFAULT_RESEARCH;
    }
  });

  /* ── CRUD Editing states ── */
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [addMode, setAddMode] = useState(false);

  // Projects form templates
  const [newProj, setNewProj] = useState({ name: '', desc: '', url: '', tag: '', accent: '#EC4899', icon: '🚀', banner: '' });

  // Research form templates
  const [newRes, setNewRes] = useState({ title: '', desc: '', link: '', icon: '🔬' });

  const ADMIN_PASSWORD = 'prdip@2026';

  /* ── Theme toggle effect ── */
  useEffect(() => {
    document.documentElement.classList.toggle('light', isLight);
    try {
      localStorage.setItem('prdip_theme', isLight ? 'light' : 'dark');
    } catch {}
  }, [isLight]);

  /* ── Save content states to localStorage ── */
  useEffect(() => {
    try { localStorage.setItem('prdip_profile', JSON.stringify(profile)); } catch {}
  }, [profile]);

  useEffect(() => {
    try { localStorage.setItem('prdip_live_projects', JSON.stringify(liveProjects)); } catch {}
  }, [liveProjects]);

  useEffect(() => {
    try { localStorage.setItem('prdip_research', JSON.stringify(research)); } catch {}
  }, [research]);

  /* ── Actions ── */
  const handleAdminLogin = () => {
    if (adminPass === ADMIN_PASSWORD) {
      setAdminAuth(true);
      setPassErr(false);
    } else {
      setPassErr(true);
    }
  };

  const closeAdmin = () => {
    setAdminOpen(false);
    setAdminAuth(false);
    setAdminPass('');
    setPassErr(false);
    setEditingId(null);
    setAddMode(false);
  };

  // Projects CRUD
  const startEditProject = (p) => {
    setEditingId(p.id);
    setEditForm({ ...p });
  };
  const saveEditProject = () => {
    setLiveProjects(prev => prev.map(p => p.id === editingId ? { ...editForm, id: editingId } : p));
    setEditingId(null);
  };
  const deleteProject = (id) => {
    setLiveProjects(prev => prev.filter(p => p.id !== id));
  };
  const addProject = () => {
    if (!newProj.name || !newProj.url) return;
    setLiveProjects(prev => [...prev, { ...newProj, id: Date.now() }]);
    setNewProj({ name: '', desc: '', url: '', tag: '', accent: '#EC4899', icon: '🚀', banner: '' });
    setAddMode(false);
  };

  // Research CRUD
  const startEditResearch = (r) => {
    setEditingId(r.id);
    setEditForm({ ...r });
  };
  const saveEditResearch = () => {
    setResearch(prev => prev.map(r => r.id === editingId ? { ...editForm, id: editingId } : r));
    setEditingId(null);
  };
  const deleteResearch = (id) => {
    setResearch(prev => prev.filter(r => r.id !== id));
  };
  const addResearch = () => {
    if (!newRes.title) return;
    setResearch(prev => [...prev, { ...newRes, id: Date.now() }]);
    setNewRes({ title: '', desc: '', link: '', icon: '🔬' });
    setAddMode(false);
  };

  // Reset to Defaults
  const resetToDefaults = () => {
    if (window.confirm("Are you sure you want to reset all content to defaults? This will erase your local edits.")) {
      setProfile(DEFAULT_PROFILE);
      setLiveProjects(DEFAULT_PROJECTS);
      setResearch(DEFAULT_RESEARCH);
      closeAdmin();
    }
  };

  const navLinks = [
    { label: 'About',    href: '#about' },
    { label: 'Skills',   href: '#skills' },
    { label: 'Research', href: '#research' },
    { label: 'Projects', href: '#live-projects' },
    { label: 'Contact',  href: '#contact' },
  ];

  return (
    <div className="relative min-h-screen bg-bgBase text-textPrimary font-sans overflow-x-hidden transition-colors duration-300">
      
      {/* ── Background glows ── */}
      <div aria-hidden className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
        <div className="glow-blob w-[600px] h-[600px] bg-accent/8 -top-32 -left-32" />
        <div className="glow-blob w-[500px] h-[500px] bg-indigo-500/8 top-1/2 -right-48" />
        <div className="glow-blob w-[400px] h-[400px] bg-purple-500/6 bottom-0 left-1/3" />
      </div>

      {/* ════════════════════════════════════════════════
          HEADER
      ═══════════════════════════════════════════════ */}
      <header className="sticky top-0 w-full z-50 backdrop-blur-xl border-b border-borderColor/60 transition-colors duration-300"
        style={{ background: 'var(--nav-bg)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between">

          {/* Logo */}
          <a href="#home" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-accent to-accent-light flex items-center justify-center
              text-white font-bold text-sm tracking-wider shadow-md group-hover:scale-105 transition-transform duration-300">
              PK
            </div>
            <span className="hidden sm:block font-semibold text-textPrimary text-sm transition-colors duration-300">
              {profile.name}
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(l => (
              <a key={l.label} href={l.href}
                className="nav-link relative text-sm font-medium text-textSecondary
                  hover:text-textPrimary transition-colors duration-200">
                {l.label}
              </a>
            ))}
          </nav>

          {/* Theme toggle + hamburger */}
          <div className="flex items-center gap-3">
            {/* ── Half-black / half-white theme toggle ── */}
            <button
              onClick={() => setIsLight(v => !v)}
              title={isLight ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
              aria-label="Toggle theme"
              className="w-9 h-9 rounded-full overflow-hidden relative border border-borderColor
                hover:border-accent hover:scale-105 transition-all duration-200 shrink-0 shadow-sm">
              <div className="absolute inset-0" style={{ background: '#F8FAFC', clipPath: 'inset(0 50% 0 0)' }} />
              <div className="absolute inset-0" style={{ background: '#0B0F19', clipPath: 'inset(0 0 0 50%)' }} />
              <div
                className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full transition-all duration-300"
                style={{
                  left: isLight ? '22%' : 'auto',
                  right: isLight ? 'auto' : '22%',
                  background: isLight ? '#0B0F19' : '#F8FAFC',
                  transform: 'translateY(-50%)',
                }}
              />
            </button>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 text-textSecondary hover:text-accent transition-colors"
              aria-label="Toggle menu">
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed inset-0 top-16 z-40 backdrop-blur-2xl
              flex flex-col px-8 py-10 gap-6 md:hidden"
            style={{ background: 'var(--nav-bg)' }}>
            {navLinks.map(l => (
              <a key={l.label} href={l.href}
                onClick={() => setMenuOpen(false)}
                className="text-2xl font-bold text-textPrimary hover:text-accent
                  transition-colors border-b border-borderColor pb-4">
                {l.label}
              </a>
            ))}
            <a href={`mailto:${profile.email}`}
              className="inline-flex items-center justify-center gap-2 px-4 py-3 mt-2
                bg-accent hover:bg-accentLight text-white font-semibold rounded-lg w-full transition-colors">
              <Mail size={16} /> Say Hello
            </a>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* ════════════════════════════════════════════════
          MAIN
      ═══════════════════════════════════════════════ */}
      <main className="relative z-10">

        {/* ── HERO ── */}
        <section id="home" className="min-h-[calc(100vh-64px)] max-w-7xl mx-auto px-4 sm:px-8
          flex flex-col justify-center pt-10 pb-16">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* ── Left: Text ── */}
            <div className="space-y-6 order-2 lg:order-1">
              <motion.div {...fadeIn} transition={{ duration: 0.5 }}>
                <p className="text-accent font-semibold text-sm sm:text-base tracking-wider uppercase mb-2">Hello, I'm</p>
                <h1 className="font-bold leading-tight text-4xl sm:text-5xl md:text-6xl text-textPrimary">
                  {profile.name.split(' ')[0]}{' '}
                  <span className="shimmer-text">{profile.name.split(' ').slice(1).join(' ')}</span>
                </h1>
                <p className="text-textSecondary text-lg sm:text-xl font-medium mt-3">
                  {profile.title}
                </p>
              </motion.div>

              <motion.p {...fadeUp} transition={{ delay: 0.15 }}
                className="text-textSecondary text-sm sm:text-base leading-relaxed max-w-md">
                {profile.bio}
              </motion.p>

              <motion.div {...fadeUp} transition={{ delay: 0.25 }}
                className="flex flex-wrap gap-3">
                <a href="#live-projects"
                  className="inline-flex items-center gap-2 px-5 py-3
                    bg-accent hover:bg-accent-light text-white font-semibold text-sm
                    rounded-lg shadow-sm transition-all duration-200
                    active:scale-95 touch-manipulation">
                  View My Work <ArrowUpRight size={16} />
                </a>
                <a href="#contact"
                  className="inline-flex items-center gap-2 px-5 py-3
                    border border-borderColor text-textSecondary font-medium text-sm
                    rounded-lg hover:border-accent hover:text-accent
                    bg-bgCard/40 hover:bg-bgCard/90 transition-all duration-200 touch-manipulation">
                  <Mail size={15} /> Get In Touch
                </a>
              </motion.div>

              {/* Social icons */}
              <motion.div {...fadeUp} transition={{ delay: 0.35 }}
                className="flex items-center gap-4 pt-2">
                {[
                  { href: profile.github,    icon: <Github   size={18} />, label: 'GitHub' },
                  { href: profile.linkedin,  icon: <Linkedin size={18} />, label: 'LinkedIn' },
                  { href: `mailto:${profile.email}`, icon: <Mail     size={18} />, label: 'Email' },
                ].map(s => (
                  <a key={s.label} href={s.href}
                    target={s.href.startsWith('mailto') ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="w-9 h-9 rounded-lg border border-borderColor flex items-center justify-center
                      text-textSecondary hover:border-accent hover:text-accent bg-bgCard/35 hover:bg-bgCard
                      transition-all duration-200">
                    {s.icon}
                  </a>
                ))}
              </motion.div>
            </div>

            {/* ── Right: Photo ── */}
            <div className="flex justify-center order-1 lg:order-2">
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="relative">
                {/* Glow */}
                <div className="absolute inset-0 bg-accent/15 blur-3xl scale-110 rounded-full" style={{ zIndex: 0 }} />

                {/* LinkedIn badge — top right */}
                <a href={profile.linkedin}
                  target="_blank" rel="noopener noreferrer"
                  className="absolute -top-3 -right-3 z-30 bg-[#0077B5] rounded-xl
                    px-3 py-1.5 flex items-center gap-1.5 shadow-md
                    hover:bg-[#006097] transition-all hover:scale-105">
                  <Linkedin size={13} className="text-white" />
                  <span className="text-white text-[11px] font-semibold">LinkedIn</span>
                </a>

                {/* Photo container */}
                <div className="relative z-10 w-72 h-[360px] sm:w-[320px] sm:h-[400px] lg:w-[360px] lg:h-[460px] 
                  rounded-2xl overflow-hidden border border-borderColor/80 shadow-md">
                  <img
                    src={profile.photo || '/photo.jpg'}
                    alt={profile.name}
                    className="w-full h-full object-cover"
                    style={{ objectPosition: 'center 15%' }}
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600";
                    }}
                  />
                </div>

                {/* Open to Work badge — bottom left */}
                <div className="absolute -bottom-3 -left-3 z-20 bg-bgCard border border-borderColor
                  rounded-xl px-3 py-2 flex items-center gap-2 shadow-sm">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">Open to Work</span>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
            className="hidden sm:flex flex-col items-center gap-1 mt-12 text-textMuted">
            <div className="w-5 h-8 rounded-full border border-borderColor flex items-start justify-center pt-1.5">
              <div className="w-1 h-2 rounded-full bg-accent animate-bounce" />
            </div>
            <span className="text-[10px] tracking-widest uppercase font-mono">Scroll Down</span>
          </motion.div>
        </section>


        {/* ── SKILLS + FEATURED PROJECTS ── */}
        <section className="border-t border-borderColor/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 py-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

              {/* ── Skills ── */}
              <motion.div {...fadeUp} id="skills">
                <span className="section-dot mb-3 block">What I Do</span>
                <h2 className="text-2xl sm:text-3xl font-bold text-textPrimary mb-8">
                  Skills &amp; Expertise
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  {SKILLS.map(s => (
                    <div key={s.label} className="skill-card rounded-xl p-4 flex items-center gap-3 cursor-default">
                      <img src={s.logo} alt={s.label} className="w-7 h-7 object-contain shrink-0" />
                      <span className="text-textPrimary text-sm font-semibold">{s.label}</span>
                    </div>
                  ))}
                </div>
                <a href="#live-projects"
                  className="inline-flex items-center gap-1.5 mt-6 text-accent text-sm font-medium
                    hover:gap-3 transition-all duration-200">
                  View All Projects <ArrowUpRight size={14} />
                </a>
              </motion.div>

              {/* ── Featured Projects (top 3 compact preview) ── */}
              <motion.div {...fadeUp} transition={{ delay: 0.1 }}>
                <span className="section-dot mb-3 block">My Work</span>
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl sm:text-3xl font-bold text-textPrimary">
                    Featured Projects
                  </h2>
                  <a href="#live-projects"
                    className="text-accent text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                    View All <ArrowUpRight size={13} />
                  </a>
                </div>
                <div className="space-y-3">
                  {liveProjects.slice(0, 3).map((proj, i) => (
                    <motion.a
                      key={proj.id}
                      href={proj.url}
                      target="_blank" rel="noopener noreferrer"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                      className="project-card rounded-xl p-4 flex items-center gap-4 group block touch-manipulation active:scale-[0.98]">
                      <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0"
                        style={{ background: proj.accent + '15', border: `1px solid ${proj.accent}33` }}>
                        {proj.icon || '🚀'}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-textPrimary font-semibold text-sm group-hover:text-accent transition-colors truncate">
                          {proj.name}
                        </h3>
                        <p className="text-textMuted text-xs mt-0.5 line-clamp-1">{proj.desc}</p>
                      </div>
                      <ExternalLink size={14} className="text-textMuted group-hover:text-accent transition-colors shrink-0" />
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>


        {/* ── TRAITS BAR ── */}
        <section className="border-t border-borderColor/60 bg-bgSurface/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {[
                { icon: <Code  size={18} />, title: 'Clean Code',     desc: 'Maintainable & scalable.' },
                { icon: <Zap   size={18} />, title: 'Problem Solver',  desc: 'Love real-world challenges.' },
                { icon: <Brain size={18} />, title: 'Quick Learner',   desc: 'Always learning new tech.' },
                { icon: <Users size={18} />, title: 'Team Player',     desc: 'Collaborative and open.' },
              ].map(t => (
                <motion.div key={t.title} {...fadeUp} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-accentMuted flex items-center justify-center
                    text-accent shrink-0 mt-0.5">
                    {t.icon}
                  </div>
                  <div>
                    <p className="text-textPrimary font-semibold text-sm">{t.title}</p>
                    <p className="text-textMuted text-xs mt-0.5 leading-relaxed">{t.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>


        {/* ── ABOUT ── */}
        <section id="about" className="border-t border-borderColor/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16">
            <motion.div {...fadeUp} className="flex flex-col sm:flex-row gap-10 items-start">
              <div className="space-y-4 flex-1">
                <span className="section-dot">About Me</span>
                <h2 className="text-2xl sm:text-3xl font-bold">Building things that matter</h2>
                <p className="text-textSecondary text-sm sm:text-base leading-relaxed max-w-xl">
                  B.Tech Computer Science student at GEC Palamu (JUT). Specialised in
                  AI, Machine Learning pipelines, and full-stack web development.
                  Based in Chas, Bokaro, Jharkhand.
                </p>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-1 gap-4 shrink-0">
                {[['04+','Live Apps'],['02','Internships'],['6 wk','ML Training']].map(([n, l]) => (
                  <div key={l} className="glass-card rounded-xl p-4 text-center sm:text-left">
                    <div className="text-2xl font-bold text-accent">{n}</div>
                    <div className="text-textMuted text-[10px] tracking-widest uppercase mt-0.5">{l}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>


        {/* ── RECENT RESEARCH ── */}
        <section id="research" className="border-t border-borderColor/60 bg-bgSurface/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16">
            <motion.div {...fadeUp}>
              <span className="section-dot mb-4 block">Recent Research</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-textPrimary mb-8">
                Research &amp; Exploration
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {research.map((item, i) => (
                  <motion.div key={item.id}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07 }}
                    className="glass-card rounded-xl p-6 flex flex-col justify-between border border-borderColor/50 h-full">
                    <div>
                      <div className="w-9 h-9 rounded-lg bg-accentMuted flex items-center justify-center
                        text-accent text-xl shrink-0 mb-4">
                        {item.icon || '🔬'}
                      </div>
                      <h3 className="font-bold text-textPrimary text-base mb-2">{item.title}</h3>
                      <p className="text-textSecondary text-xs leading-relaxed mb-4">{item.desc}</p>
                    </div>
                    {item.link && (
                      <a href={item.link} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-accent text-xs font-semibold hover:gap-2 transition-all">
                        View Project / Paper <ArrowUpRight size={12} />
                      </a>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>


        {/* ════════════════════════════════════════════════
            LIVE PROJECTS — BANNER CARDS WITH SCREENSHOTS
        ═══════════════════════════════════════════════ */}
        <section id="live-projects" className="border-t border-borderColor/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 py-20">
            <motion.div {...fadeUp} className="mb-10">
              <span className="section-dot mb-3 block">Live Products</span>
              <h2 className="text-2xl sm:text-3xl font-bold">View My Live Projects</h2>
              <p className="text-textSecondary text-sm mt-2">Click any project to open the live site.</p>
            </motion.div>

            {/* Banner grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {liveProjects.map((proj, i) => (
                <motion.a
                  key={proj.id}
                  href={proj.url}
                  target="_blank" rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                  className="banner-card group block touch-manipulation">

                  {/* ── Browser chrome bar ── */}
                  <div className="browser-chrome px-4 py-2.5 flex items-center gap-3">
                    <div className="flex gap-1.5 shrink-0">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
                    </div>
                    <div className="browser-url flex-1 rounded-md px-3 py-1 text-[11px] font-mono truncate">
                      {proj.url}
                    </div>
                    <ExternalLink size={12} className="text-textMuted group-hover:text-accent transition-colors shrink-0" />
                  </div>

                  {/* ── Screenshot preview / Banner ── */}
                  <div className="relative h-44 sm:h-52 overflow-hidden bg-bgSurface">
                    {/* Gradient fallback always visible */}
                    <div className="absolute inset-0 flex items-center justify-center"
                      style={{ background: `linear-gradient(135deg, ${proj.accent}12 0%, ${proj.accent}25 100%)` }}>
                      <span className="text-6xl opacity-20 group-hover:opacity-30 transition-opacity">
                        {proj.icon}
                      </span>
                    </div>
                    {/* Banner or Live screenshot */}
                    {proj.banner ? (
                      <img
                        src={proj.banner}
                        alt={`${proj.name} banner`}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover object-center
                          group-hover:scale-105 transition-transform duration-700"
                      />
                    ) : (
                      <img
                        src={getScreenshot(proj.url)}
                        alt={`${proj.name} preview`}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover object-top
                          group-hover:scale-105 transition-transform duration-700"
                        onError={e => { e.currentTarget.style.opacity = '0'; }}
                      />
                    )}
                    {/* Subtle overlay on hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100
                      transition-opacity duration-300"
                      style={{ background: `${proj.accent}12` }} />
                  </div>

                  {/* ── Info footer ── */}
                  <div className="p-5 flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2.5 flex-wrap mb-1.5">
                        <span className="text-lg">{proj.icon}</span>
                        <h3 className="font-bold text-textPrimary group-hover:text-accent
                          transition-colors text-base">
                          {proj.name}
                        </h3>
                        {proj.tag && (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-md uppercase tracking-wider"
                            style={{ color: proj.accent, background: proj.accent + '15', border: `1px solid ${proj.accent}33` }}>
                            {proj.tag}
                          </span>
                        )}
                      </div>
                      <p className="text-textSecondary text-sm leading-snug line-clamp-2">{proj.desc}</p>
                      <div className="mt-3 inline-flex items-center gap-1.5 text-accent text-sm font-semibold
                        group-hover:gap-3 transition-all duration-200">
                        Visit Live Site <ArrowUpRight size={14} />
                      </div>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Admin trigger */}
            <div className="flex justify-end mt-8">
              <button
                onClick={() => setAdminOpen(true)}
                className="inline-flex items-center gap-1.5 text-textMuted hover:text-accent transition-colors
                  text-[10px] font-mono tracking-widest uppercase">
                <Settings size={10} /> manage projects
              </button>
            </div>
          </div>
        </section>


        {/* ── CONTACT / FOOTER ── */}
        <footer id="contact" className="border-t border-borderColor/60 bg-bgSurface/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

              <motion.div {...fadeUp} className="space-y-5">
                <h2 className="text-3xl sm:text-4xl font-bold leading-tight">
                  Let's build something<br />
                  <span className="shimmer-text">amazing together!</span>
                </h2>
                <p className="text-textSecondary text-sm sm:text-base">
                  Open for collaborations, freelance projects and full-time roles.
                  Drop me a message!
                </p>
                <a href={`mailto:${profile.email}`}
                  className="inline-flex items-center gap-2 px-6 py-3
                    bg-accent hover:bg-accent-light text-white font-semibold
                    rounded-lg transition-all duration-250 shadow-md
                    active:scale-95 touch-manipulation">
                  Contact Me <ArrowUpRight size={16} />
                </a>
              </motion.div>

              <motion.div {...fadeUp} transition={{ delay: 0.1 }} className="space-y-4">
                {[
                  { href: `mailto:${profile.email}`, icon: <Mail       size={16} />, label: profile.email },
                  { href: profile.github,           icon: <Github     size={16} />, label: profile.github.replace('https://', '') },
                  { href: profile.linkedin,         icon: <Linkedin   size={16} />, label: profile.linkedin.replace('https://', '') },
                ].map(l => (
                  <a key={l.label} href={l.href}
                    target={l.href.startsWith('mailto') ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-textSecondary hover:text-accent transition-colors group">
                    <div className="w-8 h-8 rounded-lg bg-accentMuted flex items-center justify-center
                      text-accent shrink-0 group-hover:bg-accent group-hover:text-white transition-all">
                      {l.icon}
                    </div>
                    <span className="text-sm font-medium">{l.label}</span>
                  </a>
                ))}
              </motion.div>
            </div>

            <div className="mt-12 pt-6 border-t border-borderColor flex flex-col sm:flex-row
              items-center justify-between gap-3 text-textMuted text-xs font-mono">
              <span>Made with ❤️ by {profile.name}</span>
              <a href="#home" className="hover:text-accent transition-colors">Back to top ↑</a>
            </div>
          </div>
        </footer>

      </main>

      {/* ════════════════════════════════════════════════
          ADMIN PANEL MODAL
      ═══════════════════════════════════════════════ */}
      <AnimatePresence>
        {adminOpen && (
          <motion.div
            key="admin-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] bg-black/50 backdrop-blur-sm
              flex items-center justify-center p-4"
            onClick={e => e.target === e.currentTarget && closeAdmin()}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25 }}
              className="bg-bgCard border border-borderColor rounded-2xl shadow-xl
                w-full max-w-2xl max-h-[90vh] overflow-y-auto">

              <div className="flex items-center justify-between px-6 py-4 border-b border-borderColor">
                <div className="flex items-center gap-2">
                  <Lock size={14} className="text-accent" />
                  <span className="font-bold text-sm text-textPrimary">Portfolio Manager</span>
                  {adminAuth && (
                    <span className="text-[9px] font-mono text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-950/20
                      px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                      AUTHENTICATED
                    </span>
                  )}
                </div>
                <button onClick={closeAdmin} className="text-textMuted hover:text-accent transition-colors p-1">
                  <X size={16} />
                </button>
              </div>

              <div className="px-6 py-6">
                {!adminAuth ? (
                  <div className="space-y-4 max-w-sm mx-auto py-4">
                    <p className="text-center text-xs font-mono text-textMuted tracking-widest uppercase">
                      Enter admin password
                    </p>
                    <div className="relative">
                      <input
                        type={showPass ? 'text' : 'password'}
                        value={adminPass}
                        onChange={e => { setAdminPass(e.target.value); setPassErr(false); }}
                        onKeyDown={e => e.key === 'Enter' && handleAdminLogin()}
                        placeholder="Password"
                        className={`w-full px-4 py-3 pr-10 bg-bgSurface border rounded-lg
                          font-mono text-sm text-textPrimary outline-none focus:border-accent transition-colors
                          ${passErr ? 'border-red-500' : 'border-borderColor'}`}
                      />
                      <button onClick={() => setShowPass(s => !s)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-textMuted hover:text-accent transition-colors">
                        {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
                      </button>
                    </div>
                    {passErr && <p className="text-red-500 text-[10px] text-center font-mono font-semibold">Incorrect password</p>}
                    <button onClick={handleAdminLogin}
                      className="w-full py-3 bg-accent hover:bg-accent-light text-white font-semibold text-sm rounded-lg transition-colors shadow-sm">
                      Unlock Manager
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    
                    {/* Admin Tabs */}
                    <div className="flex gap-1 p-1 bg-bgSurface rounded-xl">
                      {[
                        { id: 'profile', label: 'Profile', icon: <User size={14} /> },
                        { id: 'projects', label: 'Projects', icon: <Globe size={14} /> },
                        { id: 'research', label: 'Research', icon: <FlaskConical size={14} /> },
                      ].map(t => (
                        <button
                          key={t.id}
                          onClick={() => { setAdminTab(t.id); setAddMode(false); setEditingId(null); }}
                          className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-semibold rounded-lg transition-all
                            ${adminTab === t.id ? 'bg-bgCard text-accent shadow-sm' : 'text-textSecondary hover:text-textPrimary'}`}>
                          {t.icon}
                          {t.label}
                        </button>
                      ))}
                    </div>

                    {/* ════ TAB: PROFILE ════ */}
                    {adminTab === 'profile' && (
                      <div className="space-y-4">
                        <div className="flex items-center gap-4 bg-bgSurface p-4 rounded-xl">
                          <div className="w-16 h-16 rounded-xl overflow-hidden border border-borderColor shrink-0">
                            <img src={profile.photo} alt="Avatar" className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <h4 className="font-bold text-sm text-textPrimary">{profile.name}</h4>
                            <p className="text-xs text-textMuted">{profile.title}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-[10px] font-mono text-textMuted uppercase tracking-wider">Full Name</label>
                            <input value={profile.name} onChange={e => setProfile(p => ({ ...p, name: e.target.value }))}
                              className="w-full px-3 py-2 bg-bgSurface border border-borderColor rounded-lg text-xs text-textPrimary outline-none focus:border-accent" />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-mono text-textMuted uppercase tracking-wider">Title / Role</label>
                            <input value={profile.title} onChange={e => setProfile(p => ({ ...p, title: e.target.value }))}
                              className="w-full px-3 py-2 bg-bgSurface border border-borderColor rounded-lg text-xs text-textPrimary outline-none focus:border-accent" />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-mono text-textMuted uppercase tracking-wider">Bio / Tagline</label>
                          <textarea value={profile.bio} onChange={e => setProfile(p => ({ ...p, bio: e.target.value }))} rows={2}
                            className="w-full px-3 py-2 bg-bgSurface border border-borderColor rounded-lg text-xs text-textPrimary outline-none focus:border-accent resize-none" />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-[10px] font-mono text-textMuted uppercase tracking-wider">Photo Path / URL</label>
                            <input value={profile.photo} onChange={e => setProfile(p => ({ ...p, photo: e.target.value }))}
                              className="w-full px-3 py-2 bg-bgSurface border border-borderColor rounded-lg text-xs text-textPrimary outline-none focus:border-accent" />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-mono text-textMuted uppercase tracking-wider">Email Address</label>
                            <input value={profile.email} onChange={e => setProfile(p => ({ ...p, email: e.target.value }))}
                              className="w-full px-3 py-2 bg-bgSurface border border-borderColor rounded-lg text-xs text-textPrimary outline-none focus:border-accent" />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-[10px] font-mono text-textMuted uppercase tracking-wider">GitHub Link</label>
                            <input value={profile.github} onChange={e => setProfile(p => ({ ...p, github: e.target.value }))}
                              className="w-full px-3 py-2 bg-bgSurface border border-borderColor rounded-lg text-xs text-textPrimary outline-none focus:border-accent" />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-mono text-textMuted uppercase tracking-wider">LinkedIn Link</label>
                            <input value={profile.linkedin} onChange={e => setProfile(p => ({ ...p, linkedin: e.target.value }))}
                              className="w-full px-3 py-2 bg-bgSurface border border-borderColor rounded-lg text-xs text-textPrimary outline-none focus:border-accent" />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* ════ TAB: PROJECTS ════ */}
                    {adminTab === 'projects' && (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono text-textMuted uppercase tracking-wider">
                            {liveProjects.length} live project{liveProjects.length !== 1 ? 's' : ''}
                          </span>
                          {!addMode && (
                            <button onClick={() => { setAddMode(true); setEditingId(null); }}
                              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold bg-accent text-white rounded-lg hover:bg-accent-light transition-colors">
                              <Plus size={12} /> Add Project
                            </button>
                          )}
                        </div>

                        {/* Add project form */}
                        {addMode && (
                          <div className="border border-borderColor bg-bgSurface rounded-xl p-4 space-y-3">
                            <h4 className="text-xs font-mono font-bold text-accent uppercase tracking-wider">New Project</h4>
                            
                            <div className="grid grid-cols-2 gap-3">
                              <input value={newProj.name} onChange={e => setNewProj(pr => ({ ...pr, name: e.target.value }))} placeholder="Project Name"
                                className="w-full px-3 py-2 bg-bgCard border border-borderColor rounded-lg text-xs text-textPrimary outline-none focus:border-accent" />
                              <input value={newProj.url} onChange={e => setNewProj(pr => ({ ...pr, url: e.target.value }))} placeholder="Live URL"
                                className="w-full px-3 py-2 bg-bgCard border border-borderColor rounded-lg text-xs text-textPrimary outline-none focus:border-accent" />
                            </div>

                            <div className="grid grid-cols-3 gap-3">
                              <input value={newProj.tag} onChange={e => setNewProj(pr => ({ ...pr, tag: e.target.value }))} placeholder="Tag (e.g. Game · Arcade)"
                                className="w-full px-3 py-2 bg-bgCard border border-borderColor rounded-lg text-xs text-textPrimary outline-none focus:border-accent" />
                              <input value={newProj.icon} onChange={e => setNewProj(pr => ({ ...pr, icon: e.target.value }))} placeholder="Emoji Icon"
                                className="w-full px-3 py-2 bg-bgCard border border-borderColor rounded-lg text-xs text-textPrimary outline-none focus:border-accent" />
                              <input value={newProj.banner} onChange={e => setNewProj(pr => ({ ...pr, banner: e.target.value }))} placeholder="Banner Path (optional)"
                                className="w-full px-3 py-2 bg-bgCard border border-borderColor rounded-lg text-xs text-textPrimary outline-none focus:border-accent" />
                            </div>

                            <textarea value={newProj.desc} onChange={e => setNewProj(pr => ({ ...pr, desc: e.target.value }))} placeholder="Short Description" rows={2}
                              className="w-full px-3 py-2 bg-bgCard border border-borderColor rounded-lg text-xs text-textPrimary outline-none focus:border-accent resize-none" />

                            <div className="flex items-center gap-3">
                              <label className="text-[10px] font-mono text-textMuted uppercase tracking-wider">Accent Accent Color</label>
                              <input type="color" value={newProj.accent} onChange={e => setNewProj(pr => ({ ...pr, accent: e.target.value }))}
                                className="w-8 h-7 rounded cursor-pointer border border-borderColor bg-transparent" />
                            </div>

                            <div className="flex gap-2">
                              <button onClick={addProject} className="flex items-center gap-1 px-4 py-1.5 bg-accent text-white text-xs font-semibold rounded-lg hover:bg-accent-light transition-colors">
                                <Save size={11} /> Save Project
                              </button>
                              <button onClick={() => setAddMode(false)} className="px-4 py-1.5 border border-borderColor text-xs text-textSecondary rounded-lg hover:bg-bgCard transition-colors">
                                Cancel
                              </button>
                            </div>
                          </div>
                        )}

                        {/* Projects list */}
                        <div className="space-y-3">
                          {liveProjects.map(proj => (
                            <div key={proj.id} className="border border-borderColor bg-bgSurface/50 rounded-xl p-4 space-y-3">
                              {editingId === proj.id ? (
                                <div className="space-y-3">
                                  <div className="grid grid-cols-2 gap-3">
                                    <input value={editForm.name||''} onChange={e => setEditForm(fm => ({ ...fm, name: e.target.value }))} placeholder="Name"
                                      className="w-full px-3 py-2 bg-bgCard border border-borderColor rounded-lg text-xs text-textPrimary outline-none focus:border-accent" />
                                    <input value={editForm.url||''} onChange={e => setEditForm(fm => ({ ...fm, url: e.target.value }))} placeholder="Live URL"
                                      className="w-full px-3 py-2 bg-bgCard border border-borderColor rounded-lg text-xs text-textPrimary outline-none focus:border-accent" />
                                  </div>
                                  <div className="grid grid-cols-3 gap-3">
                                    <input value={editForm.tag||''} onChange={e => setEditForm(fm => ({ ...fm, tag: e.target.value }))} placeholder="Tag"
                                      className="w-full px-3 py-2 bg-bgCard border border-borderColor rounded-lg text-xs text-textPrimary outline-none focus:border-accent" />
                                    <input value={editForm.icon||''} onChange={e => setEditForm(fm => ({ ...fm, icon: e.target.value }))} placeholder="Icon"
                                      className="w-full px-3 py-2 bg-bgCard border border-borderColor rounded-lg text-xs text-textPrimary outline-none focus:border-accent" />
                                    <input value={editForm.banner||''} onChange={e => setEditForm(fm => ({ ...fm, banner: e.target.value }))} placeholder="Banner Path"
                                      className="w-full px-3 py-2 bg-bgCard border border-borderColor rounded-lg text-xs text-textPrimary outline-none focus:border-accent" />
                                  </div>
                                  <textarea value={editForm.desc||''} onChange={e => setEditForm(fm => ({ ...fm, desc: e.target.value }))} placeholder="Description" rows={2}
                                    className="w-full px-3 py-2 bg-bgCard border border-borderColor rounded-lg text-xs text-textPrimary outline-none focus:border-accent resize-none" />
                                  <div className="flex items-center gap-3">
                                    <label className="text-[10px] font-mono text-textMuted uppercase">Accent</label>
                                    <input type="color" value={editForm.accent||'#EC4899'} onChange={e => setEditForm(fm => ({ ...fm, accent: e.target.value }))}
                                      className="w-8 h-7 rounded cursor-pointer border border-borderColor bg-transparent" />
                                  </div>
                                  <div className="flex gap-2">
                                    <button onClick={saveEditProject} className="flex items-center gap-1 px-4 py-1.5 bg-accent text-white text-xs font-semibold rounded-lg hover:bg-accent-light transition-colors">
                                      <Save size={11} /> Save
                                    </button>
                                    <button onClick={() => setEditingId(null)} className="px-4 py-1.5 border border-borderColor text-xs text-textSecondary rounded-lg hover:bg-bgCard transition-colors">
                                      Cancel
                                    </button>
                                  </div>
                                </div>
                              ) : (
                                <div className="flex items-center justify-between gap-3">
                                  <div className="flex items-center gap-3 min-w-0">
                                    <span className="text-xl shrink-0">{proj.icon}</span>
                                    <div className="min-w-0">
                                      <p className="font-semibold text-sm text-textPrimary truncate">{proj.name}</p>
                                      <p className="text-textMuted text-[10px] font-mono truncate">{proj.url}</p>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-1 shrink-0">
                                    <a href={proj.url} target="_blank" rel="noopener noreferrer"
                                      className="p-1.5 text-textMuted hover:text-accent transition-colors"><Globe size={13} /></a>
                                    <button onClick={() => startEditProject(proj)}
                                      className="p-1.5 text-textMuted hover:text-accent transition-colors"><Pencil size={13} /></button>
                                    <button onClick={() => deleteProject(proj.id)}
                                      className="p-1.5 text-textMuted hover:text-red-400 transition-colors"><Trash2 size={13} /></button>
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* ════ TAB: RESEARCH ════ */}
                    {adminTab === 'research' && (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono text-textMuted uppercase tracking-wider">
                            {research.length} research topic{research.length !== 1 ? 's' : ''}
                          </span>
                          {!addMode && (
                            <button onClick={() => { setAddMode(true); setEditingId(null); }}
                              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold bg-accent text-white rounded-lg hover:bg-accent-light transition-colors">
                              <Plus size={12} /> Add Item
                            </button>
                          )}
                        </div>

                        {/* Add research form */}
                        {addMode && (
                          <div className="border border-borderColor bg-bgSurface rounded-xl p-4 space-y-3">
                            <h4 className="text-xs font-mono font-bold text-accent uppercase tracking-wider">New Research Topic</h4>
                            
                            <div className="grid grid-cols-3 gap-3">
                              <input value={newRes.title} onChange={e => setNewRes(r => ({ ...r, title: e.target.value }))} placeholder="Title"
                                className="col-span-2 w-full px-3 py-2 bg-bgCard border border-borderColor rounded-lg text-xs text-textPrimary outline-none focus:border-accent" />
                              <input value={newRes.icon} onChange={e => setNewRes(r => ({ ...r, icon: e.target.value }))} placeholder="Icon"
                                className="w-full px-3 py-2 bg-bgCard border border-borderColor rounded-lg text-xs text-textPrimary outline-none focus:border-accent" />
                            </div>

                            <input value={newRes.link} onChange={e => setNewRes(r => ({ ...r, link: e.target.value }))} placeholder="Project / Paper Link (optional)"
                              className="w-full px-3 py-2 bg-bgCard border border-borderColor rounded-lg text-xs text-textPrimary outline-none focus:border-accent" />

                            <textarea value={newRes.desc} onChange={e => setNewRes(r => ({ ...r, desc: e.target.value }))} placeholder="Summary / Description" rows={2}
                              className="w-full px-3 py-2 bg-bgCard border border-borderColor rounded-lg text-xs text-textPrimary outline-none focus:border-accent resize-none" />

                            <div className="flex gap-2">
                              <button onClick={addResearch} className="flex items-center gap-1 px-4 py-1.5 bg-accent text-white text-xs font-semibold rounded-lg hover:bg-accent-light transition-colors">
                                <Save size={11} /> Save Topic
                              </button>
                              <button onClick={() => setAddMode(false)} className="px-4 py-1.5 border border-borderColor text-xs text-textSecondary rounded-lg hover:bg-bgCard transition-colors">
                                Cancel
                              </button>
                            </div>
                          </div>
                        )}

                        {/* Research list */}
                        <div className="space-y-3">
                          {research.map(resItem => (
                            <div key={resItem.id} className="border border-borderColor bg-bgSurface/50 rounded-xl p-4 space-y-3">
                              {editingId === resItem.id ? (
                                <div className="space-y-3">
                                  <div className="grid grid-cols-3 gap-3">
                                    <input value={editForm.title||''} onChange={e => setEditForm(fm => ({ ...fm, title: e.target.value }))} placeholder="Title"
                                      className="col-span-2 w-full px-3 py-2 bg-bgCard border border-borderColor rounded-lg text-xs text-textPrimary outline-none focus:border-accent" />
                                    <input value={editForm.icon||''} onChange={e => setEditForm(fm => ({ ...fm, icon: e.target.value }))} placeholder="Icon"
                                      className="w-full px-3 py-2 bg-bgCard border border-borderColor rounded-lg text-xs text-textPrimary outline-none focus:border-accent" />
                                  </div>
                                  <input value={editForm.link||''} onChange={e => setEditForm(fm => ({ ...fm, link: e.target.value }))} placeholder="Link"
                                    className="w-full px-3 py-2 bg-bgCard border border-borderColor rounded-lg text-xs text-textPrimary outline-none focus:border-accent" />
                                  <textarea value={editForm.desc||''} onChange={e => setEditForm(fm => ({ ...fm, desc: e.target.value }))} placeholder="Description" rows={2}
                                    className="w-full px-3 py-2 bg-bgCard border border-borderColor rounded-lg text-xs text-textPrimary outline-none focus:border-accent resize-none" />
                                  <div className="flex gap-2">
                                    <button onClick={saveEditResearch} className="flex items-center gap-1 px-4 py-1.5 bg-accent text-white text-xs font-semibold rounded-lg hover:bg-accent-light transition-colors">
                                      <Save size={11} /> Save
                                    </button>
                                    <button onClick={() => setEditingId(null)} className="px-4 py-1.5 border border-borderColor text-xs text-textSecondary rounded-lg hover:bg-bgCard transition-colors">
                                      Cancel
                                    </button>
                                  </div>
                                </div>
                              ) : (
                                <div className="flex items-center justify-between gap-3">
                                  <div className="flex items-center gap-3 min-w-0">
                                    <span className="text-xl shrink-0">{resItem.icon}</span>
                                    <div className="min-w-0">
                                      <p className="font-semibold text-sm text-textPrimary truncate">{resItem.title}</p>
                                      <p className="text-textMuted text-[10px] font-mono truncate">{resItem.desc}</p>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-1 shrink-0">
                                    {resItem.link && (
                                      <a href={resItem.link} target="_blank" rel="noopener noreferrer"
                                        className="p-1.5 text-textMuted hover:text-accent transition-colors"><LinkIcon size={13} /></a>
                                    )}
                                    <button onClick={() => startEditResearch(resItem)}
                                      className="p-1.5 text-textMuted hover:text-accent transition-colors"><Pencil size={13} /></button>
                                    <button onClick={() => deleteResearch(resItem.id)}
                                      className="p-1.5 text-textMuted hover:text-red-400 transition-colors"><Trash2 size={13} /></button>
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Reset button at the bottom of panel */}
                    <div className="flex items-center justify-between pt-4 border-t border-borderColor">
                      <p className="text-[10px] font-mono text-textMuted">
                        Edits persist in your local browser cache.
                      </p>
                      <button onClick={resetToDefaults}
                        className="inline-flex items-center gap-1.5 text-red-500 hover:text-red-600 transition-colors text-[10px] font-mono uppercase tracking-widest">
                        <RefreshCw size={11} /> Reset Defaults
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
