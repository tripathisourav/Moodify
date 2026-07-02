import { useSong } from "../hooks/useSongs";
import SongCard from "./SongCard";
import './playlist.scss'

const Playlist = () => {
  const { songs, currentIndex, playSong } = useSong();

  return (
    <div className="playlist">

      <h2 className="playlist__title">Your Mood Playlist</h2>

      <div className="playlist__list">
        {songs.map((song, i) => (
          <SongCard
            key={song._id}
            song={song}
            index={i}
            isActive={i === currentIndex}
            onClick={() => playSong(song, i)}
          />
        ))}
      </div>

    </div>
  );
};

export default Playlist;