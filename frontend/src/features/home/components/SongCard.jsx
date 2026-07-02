import { useSong } from "../hooks/useSongs";

const SongCard = ({ song, index, onClick, isActive }) => {
  const { likedSongs, toggleLike } = useSong();

  const isLiked = likedSongs.find(s => s._id === song._id);

  return (
    <div
      className={`song ${isActive ? "song--active" : ""}`}
      onClick={onClick}
    >

      <div className="song__left">
        <span className="song__index">
          {isActive ? "▶" : index + 1}
        </span>

        <img
          src={song.posterUrl}
          className="song__img"
        />

        <div className="song__info">
          <h4>{song.title}</h4>
          <p>{song.mood}</p>
        </div>
      </div>

      <div className="song__right">

        <button
          className="song__like"
          onClick={(e) => {
            e.stopPropagation();
            toggleLike(song);
          }}
        >
          {isLiked ? "❤️" : "🤍"}
        </button>

        <button className="song__play">
          ▶
        </button>

      </div>

    </div>
  );
};

export default SongCard;