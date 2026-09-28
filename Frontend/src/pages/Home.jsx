import { useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import VideoCard from "../components/VideoCard";
import { Play, Sparkles, Flame } from "lucide-react";

function Home() {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = [
    "All",
    "Gaming",
    "Music",
    "React JS",
    "System Design",
    "Cinematic",
    "Tech",
    "Podcasts",
    "Live",
  ];

  // Hero Featured Video (Inspired by Image 2)
  const heroVideo = {
    id: 101,
    title: "Lost in the Mountains — 4K Cinematic Journey",
    creator: "Alpine Explorer",
    creatorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alpine",
    views: "2.1M",
    time: "2 weeks ago",
    duration: "12:34",
    thumbnail: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
  };

  const sideHeroVideos = [
    {
      id: 102,
      title: "Cozy Afternoon with Cats & Ambient Lo-Fi",
      creator: "Pet Vlogs",
      creatorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Pets",
      views: "890K",
      time: "3 days ago",
      duration: "4:18",
      thumbnail: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 103,
      title: "Live EDM Festival Concert Visuals 2026",
      creator: "Night Pulse",
      creatorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=NightPulse",
      views: "1.4M",
      time: "5 days ago",
      duration: "8:21",
      thumbnail: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=600&q=80",
    },
  ];

  const recommendedVideos = [
    {
      id: 1,
      title: "Tropical Beach Sunset Drone Footage",
      creator: "Oceanic Media",
      creatorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ocean",
      views: "1.2M",
      time: "2 days ago",
      duration: "6:12",
      thumbnail: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 2,
      title: "Modern Minimalist Home Architecture Tour",
      creator: "Design Lab",
      creatorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=DesignLab",
      views: "450K",
      time: "1 week ago",
      duration: "5:21",
      thumbnail: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 3,
      title: "Tokyo Cyberpunk Night Walk in 4K 60FPS",
      creator: "Urban Wanderers",
      creatorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tokyo",
      views: "3.5M",
      time: "4 days ago",
      duration: "10:08",
      thumbnail: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 4,
      title: "Mastering Gourmet Culinary Techniques",
      creator: "Chef's Table",
      creatorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Chefs",
      views: "620K",
      time: "3 days ago",
      duration: "7:36",
      thumbnail: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 5,
      title: "Building Fullstack Apps with React 19 & Spring Boot",
      creator: "Tech Creator",
      creatorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=TechCreator",
      views: "125K",
      time: "1 day ago",
      duration: "15:40",
      thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 6,
      title: "System Design of Scalable Video Streaming Platforms",
      creator: "Software Architect",
      creatorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Architect",
      views: "310K",
      time: "6 days ago",
      duration: "18:05",
      thumbnail: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <div className="app-layout">
      <Sidebar />

      <main className="main-content">
        {/* Categories Bar */}
        <div className="category-bar">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`category-pill ${activeCategory === cat ? "active" : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured Hero Section */}
        <div className="featured-hero">
          <Link to={`/watch/${heroVideo.id}`} className="hero-main-card">
            <img src={heroVideo.thumbnail} alt={heroVideo.title} className="hero-thumbnail" />
            <div className="hero-overlay">
              <div className="hero-play-center">
                <Play size={28} fill="#ffffff" color="#ffffff" style={{ marginLeft: 3 }} />
              </div>
              <div className="hero-bottom-info">
                <h2>{heroVideo.title}</h2>
                <div className="hero-bottom-meta">
                  <span>{heroVideo.creator}</span>
                  <span>•</span>
                  <span>{heroVideo.views} views</span>
                  <span>•</span>
                  <span>{heroVideo.time}</span>
                </div>
              </div>
              <span className="duration-badge">{heroVideo.duration}</span>
            </div>
          </Link>

          <div className="hero-side-grid">
            {sideHeroVideos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        </div>

        {/* Recommended Videos Section */}
        <h2 className="section-heading">
          <Sparkles size={20} color="#ff1e38" />
          Recommended for you
        </h2>

        <div className="video-grid">
          {recommendedVideos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </main>
    </div>
  );
}

export default Home;