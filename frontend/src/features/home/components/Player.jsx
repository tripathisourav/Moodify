// import React from 'react'
// import { useSong } from '../hooks/useSongs'
// import CtrlBtn from './CtrlBtn'
// import Icon from './Icon'



// const Player = () => {

//     const {
//         I,
//         mood,
//         setMood,
//         MOODS,
//         m,
//         Hov,
//         setHov,
//         currentSong,
//         setCurrentSong,
//         playing, setPlaying, WH, pct, setPct
//     } = useSong()

//     const fmt = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
//     const TOTAL = 226;


//     return (
//         <div style={{
//             borderTop: "1px solid rgba(255,255,255,.07)",
//             padding: "10px 24px",
//             display: "flex", alignItems: "center", gap: 16,
//             flexShrink: 0,
//             background: "rgba(0,0,0,.5)",
//             backdropFilter: "blur(16px)",
//         }}>

//             {/* Track info */}
//             <div style={{ display: "flex", alignItems: "center", gap: 12, width: 190, flexShrink: 0 }}>
//                 <div style={{ width: 38, height: 38, borderRadius: 10, background: "rgba(255,255,255,.08)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>
//                     {/* {currentSong.posterUrl} */}
//                 </div>
//                 <div style={{ overflow: "hidden" }}>
//                     <p style={{ fontSize: 13, fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", margin: 0 }}>
//                         {/* {currentSong.title} */}
//                     </p>
//                     <p style={{ fontSize: 11, color: "rgba(255,255,255,.38)", marginTop: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
//                         {/* {currentSong.artist} - {currentSong.album}  */}
//                     </p>
//                 </div>
//             </div>

//             {/* Animated waveform */}
//             <div style={{ display: "flex", alignItems: "flex-end", gap: "2px", height: 30, flexShrink: 0 }}>
//                 {WH.map((h, i) => (
//                     <div key={i} className={playing ? "wb" : ""} style={{
//                         width: 2, borderRadius: 1, background: m.c, height: `${h}%`,
//                         animationDuration: `${0.5 + (i % 7) * 0.07}s`,
//                         animationDelay: `${(i % 5) * 0.06}s`,
//                         opacity: playing ? 1 : 0.3,
//                         transition: "opacity .3s",
//                     }} />
//                 ))}
//             </div>

//             {/* Playback controls */}
//             <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
//                 <CtrlBtn d={I.prev} />
//                 <CtrlBtn d={I.replay} />
//                 <button onClick={() => setPlaying(!playing)} style={{
//                     width: 40, height: 40, borderRadius: "50%", border: "none",
//                     background: m.c, display: "flex", alignItems: "center", justifyContent: "center",
//                     transition: "transform .18s", flexShrink: 0,
//                 }}
//                     onMouseEnter={e => e.currentTarget.style.transform = "scale(1.1)"}
//                     onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>
//                     <Icon d={playing ? I.pause : I.play} sz={18} fill={m.dark ? "#111" : "#fff"} />
//                 </button>
//                 <CtrlBtn d={I.forward} />
//                 <CtrlBtn d={I.next} />
//             </div>

//             {/* Progress bar */}
//             <div style={{ display: "flex", alignItems: "center", gap: 8, flex: 1, minWidth: 0 }}>
//                 <span style={{ fontSize: 11, color: "rgba(255,255,255,.4)", width: 28, flexShrink: 0 }}>{fmt(pct / 100 * TOTAL)}</span>
//                 <div
//                     style={{ flex: 1, height: 3, borderRadius: 2, background: "rgba(255,255,255,.1)", cursor: "pointer", position: "relative" }}
//                     onClick={e => {
//                         const r = e.currentTarget.getBoundingClientRect();
//                         setPct(Math.max(0, Math.min(100, (e.clientX - r.left) / r.width * 100)));
//                     }}>
//                     <div style={{ position: "absolute", top: 0, left: 0, height: "100%", borderRadius: 2, background: m.c, width: `${pct}%` }}>
//                         <div style={{ position: "absolute", right: -5, top: "50%", transform: "translateY(-50%)", width: 12, height: 12, borderRadius: "50%", background: "#fff", boxShadow: `0 0 6px ${m.c}` }} />
//                     </div>
//                 </div>
//                 <span style={{ fontSize: 11, color: "rgba(255,255,255,.4)", width: 28, textAlign: "right", flexShrink: 0 }}>3:46</span>
//             </div>

//             {/* Volume + like */}
//             <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
//                 <Icon d={I.vol} sz={16} fill="rgba(255,255,255,.38)" />
//                 <div style={{ width: 56, height: 3, borderRadius: 2, background: "rgba(255,255,255,.1)" }}>
//                     <div style={{ height: "100%", width: "65%", borderRadius: 2, background: "rgba(255,255,255,.45)" }} />
//                 </div>
//                 <Icon d={I.heart} sz={16} fill="rgba(255,255,255,.25)" />
//             </div>
//         </div>
//     )
// }

// export default Player



// {
//     "_id": "69cfc27c1d2a93256459b97c",
//         "url": "https://ik.imagekit.io/yotm0kiwn/cohort-2/moodify/songs/Destiny_Mann_Atkeya_-_PagalNew_mZM0BMNlp.mp3",
//             "posterUrl": "https://ik.imagekit.io/yotm0kiwn/cohort-2/moodify/posters/Destiny_Mann_Atkeya_-_PagalNew_qmOMW6El8.jpeg",
//                 "title": "Destiny Mann Atkeya - PagalNew",
//                     "mood": "sad",
//                         "__v": 0
// },


import React, { useEffect, useState } from 'react'
import { useSong } from '../hooks/useSongs'
import CtrlBtn from './CtrlBtn'
import Icon from './Icon'

const Player = () => {
    const {
        I, m, currentSong, playing, togglePlay,
        playNext, playPrev, WH, pct, seekTo,
        duration, currentTime,
        setPct, setCurrentTime, setDuration,
        volume, setVol,
        toggleLike, isLiked,
        audioRef,
    } = useSong()

    const [showVolSlider, setShowVolSlider] = useState(false);

    // Audio event listeners
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const handleTimeUpdate = () => {
            if (audio.duration) {
                setPct((audio.currentTime / audio.duration) * 100);
                setCurrentTime(audio.currentTime);
            }
        };

        const handleLoadedMetadata = () => {
            setDuration(audio.duration || 0);
        };

        const handleEnded = () => {
            playNext();
        };

        audio.addEventListener('timeupdate', handleTimeUpdate);
        audio.addEventListener('loadedmetadata', handleLoadedMetadata);
        audio.addEventListener('ended', handleEnded);

        return () => {
            audio.removeEventListener('timeupdate', handleTimeUpdate);
            audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
            audio.removeEventListener('ended', handleEnded);
        };
    }, [audioRef.current, currentSong]);

    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
            
            switch(e.code) {
                case 'Space':
                    e.preventDefault();
                    togglePlay();
                    break;
                case 'ArrowRight':
                    if (audioRef.current) {
                        audioRef.current.currentTime = Math.min(
                            audioRef.current.currentTime + 5, 
                            audioRef.current.duration || Infinity
                        );
                    }
                    break;
                case 'ArrowLeft':
                    if (audioRef.current) {
                        audioRef.current.currentTime = Math.max(
                            audioRef.current.currentTime - 5, 
                            0
                        );
                    }
                    break;
            }
        };
        
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [togglePlay, audioRef]);

    const fmt = (s) => {
        if (!s || isNaN(s)) return "0:00";
        const mins = Math.floor(s / 60);
        const secs = Math.floor(s % 60);
        return `${mins}:${String(secs).padStart(2, "0")}`;
    };

    const posterUrl = currentSong?.posterUrl || currentSong?.cover || currentSong?.image;
    const songId = currentSong?._id || currentSong?.id;
    const liked = isLiked(currentSong);

    // Handle like click with backend sync
    const handleLikeClick = async () => {
        if (!songId) return;
        await toggleLike(songId);
    };

    return (
        <div style={{
            borderTop: "1px solid rgba(255,255,255,.07)",
            padding: "10px 24px",
            display: "flex", alignItems: "center", gap: 16,
            flexShrink: 0,
            background: "rgba(0,0,0,.5)",
            backdropFilter: "blur(16px)",
        }}>
            {/* Hidden audio element */}
            <audio ref={audioRef} style={{ display: 'none' }} />

            {/* Track info with heart badge */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, width: 190, flexShrink: 0 }}>
                <div style={{ 
                    width: 38, height: 38, borderRadius: 10, 
                    background: posterUrl ? "transparent" : "rgba(255,255,255,.08)", 
                    display: "flex", alignItems: "center", justifyContent: "center", 
                    fontSize: 20, flexShrink: 0,
                    overflow: "hidden",
                    position: "relative"
                }}>
                    {posterUrl ? (
                        <img 
                            src={posterUrl} 
                            alt="" 
                            style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 10 }}
                            onError={(e) => { e.target.style.display = 'none'; }}
                        />
                    ) : (
                        <span>🎵</span>
                    )}
                    {/* ❤️ Heart badge on player thumbnail */}
                    {liked && (
                        <div style={{
                            position: "absolute",
                            bottom: -2, right: -2,
                            width: 14, height: 14,
                            borderRadius: "50%",
                            background: "#ef4444",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            zIndex: 2,
                        }}>
                            <Icon d={I.heart} sz={8} fill="#fff" />
                        </div>
                    )}
                </div>
                <div style={{ overflow: "hidden" }}>
                    <p style={{ fontSize: 13, fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", margin: 0 }}>
                        {currentSong?.title || "No song selected"}
                    </p>
                    <p style={{ fontSize: 11, color: "rgba(255,255,255,.38)", marginTop: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {currentSong?.artist ? `${currentSong.artist}` : "Select a track"}
                        {currentSong?.album ? ` — ${currentSong.album}` : ""}
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
                <CtrlBtn d={I.prev} onClick={playPrev} />
                <CtrlBtn d={I.replay} onClick={() => {
                    if (audioRef.current) {
                        audioRef.current.currentTime = 0;
                        audioRef.current.play();
                        setPlaying(true);
                    }
                }} />
                <button onClick={togglePlay} style={{
                    width: 40, height: 40, borderRadius: "50%", border: "none",
                    background: m.c, display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "transform .18s", flexShrink: 0,
                    cursor: "pointer"
                }}
                    onMouseEnter={e => e.currentTarget.style.transform = "scale(1.1)"}
                    onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>
                    <Icon d={playing ? I.pause : I.play} sz={18} fill={m.dark ? "#111" : "#fff"} />
                </button>
                <CtrlBtn d={I.forward} onClick={() => {
                    if (audioRef.current) {
                        audioRef.current.currentTime = Math.min(
                            audioRef.current.currentTime + 10, 
                            audioRef.current.duration || Infinity
                        );
                    }
                }} />
                <CtrlBtn d={I.next} onClick={playNext} />
            </div>

            {/* Progress bar */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, flex: 1, minWidth: 0 }}>
                <span style={{ fontSize: 11, color: "rgba(255,255,255,.4)", width: 32, flexShrink: 0 }}>
                    {fmt(currentTime)}
                </span>
                <div
                    style={{ flex: 1, height: 3, borderRadius: 2, background: "rgba(255,255,255,.1)", cursor: "pointer", position: "relative" }}
                    onClick={e => {
                        const r = e.currentTarget.getBoundingClientRect();
                        const newPct = Math.max(0, Math.min(100, (e.clientX - r.left) / r.width * 100));
                        seekTo(newPct);
                    }}>
                    <div style={{ position: "absolute", top: 0, left: 0, height: "100%", borderRadius: 2, background: m.c, width: `${pct}%` }}>
                        <div style={{ position: "absolute", right: -5, top: "50%", transform: "translateY(-50%)", width: 12, height: 12, borderRadius: "50%", background: "#fff", boxShadow: `0 0 6px ${m.c}` }} />
                    </div>
                </div>
                <span style={{ fontSize: 11, color: "rgba(255,255,255,.4)", width: 32, textAlign: "right", flexShrink: 0 }}>
                    {fmt(duration)}
                </span>
            </div>

            {/* Volume + like */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
                {/* Volume Icon */}
                <div 
                    style={{ position: "relative" }}
                    onMouseEnter={() => setShowVolSlider(true)}
                    onMouseLeave={() => setShowVolSlider(false)}
                >
                    <button 
                        onClick={() => setVol(volume === 0 ? 0.65 : 0)}
                        style={{
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            color: "rgba(255,255,255,.4)",
                            display: "flex",
                            padding: "4px",
                            transition: "color .15s",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                        onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,.4)")}
                    >
                        <Icon d={volume === 0 ? I.volMute : I.vol} sz={16} fill="currentColor" />
                    </button>

                    {/* Volume Slider Popup */}
                    {showVolSlider && (
                        <div style={{
                            position: "absolute",
                            bottom: "100%",
                            left: "50%",
                            transform: "translateX(-50%)",
                            marginBottom: 8,
                            padding: "8px 6px",
                            background: "rgba(20,20,30,.95)",
                            borderRadius: 12,
                            border: "1px solid rgba(255,255,255,.1)",
                            boxShadow: "0 4px 20px rgba(0,0,0,.5)",
                            zIndex: 100,
                        }}>
                            <div 
                                style={{ 
                                    width: 4, 
                                    height: 80, 
                                    borderRadius: 2, 
                                    background: "rgba(255,255,255,.1)",
                                    position: "relative",
                                    cursor: "pointer",
                                }}
                                onClick={e => {
                                    const r = e.currentTarget.getBoundingClientRect();
                                    const clickY = e.clientY - r.top;
                                    const newVol = 1 - (clickY / r.height);
                                    setVol(newVol);
                                }}
                            >
                                <div style={{
                                    position: "absolute",
                                    bottom: 0,
                                    left: 0,
                                    width: "100%",
                                    height: `${volume * 100}%`,
                                    borderRadius: 2,
                                    background: m.c,
                                }}>
                                    <div style={{
                                        position: "absolute",
                                        top: -4,
                                        left: "50%",
                                        transform: "translateX(-50%)",
                                        width: 10,
                                        height: 10,
                                        borderRadius: "50%",
                                        background: "#fff",
                                        boxShadow: `0 0 6px ${m.c}`,
                                    }} />
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Volume mini bar */}
                <div 
                    style={{ width: 56, height: 3, borderRadius: 2, background: "rgba(255,255,255,.1)", cursor: "pointer" }}
                    onClick={e => {
                        const r = e.currentTarget.getBoundingClientRect();
                        const newVol = (e.clientX - r.left) / r.width;
                        setVol(newVol);
                    }}
                >
                    <div style={{ height: "100%", width: `${volume * 100}%`, borderRadius: 2, background: "rgba(255,255,255,.45)", position: "relative" }}>
                        <div style={{
                            position: "absolute",
                            right: -3,
                            top: "50%",
                            transform: "translateY(-50%)",
                            width: 8,
                            height: 8,
                            borderRadius: "50%",
                            background: "#fff",
                            opacity: 0.6,
                        }} />
                    </div>
                </div>

                {/* ❤️ Heart/Like Button - Click pe backend update */}
                <button
                    onClick={handleLikeClick}
                    disabled={!songId}
                    style={{
                        background: "none",
                        border: "none",
                        cursor: songId ? "pointer" : "default",
                        display: "flex",
                        padding: "4px",
                        transition: "transform .15s, opacity .15s",
                        opacity: songId ? 1 : 0.3,
                    }}
                    onMouseEnter={e => { if (songId) e.currentTarget.style.transform = "scale(1.2)" }}
                    onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)" }}
                >
                    <Icon 
                        d={liked ? I.heart : I.heartOutline} 
                        sz={18} 
                        fill={liked ? "#ef4444" : "rgba(255,255,255,.38)"} 
                    />
                </button>
            </div>
        </div>
    )
}

export default Player
