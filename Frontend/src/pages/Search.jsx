import { useSearchParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import VideoCard from "../components/VideoCard";
import { Search as SearchIcon, SlidersHorizontal } from "lucide-react";

function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const allSearchResults = [
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
  ];

  return (
    <div className="app-layout">
      <Sidebar />

      <main className="main-content">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <h1 className="section-heading" style={{ fontSize: 22, margin: 0 }}>
            <SearchIcon size={22} color="#ff1e38" />
            {query ? `Search results for "${query}"` : "Explore Videos"}
          </h1>

          <button className="action-pill-btn">
            <SlidersHorizontal size={16} />
            <span>Filters</span>
          </button>
        </div>

        <div className="video-grid">
          {allSearchResults.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </main>
    </div>
  );
}

export default Search;