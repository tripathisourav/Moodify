import React from 'react'
import FaceExpression from '../../Expression/components/FaceExpression'
import Player from '../components/Player'
import Playlist from "../components/Playlist";
import MainLayout from "../layout/MainLayout";
import { useSong } from '../hooks/useSongs'




const Home = () => {
  const {
    songs,
    currentSong,
    handleGetSong,
    playSong
  } = useSong()

  return (
    <>
      <MainLayout>
        <FaceExpression
          onClick={(expression) => {
            handleGetSong({ mood: expression })
          }}
        />

        <div>
          {songs.map((s, i) => (
            <div style={{display: 'flex', gap: '5px'}} className="song-item" onClick={() => playSong(s, i)}>
              <span className="song-index">{i + 1 + `.)` }</span>
              <span className="song-title">{s.title}</span>
            </div>
          ))}
        </div>

        <Player song={currentSong} />
      </MainLayout>
    </>
  )
}

export default Home