import React, { useEffect } from 'react'
import Header from '../components/Header'
import Tracks from '../components/Tracks'
import MoodPanel from '../components/MoodPanel'
import Player from '../components/Player'
import { useSong } from '../hooks/useSongs'

const Home = () => {

  const {
    handleGetSong,
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
    setPct
  } = useSong()

  

  useEffect(() => {
    const loadSongs = async () => {
      const fetchedSongs = await handleGetSong({ mood });

      if (fetchedSongs.length > 0) {
        setCurrentSong(fetchedSongs[0]);
        setSongs(fetchedSongs)
      }

      setPct(0);
      setPlaying(true);
    };

    loadSongs();
  }, [mood]);



  // Progress ticker
  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => setPct(p => p >= 100 ? 0 : p + 100 / TOTAL), 1000);
    return () => clearInterval(id);
  }, [playing]);

  const pickTrack = (t) => { setTrack(t); setPct(0); setPlaying(true); };

  const TOTAL = 226




  return (

    <div style={{
      fontFamily: "Inter, system-ui, sans-serif",
      color: "#fff",
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
      background: m.bg,
      transition: "background .5s ease",
    }}>


      {/* ── GLOBAL STYLES ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        * { box-sizing: border-box; }
        button { font-family: inherit; cursor: pointer; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,.12); border-radius: 3px; }

        @keyframes wave {
          0%, 100% { transform: scaleY(0.2); }
          50%       { transform: scaleY(1);   }
        }
        .wb { transform-origin: bottom; animation: wave ease-in-out infinite; }

        @keyframes ring-pulse {
          0%, 100% { opacity: 0.55; }
          50%       { opacity: 1;    }
        }
        .ring-pulse { animation: ring-pulse 2.5s ease-in-out infinite; }
      `}</style>


      {/* Header */}

      <Header />


      {/* Body */}

      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>

        {/* Track grid */}
        <Tracks />

        {/* Mood Panel */}
        <MoodPanel />

      </div>


      {/* PlayerBar */}

      <Player />

    </div>
  )
}

export default Home
