// import React, { useRef, useState } from "react"
// import { detect, init } from "./utils/utils.js"
// import { useSong } from "../hooks/useSongs.js";



// /* ─── icon helper ─────────────────────────────────────────────────────────── */
// const PATH_CAM =
//   "M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"

// const Icon = ({ d, sz = 16, fill = "currentColor" }) => (
//   <svg viewBox="0 0 24 24" style={{ width: sz, height: sz, fill, display: "block", flexShrink: 0 }}>
//     <path d={d} />
//   </svg>
// );

// /* ─── confidence math ─────────────────────────────────────────────────────── */
// function toConf(raw) {
//   if (!raw) return { Happy: 0, Surprised: 0, Sad: 0, Neutral: 100 }
//   const {
//     smileLeft = 0, smileRight = 0,
//     jawOpen   = 0, browUp     = 0,
//     frownLeft = 0, frownRight = 0,
//   } = raw
//   const happy     = Math.round(((smileLeft + smileRight) / 2) * 100)
//   const surprised = Math.round(((jawOpen + browUp) / 2) * 100)
//   const sad       = Math.min(100, Math.round((frownLeft + frownRight) * 200))
//   const neutral   = Math.max(0, 100 - happy - surprised - sad)
//   return { Happy: happy, Surprised: surprised, Sad: sad, Neutral: neutral }
// }

// /* ─── component ───────────────────────────────────────────────────────────── */
// export default function MoodPanel({ onDetect = () => {} }) {
//   const { setMood, m } = useSong()   // m = { c, emoji, name, sub, dark }

//   const videoRef      = useRef(null)
//   const landmarkerRef = useRef(null)
//   const streamRef     = useRef(null)

//   // 'idle' | 'loading' | 'active' | 'detecting' | 'done'
//   const [phase,  setPhase]  = useState("idle")
//   const [conf,   setConf]   = useState({ Happy: 0, Surprised: 0, Sad: 0, Neutral: 100 })
//   const [errMsg, setErrMsg] = useState(null)

//   const cameraOn = phase === "active" || phase === "detecting"

//   /* ── actions ──────────────────────────────────────────────────────────── */
//   async function startCamera() {
//     setConf({ Happy: 0, Surprised: 0, Sad: 0, Neutral: 100 })
//     setErrMsg(null)
//     setPhase("loading")
//     try {
//       await init({ landmarkerRef, videoRef, streamRef })
//       setPhase("active")
//     } catch {
//       setPhase("idle")
//       setErrMsg("Camera access denied")
//     }
//   }

//   function handleDetect() {
//     setPhase("detecting")
//     const result = detect({ landmarkerRef, videoRef, setExpression: () => {} })

//     if (!result) {
//       setPhase("active")
//       setErrMsg("No face detected — look at the camera")
//       setTimeout(() => setErrMsg(null), 2500)
//       return
//     }

//     const { expression, rawScores } = result
//     videoRef.current?.srcObject?.getTracks().forEach(t => t.stop())
//     setConf(toConf(rawScores))
//     setMood(expression)       // updates useSong context → m re-renders automatically
//     onDetect(expression)      // optional parent callback (replaces old onClick prop)
//     setPhase("done")
//   }

//   /* ── per-phase config ─────────────────────────────────────────────────── */
//   const BTN = {
//     idle:      { label: "Start Camera", action: startCamera,  disabled: false },
//     loading:   { label: "Loading…",      action: null,         disabled: true  },
//     active:    { label: "Detect Mood",   action: handleDetect, disabled: false },
//     detecting: { label: "Analyzing…",    action: null,         disabled: true  },
//     done:      { label: "Scan Again",    action: startCamera,  disabled: false },
//   }[phase]

//   const ringCls = { loading: "mp-pulse", active: "mp-pulse", detecting: "mp-fast" }[phase] ?? ""

//   const PLACE = {
//     idle:    { icon: true,  text: "Camera off" },
//     loading: { icon: false, text: "Loading model…" },
//     done:    { icon: true,  text: "Mood locked ✓" },
//   }[phase] ?? { icon: false, text: "" }

//   /* ── render ───────────────────────────────────────────────────────────── */
//   return (
//     <>
//       <style>{`
//         @keyframes mp-pulse { 0%,100%{opacity:1} 50%{opacity:.5} }
//         @keyframes mp-fast  { 0%,100%{opacity:1} 50%{opacity:.3} }
//         @keyframes mp-spin  { to { transform: rotate(360deg) } }
//         .mp-pulse { animation: mp-pulse 2.4s ease-in-out infinite }
//         .mp-fast  { animation: mp-fast   .7s ease-in-out infinite }
//       `}</style>

//       <div style={{
//         width: 272, flexShrink: 0,
//         borderLeft: "1px solid rgba(255,255,255,.08)",
//         padding: "22px 20px",
//         display: "flex", flexDirection: "column", gap: 22,
//         overflowY: "auto",
//       }}>

//         {/* label */}
//         <p style={{ fontSize: 10, letterSpacing: ".2em", color: "rgba(255,255,255,.35)", fontWeight: 500, margin: 0 }}>
//           MOOD DETECTOR
//         </p>

//         {/* ── camera ring ── */}
//         <div style={{ display: "flex", justifyContent: "center" }}>
//           <div className={ringCls} style={{ position: "relative", width: 140, height: 140 }}>

//             {/* decorative SVG border */}
//             <svg viewBox="0 0 140 140"
//               style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 2, pointerEvents: "none" }}>
//               {/* static track */}
//               <circle cx="70" cy="70" r="66" fill="none" stroke="rgba(255,255,255,.06)" strokeWidth="1.5" />
//               {/* mood-coloured ring */}
//               <circle cx="70" cy="70" r="66" fill="none" stroke={m.c} strokeWidth="2" />
//               {/* spinning arc while model loads */}
//               {phase === "loading" && (
//                 <circle
//                   cx="70" cy="70" r="66"
//                   fill="none" stroke={m.c} strokeWidth="3"
//                   strokeDasharray="52 363" strokeLinecap="round"
//                   style={{ transformBox: "fill-box", transformOrigin: "center", animation: "mp-spin 1s linear infinite" }}
//                 />
//               )}
//             </svg>

//             {/* inner circle — clips video to circle */}
//             <div style={{
//               position: "absolute", inset: 10, borderRadius: "50%",
//               overflow: "hidden",
//               background: "rgba(0,0,0,.65)",
//             }}>
//               {/*
//                * VIDEO IS ALWAYS MOUNTED — never conditionally rendered.
//                * If we hide it with display:none, videoRef.current becomes null
//                * and init() crashes. We toggle opacity instead.
//                */}
//               <video
//                 ref={videoRef}
//                 playsInline autoPlay muted
//                 style={{
//                   position: "absolute", inset: 0,
//                   width: "100%", height: "100%",
//                   objectFit: "cover",
//                   transform: "scaleX(-1)",   /* mirror so it feels natural */
//                   opacity: cameraOn ? 1 : 0,
//                   transition: "opacity .35s",
//                 }}
//               />

//               {/* placeholder shown when camera off */}
//               <div style={{
//                 position: "absolute", inset: 0,
//                 display: "flex", flexDirection: "column",
//                 alignItems: "center", justifyContent: "center", gap: 8,
//                 opacity: cameraOn ? 0 : 1,
//                 transition: "opacity .35s",
//                 pointerEvents: "none",
//               }}>
//                 {PLACE.icon && (
//                   <Icon d={PATH_CAM} sz={26} fill={phase === "done" ? m.c : "rgba(255,255,255,.28)"} />
//                 )}
//                 <span style={{ fontSize: 11, color: "rgba(255,255,255,.35)", textAlign: "center", padding: "0 10px" }}>
//                   {PLACE.text}
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* error toast */}
//         {errMsg && (
//           <p style={{ fontSize: 12, color: "#f87171", textAlign: "center", margin: "-8px 0" }}>
//             {errMsg}
//           </p>
//         )}

//         {/* mood label */}
//         <div style={{ textAlign: "center" }}>
//           <div style={{ fontSize: 36, marginBottom: 8 }}>{m.emoji || "✦"}</div>
//           <p style={{ fontSize: 20, fontWeight: 300, color: m.c, letterSpacing: "-.3px", margin: 0 }}>{m.name}</p>
//           <p style={{ fontSize: 12, color: "rgba(255,255,255,.38)", marginTop: 4 }}>{m.sub}</p>
//         </div>

//         {/* action button */}
//         <button
//           onClick={BTN.action ?? undefined}
//           disabled={BTN.disabled}
//           style={{
//             width: "100%", padding: "11px 0", borderRadius: 24, border: "none",
//             display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
//             fontSize: 13, fontWeight: 600,
//             background: BTN.disabled ? "rgba(255,255,255,.08)" : m.c,
//             color: BTN.disabled ? "rgba(255,255,255,.3)" : m.dark ? "#111" : "#fff",
//             cursor: BTN.disabled ? "not-allowed" : "pointer",
//             transition: "background .25s, color .25s",
//           }}
//           onMouseEnter={e => { if (!BTN.disabled) e.currentTarget.style.opacity = ".8" }}
//           onMouseLeave={e => { e.currentTarget.style.opacity = "1" }}
//         >
//           <Icon d={PATH_CAM} sz={16} fill="currentColor" />
//           {BTN.label}
//         </button>

//         {/* confidence bars */}
//         <div>
//           <p style={{ fontSize: 10, letterSpacing: ".2em", color: "rgba(255,255,255,.35)", fontWeight: 500, marginBottom: 16 }}>
//             CONFIDENCE
//           </p>
//           {Object.entries(conf).map(([label, pct]) => (
//             <div key={label} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
//               <span style={{ fontSize: 12, color: "rgba(255,255,255,.45)", width: 58, flexShrink: 0 }}>{label}</span>
//               <div style={{ flex: 1, height: 3, borderRadius: 2, background: "rgba(255,255,255,.08)" }}>
//                 <div style={{
//                   height: "100%", borderRadius: 2,
//                   background: m.c,
//                   width: `${pct}%`,
//                   transition: "width .5s cubic-bezier(.4,0,.2,1)",
//                 }} />
//               </div>
//               <span style={{ fontSize: 12, color: "rgba(255,255,255,.38)", width: 28, textAlign: "right", flexShrink: 0 }}>
//                 {pct}%
//               </span>
//             </div>
//           ))}
//         </div>

//       </div>
//     </>
//   )
// }





// import React from 'react'
// import { useSong } from '../../home/hooks/useSongs'


// const MoodPanel = () => {

//     const {
//         mood,
//         setMood,
//         MOODS,
//         m,
//     } = useSong()


//     return (
//         <div style={{
//             width: 272, flexShrink: 0,
//             borderLeft: "1px solid rgba(255,255,255,.08)",
//             padding: "22px 20px",
//             display: "flex", flexDirection: "column", gap: 22,
//             overflowY: "auto",
//         }}>
//             <p style={{ fontSize: 10, letterSpacing: ".2em", color: "rgba(255,255,255,.35)", fontWeight: 500, margin: 0 }}>MOOD DETECTOR</p>

//             {/* Camera ring */}
//             <div style={{ display: "flex", justifyContent: "center" }}>
//                 <div className="ring-pulse" style={{ position: "relative", width: 140, height: 140 }}>
//                     <svg viewBox="0 0 140 140" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
//                         <circle cx="70" cy="70" r="66" fill="none" stroke="rgba(255,255,255,.06)" strokeWidth="1.5" />
//                         <circle cx="70" cy="70" r="66" fill="none" stroke={m.c} strokeWidth="2" />
//                     </svg>
//                     <div style={{
//                         position: "absolute", inset: 10, borderRadius: "50%",
//                         background: "rgba(0,0,0,.65)",
//                         display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8,
//                     }}>
//                         <i class="ri-video-on-line" />
//                         <span style={{ fontSize: 11, color: "rgba(255,255,255,.28)" }}>Camera off</span>
//                     </div>
//                 </div>
//             </div>

//             {/* Mood label */}
//             <div style={{ textAlign: "center" }}>
//                 <div style={{ fontSize: 36, marginBottom: 8, color: m.emoji ? "inherit" : m.c }}>
//                     {m.emoji || "✦"}
//                 </div>
//                 <p style={{ fontSize: 20, fontWeight: 300, color: m.c, letterSpacing: "-.3px", margin: 0 }}>{m.name}</p>
//                 <p style={{ fontSize: 12, color: "rgba(255,255,255,.38)", marginTop: 4 }}>{m.sub}</p>
//             </div>

//             {/* Start Camera button */}
//             <button
//                 style={{
//                     width: "100%", padding: "11px 0", borderRadius: 24, border: "none",
//                     display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
//                     fontSize: 13, fontWeight: 600,
//                     background: m.c, color: m.dark ? "#111" : "#fff",
//                     transition: "opacity .18s",
//                 }}
//                 onMouseEnter={e => e.currentTarget.style.opacity = ".82"}
//                 onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
//                 <Icon d={I.cam} sz={16} fill="currentColor" />
//                 Start Camera
//             </button>

//             {/* Confidence bars */}
//             <div>
//                 <p style={{ fontSize: 10, letterSpacing: ".2em", color: "rgba(255,255,255,.35)", fontWeight: 500, marginBottom: 16 }}>CONFIDENCE</p>
//                 {CONF.map(c => (
//                     <div key={c.l} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
//                         <span style={{ fontSize: 12, color: "rgba(255,255,255,.45)", width: 58, flexShrink: 0 }}>{c.l}</span>
//                         <div style={{ flex: 1, height: 3, borderRadius: 2, background: "rgba(255,255,255,.08)" }}>
//                             <div style={{ height: "100%", borderRadius: 2, background: m.c, width: `${c.p}%`, transition: "all .5s ease" }} />
//                         </div>
//                         <span style={{ fontSize: 12, color: "rgba(255,255,255,.38)", width: 28, textAlign: "right", flexShrink: 0 }}>{c.p}%</span>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     )
// }

// export default MoodPanel


import React, { useRef, useState } from "react"
import { detect, init } from "./utils/utils.js"
import { useSong } from "../hooks/useSongs.js";

/* ─── icon helper ─────────────────────────────────────────────────────────── */
const PATH_CAM =
  "M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"

const Icon = ({ d, sz = 16, fill = "currentColor" }) => (
  <svg viewBox="0 0 24 24" style={{ width: sz, height: sz, fill, display: "block", flexShrink: 0 }}>
    <path d={d} />
  </svg>
);

/* ─── confidence math ─────────────────────────────────────────────────────── */
function toConf(raw) {
  if (!raw) return { Happy: 0, Surprised: 0, Sad: 0, Neutral: 100 }
  const {
    smileLeft = 0, smileRight = 0,
    jawOpen   = 0, browUp     = 0,
    frownLeft = 0, frownRight = 0,
  } = raw
  const happy     = Math.round(((smileLeft + smileRight) / 2) * 100)
  const surprised = Math.round(((jawOpen + browUp) / 2) * 100)
  const sad       = Math.min(100, Math.round((frownLeft + frownRight) * 200))
  const neutral   = Math.max(0, 100 - happy - surprised - sad)
  return { Happy: happy, Surprised: surprised, Sad: sad, Neutral: neutral }
}

/* ─── component ───────────────────────────────────────────────────────────── */
export default function MoodPanel({ onDetect = () => {} }) {
  const { setMood, m } = useSong()

  const videoRef      = useRef(null)
  const landmarkerRef = useRef(null)
  const streamRef     = useRef(null)

  const [phase,  setPhase]  = useState("idle")
  const [conf,   setConf]   = useState({ Happy: 0, Surprised: 0, Sad: 0, Neutral: 100 })
  const [errMsg, setErrMsg] = useState(null)

  const cameraOn = phase === "active" || phase === "detecting"

  async function startCamera() {
    setConf({ Happy: 0, Surprised: 0, Sad: 0, Neutral: 100 })
    setErrMsg(null)
    setPhase("loading")
    try {
      await init({ landmarkerRef, videoRef, streamRef })
      setPhase("active")
    } catch {
      setPhase("idle")
      setErrMsg("Camera access denied")
    }
  }

  function handleDetect() {
    setPhase("detecting")
    const result = detect({ landmarkerRef, videoRef, setExpression: () => {} })

    if (!result) {
      setPhase("active")
      setErrMsg("No face detected — look at the camera")
      setTimeout(() => setErrMsg(null), 2500)
      return
    }

    const { expression, rawScores } = result
    videoRef.current?.srcObject?.getTracks().forEach(t => t.stop())
    setConf(toConf(rawScores))
    setMood(expression)
    onDetect(expression)
    setPhase("done")
  }

  const BTN = {
    idle:      { label: "Start Camera", action: startCamera,  disabled: false },
    loading:   { label: "Loading…",      action: null,         disabled: true  },
    active:    { label: "Detect Mood",   action: handleDetect, disabled: false },
    detecting: { label: "Analyzing…",    action: null,         disabled: true  },
    done:      { label: "Scan Again",    action: startCamera,  disabled: false },
  }[phase]

  const ringCls = { loading: "mp-pulse", active: "mp-pulse", detecting: "mp-fast" }[phase] ?? ""

  const PLACE = {
    idle:    { icon: true,  text: "Camera off" },
    loading: { icon: false, text: "Loading model…" },
    done:    { icon: true,  text: "Mood locked ✓" },
  }[phase] ?? { icon: false, text: "" }

  return (
    <>
      <style>{`
        @keyframes mp-pulse { 0%,100%{opacity:1} 50%{opacity:.5} }
        @keyframes mp-fast  { 0%,100%{opacity:1} 50%{opacity:.3} }
        @keyframes mp-spin  { to { transform: rotate(360deg) } }
        .mp-pulse { animation: mp-pulse 2.4s ease-in-out infinite }
        .mp-fast  { animation: mp-fast   .7s ease-in-out infinite }
      `}</style>

      <div style={{
        width: 272, flexShrink: 0,
        borderLeft: "1px solid rgba(255,255,255,.08)",
        padding: "22px 20px",
        display: "flex", flexDirection: "column", gap: 22,
        overflowY: "auto",
      }}>

        <p style={{ fontSize: 10, letterSpacing: ".2em", color: "rgba(255,255,255,.35)", fontWeight: 500, margin: 0 }}>
          MOOD DETECTOR
        </p>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <div className={ringCls} style={{ position: "relative", width: 140, height: 140 }}>
            <svg viewBox="0 0 140 140"
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 2, pointerEvents: "none" }}>
              <circle cx="70" cy="70" r="66" fill="none" stroke="rgba(255,255,255,.06)" strokeWidth="1.5" />
              <circle cx="70" cy="70" r="66" fill="none" stroke={m.c} strokeWidth="2" />
              {phase === "loading" && (
                <circle
                  cx="70" cy="70" r="66"
                  fill="none" stroke={m.c} strokeWidth="3"
                  strokeDasharray="52 363" strokeLinecap="round"
                  style={{ transformBox: "fill-box", transformOrigin: "center", animation: "mp-spin 1s linear infinite" }}
                />
              )}
            </svg>

            <div style={{
              position: "absolute", inset: 10, borderRadius: "50%",
              overflow: "hidden",
              background: "rgba(0,0,0,.65)",
            }}>
              <video
                ref={videoRef}
                playsInline autoPlay muted
                style={{
                  position: "absolute", inset: 0,
                  width: "100%", height: "100%",
                  objectFit: "cover",
                  transform: "scaleX(-1)",
                  opacity: cameraOn ? 1 : 0,
                  transition: "opacity .35s",
                }}
              />

              <div style={{
                position: "absolute", inset: 0,
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center", gap: 8,
                opacity: cameraOn ? 0 : 1,
                transition: "opacity .35s",
                pointerEvents: "none",
              }}>
                {PLACE.icon && (
                  <Icon d={PATH_CAM} sz={26} fill={phase === "done" ? m.c : "rgba(255,255,255,.28)"} />
                )}
                <span style={{ fontSize: 11, color: "rgba(255,255,255,.35)", textAlign: "center", padding: "0 10px" }}>
                  {PLACE.text}
                </span>
              </div>
            </div>
          </div>
        </div>

        {errMsg && (
          <p style={{ fontSize: 12, color: "#f87171", textAlign: "center", margin: "-8px 0" }}>
            {errMsg}
          </p>
        )}

        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>{m.emoji || "✦"}</div>
          <p style={{ fontSize: 20, fontWeight: 300, color: m.c, letterSpacing: "-.3px", margin: 0 }}>{m.name}</p>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,.38)", marginTop: 4 }}>{m.sub}</p>
        </div>

        <button
          onClick={BTN.action ?? undefined}
          disabled={BTN.disabled}
          style={{
            width: "100%", padding: "11px 0", borderRadius: 24, border: "none",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            fontSize: 13, fontWeight: 600,
            background: BTN.disabled ? "rgba(255,255,255,.08)" : m.c,
            color: BTN.disabled ? "rgba(255,255,255,.3)" : m.dark ? "#111" : "#fff",
            cursor: BTN.disabled ? "not-allowed" : "pointer",
            transition: "background .25s, color .25s",
          }}
          onMouseEnter={e => { if (!BTN.disabled) e.currentTarget.style.opacity = ".8" }}
          onMouseLeave={e => { e.currentTarget.style.opacity = "1" }}
        >
          <Icon d={PATH_CAM} sz={16} fill="currentColor" />
          {BTN.label}
        </button>

        <div>
          <p style={{ fontSize: 10, letterSpacing: ".2em", color: "rgba(255,255,255,.35)", fontWeight: 500, marginBottom: 16 }}>
            CONFIDENCE
          </p>
          {Object.entries(conf).map(([label, pct]) => (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
              <span style={{ fontSize: 12, color: "rgba(255,255,255,.45)", width: 58, flexShrink: 0 }}>{label}</span>
              <div style={{ flex: 1, height: 3, borderRadius: 2, background: "rgba(255,255,255,.08)" }}>
                <div style={{
                  height: "100%", borderRadius: 2,
                  background: m.c,
                  width: `${pct}%`,
                  transition: "width .5s cubic-bezier(.4,0,.2,1)",
                }} />
              </div>
              <span style={{ fontSize: 12, color: "rgba(255,255,255,.38)", width: 28, textAlign: "right", flexShrink: 0 }}>
                {pct}%
              </span>
            </div>
          ))}
        </div>

      </div>
    </>
  )
}

