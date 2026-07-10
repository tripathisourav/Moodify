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

import React from 'react'
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
        toggleTrackPlay,  // NEW: replaces pickTrack
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
            <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 16 }}>
                {songs.map((s, i) => {
                    const active = currentIndex === i;
                    const isHov = Hov === i;
                    const liked = isLiked(s);
                    const isPlayingThis = active && playing;
                    const posterUrl = s.posterUrl || s.cover || s.image || s.thumbnail;

                    // compute a compact artist label (first artist + ... if multiple)
                    const displayArtist = (() => {
                        const a = s.artist || s.artists || s.album || "";
                        if (!a) return "Unknown Artist";
                        const hasMultiple = /,|&|\band\b/i.test(a);
                        const first = a.split(/,|&|\band\b/i)[0].trim();
                        return first + (hasMultiple ? '...' : '');
                    })();

                    return (
                        <div key={s._id || s.id || i}
                            onClick={() => toggleTrackPlay(i)}  // Play/Pause toggle
                            onMouseEnter={() => setHov(i)}
                            onMouseLeave={() => setHov(null)}
                                style={{
                                position: "relative",
                                borderRadius: 14,
                                    padding: "12px",
                                cursor: "pointer",
                                userSelect: "none",
                                background: active ? `${m.c}16` : "rgba(255,255,255,.04)",
                                border: active ? `2px solid ${m.c}` : "1px solid rgba(255,255,255,.08)",
                                boxShadow: active ? `0 0 28px ${m.c}28` : "none",
                                transform: isHov ? "scale(1.03)" : "scale(1)",
                                transition: "all .18s ease",
                                    display: "flex",
                                    flexDirection: "column",
                                    height: 420,
                                    minHeight: 420,
                                    maxHeight: 420,
                                    overflow: 'hidden'
                            }}>

                            {/* Active dot / Track number */}
                            {active
                                ? <div style={{ position: "absolute", top: 10, right: 10, width: 8, height: 8, borderRadius: "50%", background: m.c, boxShadow: `0 0 8px ${m.c}` }} />
                                : <span style={{ position: "absolute", top: 10, right: 12, fontSize: 11, color: "rgba(255,255,255,.22)", fontFamily: "monospace" }}>
                                    {String(i + 1).padStart(2, "0")}
                                </span>
                            }

                            {/* Delete button on hover - top right */}
                            {isHov && (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        deleteSong(s._id || s.id);
                                    }}
                                    style={{
                                        position: "absolute",
                                        bottom: 22,
                                        right: 10,
                                        width: 28,
                                        height: 28,
                                        borderRadius: "50%",
                                        background: "rgba(255,255,255,.1)",
                                        border: "1px solid rgba(255,255,255,.2)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        cursor: "pointer",
                                        transition: "all .15s",
                                        zIndex: 10,
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = "rgba(255,255,255,.15)";
                                        e.currentTarget.style.border = "1px solid rgba(255,255,255,.3)";
                                        e.currentTarget.style.transform = "scale(1.1)";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = "rgba(255,255,255,.1)";
                                        e.currentTarget.style.border = "1px solid rgba(255,255,255,.2)";
                                        e.currentTarget.style.transform = "scale(1)";
                                    }}
                                    title="Delete song"
                                >
                                    <Icon d={I.trashOutline} sz={14} fill="rgba(255,255,255,.5)" />
                                </button>
                            )}

                            {/* Thumbnail with heart badge */}
                            <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 34, marginBottom: 8, minHeight: 0 }}>
                                {posterUrl ? (
                                    <img
                                        style={{ height: "100%", width: "100%", borderRadius: 10, objectFit: "cover", display: 'block' }}
                                        src={posterUrl}
                                        alt={s.title}
                                        onError={(e) => { e.target.style.display = 'none'; }}
                                    />
                                ) : (
                                    <div style={{ fontSize: 40 }}>🎵</div>
                                )}
                            </div>

                            {/* Hover play/pause overlay */}
                            <div style={{
                                position: "absolute", inset: 0, borderRadius: 14,
                                background: "rgba(0,0,0,.38)",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                opacity: isHov ? 1 : 0, transition: "opacity .15s",
                            }}>
                                <div style={{
                                    width: 42, height: 42, borderRadius: "50%",
                                    background: m.c, display: "flex",
                                    alignItems: "center", justifyContent: "center"
                                }}>
                                    <Icon
                                        d={isPlayingThis ? I.pause : I.play}
                                        sz={20}
                                        fill={m.dark ? "#111" : "#fff"}
                                    />
                                </div>
                            </div>

                            {/* Track info */}
                            <div style={{ display: "flex", flexDirection: 'column', gap: 6, paddingTop: 8 }}>
                                <div style={{ overflow: "hidden", flex: 1, minHeight: 0 }}>
                                    <p style={{ fontSize: 14, fontWeight: 700, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", margin: 0, lineHeight: 1.2 }}>
                                        {s.title || "Unknown Title"}
                                    </p>
                                    <p style={{ fontSize: 12, color: "rgba(255,255,255,.38)", marginTop: 6, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", lineHeight: 1.2 }}>
                                        {displayArtist}
                                    </p>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                                    {liked && (
                                        <div style={{ marginLeft: 4, flexShrink: 0 }}>
                                            <Icon d={I.heart} sz={12} fill="#ef4444" />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default Tracks