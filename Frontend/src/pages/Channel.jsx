import { useParams } from "react-router-dom";
import VideoCard from "../components/VideoCard";

function Channel() {
  const { id } = useParams();

  const videos = [
    {
      id: 1,
      title: "My First UTube Video",
      creator: "UTube Creator",
      views: "1.2K",
      time: "2 days ago",
      thumbnail:
        "https://placehold.co/640x360?text=First+Video",
    },
    {
      id: 2,
      title: "React Tutorial",
      creator: "UTube Creator",
      views: "850",
      time: "1 week ago",
      thumbnail:
        "https://placehold.co/640x360?text=React+Tutorial",
    },
    {
      id: 3,
      title: "Building My Project",
      creator: "UTube Creator",
      views: "2.4K",
      time: "2 weeks ago",
      thumbnail:
        "https://placehold.co/640x360?text=My+Project",
    },
    {
      id: 4,
      title: "JavaScript Basics",
      creator: "UTube Creator",
      views: "4.1K",
      time: "1 month ago",
      thumbnail:
        "https://placehold.co/640x360?text=JavaScript",
    },
  ];

  return (
    <main className="channel-page">

      <section className="channel-header">

        <div className="channel-avatar">
          U
        </div>

        <div className="channel-info">

          <h1>UTube Creator</h1>

          <p>@creator{id}</p>

          <p>
            4 videos • 5.5K total views
          </p>

          <p className="channel-description">
            Welcome to my UTube channel.
            Here I share tutorials, projects
            and other videos.
          </p>

        </div>

        <button className="subscribe-button">
          Subscribe
        </button>

      </section>

      <section className="channel-content">

        <h2>Videos</h2>

        <div className="channel-video-grid">

          {videos.map((video) => (
            <VideoCard
              key={video.id}
              video={video}
            />
          ))}

        </div>

      </section>

    </main>
  );
}

export default Channel;