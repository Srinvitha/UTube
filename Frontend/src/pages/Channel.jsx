import { useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Sidebar from "../components/Sidebar";
import VideoCard from "../components/VideoCard";
import { Tv2, Sparkles } from "lucide-react";

function Channel() {
  const { id } = useParams();
  const { user } = useAuth();
  const [isSubscribed, setIsSubscribed] = useState(false);

  const isSelf = id === "me" || (user && id === user.id.toString());

  const channelInfo = {
    name: isSelf && user ? user.name : "Alpine Explorer",
    handle: isSelf && user ? user.handle : "@alpine_explorer",
    avatar: isSelf && user ? user.avatar : "https://api.dicebear.com/7.x/avataaars/svg?seed=Alpine",
    subscribers: "245K subscribers",
    videosCount: "12 videos",
    bio: "Exploring high altitude mountains, aerial cinematography, and tech builds across the world.",
  };

  const channelVideos = [
    {
      id: 301,
      title: "Lost in the Mountains — 4K Cinematic Journey",
      creator: channelInfo.name,
      creatorAvatar: channelInfo.avatar,
      views: "2.1M",
      time: "2 weeks ago",
      duration: "12:34",
      thumbnail: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 302,
      title: "Tropical Beach Sunset Drone Footage",
      creator: channelInfo.name,
      creatorAvatar: channelInfo.avatar,
      views: "1.2M",
      time: "2 days ago",
      duration: "6:12",
      thumbnail: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 303,
      title: "Tokyo Cyberpunk Night Walk in 4K 60FPS",
      creator: channelInfo.name,
      creatorAvatar: channelInfo.avatar,
      views: "3.5M",
      time: "4 days ago",
      duration: "10:08",
      thumbnail: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <div className="app-layout">
      <Sidebar />

      <main className="main-content">
        {/* Banner Cover */}
        <div
          style={{
            height: 180,
            borderRadius: 24,
            background: "linear-gradient(135deg, #1c1e2b 0%, #0f1017 50%, #2b0913 100%)",
            border: "1px solid var(--border-medium)",
            marginBottom: -40,
          }}
        />

        {/* Channel Header Box */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            gap: 24,
            padding: "0 24px 24px",
            marginBottom: 32,
            flexWrap: "wrap",
          }}
        >
          <img
            src={channelInfo.avatar}
            alt={channelInfo.name}
            style={{
              width: 100,
              height: 100,
              borderRadius: "50%",
              border: "4px solid var(--bg-root)",
              boxShadow: "var(--shadow-md)",
            }}
          />

          <div style={{ flex: 1, minWidth: 220 }}>
            <h1 style={{ fontFamily: "var(--font-heading)", fontSize: 26, fontWeight: 800 }}>
              {channelInfo.name}
            </h1>
            <div style={{ fontSize: 13, color: "var(--text-muted)", margin: "4px 0 8px" }}>
              {channelInfo.handle} • {channelInfo.subscribers} • {channelInfo.videosCount}
            </div>
            <p style={{ fontSize: 14, color: "var(--text-secondary)", maxWidth: 600 }}>
              {channelInfo.bio}
            </p>
          </div>

          {!isSelf && (
            <button
              className="btn-subscribe"
              onClick={() => setIsSubscribed((prev) => !prev)}
              style={{
                background: isSubscribed ? "var(--bg-pill-hover)" : "var(--brand-red-bright)",
                color: "#ffffff",
                height: 40,
                padding: "0 24px",
              }}
            >
              {isSubscribed ? "Subscribed" : "Subscribe"}
            </button>
          )}
        </div>

        {/* Channel Videos Section */}
        <h2 className="section-heading">
          <Tv2 size={20} color="#ff1e38" />
          Channel Videos
        </h2>

        <div className="video-grid">
          {channelVideos.map((vid) => (
            <VideoCard key={vid.id} video={vid} />
          ))}
        </div>
      </main>
    </div>
  );
}

export default Channel;