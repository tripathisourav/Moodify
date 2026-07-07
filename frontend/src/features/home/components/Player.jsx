import React from 'react'
import { useSong } from '../hooks/useSongs'
import CtrlBtn from './CtrlBtn'
import Icon from './Icon'



const Player = () => {

    const {
        I,
        mood,
        setMood,
        MOODS,
        m,
        Hov,
        setHov,
        currentSong,
        setCurrentSong,
        playing, setPlaying, WH, pct, setPct
    } = useSong()

    const fmt = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
    const TOTAL = 226;


    return (
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
                    {/* {currentSong.posterUrl} */}
                </div>
                <div style={{ overflow: "hidden" }}>
                    <p style={{ fontSize: 13, fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", margin: 0 }}>
                        {/* {currentSong.title} */}
                    </p>
                    <p style={{ fontSize: 11, color: "rgba(255,255,255,.38)", marginTop: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {/* {currentSong.artist} - {currentSong.album}  */}
                    </p>
                </div>
            </div>

            {/* Animated waveform */}
            <div style={{ display: "flex", alignItems: "flex-end", gap: "2px", height: 30, flexShrink: 0 }}>
                {WH.map((h, i) => (
                    <div key={i} className={playing ? "wb" : ""} style={{
                        width: 2, borderRadius: 1, background: m.c, height: `${h}%`,
                        animationDuration: `${0.5 + (i % 7) * 0.07}s`,
                        animationDelay: `${(i % 5) * 0.06}s`,
                        opacity: playing ? 1 : 0.3,
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
                <Icon d={I.vol} sz={16} fill="rgba(255,255,255,.38)" />
                <div style={{ width: 56, height: 3, borderRadius: 2, background: "rgba(255,255,255,.1)" }}>
                    <div style={{ height: "100%", width: "65%", borderRadius: 2, background: "rgba(255,255,255,.45)" }} />
                </div>
                <Icon d={I.heart} sz={16} fill="rgba(255,255,255,.25)" />
            </div>
        </div>
    )
}

export default Player



// {
//     "_id": "69cfc27c1d2a93256459b97c",
//         "url": "https://ik.imagekit.io/yotm0kiwn/cohort-2/moodify/songs/Destiny_Mann_Atkeya_-_PagalNew_mZM0BMNlp.mp3",
//             "posterUrl": "https://ik.imagekit.io/yotm0kiwn/cohort-2/moodify/posters/Destiny_Mann_Atkeya_-_PagalNew_qmOMW6El8.jpeg",
//                 "title": "Destiny Mann Atkeya - PagalNew",
//                     "mood": "sad",
//                         "__v": 0
// },