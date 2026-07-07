import { getSong } from "../services/song.api";
import { useContext } from "react";
import { songContext } from "../song.context";

export const useSong = () => {
    const context = useContext(songContext);


    const {
            mood,
            setMood,
            songs,
            setSongs,
            MOODS,
            m,
            loading, 
            setLoading,
            currentSong,
            setCurrentSong,
            currentIndex, 
            setCurrentIndex,
            playing, 
            setPlaying,
            pct,
            setPct,
            I,
            WH

    } = context

    // 🎯 Fetch songs by mood
    async function handleGetSong({ mood }) {
        setLoading(true);

        try {
            const data = await getSong({ mood });

            const fetchedSongs = data?.songs ?? [];

            setSongs(fetchedSongs);
            return fetchedSongs;



        } catch (err) {
            console.error(err);
            return [];
        } finally {
            setLoading(false);
        }
    }
   

    const cols = Math.min(4, songs.length);

    return {
        handleGetSong,
        I,
        mood,
        setMood,
        songs,
        setSongs,
        MOODS,
        m,
        loading,
        setLoading,
        currentSong,
        setCurrentSong,
        currentIndex,
        setCurrentIndex,
        playing,
        setPlaying,
        pct,
        setPct,
        cols,
        WH
    };
};


