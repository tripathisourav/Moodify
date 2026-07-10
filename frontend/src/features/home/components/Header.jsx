import { useState } from 'react'
import { useSong } from '../hooks/useSongs'
import Icon from './Icon'
import UploadModal from './UploadModal'

const Header = () => {

    const {
        I,
        mood,
        setMood,
        MOODS,
        m,
        handleGetSong,
    } = useSong()

    const [isUploadOpen, setIsUploadOpen] = useState(false)

    return (
        <>
            <div style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "10px 24px", borderBottom: "1px solid rgba(255,255,255,.07)", flexShrink: 0,
            }}>

                {/* Left Section - Logo and Upload Button */}
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    {/* Logo */}
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{ width: 28, height: 28, borderRadius: "50%", border: "2px solid rgba(255,255,255,.7)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Icon d={I.play} sz={13} fill="#fff" />
                        </div>
                        <span style={{ fontWeight: 600, fontSize: 16, letterSpacing: "-.2px" }}>Moodify</span>
                        <div style={{ width: 8, height: 8, borderRadius: "50%", background: m.c, boxShadow: `0 0 8px ${m.c}` }} />
                    </div>

                    {/* Upload Button */}
                    <button
                        onClick={() => setIsUploadOpen(true)}
                        style={{
                            display: "flex", alignItems: "center", gap: 6,
                            padding: "6px 16px", borderRadius: 20,
                            fontSize: 13, fontWeight: 500, transition: "all .2s",
                            background: `${m.c}18`,
                            border: `1px solid ${m.c}`,
                            color: m.c,
                            cursor: "pointer",
                            position: "relative",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = `${m.c}28`
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = `${m.c}18`
                        }}
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 5v14M5 12h14" />
                        </svg>
                        Upload
                    </button>
                </div>

                {/* Center Section - Mood Navigation */}
                <div style={{ display: "flex", gap: 4 }}>
                    {Object.entries(MOODS).map(([k, cfg]) => (
                        <button key={k} onClick={() => setMood(k)}
                            style={{
                                display: "flex", alignItems: "center", gap: 6,
                                padding: "6px 16px", borderRadius: 20,
                                fontSize: 13, fontWeight: 500, transition: "all .2s",
                                background: mood === k ? `${m.c}18` : "transparent",
                                border: mood === k ? `1px solid ${m.c}` : "1px solid transparent",
                                color: mood === k ? m.c : "rgba(255,255,255,.45)",
                                cursor: "pointer",
                            }}>
                            <span style={{ width: 6, height: 6, borderRadius: "50%", display: "block", flexShrink: 0, background: mood === k ? m.c : "rgba(255,255,255,.35)" }} />
                            {cfg.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Upload Modal */}
            <UploadModal
                isOpen={isUploadOpen}
                onClose={() => setIsUploadOpen(false)}
                currentMood={mood}
                MOODS={MOODS}
                m={m}
                I={I}
                onUploadSuccess={() => handleGetSong({ mood })}
            />
        </>
    )
}

export default Header