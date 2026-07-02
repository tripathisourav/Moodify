import { createContext, useState } from "react";

export const songContext = createContext();

const SongProvider = ({ children }) => {

    // 🎵 Playlist
    const [songs, setSongs] = useState([]);

    // ▶ Current playing
    const [currentSong, setCurrentSong] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    // ❤️ Liked songs
    const [likedSongs, setLikedSongs] = useState([]);

    // 🕘 Recently played
    const [recentSongs, setRecentSongs] = useState([]);

    // 🔁 Player modes
    const [isShuffle, setIsShuffle] = useState(false);
    const [isLoop, setIsLoop] = useState(false);

    // ⏳ Loading
    const [loading, setLoading] = useState(false);

    // 🎯 CENTRAL PLAY FUNCTION (VERY IMPORTANT)
    const playSong = (song, index) => {
        setCurrentSong(song);
        setCurrentIndex(index);

        // 🕘 update recently played (unique + max 10)
        setRecentSongs(prev => {
            const filtered = prev.filter(s => s._id !== song._id);
            return [song, ...filtered].slice(0, 10);
        });
    };

    // ❤️ Like / Unlike
    const toggleLike = (song) => {
        setLikedSongs(prev =>
            prev.find(s => s._id === song._id)
                ? prev.filter(s => s._id !== song._id)
                : [...prev, song]
        );
    };

    return (
        <songContext.Provider value={{

            // state
            songs,
            currentSong,
            currentIndex,
            likedSongs,
            recentSongs,
            loading,
            isShuffle,
            isLoop,

            // setters
            setSongs,
            setLoading,
            setIsShuffle,
            setIsLoop,

            // actions
            playSong,
            toggleLike

        }}>
            {children}
        </songContext.Provider>
    );
};

export default SongProvider;