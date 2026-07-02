import { getSong } from "../services/song.api";
import { useContext } from "react";
import { songContext } from "../song.context";

export const useSong = () => {
    const context = useContext(songContext);

    const {
        songs,
        setSongs,
        currentSong,
        currentIndex,
        loading,
        setLoading,

        // 🔥 NEW FROM CONTEXT
        playSong,
        likedSongs,
        toggleLike,
        recentSongs,
        isShuffle,
        setIsShuffle,
        isLoop,
        setIsLoop
    } = context;

    // 🎯 Fetch songs by mood
    async function handleGetSong({ mood }) {
        setLoading(true);

        try {
            const data = await getSong({ mood });

            setSongs(data.songs);

            // ✅ ALWAYS USE playSong (not setters)
            if (data.songs.length > 0) {
                playSong(data.songs[0], 0);
            }

        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    return {
        // state
        songs,
        currentSong,
        currentIndex,
        loading,
        likedSongs,
        recentSongs,
        isShuffle,
        isLoop,

        // actions
        handleGetSong,
        playSong,
        toggleLike,
        setIsShuffle,
        setIsLoop
    };
};