import { useState, useEffect } from "react";

// ─── MOOD CONFIG ──────────────────────────────────────────────────────────
const MOODS = {
  home: {
    label: "Home", title: "All Tracks", badge: "NEUTRAL",
    emoji: null, name: "Neutral", sub: "All songs loaded",
    c: "#8B5CF6", dark: false,
    bg: "radial-gradient(ellipse at 72% 22%,rgba(139,92,246,.24) 0%,transparent 52%),radial-gradient(ellipse at 18% 78%,rgba(88,28,135,.18) 0%,transparent 48%),#08080e",
  },
  happy: {
    label: "Happy", title: "Happy Vibes", badge: "HAPPY",
    emoji: "😄", name: "Happy", sub: "Vibes curated for you",
    c: "#F59E0B", dark: true,
    bg: "radial-gradient(ellipse at 65% 55%,rgba(180,83,9,.3) 0%,transparent 55%),radial-gradient(ellipse at 18% 82%,rgba(120,53,15,.2) 0%,transparent 50%),#08080e",
  },
  sad: {
    label: "Sad", title: "Melancholy Mix", badge: "SAD",
    emoji: "😢", name: "Sad", sub: "Songs that understand you",
    c: "#3B82F6", dark: false,
    bg: "radial-gradient(ellipse at 65% 25%,rgba(37,99,235,.2) 0%,transparent 52%),radial-gradient(ellipse at 18% 78%,rgba(30,58,138,.16) 0%,transparent 50%),#08080e",
  },
  surprised: {
    label: "Surprised", title: "Surprise Picks", badge: "SURPRISED",
    emoji: "😮", name: "Surprised", sub: "Something unexpected",
    c: "#14B8A6", dark: true,
    bg: "radial-gradient(ellipse at 65% 55%,rgba(20,184,166,.18) 0%,transparent 52%),radial-gradient(ellipse at 18% 82%,rgba(13,148,136,.14) 0%,transparent 50%),#08080e",
  },
};

// ─── TRACK DATA ───────────────────────────────────────────────────────────
const SONGS = {
  home: [
    { id: 1,  name: "Destiny Mann Atkeya",  artist: "PagalNew", tag: "sad",       icon: "🎵" },
    { id: 2,  name: "Kyun Main Jaagoon",    artist: "PagalNew", tag: "sad",       icon: "🌙" },
    { id: 3,  name: "Pardesi O Pardesi",    artist: "PagalNew", tag: "sad",       icon: "🌿" },
    { id: 4,  name: "Asal Mein",            artist: "PagalNew", tag: "sad",       icon: "🎭" },
    { id: 5,  name: "Mere Kol",             artist: "PagalNew", tag: "sad",       icon: "🔁" },
    { id: 6,  name: "Aari Aari",            artist: "PagalNew", tag: "happy",     icon: "🎨" },
    { id: 7,  name: "Iss Tarah",            artist: "PagalNew", tag: "happy",     icon: "✨" },
    { id: 8,  name: "Babaji Ki Booti",      artist: "PagalNew", tag: "happy",     icon: "🎪" },
  ],
  happy: [
    { id: 6,  name: "Aari Aari",            artist: "PagalNew", tag: "upbeat",    icon: "🌅" },
    { id: 7,  name: "Iss Tarah",            artist: "PagalNew", tag: "dance",     icon: "✨" },
    { id: 8,  name: "Babaji Ki Booti",      artist: "PagalNew", tag: "fun",       icon: "🎪" },
    { id: 9,  name: "Ishq Ka Raja",         artist: "PagalNew", tag: "energy",    icon: "🔥" },
  ],
  sad: [
    { id: 1,  name: "Destiny Mann Atkeya",  artist: "PagalNew", tag: "emotional", icon: "🎵" },
    { id: 2,  name: "Kyun Main Jaagoon",    artist: "PagalNew", tag: "heartfelt", icon: "🌙" },
    { id: 3,  name: "Pardesi O Pardesi",    artist: "PagalNew", tag: "longing",   icon: "🌿" },
    { id: 4,  name: "Asal Mein",            artist: "PagalNew", tag: "reflective",icon: "🎭" },
    { id: 5,  name: "Mere Kol",             artist: "PagalNew", tag: "soft",      icon: "🔁" },
    { id: 10, name: "Mere Kol (Reprise)",   artist: "PagalNew", tag: "acoustic",  icon: "🎸" },
  ],
  surprised: [
    { id: 11, name: "Mystery Track 1",      artist: "PagalNew", tag: "eclectic",  icon: "🎲" },
    { id: 12, name: "Twist & Beats",        artist: "PagalNew", tag: "unexpected",icon: "🌀" },
    { id: 13, name: "Whoa Moment",          artist: "PagalNew", tag: "wild",      icon: "⚡" },
  ],
};

const CONF = [
  { l: "Happy",    p: 15 },
  { l: "Sad",      p: 20 },
  { l: "Surprised",p: 10 },
  { l: "Neutral",  p: 55 },
];

// Stable pre-computed waveform bar heights
const WH = [45,72,38,85,60,92,41,78,55,88,43,70,95,52,80,37,65,90,48,73,58,87,42,76,61,89,44,71];

 // 3:46 in seconds
 const fmt = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
    const TOTAL = 226;


// ─── SVG ICON PATHS ───────────────────────────────────────────────────────
const I = {
  play:    "M8 5v14l11-7z",
  pause:   "M6 19h4V5H6v14zm8-14v14h4V5h-4z",
  prev:    "M6 6h2v12H6zm3.5 6 8.5 6V6z",
  next:    "M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z",
  replay:  "M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z",
  forward: "M18 13c0 3.31-2.69 6-6 6s-6-2.69-6-6 2.69-6 6-6v4l5-5-5-5v4c-4.42 0-8 3.58-8 8s3.58 8 8 8 8-3.58 8-8h-2z",
  cam:     "M17 10.5V7a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-3.5l4 4v-11l-4 4z",
  vol:     "M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02z",
  heart:   "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z",
};

// ─── MICRO-COMPONENTS ─────────────────────────────────────────────────────
const Icon = ({ d, sz = 16, fill = "currentColor" }) => (
  <svg viewBox="0 0 24 24" style={{ width: sz, height: sz, fill, display: "block", flexShrink: 0 }}>
    <path d={d} />
  </svg>
);

const CtrlBtn = ({ d, onClick }) => (
  <button onClick={onClick}
    style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,.4)", display: "flex", padding: "4px", transition: "color .15s" }}
    onMouseEnter={e => e.currentTarget.style.color = "#fff"}
    onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,.4)"}>
    <Icon d={d} sz={16} />
  </button>
);

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────
export default function Moodify() {
  const [mood,    setMood]    = useState("home");
  const [track,   setTrack]   = useState(SONGS.home[0]);
  const [playing, setPlaying] = useState(true);
  const [pct,     setPct]     = useState(55);
  const [hov,     setHov]     = useState(null);

  const m     = MOODS[mood];
  const songs = SONGS[mood];
  const cols  = Math.min(4, songs.length);   // max 4 cols — clean at any width

  // Reset on mood change
  useEffect(() => {
    setTrack(SONGS[mood][0]);
    setPct(0);
    setPlaying(true);
  }, [mood]);

  // Progress ticker
  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => setPct(p => p >= 100 ? 0 : p + 100 / TOTAL), 1000);
    return () => clearInterval(id);
  }, [playing]);

  const pickTrack = (t) => { setTrack(t); setPct(0); setPlaying(true); };

  return (
    <div style={{
      fontFamily: "Inter, system-ui, sans-serif",
      color: "#fff",
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
      background: m.bg,
      transition: "background .5s ease",
    }}>

      {/* ── GLOBAL STYLES ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        * { box-sizing: border-box; }
        button { font-family: inherit; cursor: pointer; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,.12); border-radius: 3px; }

        @keyframes wave {
          0%, 100% { transform: scaleY(0.2); }
          50%       { transform: scaleY(1);   }
        }
        .wb { transform-origin: bottom; animation: wave ease-in-out infinite; }

        @keyframes ring-pulse {
          0%, 100% { opacity: 0.55; }
          50%       { opacity: 1;    }
        }
        .ring-pulse { animation: ring-pulse 2.5s ease-in-out infinite; }
      `}</style>

      {/* ══ HEADER ══════════════════════════════════════════════════════════ */}
      <header style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "10px 24px", borderBottom: "1px solid rgba(255,255,255,.07)", flexShrink: 0,
      }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 28, height: 28, borderRadius: "50%", border: "2px solid rgba(255,255,255,.7)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon d={I.play} sz={13} fill="#fff" />
          </div>
          <span style={{ fontWeight: 600, fontSize: 16, letterSpacing: "-.2px" }}>Moodify</span>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: m.c, boxShadow: `0 0 8px ${m.c}` }} />
        </div>

        {/* Nav pills */}
        <nav style={{ display: "flex", gap: 4 }}>
          {Object.entries(MOODS).map(([k, cfg]) => (
            <button key={k} onClick={() => setMood(k)} style={{
              display: "flex", alignItems: "center", gap: 6,
              padding: "6px 16px", borderRadius: 20,
              fontSize: 13, fontWeight: 500, transition: "all .2s",
              background: mood === k ? `${m.c}18` : "transparent",
              border:     mood === k ? `1px solid ${m.c}` : "1px solid transparent",
              color:      mood === k ? m.c : "rgba(255,255,255,.45)",
            }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", display: "block", flexShrink: 0, background: mood === k ? m.c : "rgba(255,255,255,.35)" }} />
              {cfg.label}
            </button>
          ))}
        </nav>
      </header>

      {/* ══ BODY ════════════════════════════════════════════════════════════ */}
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>

        {/* ── TRACK GRID ── */}
        <div style={{ flex: 1, overflowY: "auto", padding: "22px 28px" }}>
          {/* Page title */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 22 }}>
            <h1 style={{ fontSize: 28, fontWeight: 300, letterSpacing: "-.5px", margin: 0 }}>{m.title}</h1>
            <span style={{
              padding: "4px 12px", borderRadius: 20, fontSize: 10, fontWeight: 700, letterSpacing: ".15em",
              color: m.c, background: `${m.c}18`, border: `1px solid ${m.c}38`,
            }}>{m.badge}</span>
          </div>

          {/* Cards grid */}
          <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 12 }}>
            {songs.map((s, i) => {
              const active = track.id === s.id;
              const isHov  = hov === s.id;
              return (
                <div key={s.id}
                  onClick={() => pickTrack(s)}
                  onMouseEnter={() => setHov(s.id)}
                  onMouseLeave={() => setHov(null)}
                  style={{
                    position: "relative", borderRadius: 14, padding: "16px 14px 14px",
                    cursor: "pointer", userSelect: "none",
                    background:  active ? `${m.c}16` : "rgba(255,255,255,.04)",
                    border:      active ? `2px solid ${m.c}` : "1px solid rgba(255,255,255,.08)",
                    boxShadow:   active ? `0 0 28px ${m.c}28` : "none",
                    transform:   isHov  ? "scale(1.03)" : "scale(1)",
                    transition:  "all .18s ease",
                  }}>

                  {/* Track number / active dot */}
                  {i === 0
                    ? <div style={{ position: "absolute", top: 10, right: 10, width: 8, height: 8, borderRadius: "50%", background: m.c }} />
                    : <span style={{ position: "absolute", top: 10, right: 12, fontSize: 11, color: "rgba(255,255,255,.22)", fontFamily: "monospace" }}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                  }

                  {/* Emoji icon */}
                  <div style={{ height: 72, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 34, marginBottom: 12 }}>
                    {s.icon}
                  </div>

                  {/* Hover play overlay */}
                  <div style={{
                    position: "absolute", inset: 0, borderRadius: 14,
                    background: "rgba(0,0,0,.38)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    opacity: isHov ? 1 : 0, transition: "opacity .15s",
                  }}>
                    <div style={{ width: 42, height: 42, borderRadius: "50%", background: m.c, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Icon d={I.play} sz={20} fill={m.dark ? "#111" : "#fff"} />
                    </div>
                  </div>

                  {/* Track info */}
                  <p style={{ fontSize: 13, fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", margin: 0 }}>{s.name}</p>
                  <p style={{ fontSize: 11, color: "rgba(255,255,255,.38)", marginTop: 3, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{s.artist} • {s.tag}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── MOOD PANEL ── */}
        <div style={{
          width: 272, flexShrink: 0,
          borderLeft: "1px solid rgba(255,255,255,.08)",
          padding: "22px 20px",
          display: "flex", flexDirection: "column", gap: 22,
          overflowY: "auto",
        }}>
          <p style={{ fontSize: 10, letterSpacing: ".2em", color: "rgba(255,255,255,.35)", fontWeight: 500, margin: 0 }}>MOOD DETECTOR</p>

          {/* Camera ring */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div className="ring-pulse" style={{ position: "relative", width: 140, height: 140 }}>
              <svg viewBox="0 0 140 140" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
                <circle cx="70" cy="70" r="66" fill="none" stroke="rgba(255,255,255,.06)" strokeWidth="1.5" />
                <circle cx="70" cy="70" r="66" fill="none" stroke={m.c} strokeWidth="2" />
              </svg>
              <div style={{
                position: "absolute", inset: 10, borderRadius: "50%",
                background: "rgba(0,0,0,.65)",
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8,
              }}>
                <Icon d={I.cam} sz={30} fill="rgba(255,255,255,.22)" />
                <span style={{ fontSize: 11, color: "rgba(255,255,255,.28)" }}>Camera off</span>
              </div>
            </div>
          </div>

          {/* Mood label */}
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 36, marginBottom: 8, color: m.emoji ? "inherit" : m.c }}>
              {m.emoji || "✦"}
            </div>
            <p style={{ fontSize: 20, fontWeight: 300, color: m.c, letterSpacing: "-.3px", margin: 0 }}>{m.name}</p>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,.38)", marginTop: 4 }}>{m.sub}</p>
          </div>

          {/* Start Camera button */}
          <button
            style={{
              width: "100%", padding: "11px 0", borderRadius: 24, border: "none",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              fontSize: 13, fontWeight: 600,
              background: m.c, color: m.dark ? "#111" : "#fff",
              transition: "opacity .18s",
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = ".82"}
            onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
            <Icon d={I.cam} sz={16} fill="currentColor" />
            Start Camera
          </button>

          {/* Confidence bars */}
          <div>
            <p style={{ fontSize: 10, letterSpacing: ".2em", color: "rgba(255,255,255,.35)", fontWeight: 500, marginBottom: 16 }}>CONFIDENCE</p>
            {CONF.map(c => (
              <div key={c.l} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                <span style={{ fontSize: 12, color: "rgba(255,255,255,.45)", width: 58, flexShrink: 0 }}>{c.l}</span>
                <div style={{ flex: 1, height: 3, borderRadius: 2, background: "rgba(255,255,255,.08)" }}>
                  <div style={{ height: "100%", borderRadius: 2, background: m.c, width: `${c.p}%`, transition: "all .5s ease" }} />
                </div>
                <span style={{ fontSize: 12, color: "rgba(255,255,255,.38)", width: 28, textAlign: "right", flexShrink: 0 }}>{c.p}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══ PLAYER BAR ══════════════════════════════════════════════════════ */}
      <div style={{
        borderTop: "1px solid rgba(255,255,255,.07)",
        padding: "10px 24px",
        display: "flex", alignItems: "center", gap: 16,
        flexShrink: 0,
        background: "rgba(0,0,0,.5)",
        backdropFilter: "blur(16px)",
      }}>

        {/* Track info */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, width: 190, flexShrink: 0 }}>
          <div style={{ width: 38, height: 38, borderRadius: 10, background: "rgba(255,255,255,.08)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>
            {track.icon}
          </div>
          <div style={{ overflow: "hidden" }}>
            <p style={{ fontSize: 13, fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", margin: 0 }}>{track.name}</p>
            <p style={{ fontSize: 11, color: "rgba(255,255,255,.38)", marginTop: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{track.artist} • {track.tag}</p>
          </div>
        </div>

        {/* Animated waveform */}
        <div style={{ display: "flex", alignItems: "flex-end", gap: "2px", height: 30, flexShrink: 0 }}>
          {WH.map((h, i) => (
            <div key={i} className={playing ? "wb" : ""} style={{
              width: 2, borderRadius: 1, background: m.c, height: `${h}%`,
              animationDuration:  `${0.5 + (i % 7) * 0.07}s`,
              animationDelay:     `${(i % 5) * 0.06}s`,
              opacity:    playing ? 1 : 0.3,
              transition: "opacity .3s",
            }} />
          ))}
        </div>

        {/* Playback controls */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
          <CtrlBtn d={I.prev} />
          <CtrlBtn d={I.replay} />
          <button onClick={() => setPlaying(!playing)} style={{
            width: 40, height: 40, borderRadius: "50%", border: "none",
            background: m.c, display: "flex", alignItems: "center", justifyContent: "center",
            transition: "transform .18s", flexShrink: 0,
          }}
            onMouseEnter={e => e.currentTarget.style.transform = "scale(1.1)"}
            onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>
            <Icon d={playing ? I.pause : I.play} sz={18} fill={m.dark ? "#111" : "#fff"} />
          </button>
          <CtrlBtn d={I.forward} />
          <CtrlBtn d={I.next} />
        </div>

        {/* Progress bar */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, flex: 1, minWidth: 0 }}>
          <span style={{ fontSize: 11, color: "rgba(255,255,255,.4)", width: 28, flexShrink: 0 }}>{fmt(pct / 100 * TOTAL)}</span>
          <div
            style={{ flex: 1, height: 3, borderRadius: 2, background: "rgba(255,255,255,.1)", cursor: "pointer", position: "relative" }}
            onClick={e => {
              const r = e.currentTarget.getBoundingClientRect();
              setPct(Math.max(0, Math.min(100, (e.clientX - r.left) / r.width * 100)));
            }}>
            <div style={{ position: "absolute", top: 0, left: 0, height: "100%", borderRadius: 2, background: m.c, width: `${pct}%` }}>
              <div style={{ position: "absolute", right: -5, top: "50%", transform: "translateY(-50%)", width: 12, height: 12, borderRadius: "50%", background: "#fff", boxShadow: `0 0 6px ${m.c}` }} />
            </div>
          </div>
          <span style={{ fontSize: 11, color: "rgba(255,255,255,.4)", width: 28, textAlign: "right", flexShrink: 0 }}>3:46</span>
        </div>

        {/* Volume + like */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
          <Icon d={I.vol}   sz={16} fill="rgba(255,255,255,.38)" />
          <div style={{ width: 56, height: 3, borderRadius: 2, background: "rgba(255,255,255,.1)" }}>
            <div style={{ height: "100%", width: "65%", borderRadius: 2, background: "rgba(255,255,255,.45)" }} />
          </div>
          <Icon d={I.heart} sz={16} fill="rgba(255,255,255,.25)" />
        </div>
      </div>
    </div>
  );
}