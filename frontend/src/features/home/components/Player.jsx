import React, { useRef, useState, useEffect } from 'react'
import { useSong } from '../hooks/useSongs'
import './player.scss'

const SPEED_OPTIONS = [0.5, 0.75, 1, 1.25, 1.5, 2]

const formatTime = (seconds) => {
    if (isNaN(seconds)) return '0:00'
    const m = Math.floor(seconds / 60)
    const s = Math.floor(seconds % 60).toString().padStart(2, '0')
    return `${m}:${s}`
}


const Player = ({ song }) => {
    const {
        songs,
        currentIndex,
        playSong,
        isShuffle,
        setIsShuffle,
        isLoop,
        setIsLoop,
        likedSongs,
        toggleLike
    } = useSong()

    const audioRef = useRef(null)
    const progressRef = useRef(null)

    const [isPlaying, setIsPlaying] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)
    const [speed, setSpeed] = useState(1)
    const [volume, setVolume] = useState(0.85)
    const [showSpeed, setShowSpeed] = useState(false)
    const [isMuted, setIsMuted] = useState(false)

    const isFavorite = likedSongs.find(s => s._id === song?._id)

    useEffect(() => {
        if (!audioRef.current) return
        audioRef.current.volume = isMuted ? 0 : volume
        audioRef.current.playbackRate = speed
    }, [volume, speed, isMuted])

    useEffect(() => {
        if (!audioRef.current || !song?.url) return

        audioRef.current.load()
        audioRef.current.play()

        setIsPlaying(true)
        setCurrentTime(0)
        setDuration(0)
    }, [song?.url])



    const togglePlay = () => {
        const audio = audioRef.current
        if (!audio) return
        if (isPlaying) {
            audio.pause()
        } else {
            audio.play()
        }
        setIsPlaying((prev) => !prev)
    }

    const skip = (seconds) => {
        const audio = audioRef.current
        if (!audio) return
        audio.currentTime = Math.min(
            Math.max(audio.currentTime + seconds, 0),
            duration
        )
    }

    const handleTimeUpdate = () => {
        if (!audioRef.current) return
        setCurrentTime(audioRef.current.currentTime)
    }

    const handleLoadedMetadata = () => {
        if (!audioRef.current) return
        setDuration(audioRef.current.duration)
    }

    const handleProgressClick = (event) => {
        const bar = progressRef.current
        if (!bar || !audioRef.current || !duration) return
        const rect = bar.getBoundingClientRect()
        const ratio = Math.min(Math.max((event.clientX - rect.left) / rect.width, 0), 1)
        const newTime = ratio * duration
        audioRef.current.currentTime = newTime
        setCurrentTime(newTime)
    }

    const handleSpeedChange = (value) => {
        setSpeed(value)
        if (audioRef.current) audioRef.current.playbackRate = value
        setShowSpeed(false)
    }

    const handleVolume = (event) => {
        const val = parseFloat(event.target.value)
        setVolume(val)
        setIsMuted(val === 0)
        if (audioRef.current) audioRef.current.volume = val
    }

    const toggleMute = () => {
        setIsMuted((prev) => {
            const nextMuted = !prev
            if (audioRef.current) {
                audioRef.current.volume = nextMuted ? 0 : volume || 0.5
            }
            return nextMuted
        })
    }

    const handleSongEnd = () => {

        if (isLoop) {
            audioRef.current.currentTime = 0
            audioRef.current.play()
            return
        }

        if (isShuffle) {
            const randomIndex = Math.floor(Math.random() * songs.length)
            playSong(songs[randomIndex], randomIndex)
            return
        }

        if (currentIndex < songs.length - 1) {
            playSong(songs[currentIndex + 1], currentIndex + 1)
        }
    }

    const toggleShuffle = () => {
        setIsShuffle((prev) => !prev)
    }


    const progress = duration ? (currentTime / duration) * 100 : 0
    const canGoPrevious = currentIndex > 0
    const canGoNext = currentIndex < songs.length - 1

    if (!song) return null

    return (
        <div className="player">
            <audio
                ref={audioRef}
                src={song.url}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={handleSongEnd}
            />


            <div className="player__top">

                {/* LEFT SIDE */}
                <div className="player__info">

                    {/* Poster */}
                    <div className="player__poster-wrap">
                        <img
                            className="player__poster"
                            src={song.posterUrl}
                            alt={song.title}
                        />
                    </div>

                    {/* Song Info */}
                    <div className="player__meta">
                        <p className="player__label">Now playing</p>
                        <h2 className="player__title">{song.title}</h2>
                        <p className="player__artist">
                            {song.artist || song.mood || 'Unknown Artist'}
                        </p>

                        {/* Actions */}
                        <div className="player__actions">
                            <button onClick={() => toggleLike(song)}>
                                {isFavorite ? '♥ Liked' : '♡ Favorite'}
                            </button>

                            <span>{song.album || 'Single'}</span>
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDE */}
                <div className="player__modes">
                    <button
                        className={`control-btn ${isShuffle ? "active" : ""}`}
                        onClick={toggleShuffle}
                    >
                        🔀
                    </button>

                    <button
                        className={`control-btn ${isLoop ? "active" : ""}`}
                        onClick={() => setIsLoop(!isLoop)}
                    >
                        🔁
                    </button>
                </div>

            </div>

            <div
                className="player__progress-wrap"

            >
                <div className="player__time">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                </div>
                <div
                    className="player__progress"
                    ref={progressRef}
                    onClick={handleProgressClick}

                >
                    <div
                        className="player__progress-fill"
                        style={{ width: `${progress}%` }}
                    />

                    <div
                        className="player__progress-thumb"
                        style={{ left: `${progress}%` }}
                    />
                </div>
            </div>


            <div className="waveform">
                {[...Array(20)].map((_, i) => (
                    <span key={i}></span>
                ))}
            </div>

            <div className="player__controls">

                {/* LEFT CONTROLS */}
                <div className="player__controls-left">

                    <button
                        className="control-btn"
                        disabled={!canGoPrevious}
                        onClick={() => {
                            if (!canGoPrevious) return;
                            playSong(songs[currentIndex - 1], currentIndex - 1);
                        }}
                    >
                        ⏮
                    </button>

                    <button
                        className="control-btn"
                        onClick={() => skip(-10)}
                    >
                        « 10s
                    </button>

                    <button className="control-btn control-btn--play" onClick={togglePlay}>
                        {isPlaying ? '❚❚' : '▶'}
                    </button>

                    <button
                        className="control-btn"
                        onClick={() => skip(10)}
                    >
                        10s »
                    </button>

                    <button
                        className="control-btn"
                        disabled={!canGoNext}
                        onClick={() => {
                            if (!canGoNext) return;
                            playSong(songs[currentIndex + 1], currentIndex + 1);
                        }}
                    >
                        ⏭
                    </button>

                </div>

                {/* RIGHT CONTROLS */}
                <div className="player__controls-right">

                    {/* Volume */}
                    <div className="player__volume">
                        <button onClick={toggleMute}>
                            {isMuted || volume === 0 ? '🔇' : '🔊'}
                        </button>

                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={isMuted ? 0 : volume}
                            onChange={handleVolume}
                        />
                    </div>

                    {/* Speed */}
                    <div className="player__speed">
                        <button onClick={() => setShowSpeed(prev => !prev)}>
                            {speed}×
                        </button>

                        {showSpeed && (
                            <div className="player__speed-menu">
                                {SPEED_OPTIONS.map((s) => (
                                    <button key={s} onClick={() => handleSpeedChange(s)}>
                                        {s}×
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                </div>

            </div>
        </div>
    )
}




export default Player