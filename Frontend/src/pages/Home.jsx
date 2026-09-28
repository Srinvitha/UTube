import Sidebar from "../components/Sidebar";
import VideoCard from "../components/VideoCard";

function Home() {

  const videos = [
    {
      id: 1,
      title: "Introduction to UTube",
      creator: "UTube",
      views: "1.2K",
      time: "2 days ago",
      thumbnail: "https://placehold.co/640x360?text=UTube+Video"
    },
    {
      id: 2,
      title: "Learn React",
      creator: "Tech Creator",
      views: "5.4K",
      time: "1 week ago",
      thumbnail: "https://placehold.co/640x360?text=Learn+React"
    },
    {
      id: 3,
      title: "Building a Video Platform",
      creator: "Developer",
      views: "2.1K",
      time: "3 days ago",
      thumbnail: "https://placehold.co/640x360?text=Video+Platform"
    },
    {
      id: 4,
      title: "JavaScript Tutorial",
      creator: "Code Academy",
      views: "12K",
      time: "2 weeks ago",
      thumbnail: "https://placehold.co/640x360?text=JavaScript"
    }
  ];

  return (
    <div className="home-layout">

      <Sidebar />

      <main className="home-content">

        <h1>Recommended Videos</h1>

        <div className="video-grid">

          {videos.map((video) => (
            <VideoCard
              key={video.id}
              video={video}
            />
          ))}

        </div>

      </main>

    </div>
  );
}

export default Home;