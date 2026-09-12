import React, { useEffect, useRef, useState } from "react";

const heroPhoto = new URL("./assets/photo.jpeg", import.meta.url).href;

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [y, setY] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const sy = window.scrollY;
      setY(sy);
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, sy / max) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
  }, []);
  return { progress, y };
}

function MagneticButton({ children, className = "", href, download, onClick, accent = "violet" }: { children: React.ReactNode; className?: string; href?: string; download?: boolean; onClick?: () => void; accent?: "violet" | "cyan" }) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hover, setHover] = useState(false);
  const glow = accent === "cyan" ? "rgba(6,255,165,0.45)" : "rgba(139,92,246,0.45)";
  return (
    <a
      href={href}
      download={download}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel="noreferrer"
      onClick={onClick as any}
      className={`group relative inline-flex items-center justify-center overflow-hidden will-change-transform select-none ${className}`}
      style={{
        transform: `translate(${pos.x}px, ${pos.y}px) ${hover ? 'scale(1.05) translateY(-2px)' : 'scale(1) translateY(0)'}`,
        transition: 'transform 0.22s cubic-bezier(0.22,1,0.36,1), box-shadow 0.22s, background 0.22s',
        boxShadow: hover ? `0 10px 30px -10px ${glow}, 0 0 0 1px rgba(255,255,255,0.12) inset` : undefined,
      }}
      onMouseMove={(e) => {
        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const dist = Math.hypot(x, y);
        const max = 20;
        if (dist > max) {
          const scale = max / dist;
          setPos({ x: x * scale * 0.6, y: y * scale * 0.7 });
        } else {
          setPos({ x: x * 0.35, y: y * 0.45 });
        }
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setPos({ x: 0, y: 0 }); setHover(false); }}
    >
      <span className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <span className="absolute inset-y-0 -left-1/2 w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-18deg] -translate-x-[150%] group-hover:translate-x-[250%] transition-transform duration-[900ms] ease-out" />
      </span>
      <span className="relative z-10">{children}</span>
    </a>
  );
}

function NavLink({ children, href }: { children: React.ReactNode; href: string }) {
  const [hover, setHover] = useState(false);
  return (
    <a href={href} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} className="relative group inline-flex py-1 tracking-[0.14em] uppercase text-[13px]">
      <span className={`transition-colors duration-200 ${hover ? 'text-violet-300' : 'text-white/70 group-hover:text-white'}`}>{children}</span>
      <span className="pointer-events-none absolute left-0 -bottom-0.5 h-px w-full origin-left bg-gradient-to-r from-violet-400 to-cyan-300 transition-transform duration-300" style={{ transform: hover ? 'scaleX(1)' : 'scaleX(0)' }} />
    </a>
  );
}

export default function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const { progress: scrollProgress } = useScrollProgress();
  const [aboutProg, setAboutProg] = useState(0);
  const [heroMounted, setHeroMounted] = useState(false);
  const [visitCount, setVisitCount] = useState<number | null>(null);
  const [now, setNow] = useState(new Date());
  useEffect(() => { const t = setTimeout(() => setHeroMounted(true), 80); return () => clearTimeout(t); }, []);
  useEffect(() => { const t = setInterval(() => setNow(new Date()), 60000); return () => clearInterval(t); }, []);
  useEffect(() => {
    const ns = "nileshkolhe.com/visits";
    const hitUrl = `https://abacus.jasoncameron.dev/hit/${ns}`;
    const flagKey = `nk-visited-${ns}`;
    const seen = sessionStorage.getItem(flagKey);
    if (!seen) sessionStorage.setItem(flagKey, "1");
    const url = seen ? `https://abacus.jasoncameron.dev/get/${ns}` : hitUrl;
    fetch(url)
      .then((r) => (r.ok ? r.json() : fetch(hitUrl).then((r2) => r2.json())))
      .then((d) => setVisitCount(d.value))
      .catch(() => {});
  }, []);
  useEffect(() => {
    const calc = () => {
      if (!aboutRef.current) return;
      const rect = aboutRef.current.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when bottom enters, 1 when top leaves
      const p = 1 - (rect.top + rect.height) / (vh + rect.height);
      setAboutProg(Math.min(1, Math.max(0, p * 1.6 - 0.1)));
    };
    calc();
    window.addEventListener("scroll", calc, { passive: true });
    window.addEventListener("resize", calc);
    return () => { window.removeEventListener("scroll", calc); window.removeEventListener("resize", calc); };
  }, []);

  // Clean minimal canvas - 80 slow particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;
    let w = canvas.clientWidth, h = canvas.clientHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const resize = () => {
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize(); window.addEventListener("resize", resize);
    const particles = Array.from({ length: 70 }).map(() => ({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.18, vy: (Math.random() - 0.5) * 0.18,
      r: Math.random() * 1.2 + 0.2,
      c: Math.random() > 0.6 ? "#8b5cf6" : "#06ffa5",
      a: Math.random() * 0.35 + 0.1
    }));
    let raf = 0;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < -10) p.x = w + 10; if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10; if (p.y > h + 10) p.y = -10;
        ctx.beginPath(); ctx.fillStyle = p.c; ctx.globalAlpha = p.a;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      });
      ctx.globalAlpha = 1; raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  const skills = {
    Frontend: ["Angular", "React", "TypeScript", "JavaScript", "RxJS", "NodeJS", "Tailwind", "Bootstrap", "HTML", "CSS", "FlexBox", "Figma"],
    Backend: ["C#", "OOP", "SOLID", ".NET Core", ".NET 8", "ASP.NET Web API", "FastAPI", "LangChain"],
    Database: ["SQL Server", "Entity Framework", "MongoDB", ],
    Architecture: ["Microfrontend", "Event Driven", "Dependency Injection", "Domain Driven Design", "Clean Architecture"],
    Cloud: ["Azure", "AWS", "Docker", "CI/CD", "GitHub", "GitHub Actions", "TFS", "JIRA", "Confluence"],
    Quality: ["Postman", "Agent Browser", "TDD", "NUnit", "MSTest", "Jasmine/ Karma", "FAISS", "Playwright", "Copilot, Claude Code, MCP"],
    Leadership: ["SDLC", "Agile Delivery", "SCRUM/Kanban", "Mentoring", "Code Reviews", "Stakeholder Management", "Interviewing"],
  };
  const skillColors = [
    "from-violet-600/30 to-cyan-400/20",
    "from-cyan-500/25 to-violet-500/20",
    "from-emerald-500/25 to-cyan-400/15",
    "from-amber-500/25 to-violet-500/20",
    "from-cyan-400/25 to-emerald-400/15",
    "from-violet-500/25 to-emerald-400/15",
    "from-amber-400/20 to-violet-500/25",
  ];
  const expInView = useInView(0.12);
  const workInView = useInView(0.08);

  const contacts = [
    { k: "Email", v: "nilesh.work.001@gmail.com", href: "mailto:nilesh.work.001@gmail.com", icon: "✉", sub: "Work Inbox • <12h reply", accent: "violet" },
    { k: "Phone", v: "+91 967 397 3040", href: "tel:+919673973040", icon: "☎", sub: "Pune • IST • 9AM-8PM", accent: "cyan" },
    { k: "Location", v: "Pune, India", href: "https://maps.google.com/?q=Pune,India", icon: "◍", sub: "Remote • Available Within 30 Days", accent: "violet" },
    { k: "LinkedIn", v: "linkedin.com/nilesh-kolhe", href: "https://linkedin.com/in/nilesh-kolhe", icon: "in", sub: "Professional • Let's connect", accent: "violet" },
    { k: "GitHub", v: "github.com/Nilesh-Kolhe", href: "https://github.com/Nilesh-Kolhe", icon: "◇", sub: "Open Source • Builds", accent: "cyan" },
    { k: "Portfolio", v: "nileshkolhe.com", href: "https://nileshkolhe.com", icon: "↗", sub: "Portfolio • Resume", accent: "violet" },
    { k: "Writing", v: "medium.com/@nilesh_kolhe", href: "https://medium.com/@nilesh_kolhe", icon: "✎", sub: "Engineering Notes", accent: "cyan" },
  ];

  // derived transforms
  const orb1Y = scrollProgress * -200;
  const orb2Y = scrollProgress * 300;
  const orb3Y = scrollProgress * -120;
  const dotGridY = scrollProgress * 80;
  const aboutImgY = (aboutProg - 0.5) * 80; // -40 to +40
  const aboutTextY = (0.5 - aboutProg) * 60;
  const heroParallax = scrollProgress * -80;
  const hue = scrollProgress * 20;

  return (
    <div className="relative min-h-screen bg-[#050507] text-white selection:bg-violet-500/30 overflow-x-hidden overflow-x-clip">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700;800&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500&display=swap');
        html { scroll-behavior: smooth; }
        * { font-family: "Space Grotesk", system-ui, sans-serif; }
        .serif { font-family: "Instrument Serif", serif; }
        .mono { font-family: "JetBrains Mono", monospace; }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-thumb { background: #2a2a33; border-radius: 999px; }
        @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
      `}</style>

      {/* Scroll progress bar - framer style */}
      <div className="fixed top-0 left-0 right-0 h-[2px] origin-left z-[100] bg-gradient-to-r from-violet-500 via-cyan-300 to-amber-300 transition-none will-change-transform" style={{ transform: `scaleX(${scrollProgress})`, transformOrigin: "left" }} />

      {/* CLEAN BACKGROUND SYSTEM */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden max-w-[100vw]">
        {/* base */}
        <div className="absolute inset-0 bg-[#050507]" />
        {/* hue shift overlay */}
        <div className="absolute inset-0 opacity-[0.04] transition-[filter] duration-200" style={{ filter: `hue-rotate(${hue}deg)`, background: "radial-gradient(1200px 800px at 30% 10%, #8b5cf6, transparent), radial-gradient(1000px 600px at 90% 20%, #06ffa5, transparent)" }} />
        {/* subtle noise */}
        <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
        {/* dot grid - 1px every 40px opacity 0.03 */}
        <div className="absolute inset-0" style={{ transform: `translateY(${dotGridY}px)`, backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.18) 1px, transparent 0)`, backgroundSize: "40px 40px", opacity: 0.035 }} />
        {/* 3 large blurred aurora orbs */}
        <div className="absolute rounded-full max-w-[90vw] max-h-[90vw]" style={{ transform: `translateY(${orb1Y}px)`, width: 560, height: 560, left: "-6%", top: "6%", background: "radial-gradient(circle at 50% 50%, rgba(139,92,246,0.22), transparent 68%)", filter: "blur(22px)" }} />
        <div className="absolute rounded-full max-w-[90vw] max-h-[90vw]" style={{ transform: `translateY(${orb2Y}px)`, width: 480, height: 480, right: "-4%", top: "16%", background: "radial-gradient(circle at 50% 50%, rgba(6,255,165,0.16), transparent 68%)", filter: "blur(24px)" }} />
        <div className="absolute rounded-full max-w-[90vw] max-h-[90vw]" style={{ transform: `translateY(${orb3Y}px)`, width: 380, height: 380, left: "50%", top: "56%", background: "radial-gradient(circle at 50% 50%, rgba(245,158,11,0.10), transparent 70%)", filter: "blur(26px)" }} />
      </div>

      {/* Clean minimal canvas - 70 particles */}
      <div className="fixed inset-0 z-0 opacity-60 pointer-events-none overflow-hidden max-w-[100vw]">
        <canvas ref={canvasRef} className="w-full h-full block" style={{ width: "100%", height: "100vh" }} />
      </div>

      {/* Navbar */}
      <nav className="fixed top-0 inset-x-0 z-40">
        <div className="mx-auto max-w-[1280px] px-6 md:px-8 h-[64px] flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="relative">
              <div className="absolute -inset-3 bg-violet-600/20 blur-xl rounded-full" />
              <div className="relative w-9 h-9 rounded-[10px] bg-white text-black flex items-center justify-center font-bold tracking-tight">NK</div>
            </div>
            <div className="hidden md:flex items-center gap-8">
              {["About", "Experience", "Work", "Reach Me"].map((l) => (
                <NavLink key={l} href={`#${l.toLowerCase().replace(" ", "-")}`}>{l}</NavLink>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.06] border border-white/[0.08] backdrop-blur-xl">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_#10b981]" />
              <span className="mono text-[11px] tracking-wide">PUNE • {now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })} IST</span>
            </div>
            <a href="https://linkedin.com/in/nilesh-kolhe/recent-activity/all/" target="_blank" rel="noreferrer" aria-label="Latest LinkedIn post" className="md:hidden relative w-11 h-11 rounded-full bg-gradient-to-br from-violet-600 to-emerald-600 border border-white/10 grid place-items-center text-[12px] font-bold shadow-[0_0_18px_rgba(6,255,165,0.3)]">
              in
              <span className="absolute -top-0.5 -right-0.5 w-3 h-3">
                <span className="absolute inset-0 rounded-full bg-[#39FF14] animate-ping" />
                <span className="absolute inset-0 rounded-full bg-[#39FF14] ring-2 ring-[#050507] shadow-[0_0_10px_3px_#39FF14]" />
              </span>
            </a>
            <button onClick={() => setMobileMenu(!mobileMenu)} aria-label={mobileMenu ? "Close menu" : "Open menu"} aria-expanded={mobileMenu} className="md:hidden w-11 h-11 rounded-full bg-white/[0.08] border border-white/10 grid place-items-center text-[18px]">{mobileMenu ? "✕" : "≡"}</button>
            <MagneticButton href="https://linkedin.com/in/nilesh-kolhe/recent-activity/all/" accent="cyan" className="hidden md:inline-flex items-center gap-2 h-9 px-4 rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 text-white text-[12px] font-semibold tracking-wide shadow-[0_0_20px_rgba(6,255,165,0.25)]">
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
                Featured ↗
            </MagneticButton>
            <MagneticButton href="#reach-me" accent="violet" className="hidden md:inline-flex h-9 px-5 rounded-full bg-white text-black text-[13px] font-semibold tracking-wide">Let's Talk</MagneticButton>
          </div>
        </div>
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute inset-0 -z-10 bg-[#050507]/70 backdrop-blur-[22px] border-b border-white/[0.06]" />
        {mobileMenu && (
          <div className="md:hidden absolute top-[64px] inset-x-0 bg-[#050507]/90 backdrop-blur-2xl border-b border-white/[0.08] px-6 py-5">
            <div className="flex flex-col">
              {["About", "Experience", "Work", "Reach Me"].map((l) => (
                <a
                  key={l}
                  href={`#${l.toLowerCase().replace(" ", "-")}`}
                  onClick={() => setMobileMenu(false)}
                  className="py-3 border-b border-white/[0.06] last:border-0 mono text-[13px] tracking-[0.14em] uppercase text-white/70 hover:text-white transition-colors duration-200"
                >
                  {l}
                </a>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-2">
              <MagneticButton href="https://linkedin.com/in/nilesh-kolhe/recent-activity/all/" accent="cyan" className="flex-1 inline-flex items-center justify-center gap-2 h-9 rounded-full bg-gradient-to-r from-violet-600 to-emerald-600 text-white text-[12px] font-semibold tracking-wide">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                Featured ↗
              </MagneticButton>
              <MagneticButton href="#reach-me" accent="violet" onClick={() => setMobileMenu(false)} className="flex-1 inline-flex items-center justify-center h-9 rounded-full bg-white text-black text-[13px] font-semibold tracking-wide">Let's Talk</MagneticButton>
            </div>
          </div>
        )}
      </nav>

      {/* Hero - BREATHING SPACE FIXED */}
      <section className="relative z-10 min-h-[100svh] pt-[88px] pb-20 flex items-center justify-center overflow-hidden">
        <div className="mx-auto max-w-[1280px] px-6 md:px-8 w-full flex flex-col items-center text-center will-change-transform" style={{ transform: `translateY(${heroParallax}px)` }}>
          <div className={`inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/[0.07] border border-white/[0.12] backdrop-blur-xl shadow-[0_0_30px_rgba(139,92,246,0.15)] transition-all duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${heroMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`} style={{ transitionDelay: "100ms" }}>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_#10b981]" />
            <span className="mono text-[11px] tracking-[0.18em] uppercase">Available
              {/* • Within 30 Days */}
              </span>
          </div>

          <div className="mt-12 leading-[0.86] tracking-[-0.05em] max-w-full">
            <div className={`block text-[13px] md:text-[15px] tracking-[0.28em] uppercase mb-8 font-medium transition-all duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${heroMounted ? "opacity-[0.55] translate-y-0" : "opacity-0 translate-y-[80px]"}`} style={{ transitionDelay: "140ms" }}>
              Lead Full Stack Engineer
            </div>
            {/* HERO NAME WITH DELIBERATE BREATHING SPACE */}
            <h1 className="flex flex-col items-center">
              <span className={`block font-[800] text-[58px] sm:text-[76px] md:text-[96px] lg:text-[116px] leading-[0.9] tracking-[-0.04em] transition-all duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${heroMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[80px]"}`} style={{ transitionDelay: "280ms" }}>
                NILESH
              </span>
              <span className={`block font-[300] text-[54px] sm:text-[72px] md:text-[92px] lg:text-[112px] leading-[0.9] tracking-[0.15em] mt-[0.15em] ml-[0.08em] bg-gradient-to-r from-white via-white/90 to-white/40 bg-clip-text text-transparent transition-all duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${heroMounted ? "opacity-80 translate-y-0" : "opacity-0 translate-y-[80px]"}`} style={{ transitionDelay: "420ms", fontWeight: 300 }}>
                KOLHE
              </span>
            </h1>
          </div>

          <p className={`mt-10 max-w-[680px] text-[17px] md:text-[20px] leading-[1.65] text-white/70 transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${heroMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[30px]"}`} style={{ transitionDelay: "600ms" }}>
            Building and Modernizing Production <span className="text-white font-medium">Angular, React and .NET Platforms</span> in Regulated Healthcare, Education and Finance. Focused on Reliability, Performance, and Developer Velocity.
          </p>

          <div className={`mt-10 flex flex-wrap items-center justify-center gap-3 transition-all duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${heroMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`} style={{ transitionDelay: "750ms" }}>
            <div className="px-5 py-2.5 rounded-full bg-white/[0.06] border border-white/10 backdrop-blur-xl mono text-[12px] tracking-wide flex items-center gap-2">
              <span className="text-[16px] font-bold">12</span><span className="opacity-60">Years Experience</span>
            </div>
            <div className="w-px h-6 bg-white/10 hidden sm:block" />
            <div className="px-5 py-2.5 rounded-full bg-white/[0.06] border border-white/10 backdrop-blur-xl mono text-[12px] tracking-wide">
              Builder First • AI Where It Earns Its Place • Mentor
            </div>
            <div className="w-px h-6 bg-white/10 hidden sm:block" />
            <div className="px-5 py-2.5 rounded-full bg-white/[0.06] border border-white/10 backdrop-blur-xl mono text-[12px] tracking-wide">
              Pune, Maharashtra, India
            </div>
          </div>

          <div className={`mt-10 flex flex-wrap gap-4 justify-center transition-all duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${heroMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`} style={{ transitionDelay: "900ms" }}>
            <MagneticButton href="#work" accent="violet" className="h-[52px] px-8 rounded-full bg-white text-black font-semibold text-[14px] tracking-wide shadow-[0_12px_36px_rgba(255,255,255,0.16)]">
              <span className="flex items-center gap-2.5">
                View Work <span className="w-7 h-7 rounded-full bg-black text-white grid place-items-center text-[12px] group-hover:rotate-45 transition-transform duration-300">↗</span>
              </span>
            </MagneticButton>
            <MagneticButton href="/Lead-Fullstack-Engineer.pdf" download accent="cyan" className="h-[52px] px-8 rounded-full bg-white/[0.06] border border-white/15 backdrop-blur-xl text-[14px] font-medium hover:bg-white/[0.1] transition cursor-pointer">
              Download CV
            </MagneticButton>
          </div>

          <div className={`mt-14 flex items-center gap-3 mono text-[11px] tracking-[0.2em] uppercase text-white/35 transition-opacity duration-700 ${heroMounted ? "opacity-100" : "opacity-0"}`} style={{ transitionDelay: "1100ms" }}>
            <span className="w-10 h-px bg-white/15" /> SCROLL TO EXPLORE <span className="w-10 h-px bg-white/15" />
          </div>
        </div>
      </section>

      {/* ABOUT - LEFT MARGIN ALIGNED, RIGHT PHOTO FULLY VISIBLE */}
      <section ref={aboutRef} id="about" className="relative z-10 border-t border-white/[0.06] bg-[#050507]">
        <div className="mx-auto max-w-[1280px] px-6 md:px-8 overflow-visible">
          <div className="grid lg:grid-cols-[44%_56%] gap-0 items-stretch">
            <div className="relative z-10 pt-20 lg:pt-28 pb-10 lg:pr-8 flex flex-col justify-center will-change-transform" style={{ transform: `translateY(${aboutTextY}px)` }}>
              <div className={`flex items-end justify-between gap-6 flex-wrap transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${aboutProg > 0.05 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
                <h2 className="text-[40px] md:text-[62px] font-bold tracking-[-0.03em] leading-[0.9]">About — <span className="serif italic font-normal">Architect of Scale</span></h2>
              </div>
              <div className="mono text-[11px] tracking-[0.18em] uppercase opacity-40 mt-4">02 / PROFILE</div>

              {/* Mobile/tablet only photo - between heading and paragraph.. */}
              <div className={`lg:hidden mt-8 relative rounded-[24px] overflow-hidden h-[340px] sm:h-[420px] bg-[#0a0a0e] transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${aboutProg > 0.06 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
                <img
                  src={heroPhoto}
                  alt="Nilesh Kolhe"
                  className="absolute inset-0 w-full h-full object-cover select-none"
                  style={{
                    objectPosition: "42% 15%",
                    filter: "grayscale(12%) contrast(1.04) brightness(0.96) saturate(0.92)",
                  }}
                />
                <div className="absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-[#050507] via-[#050507]/60 to-transparent pointer-events-none" />
                <div className="absolute inset-x-0 top-0 h-[20%] bg-gradient-to-b from-[#050507]/50 to-transparent pointer-events-none" />
              </div>

              <div className={`mt-10 space-y-6 transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${aboutProg > 0.08 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`} style={{ transitionDelay: "150ms" }}>
                <p className="text-[22px] md:text-[24px] leading-[1.55] tracking-[-0.01em] text-white/90">
                  I’m a Lead Full Stack Engineer focused on modernizing regulated platforms where <span className="text-white font-medium relative">reliability is non-negotiable<span className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-violet-400/60 to-transparent" /></span>. Over 12 years I’ve led Angular → modern stack migrations, .NET 8 API re-architecture, and real-time data pipelines.
                </p>
                <p className="text-[15px] leading-[1.8] text-white/60 max-w-[520px]">
                  Recent wins: cut initial load 50% via code-splitting & caching strategy, slashed QA regression time 87% with custom Playwright harnesses, refactored 150+ KLOC legacy state, and mentored engineers into independent feature ownership. I like systems that feel boring in production and fast in development.
                </p>
                <div className="pt-2 flex flex-wrap gap-3">
                  <div className="px-4 py-2 rounded-full bg-white/[0.06] border border-white/10 mono text-[12px]">Pune, Maharashtra, India</div>
                  <div className="px-4 py-2 rounded-full bg-white/[0.06] border border-white/10 mono text-[12px]">Regulated</div>
                  <div className="px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 mono text-[12px] text-violet-200">12 Years Experience</div>
                </div>
              </div>
            </div>

            {/* RIGHT IMAGE - FIXED: no calc(50vw) clipping, clean edge-to-edge */}
            <div className="hidden lg:block relative lg:mx-0 lg:ml-0 lg:mr-[-2rem] xl:mr-[-8%] lg:w-[calc(100%+2rem)] xl:w-[calc(100%+8%)] lg:h-[82vh] lg:min-h-[760px] overflow-hidden bg-[#0a0a0e] max-w-none">
              <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[20%] left-[18%] w-[380px] h-[380px] rounded-full bg-violet-600/[0.10] blur-[80px]" />
                <div className="absolute bottom-[15%] right-[10%] w-[320px] h-[320px] rounded-full bg-cyan-400/[0.06] blur-[80px]" />
              </div>
              <div className={`absolute inset-0 w-full h-full will-change-transform transition-opacity duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${aboutProg > 0.06 ? "opacity-100" : "opacity-0"}`} style={{ transform: `translate3d(0px, ${aboutImgY}px, 0)` }}>
                <img
                  src={heroPhoto}
                  alt="Nilesh Kolhe"
                  className="absolute inset-0 w-full h-full object-cover max-w-none select-none"
                  style={{
                    objectPosition: "42% 15%",
                    transform: "scale(1.08)",
                    filter: "grayscale(12%) contrast(1.04) brightness(0.96) saturate(0.92)",
                    transformOrigin: "42% 20%"
                  }}
                />
                <div className="absolute inset-y-0 left-0 w-[35%] bg-gradient-to-r from-[#050507] via-[#050507]/80 to-transparent pointer-events-none z-[2]" />
                <div className="absolute inset-y-0 left-0 w-[48%] bg-gradient-to-r from-[#050507] via-[#050507]/60 via-[60%] to-transparent opacity-80 pointer-events-none z-[2] hidden lg:block" />
                <div className="absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-[#050507] via-[#050507]/70 to-transparent pointer-events-none z-[2]" />
                <div className="absolute inset-x-0 top-0 h-[15%] bg-gradient-to-b from-[#050507]/60 via-[#050507]/20 to-transparent pointer-events-none z-[2]" />
                <div className="absolute inset-0 pointer-events-none z-[2] opacity-80" style={{ background: "radial-gradient(ellipse 70% 65% at 45% 30%, transparent 45%, rgba(5,5,7,0.25) 75%, rgba(5,5,7,0.65) 90%)" }} />
              </div>
            </div>
          </div>
        </div>

        {/* skills - full width, spans below photo */}
        <div className="relative mx-auto max-w-[1280px] px-6 md:px-8 pb-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(skills).map(([group, items], idx) => (
              <div key={group} className={`group relative rounded-[20px] bg-white/[0.04] border border-white/[0.07] p-5 backdrop-blur-xl overflow-hidden hover:-translate-y-1 hover:bg-white/[0.06] hover:border-white/20 transition-all duration-700 ${aboutProg > 0.2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: `${idx * 80}ms` }}>
                <div className={`absolute inset-0 opacity-60 group-hover:opacity-90 transition-opacity bg-gradient-to-br ${skillColors[idx % skillColors.length]}`} />
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-white/20 via-white/5 to-transparent" />
                <div className="relative">
                  <div className="mono text-[11px] tracking-[0.16em] uppercase opacity-60 mb-3">{group}</div>
                  <div className="flex flex-wrap gap-2">
                    {items.map((s) => (<span key={s} className="inline-block px-3 py-1.5 rounded-full bg-white/[0.07] border border-white/10 text-[12px] transition-all duration-[220ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-white/[0.12] hover:border-violet-400/30 hover:text-violet-200 hover:scale-[1.06]">{s}</span>))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="relative z-10 border-t border-white/[0.06]">
        <div className="mx-auto max-w-[1280px] px-6 md:px-8 py-20 md:py-28" ref={expInView.ref}>
          <div className="flex items-center gap-4 mb-12">
            <div className="w-px h-12 bg-gradient-to-b from-violet-500 to-transparent" />
            <div>
              <div className="mono text-[11px] tracking-[0.18em] uppercase opacity-50">03 / EXPERIENCE</div>
              <h2 className="text-[32px] md:text-[44px] font-bold tracking-tight">Lead Platform Work</h2>
            </div>
          </div>
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10">
            <div className={`relative rounded-[28px] bg-[#0e0e12] border border-white/10 p-7 md:p-8 overflow-hidden transition-all duration-700 ${expInView.visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"}`}>
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-violet-500/50 via-cyan-400/40 to-transparent" />
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-white text-black grid place-items-center font-bold">CES</div>
                  <div><div className="font-semibold">CES • Remote • K-12 District Platform</div><div className="mono text-[11px] opacity-60">Dec 2024 — Present • Lead Full Stack Engineer</div></div>
                </div>
                <div className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/20 text-emerald-300 mono text-[11px]">ACTIVE • US ED-TECH</div>
              </div>
              <h3 className="mt-8 text-[20px] font-semibold leading-tight">District Administration Platform for US K-12</h3>
              <p className="mt-3 text-[14px] leading-[1.7] text-white/60">Own Platform, Maintain Existing Modules, and Backlog Alignment for a Multi-District Admin Suite. Migrating Legacy Patterns to Modern Angular Island, .NET 8 Backend, and Playwright Based Quality Gates.</p>
              <div className="mt-6 flex flex-wrap gap-2">{["Claude", "Copilot", "Agents", "Skills", "Angular", "TypeScript", "ASP.NET", ".NET 8", "AWS", "Playwright"].map((t) => (<span key={t} className="px-3 py-1 rounded-full bg-white/[0.06] border border-white/10 text-[11px] mono">{t}</span>))}</div>
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { metric: "2", title: "AI Assistants", desc: "Introduced Claude & Copilot Agents, Skills into the Workflow — Faster reviews, Consistent patterns, Team-wide Standard", icon: "🤖" },
                  { metric: "-87%", title: "QA Regression Time", desc: "Custom Playwright Harness + Parallel Sharding", icon: "🧪" },
                  { metric: "150K+", title: "LOC Refactored", desc: "Legacy State → Signals + Clean Boundaries", icon: "🧱" },
                  { metric: "3", title: "Engineers Mentored", desc: "From Task-Takers to Independent Feature Owners", icon: "🎯" },
                ].map((c, i) => (
                  <div key={i} className="group relative rounded-[18px] bg-white/[0.05] border border-white/10 p-4 backdrop-blur-xl overflow-hidden hover:-translate-y-1 hover:border-white/20 transition-all">
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-br from-violet-500/10 to-cyan-400/10" />
                    <div className="relative flex items-start justify-between"><div className="w-8 h-8 rounded-full bg-white/[0.08] border border-white/10 grid place-items-center text-[14px]">{c.icon}</div><div className="text-[22px] font-bold tracking-tight">{c.metric}</div></div>
                    <div className="relative mt-3 font-semibold text-[13px]">{c.title}</div><div className="relative mt-1 text-[12px] leading-[1.5] text-white/60">{c.desc}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className={`relative pl-8 transition-all duration-700 delay-150 ${expInView.visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-6"}`}>
              <div className="absolute left-2 top-0 bottom-0 w-px bg-gradient-to-b from-white/30 via-white/10 to-transparent" />
              <div className="absolute left-[3px] top-6 w-[10px] h-[10px] rounded-full bg-white shadow-[0_0_0_6px_rgba(139,92,246,0.2),0_0_20px_#8b5cf6]" />
                <div className="space-y-8">
                  <div>
                    <div className="mono text-[11px] tracking-widest opacity-50">2024 — NOW</div>
                    <div className="mt-2 text-[16px] font-semibold">Platform Owner • 200k+ Users</div>
                    <div className="mt-2 text-[13px] text-white/60 leading-[1.6]">Architected New Platform, Maintained Existing Modules, Aligned Feature Backlog with the Development Team.</div>
                  </div>
                  <div className="rounded-[16px] bg-[#101015] border border-white/10 p-4"><div className="mono text-[10px] opacity-50">IMPACT SNAPSHOT</div>
                  <div className="mt-2 text-[13px] text-white/70">From Ticket Firefighting to Platform Thinking — Fewer Hotfixes, Faster Feature Throughput, Measurable CWV Uplift.</div>
                </div>
              </div>
              <div className="mt-10 rounded-[20px] border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-5">
                <div className="mono text-[11px] opacity-60">PREVIOUS 12 YEARS SUMMARY</div>
                <div className="mt-3 space-y-2 text-[13px] text-white/70">
                  <div>• Healthcare — Regulated Platform Scale</div>
                  <div>• Finance & Compliance Platforms — Audit-Ready</div>
                  <div>• Angular, React, .NET, Azure/AWS — 0→1 to scale</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Work */}
      <section id="work" className="relative z-10 border-t border-white/[0.06] bg-[#08080a]/70">
        <div className="mx-auto max-w-[1280px] px-6 md:px-8 py-20 md:py-28" ref={workInView.ref}>
          <div className="flex flex-wrap items-baseline justify-between gap-6"><h2 className="text-[36px] md:text-[56px] font-bold tracking-[-0.03em]">My Work — <span className="serif italic font-normal">Local-first & guardrails</span></h2><div className="mono text-[11px] opacity-50">04 / SELECTED BUILDS</div></div>
          <div className="mt-12 grid lg:grid-cols-[1.1fr_0.9fr] gap-10">
            <div className="grid gap-8">
              {[
                { title: "PDF ChatBot", subtitle: "Local-First Document Retrieval System", stack: ["Ollama", "FastAPI", "LangChain", "FAISS", "React 18", "CrossEncoder", "SSE"], desc: "Multi-Strategy Retriever (Regex Extraction, Keyword-Scored Section Matching, FAISS MMR with CrossEncoder Reranking) built after plain vector similarity underperformed on structured documents. Non-blocking SSE streaming; runs fully local.", link: "https://github.com/Nilesh-Kolhe/PDF-ChatBot", color: "from-violet-600/30 to-cyan-400/20", meta: "Local First" },
                { title: "GitHub PR Guard", subtitle: "Automated PR-Review Workflow", stack: ["n8n", "Groq AI", "GitHub Webhooks", "Slack"], desc: "Webhook-Triggered pipeline that emits structured JSON severity findings and flags or blocks pull requests. Policy-as-code, Slack digest, and audit trail for regulated teams.", link: "https://github.com/Nilesh-Kolhe/N8N-GitHub-PR-Guard", color: "from-amber-500/25 to-violet-500/20", meta: "Quality Control" },
              ].map((p, idx) => (
                <div key={p.title} className={`group relative rounded-[28px] border border-white/10 bg-[#111117] overflow-hidden hover:-translate-y-1 transition-all duration-700 ${workInView.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: `${idx * 120}ms` }}>
                  <div className={`absolute inset-0 opacity-60 bg-gradient-to-br ${p.color}`} />
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-white/20 via-white/5 to-transparent" />
                  <div className="relative p-7 md:p-8">
                    <div className="flex items-center gap-3"><div className="w-9 h-9 rounded-full bg-white text-black grid place-items-center font-bold text-[13px]">{idx + 1}</div><div className="mono text-[11px] tracking-[0.18em] uppercase opacity-60">{p.subtitle}</div></div>
                    <h3 className="mt-4 text-[28px] font-bold tracking-tight">{p.title}</h3><p className="mt-3 text-[14px] leading-[1.7] text-white/65 max-w-[720px]">{p.desc}</p>
                    <div className="mt-5 flex flex-wrap gap-2">{p.stack.map((s) => (<span key={s} className="px-3 py-1 rounded-full bg-black/40 border border-white/10 mono text-[11px]">{s}</span>))}</div>
                    <div className="mt-6 flex flex-wrap items-center gap-3"><MagneticButton href={p.link} accent="violet" className="h-10 px-5 rounded-full bg-white text-black text-[13px] font-semibold">View on GitHub ↗</MagneticButton>
                    {/* <div className="h-10 px-4 rounded-full bg-white/[0.06] border border-white/10 grid place-items-center mono text-[11px]">{p.meta}</div> */}
                  </div>
                  </div>
                </div>
              ))}
            </div>

            {/* LinkedIn, stacked vertically — a plain edge instead of Experience's dotted timeline */}
            <div className={`relative lg:border-l lg:pl-8 border-white/10 transition-all duration-700 delay-150 ${workInView.visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-6"}`}>
              <div className="flex items-center gap-3"><div className="w-9 h-9 rounded-full bg-white text-black grid place-items-center font-bold text-[13px]">in</div><div className="mono text-[11px] tracking-[0.18em] uppercase opacity-60">LinkedIn • Post Series • Newsletter Series</div></div>
              <div className="mt-4 space-y-3">
                <div><div className="text-[18px] font-bold tracking-tight">From Prompt to Production</div><div className="serif italic font-normal text-[13px] text-white/50">AI Beyond Demo</div></div>
                <div><div className="text-[18px] font-bold tracking-tight">The Context Window</div><div className="serif italic font-normal text-[13px] text-white/50">A Wider View, Every Time</div></div>
              </div>
              <p className="mt-4 text-[13px] leading-[1.7] text-white/60">I write regularly on LinkedIn on shipping and modernizing regulated platforms, and where AI tooling actually earns its place in the workflow.</p>

              <div className="mt-7 mono text-[11px] tracking-widest opacity-50">TOP POSTS</div>
              <div className="mt-3 space-y-3">
                {[
                  { series: "From Prompt to Production", title: "Building a PDF Chatbot with Local LLMs", stat: "983 impressions", meta: "12 reactions · 5mo" },
                  { series: "From Prompt to Production", title: "The Architecture Behind the PDF Chatbot", stat: "634 impressions", meta: "9 reactions · 4mo" },
                  { series: "The Context Window", title: "You Shipped the Feature. Now Meet the Invoice.", stat: "492 impressions", meta: "3 reactions · 2mo" },
                ].map((post) => (
                  <a key={post.title} href="https://linkedin.com/in/Nilesh-Kolhe" target="_blank" rel="noreferrer" className="block rounded-[16px] bg-white/[0.05] border border-white/10 p-4 hover:bg-white/[0.08] hover:border-white/20 transition-all">
                    <div className="mono text-[10px] tracking-widest uppercase opacity-40">{post.series}</div>
                    <div className="mt-1 text-[13px] font-medium leading-[1.4] line-clamp-2">{post.title}</div>
                    <div className="mt-2 flex items-center justify-between mono text-[11px] opacity-50"><span>{post.stat}</span><span>{post.meta}</span></div>
                  </a>
                ))}
              </div>

              <div className="mt-6 mono text-[11px] opacity-40">#FromPromptToProduction · #TheContextWindow · LinkedIn.com/Nilesh-Kolhe</div>
              <div className="mt-4 flex flex-wrap items-center gap-3"><MagneticButton href="https://linkedin.com/in/Nilesh-Kolhe" accent="cyan" className="h-10 px-5 rounded-full bg-white text-black text-[13px] font-semibold leading-none"><span className="inline-flex items-center gap-1 leading-none">Follow on LinkedIn <span className="leading-none">↗</span></span></MagneticButton><div className="h-10 px-4 rounded-full bg-white/[0.06] border border-white/10 grid place-items-center mono text-[11px] leading-none">1,500+ followers</div></div>
            </div>
          </div>
        </div>
      </section>

      {/* Reach Me */}
      <section id="reach-me" className="relative z-10 border-t border-white/[0.06] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden"><div className="absolute inset-0 bg-[radial-gradient(900px_500px_at_50%_0%,rgba(139,92,246,0.14),transparent),radial-gradient(600px_400px_at_85%_40%,rgba(6,255,165,0.06),transparent)]" /></div>
        <div className="relative mx-auto max-w-[1280px] px-6 md:px-8 pt-28 pb-12">
          <div className="flex flex-wrap items-end justify-between gap-6"><h2 className="text-[40px] md:text-[72px] font-bold tracking-[-0.04em] leading-[0.9]">Let's Build Something <span className="serif italic font-normal bg-gradient-to-r from-violet-300 to-cyan-300 bg-clip-text text-transparent">Resilient</span></h2><div className="mono text-[11px] tracking-[0.18em] uppercase opacity-50">05 / CONTACT</div></div>
          <div className="mt-14 grid lg:grid-cols-[0.9fr_1.1fr] gap-10 items-start">
            <div className="space-y-6">
              <div className="rounded-[24px] bg-white/[0.04] border border-white/10 p-7 backdrop-blur-xl relative overflow-hidden group hover:border-violet-500/30 hover:bg-white/[0.06] transition-all duration-300 hover:-translate-y-1"><div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" /><div className="relative"><div className="flex items-center gap-2 mono text-[11px] tracking-[0.18em] uppercase opacity-60"><span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> AVAILABLE • WITHIN 30 DAYS</div><p className="mt-4 text-[16px] leading-[1.7] text-white/75">Open to Lead / Staff roles, platform modernization, and fractional architecture reviews. I work best where reliability matters — healthcare, education, finance — and where performance budgets are real.</p><div className="mt-5 flex items-center gap-2 mono text-[11px] opacity-50"><span className="w-6 h-px bg-white/20" /> Response time &lt; 12h IST • Prefer Email or LinkedIn</div></div></div>
              <div className="rounded-[24px] border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.02] p-6 backdrop-blur-xl"><div className="mono text-[11px] tracking-[0.18em] uppercase opacity-50 mb-4">QUICK ACTIONS</div><div className="flex flex-wrap gap-3"><MagneticButton href="mailto:nilesh.work.001@gmail.com" accent="violet" className="h-12 px-6 rounded-full bg-white text-black text-[13px] font-semibold">Email Me ↗</MagneticButton><MagneticButton href="https://linkedin.com/in/nilesh-kolhe" accent="cyan" className="h-12 px-6 rounded-full bg-white/[0.07] border border-white/15 text-[13px] font-medium hover:bg-white/[0.12]">LinkedIn</MagneticButton><MagneticButton href="https://github.com/Nilesh-Kolhe" accent="violet" className="h-12 px-6 rounded-full bg-white/[0.07] border border-white/15 text-[13px] font-medium hover:bg-white/[0.12]">GitHub</MagneticButton></div></div>
              <div className="rounded-[24px] border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.02] p-6 backdrop-blur-xl flex items-center gap-4"><div className="w-11 h-11 rounded-[12px] bg-white/[0.07] border border-white/10 grid place-items-center text-[16px]">⊙</div><div><div className="mono text-[11px] tracking-[0.18em] uppercase opacity-50">VISITORS</div><div className="text-[22px] font-bold tracking-tight">{visitCount !== null ? visitCount.toLocaleString() : "—"} <span className="text-[13px] font-normal text-white/50">people stopped by</span></div></div></div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {contacts.map((c) => (
                <a key={c.k} href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="group relative rounded-[20px] bg-[#101014]/80 border border-white/[0.08] p-5 backdrop-blur-xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:border-white/20">
                  <div className={`absolute -inset-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none blur-2xl ${c.accent === "cyan" ? "bg-cyan-500/10" : "bg-violet-500/12"}`} />
                  <div className="relative flex items-start justify-between"><div className="flex items-center gap-3"><div className="w-11 h-11 rounded-[12px] bg-white/[0.07] border border-white/10 grid place-items-center text-[14px] font-bold group-hover:scale-110 group-hover:bg-white group-hover:text-black transition-all duration-300">{c.icon}</div><div><div className="mono text-[10px] tracking-[0.16em] uppercase opacity-50">{c.k}</div><div className="text-[14px] font-medium mt-0.5 tracking-tight line-clamp-1">{c.v}</div></div></div><span className="w-6 h-6 rounded-full bg-white/[0.06] border border-white/10 grid place-items-center text-[10px] group-hover:rotate-45 group-hover:bg-white group-hover:text-black transition-all duration-300">↗</span></div>
                  <div className="relative mt-3 mono text-[11px] text-white/45 group-hover:text-white/70 transition-colors">{c.sub}</div>
                </a>
              ))}
              <div className="sm:col-span-2 rounded-[20px] bg-gradient-to-br from-violet-600/20 via-white/[0.04] to-cyan-400/15 border border-violet-500/20 p-5 backdrop-blur-xl relative overflow-hidden"><div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 to-cyan-400/10 opacity-60" /><div className="relative flex flex-wrap items-center justify-between gap-2"><div className="mono text-[11px] tracking-[0.16em] uppercase opacity-60">PREFERENCE</div><div className="pl-0.5 sm:pl-2.5 pr-2.5 py-1 rounded-full text-white sm:bg-white sm:text-black mono text-[10px] font-semibold whitespace-nowrap">OPEN TO RELOCATION • VISA SPONSORSHIP • REMOTE</div></div><div className="relative mt-3 text-[13px] leading-[1.6] text-white/70">Best Way: Email with Relevant Subject Line. I Read Every Message Personally !</div></div>
            </div>
          </div>
          <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6 mono text-[11px] opacity-40"><div>© {new Date().getFullYear()} Nilesh Kolhe • Built with ❤️</div><div className="flex gap-4"><span>Pune • IST</span><span>•</span><span>Lead Full Stack Engineer • 12 Years Experience</span></div></div>
        </div>
      </section>

      {toast && <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] px-5 py-3 rounded-full bg-white text-black text-[13px] font-medium shadow-[0_16px_40px_rgba(0,0,0,0.5)] border border-black/10">{toast}</div>}
    </div>
  );
}
