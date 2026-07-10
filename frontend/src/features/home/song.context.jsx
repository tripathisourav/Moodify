// import { createContext, useState } from "react";

// export const songContext = createContext();

// const SongProvider = ({ children }) => {


//     const MOODS = {
//         neutral: {
//             label: "Home", title: "All Tracks", badge: "NEUTRAL",
//             emoji: null, name: "Neutral", sub: "All songs loaded",
//             c: "#8B5CF6", dark: false,
//             bg: "radial-gradient(ellipse at 72% 22%,rgba(139,92,246,.24) 0%,transparent 52%),radial-gradient(ellipse at 18% 78%,rgba(88,28,135,.18) 0%,transparent 48%),#08080e",
//         },
//         happy: {
//             label: "Happy", title: "Happy Vibes", badge: "HAPPY",
//             emoji: "😄", name: "Happy", sub: "Vibes curated for you",
//             c: "#F59E0B", dark: true,
//             bg: "radial-gradient(ellipse at 65% 55%,rgba(180,83,9,.3) 0%,transparent 55%),radial-gradient(ellipse at 18% 82%,rgba(120,53,15,.2) 0%,transparent 50%),#08080e",
//         },
//         sad: {
//             label: "Sad", title: "Melancholy Mix", badge: "SAD",
//             emoji: "😢", name: "Sad", sub: "Songs that understand you",
//             c: "#3B82F6", dark: false,
//             bg: "radial-gradient(ellipse at 65% 25%,rgba(37,99,235,.2) 0%,transparent 52%),radial-gradient(ellipse at 18% 78%,rgba(30,58,138,.16) 0%,transparent 50%),#08080e",
//         },
//         surprised: {
//             label: "Surprised", title: "Surprise Picks", badge: "SURPRISED",
//             emoji: "😮", name: "Surprised", sub: "Something unexpected",
//             c: "#14B8A6", dark: true,
//             bg: "radial-gradient(ellipse at 65% 55%,rgba(20,184,166,.18) 0%,transparent 52%),radial-gradient(ellipse at 18% 82%,rgba(13,148,136,.14) 0%,transparent 50%),#08080e",
//         },
//     };

//     // Stable pre-computed waveform bar heights
//     const WH = [45, 72, 38, 85, 60, 92, 41, 78, 55, 88, 43, 70, 95, 52, 80, 37, 65, 90, 48, 73, 58, 87, 42, 76, 61, 89, 44, 71];



//     const [mood, setMood] = useState('neutral')
//     const [songs, setSongs] = useState([])
//     const [loading, setLoading] = useState(false)
//     const [currentSong, setCurrentSong] = useState(null);
//     const [currentIndex, setCurrentIndex] = useState(0);
//     const [Hov, setHov] = useState(null);
//     const [playing, setPlaying] = useState(true);
//     const [pct, setPct] = useState(55);

//     const m = MOODS[mood]


//     // SVG icons
//     const I = {
//         play: "M8 5v14l11-7z",
//         pause: "M6 19h4V5H6v14zm8-14v14h4V5h-4z",
//         prev: "M6 6h2v12H6zm3.5 6 8.5 6V6z",
//         next: "M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z",
//         replay: "M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z",
//         forward: "M18 13c0 3.31-2.69 6-6 6s-6-2.69-6-6 2.69-6 6-6v4l5-5-5-5v4c-4.42 0-8 3.58-8 8s3.58 8 8 8 8-3.58 8-8h-2z",
//         cam: "M17 10.5V7a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-3.5l4 4v-11l-4 4z",
//         vol: "M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02z",
//         heart: "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z",
//     };



//     return (
//         <songContext.Provider value={{
//             mood,
//             setMood,
//             songs,
//             setSongs,
//             MOODS,
//             m,
//             loading,
//             setLoading,
//             currentSong,
//             setCurrentSong,
//             currentIndex,
//             setCurrentIndex,
//             playing,
//             setPlaying,
//             pct,
//             setPct,
//             I,
//             WH
//         }}>
//             {children}
//         </songContext.Provider>
//     );
// };

// export default SongProvider;


import { createContext, useState, useRef } from "react";

export const songContext = createContext();

const SongProvider = ({ children }) => {
    const MOODS = {
        neutral: {
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

    const WH = [45, 72, 38, 85, 60, 92, 41, 78, 55, 88, 43, 70, 95, 52, 80, 37, 65, 90, 48, 73, 58, 87, 42, 76, 61, 89, 44, 71];

    const [mood, setMood] = useState('neutral')
    const [songs, setSongs] = useState([])
    const [loading, setLoading] = useState(false)
    const [currentSong, setCurrentSong] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [Hov, setHov] = useState(null);
    const [playing, setPlaying] = useState(false);
    const [pct, setPct] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(0.65);

    const audioRef = useRef(null);
    const m = MOODS[mood]

    const I = {
        play: "M8 5v14l11-7z",
        pause: "M6 19h4V5H6v14zm8-14v14h4V5h-4z",
        prev: "M6 6h2v12H6zm3.5 6 8.5 6V6z",
        next: "M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z",
        replay: "M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z",
        forward: "M18 13c0 3.31-2.69 6-6 6s-6-2.69-6-6 2.69-6 6-6v4l5-5-5-5v4c-4.42 0-8 3.58-8 8s3.58 8 8 8 8-3.58 8-8h-2z",
        cam: "M17 10.5V7a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-3.5l4 4v-11l-4 4z",
        vol: "M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02z",
        volMute: "M16.5 12A4.5 4.5 0 0 0 14 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02z M19.07 4.93L17.66 6.34C19.11 7.78 20 9.65 20 12s-.89 4.22-2.34 5.66l1.41 1.41C21.1 17.41 22 14.76 22 12s-.9-5.41-2.93-7.07z",
        heart: "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z",
        heartOutline: "M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z",
        trash: "M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-9l-1 1H5v2h14V4z",
        trashOutline: "M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2-2h8V7H8v10zM19 4h-3.5l-1-1h-9l-1 1H5v2h14V4z",
    };

    return (
        <songContext.Provider value={{
            mood, setMood,
            songs, setSongs,
            MOODS, m,
            loading, setLoading,
            currentSong, setCurrentSong,
            currentIndex, setCurrentIndex,
            Hov, setHov,
            playing, setPlaying,
            pct, setPct,
            currentTime, setCurrentTime,
            duration, setDuration,
            volume, setVolume,
            I, WH,
            audioRef,
        }}>
            {children}
        </songContext.Provider>
    );
};

export default SongProvider;