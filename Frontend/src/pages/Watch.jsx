import { useState } from "react";
import { useParams } from "react-router-dom";
import { ThumbsUp, ThumbsDown, Share2, Bookmark, Sparkles } from "lucide-react";
import VideoCard from "../components/VideoCard";

function Watch() {
  const { id } = useParams();
  const [likesCount, setLikesCount] = useState(1240);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const videoDetails = {
    title: `UTube Video — Exploring Cinematic Horizons (${id})`,
    creator: "Alpine Explorer",
    creatorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alpine",
    subscribers: "245K subscribers",
    views: "1.2M views",
    time: "2 days ago",
    description: `Welcome to this featured video on UTube! Built with high performance HLS video streaming, automated transcoding pipeline (360p, 480p, 720p), and PostgreSQL backend architecture. 

Subscribe for more technical deep dives and cinematic vlogs!`,
    poster: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
  };

  const relatedVideos = [
    {
      id: 201,
      title: "Cozy Afternoon with Cats & Ambient Lo-Fi",
      creator: "Pet Vlogs",
      creatorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Pets",
      views: "890K",
      time: "3 days ago",
      duration: "4:18",
      thumbnail: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 202,
      title: "Live EDM Festival Concert Visuals 2026",
      creator: "Night Pulse",
      creatorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=NightPulse",
      views: "1.4M",
      time: "5 days ago",
      duration: "8:21",
      thumbnail: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 203,
      title: "Tropical Beach Sunset Drone Footage",
      creator: "Oceanic Media",
      creatorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ocean",
      views: "1.2M",
      time: "2 days ago",
      duration: "6:12",
      thumbnail: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    },
  ];

  function handleLike() {
    if (isLiked) {
      setIsLiked(false);
      setLikesCount((prev) => prev - 1);
    } else {
      setIsLiked(true);
      if (isDisliked) setIsDisliked(false);
      setLikesCount((prev) => prev + 1);
    }
  }

  function handleDislike() {
    if (isDisliked) {
      setIsDisliked(false);
    } else {
      setIsDisliked(true);
      if (isLiked) {
        setIsLiked(false);
        setLikesCount((prev) => prev - 1);
      }
    }
  }

  return (
    <main className="watch-page-container">
      <div>
        {/* Main Video Player */}
        <div className="watch-main-player">
          <video
            controls
            poster={videoDetails.poster}
            autoPlay={false}
          >
            <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
            Your browser does not support HTML5 video playback.
          </video>
        </div>

        {/* Video Info Header */}
        <div className="watch-details-section">
          <h1 className="watch-video-title">{videoDetails.title}</h1>

          <div className="watch-creator-bar">
            <div className="creator-profile-info">
              <img src={videoDetails.creatorAvatar} alt={videoDetails.creator} />
              <div>
                <div className="creator-name">{videoDetails.creator}</div>
                <div className="creator-subs">{videoDetails.subscribers}</div>
              </div>

              <button
                className="btn-subscribe"
                style={{
                  background: isSubscribed ? "var(--bg-pill-hover)" : "var(--brand-red-bright)",
                  color: "#ffffff",
                  marginLeft: 12,
                }}
                onClick={() => setIsSubscribed((prev) => !prev)}
              >
                {isSubscribed ? "Subscribed" : "Subscribe"}
              </button>
            </div>

            {/* Action buttons (Like, Dislike, Share) */}
            <div className="watch-action-buttons">
              <button
                className={`action-pill-btn ${isLiked ? "active" : ""}`}
                onClick={handleLike}
              >
                <ThumbsUp size={16} fill={isLiked ? "currentColor" : "none"} />
                <span>{likesCount.toLocaleString()}</span>
              </button>

              <button
                className={`action-pill-btn ${isDisliked ? "active" : ""}`}
                onClick={handleDislike}
              >
                <ThumbsDown size={16} fill={isDisliked ? "currentColor" : "none"} />
              </button>

              <button className="action-pill-btn">
                <Share2 size={16} />
                <span>Share</span>
              </button>

              <button className="action-pill-btn">
                <Bookmark size={16} />
                <span>Save</span>
              </button>
            </div>
          </div>

          {/* Description Box */}
          <div className="watch-description-box">
            <div style={{ fontWeight: 600, color: "var(--text-primary)", marginBottom: 8 }}>
              {videoDetails.views} • {videoDetails.time}
            </div>
            <p style={{ whiteSpace: "pre-line" }}>{videoDetails.description}</p>
          </div>
        </div>
      </div>

      {/* Right Column: Up Next / Related Videos */}
      <aside>
        <h3 className="section-heading" style={{ fontSize: 16 }}>
          <Sparkles size={18} color="#ff1e38" /> Up Next
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {relatedVideos.map((vid) => (
            <VideoCard key={vid.id} video={vid} />
          ))}
        </div>
      </aside>
    </main>
  );
}

export default Watch;