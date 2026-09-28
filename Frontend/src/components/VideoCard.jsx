import { Link } from "react-router-dom";

function VideoCard({ video }) {
  return (
    <Link
      to={`/watch/${video.id}`}
      className="video-card"
    >
      <div className="video-thumbnail">
        <img
          src={video.thumbnail}
          alt={video.title}
        />
      </div>

      <div className="video-info">

        <h3>
          {video.title}
        </h3>

        <p>
          {video.creator}
        </p>

        <p>
          {video.views} views • {video.time}
        </p>

      </div>
    </Link>
  );
}

export default VideoCard;