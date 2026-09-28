import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LayoutDashboard, PlusCircle, Eye, ThumbsUp, Video, LogIn, ExternalLink } from "lucide-react";

function Dashboard() {
  const { user, isAuthenticated } = useAuth();

  const userVideos = [
    {
      id: 1,
      title: "Building Fullstack Apps with React 19 & Spring Boot",
      views: "1.2K",
      likes: "142",
      status: "READY",
      thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 2,
      title: "System Design of Scalable Video Streaming Platforms",
      views: "850",
      likes: "94",
      status: "READY",
      thumbnail: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 3,
      title: "SeaweedFS & HLS Video Processing Pipeline Benchmark",
      views: "0",
      likes: "0",
      status: "PROCESSING",
      thumbnail: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80",
    },
  ];

  if (!isAuthenticated) {
    return (
      <main className="main-content">
        <div className="guest-prompt-banner">
          <div className="logo-badge" style={{ margin: "0 auto 16px", width: 48, height: 36 }}>
            <div className="logo-icon" style={{ borderWidth: "8px 0 8px 14px" }}></div>
          </div>
          <h2>Creator Studio Access</h2>
          <p>Please sign in to view your channel dashboard, video analytics, and upload status.</p>
          <Link to="/login" className="btn-signin" style={{ display: "inline-flex" }}>
            <LogIn size={18} />
            <span>Sign in to UTube</span>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="main-content dashboard-container">
      {/* Header Bar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
        <div>
          <h1 className="section-heading" style={{ fontSize: 26, margin: 0 }}>
            <LayoutDashboard size={26} color="#ff1e38" />
            Creator Studio
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: 14, marginTop: 4 }}>
            Welcome back, <strong style={{ color: "var(--text-primary)" }}>{user.name}</strong> ({user.handle})
          </p>
        </div>

        <Link to="/upload" className="btn-signin" style={{ borderRadius: 20 }}>
          <PlusCircle size={18} />
          <span>Upload Video</span>
        </Link>
      </div>

      {/* Analytics Stat Cards */}
      <div className="stats-grid">
        <div className="stat-card-modern">
          <div className="stat-lbl">Total Uploads</div>
          <div className="stat-val">{userVideos.length}</div>
        </div>

        <div className="stat-card-modern">
          <div className="stat-lbl">Total Views</div>
          <div className="stat-val">2.05K</div>
        </div>

        <div className="stat-card-modern">
          <div className="stat-lbl">Total Likes</div>
          <div className="stat-val">236</div>
        </div>

        <div className="stat-card-modern">
          <div className="stat-lbl">Subscribers</div>
          <div className="stat-[#ff1e38] stat-val" style={{ color: "var(--text-primary)" }}>1.4K</div>
        </div>
      </div>

      {/* Video List Table */}
      <h2 className="section-heading" style={{ fontSize: 18, marginBottom: 16 }}>
        <Video size={20} color="#ff1e38" />
        Your Uploaded Videos
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {userVideos.map((video) => (
          <div
            key={video.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              padding: 16,
              borderRadius: 16,
              background: "var(--bg-surface-card)",
              border: "1px solid var(--border-subtle)",
            }}
          >
            <img
              src={video.thumbnail}
              alt={video.title}
              style={{ width: 140, aspectRatio: "16/9", objectFit: "cover", borderRadius: 10 }}
            />

            <div style={{ flex: 1, minWidth: 0 }}>
              <h3 style={{ fontFamily: "var(--font-heading)", fontSize: 15, fontWeight: 600, marginBottom: 6 }}>
                {video.title}
              </h3>
              <div style={{ display: "flex", gap: 16, fontSize: 13, color: "var(--text-muted)" }}>
                <span>{video.views} views</span>
                <span>•</span>
                <span>{video.likes} likes</span>
              </div>
            </div>

            <span
              style={{
                padding: "4px 12px",
                borderRadius: 20,
                fontSize: 12,
                fontWeight: 700,
                background: video.status === "READY" ? "rgba(16, 185, 129, 0.15)" : "var(--brand-red-wash)",
                color: video.status === "READY" ? "#10b981" : "var(--brand-red-bright)",
                border: `1px solid ${video.status === "READY" ? "rgba(16, 185, 129, 0.3)" : "var(--brand-red-glow)"}`,
              }}
            >
              {video.status}
            </span>

            <Link to={`/watch/${video.id}`} className="action-pill-btn">
              <span>View</span>
              <ExternalLink size={14} />
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Dashboard;