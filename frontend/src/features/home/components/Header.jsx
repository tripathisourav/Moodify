// import React, { useContext } from 'react'
// import { useSong } from '../hooks/useSongs'
// import Icon from './Icon'


// const Header = () => {

//     const {
//         I,
//         mood,
//         setMood,
//         MOODS,
//         m,
//     } = useSong()


//     return (
//         <div style={{
//             display: "flex", alignItems: "center", justifyContent: "space-between",
//             padding: "10px 24px", borderBottom: "1px solid rgba(255,255,255,.07)", flexShrink: 0,
//         }}>

//             {/* Logo */}
//             <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
//                 <div style={{ width: 28, height: 28, borderRadius: "50%", border: "2px solid rgba(255,255,255,.7)", display: "flex", alignItems: "center", justifyContent: "center" }}>
//                     <Icon d={I.play} sz={13} fill="#fff" />
//                 </div>
//                 <span style={{ fontWeight: 600, fontSize: 16, letterSpacing: "-.2px" }}>Moodify</span>
//                 <div style={{ width: 8, height: 8, borderRadius: "50%", background: m.c, boxShadow: `0 0 8px ${m.c}` }} />
//             </div>

//             {/* Nav */}
//             <div style={{ display: "flex", gap: 4 }}>
//                 {Object.entries(MOODS).map(([k, cfg]) => (
//                     <button key={k} onClick={() => setMood(k)}
//                         style={{
//                             display: "flex", alignItems: "center", gap: 6,
//                             padding: "6px 16px", borderRadius: 20,
//                             fontSize: 13, fontWeight: 500, transition: "all .2s",
//                             background: mood === k ? `${m.c}18` : "transparent",
//                             border: mood === k ? `1px solid ${m.c}` : "1px solid transparent",
//                             color: mood === k ? m.c : "rgba(255,255,255,.45)",
//                         }}>
//                         <span style={{ width: 6, height: 6, borderRadius: "50%", display: "block", flexShrink: 0, background: mood === k ? m.c : "rgba(255,255,255,.35)" }} />
//                         {cfg.label}
//                     </button>
//                 ))}
//             </div>
//         </div>
//     )
// }

// export default Header

import React from 'react'
import { useSong } from '../hooks/useSongs'
import Icon from './Icon'

const Header = () => {
    const { I, mood, setMood, MOODS, m } = useSong()

    return (
        <div style={{
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

            {/* Nav */}
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
    )
}

export default Header