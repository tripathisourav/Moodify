// import { getSong } from "../services/song.api";
// import { useContext } from "react";
// import { songContext } from "../song.context";

// export const useSong = () => {
//     const context = useContext(songContext);


//     const {
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

//     } = context

//     // 🎯 Fetch songs by mood
//     async function handleGetSong({ mood }) {
//         setLoading(true);

//         try {
//             const data = await getSong({ mood });

//             const fetchedSongs = data?.songs ?? [];

//             setSongs(fetchedSongs);
//             return fetchedSongs;



//         } catch (err) {
//             console.error(err);
//             return [];
//         } finally {
//             setLoading(false);
//         }
//     }
   

//     const cols = Math.min(4, songs.length);

//     return {
//         handleGetSong,
//         I,
//         mood,
//         setMood,
//         songs,
//         setSongs,
//         MOODS,
//         m,
//         loading,
//         setLoading,
//         currentSong,
//         setCurrentSong,
//         currentIndex,
//         setCurrentIndex,
//         playing,
//         setPlaying,
//         pct,
//         setPct,
//         cols,
//         WH
//     };
// };

import { getSong, toggleLikeSong } from "../services/song.api";
import { useContext } from "react";
import { songContext } from "../song.context";

export const useSong = () => {
    const context = useContext(songContext);

    const {
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
    } = context;

    async function handleGetSong({ mood }) {
        setLoading(true);
        try {
            const data = await getSong({ mood });
            const fetchedSongs = data?.songs ?? [];
            setSongs(fetchedSongs);
            
            if (fetchedSongs.length > 0) {
                setCurrentIndex(0);
                setCurrentSong(fetchedSongs[0]);
                const audioUrl = fetchedSongs[0]?.url || fetchedSongs[0]?.audioUrl || fetchedSongs[0]?.src;
                if (audioRef.current && audioUrl) {
                    audioRef.current.src = audioUrl;
                    audioRef.current.volume = volume;
                    audioRef.current.play().catch(err => console.log("Autoplay blocked:", err));
                    setPlaying(true);
                }
            } else {
                setCurrentIndex(0);
                setCurrentSong(null);
                setPlaying(false);
            }
            return fetchedSongs;
        } catch (err) {
            console.error(err);
            return [];
        } finally {
            setLoading(false);
        }
    }

    // 🎯 Play/Pause toggle for track click
    function toggleTrackPlay(index) {
        // If clicking the currently playing song
        if (currentIndex === index && currentSong) {
            togglePlay(); // Pause/Resume
            return;
        }
        // Otherwise play new track
        pickTrack(index);
    }

    function pickTrack(index) {
        if (!songs[index]) return;
        setCurrentIndex(index);
        setCurrentSong(songs[index]);
        setPlaying(true);
        const audioUrl = songs[index]?.url || songs[index]?.audioUrl || songs[index]?.src;
        if (audioRef.current && audioUrl) {
            audioRef.current.src = audioUrl;
            audioRef.current.volume = volume;
            audioRef.current.play().catch(err => console.log("Playback error:", err));
        }
    }

    function togglePlay() {
        if (!audioRef.current || !currentSong) return;
        if (playing) {
            audioRef.current.pause();
            setPlaying(false);
        } else {
            audioRef.current.play().catch(err => console.log("Playback error:", err));
            setPlaying(true);
        }
    }

    function playNext() {
        if (songs.length === 0) return;
        const nextIndex = (currentIndex + 1) % songs.length;
        pickTrack(nextIndex);
    }

    function playPrev() {
        if (songs.length === 0) return;
        const prevIndex = (currentIndex - 1 + songs.length) % songs.length;
        pickTrack(prevIndex);
    }

    function seekTo(percentage) {
        if (!audioRef.current || !audioRef.current.duration) return;
        const newTime = (percentage / 100) * audioRef.current.duration;
        audioRef.current.currentTime = newTime;
        setPct(percentage);
    }

    function setVol(newVol) {
        const clamped = Math.max(0, Math.min(1, newVol));
        setVolume(clamped);
        if (audioRef.current) {
            audioRef.current.volume = clamped;
        }
    }

    // 🎯 Toggle like via backend
    async function toggleLike(songId) {
        try {
            const data = await toggleLikeSong(songId);
            if (data.success) {
                // Update local state to reflect backend change
                setSongs(prev => prev.map(song => 
                    song._id === songId || song.id === songId 
                        ? { ...song, like: data.song.like }
                        : song
                ));
                
                // If current song is being liked, update it too
                if (currentSong && (currentSong._id === songId || currentSong.id === songId)) {
                    setCurrentSong(prev => ({ ...prev, like: data.song.like }));
                }
            }
            return data;
        } catch (err) {
            console.error("Like toggle failed:", err);
            return null;
        }
    }

    // 🎯 Check if song is liked (from backend data)
    function isLiked(song) {
        if (!song) return false;
        return song.like === "liked";
    }

    const cols = songs.length > 0 ? Math.min(4, songs.length) : 1;

    return {
        handleGetSong,
        pickTrack,
        toggleTrackPlay,  // NEW: for play/pause on track click
        togglePlay,
        playNext,
        playPrev,
        seekTo,
        setVol,
        toggleLike,
        isLiked,
        I,
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
        volume,
        cols,
        WH,
        audioRef,
    };
};