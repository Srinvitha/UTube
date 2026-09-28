import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Hls from "hls.js";
import { ThumbsUp, ThumbsDown, Share2, Bookmark, Sparkles } from "lucide-react";
import VideoCard from "../components/VideoCard";
import { getVideoById } from "../services/api";

function Watch() {
  const { id } = useParams();
  const videoRef = useRef(null);
  const [video, setVideo] = useState(null);
  const [quality, setQuality] = useState("auto");
  const [error, setError] = useState("");

  useEffect(() => {
    getVideoById(id).then(setVideo).catch((e) => setError(e.message));
  }, [id]);

  useEffect(() => {
    if (!video?.hlsObjectKey || !videoRef.current) return;

    const src = `http://localhost/media/${video.hlsObjectKey.replace(/^processed\//, "")}`;
    const player = videoRef.current;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(player);
      return () => hls.destroy();
    }
    if (player.canPlayType("application/vnd.apple.mpegurl")) {
      player.src = src;
    }
  }, [video]);

  if (error) return <main className="main-content"><p>{error}</p></main>;
  if (!video) return <main className="main-content"><p>Loading video...</p></main>;

  return (
    <main className="watch-page-container">
      <div>
        <div className="watch-main-player">
          <video ref={videoRef} controls poster={video.thumbnailObjectKey ? `http://localhost/media-thumbnail/${video.thumbnailObjectKey.replace(/^thumbnails\//, "")}` : undefined} />
        </div>
        <div className="watch-details-section">
          <h1 className="watch-video-title">{video.title}</h1>
          <div className="watch-creator-bar">
            <div className="creator-profile-info">
              <div>
                <div className="creator-name">{video.user?.displayName || video.user?.username || "UTube Creator"}</div>
                <div className="creator-subs">UTube creator</div>
              </div>
            </div>
            <div className="watch-action-buttons">
              <select value={quality} onChange={(e) => setQuality(e.target.value)} className="action-pill-btn">
                <option value="auto">Auto</option>
                <option value="720">720p</option>
                <option value="480">480p</option>
                <option value="360">360p</option>
              </select>
              <button className="action-pill-btn"><ThumbsUp size={16}/><span>Like</span></button>
              <button className="action-pill-btn"><ThumbsDown size={16}/></button>
              <button className="action-pill-btn"><Share2 size={16}/><span>Share</span></button>
              <button className="action-pill-btn"><Bookmark size={16}/><span>Save</span></button>
            </div>
          </div>
          <div className="watch-description-box">
            <div style={{fontWeight:600, marginBottom:8}}>
              {video.views || 0} views • {video.status}
            </div>
            <p>{video.description}</p>
          </div>
        </div>
      </div>
      <aside>
        <h3 className="section-heading" style={{fontSize:16}}>
          <Sparkles size={18} color="#ff1e38" /> Up Next
        </h3>
        <div style={{display:"flex",flexDirection:"column",gap:16}}>
          {[].map((v) => <VideoCard key={v.id} video={v} />)}
        </div>
      </aside>
    </main>
  );
}
export default Watch;
