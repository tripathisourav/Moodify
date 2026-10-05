// import React, { useContext } from 'react'
// import { useSong } from '../hooks/useSongs'
// import Icon from './Icon'

// const Tracks = () => {

//     const {
//         mood,
//         setMood,
//         MOODS,
//         m,
//         Hov,
//         setHov,
//         cols,
//         songs,
//         setSongs,
//         currentIndex,
//         setCurrentIndex,
//         I
//     } = useSong()



//     return (
//         <div style={{ flex: 1, overflowY: "auto", padding: "22px 28px" }}>

//             {/* Page title */}
//             <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 22 }}>
//                 <h1 style={{ fontSize: 28, fontWeight: 300, letterSpacing: "-.5px", margin: 0 }}>{m.title}</h1>
//                 <span style={{
//                     padding: "4px 12px", borderRadius: 20, fontSize: 10, fontWeight: 700, letterSpacing: ".15em",
//                     color: m.c, background: `${m.c}18`, border: `1px solid ${m.c}38`,
//                 }}>{m.badge}</span>
//             </div>


//             {/* Cards grid */}
//             < div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 12 }}>
//                 {
//                     songs.map((s, i) => {
//                         const active = currentIndex === i;
//                         const isHov = Hov === i;
//                         // console.log(s)
//                         return (
//                             <div key={s.id}
//                                 onClick={() => pickTrack(s)}
//                                 onMouseEnter={() => setHov(i)}
//                                 onMouseLeave={() => setHov(null)}
//                                 style={{
//                                     position: "relative", borderRadius: 14, padding: "16px 14px 14px",
//                                     cursor: "pointer", userSelect: "none",
//                                     background: active ? `${m.c}16` : "rgba(255,255,255,.04)",
//                                     border: active ? `2px solid ${m.c}` : "1px solid rgba(255,255,255,.08)",
//                                     boxShadow: active ? `0 0 28px ${m.c}28` : "none",
//                                     transform: isHov ? "scale(1.03)" : "scale(1)",
//                                     transition: "all .18s ease",
//                                 }}>

//                                 {/* Track number / active dot */}
//                                 {i === 0
//                                     ? <div style={{ position: "absolute", top: 10, right: 10, width: 8, height: 8, borderRadius: "50%", background: m.c }} />
//                                     : <span style={{ position: "absolute", top: 10, right: 12, fontSize: 11, color: "rgba(255,255,255,.22)", fontFamily: "monospace" }}>
//                                         {String(i + 1).padStart(2, "0")}
//                                     </span>
//                                 }

//                                 {/*  thumbnail */}
//                                 <div style={{ height: 72, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 34, marginBottom: 12 }}>
//                                     <img style={{ height: 50, width: 50, borderRadius: 5}}
//                                         src={s.posterUrl}
//                                     />
//                                 </div>

//                                 {/* Hover play overlay */}
//                                 <div style={{
//                                     position: "absolute", inset: 0, borderRadius: 14,
//                                     background: "rgba(0,0,0,.38)",
//                                     display: "flex", alignItems: "center", justifyContent: "center",
//                                     opacity: isHov ? 1 : 0, transition: "opacity .15s",
//                                 }}>
//                                     <div style={{ width: 42, height: 42, borderRadius: "50%", background: m.c, display: "flex", alignItems: "center", justifyContent: "center" }}>
//                                         <Icon d={I.play} sz={20} fill={m.dark ? "#111" : "#fff"} />
//                                     </div>
//                                 </div>

//                                 {/* Track info */}
//                                 <p style={{ fontSize: 13, fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", margin: 0 }}>{s.title}</p>
//                                 <p style={{ fontSize: 11, color: "rgba(255,255,255,.38)", marginTop: 3, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{s.album}</p>
//                             </div>
//                         );
//                     })
//                 }
//             </div >
//         </div>
//     )
// }

// export default Tracks

import { useSong } from '../hooks/useSongs'
import Icon from './Icon'

const Tracks = () => {
    const {
        m,
        Hov, setHov,
        cols,
        songs,
        currentIndex,
        playing,
        toggleTrackPlay,
        isLiked,
        deleteSong,
        I
    } = useSong()

    if (songs.length === 0) {
        return (
            <div style={{ flex: 1, overflowY: "auto", padding: "22px 28px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 22 }}>
                    <h1 style={{ fontSize: 28, fontWeight: 300, letterSpacing: "-.5px", margin: 0 }}>{m.title}</h1>
                    <span style={{
                        padding: "4px 12px", borderRadius: 20, fontSize: 10, fontWeight: 700, letterSpacing: ".15em",
                        color: m.c, background: `${m.c}18`, border: `1px solid ${m.c}38`,
                    }}>{m.badge}</span>
                </div>
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: 300,
                    color: "rgba(255,255,255,.3)",
                    fontSize: 14
                }}>
                    No tracks available. Select a mood to load songs.
                </div>
            </div>
        )
    }

    return (
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
                {
                    songs.map((s, i) => {
                        const active = currentIndex === i;
                        const isHov = Hov === i;
                        const posterUrl = s.posterUrl || s.cover || s.image || s.thumbnail;
                        const isPlayingThis = currentIndex === i && playing;
                        return (
                            <div key={s._id || s.id || i}
                                onClick={() => toggleTrackPlay(i)}
                                onMouseEnter={() => setHov(i)}
                                onMouseLeave={() => setHov(null)}
                                style={{
                                    position: "relative",
                                    borderRadius: 14,
                                    padding: 8,
                                    cursor: "pointer",
                                    userSelect: "none",
                                    background: active ? `${m.c}16` : "rgba(255,255,255,.04)",
                                    border: active ? `2px solid ${m.c}` : "1px solid rgba(255,255,255,.08)",
                                    boxShadow: active ? `0 0 28px ${m.c}28` : "none",
                                    transform: isHov ? "scale(1.02)" : "scale(1)",
                                    transition: "all .18s ease",
                                }}>

                                {/* Delete button */}
                                {isHov && (
                                    <button
                                        onClick={(e) => { e.stopPropagation(); deleteSong(s._id || s.id); }}
                                        style={{
                                            position: 'absolute', bottom: 15, right: 8, zIndex: 4,
                                            width: 32, height: 32, borderRadius: '50%',
                                            background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.08)",
                                            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
                                        }}
                                    >
                                        <Icon d={I.trashOutline} sz={12} fill="rgba(255,255,255,.6)" />
                                    </button>
                                )}

                                {/* Track number / index badge */}
                                {i === 0
                                    ? <div style={{ position: "absolute", top: 10, right: 10, width: 8, height: 8, borderRadius: "50%", background: m.c, zIndex: 3 }} />
                                    : <span style={{ position: "absolute", top: 10, right: 12, fontSize: 11, color: "rgba(255,255,255,.22)", fontFamily: "monospace", zIndex: 3 }}>
                                        {String(i + 1).padStart(2, "0")}
                                    </span>
                                }

                                {/* Poster area with aspect ratio */}
                                <div style={{ width: '100%', aspectRatio: '4 / 3', borderRadius: 10, overflow: 'hidden', background: 'rgba(0,0,0,.08)', position: 'relative' }}>
                                    {posterUrl ? (
                                        <img src={posterUrl} alt={s.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} onError={(e) => { e.target.style.display = 'none'; }} />
                                    ) : (
                                        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 34 }}>🎵</div>
                                    )}



                                    {/* Overlay play/pause at center */}
                                    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
                                        <div style={{ opacity: (isHov || isPlayingThis) ? 1 : 0, transition: 'opacity .15s', width: 56, height: 56, borderRadius: '50%', background: m.c, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: isPlayingThis ? `0 6px 30px ${m.c}33` : 'none' }}>
                                            <Icon d={isPlayingThis ? I.pause : I.play} sz={20} fill={m.dark ? '#111' : '#fff'} />
                                        </div>
                                    </div>
                                </div>

                                {/* Track info */}
                                <div style={{ marginTop: 10 }}>
                                    <p style={{ fontSize: 13, fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", margin: 0 }}>{s.title || 'Unknown Title'}</p>
                                    <p style={{ fontSize: 12, color: "rgba(255,255,255,.38)", marginTop: 6, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{s.album || s.artist || ''}</p>
                                </div>

                                {/* Small heart indicator below */}
                                {isLiked && isLiked(s) && (
                                    <div style={{ position: 'absolute', top: 10, left: 10 }}>
                                        <Icon d={I.heart} sz={12} fill="#ef4444" />
                                    </div>
                                )}
                            </div>
                        );
                    })
                }
            </div>
        </div>
    )
}

export default Tracks