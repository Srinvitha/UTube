import { Link } from "react-router-dom";
import { Play } from "lucide-react";

function VideoCard({ video }) {
  const defaultAvatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(video.creator || "UTube")}`;

  return (
    <Link to={`/watch/${video.id}`} className="video-card">
      <div className="video-card-thumb-wrapper">
        <img src={video.thumbnail} alt={video.title} loading="lazy" />
        <div className="card-play-overlay">
          <Play size={28} fill="#ffffff" color="#ffffff" />
        </div>
        {video.duration && (
          <span className="duration-badge">{video.duration}</span>
        )}
      </div>

      <div className="video-card-body">
        <img
          src={video.creatorAvatar || defaultAvatar}
          alt={video.creator}
          className="creator-avatar-mini"
        />

        <div className="video-card-details">
          <h3 className="video-card-title">{video.title}</h3>
          <span className="video-card-creator">{video.creator}</span>
          <span className="video-card-stats">
            {video.views} views • {video.time}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default VideoCard;