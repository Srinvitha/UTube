import { Link } from "react-router-dom";

function Dashboard() {
  const videos = [
    {
      id: 1,
      title: "My First UTube Video",
      views: "1.2K",
      likes: "120",
      status: "Published",
      thumbnail:
        "https://placehold.co/640x360?text=My+First+Video",
    },
    {
      id: 2,
      title: "React Tutorial",
      views: "850",
      likes: "72",
      status: "Published",
      thumbnail:
        "https://placehold.co/640x360?text=React+Tutorial",
    },
    {
      id: 3,
      title: "My New Project",
      views: "0",
      likes: "0",
      status: "Draft",
      thumbnail:
        "https://placehold.co/640x360?text=Draft",
    },
  ];

  return (
    <main className="dashboard-page">

      <div className="dashboard-header">

        <div>
          <h1>Creator Dashboard</h1>

          <p>
            Manage your videos and channel.
          </p>
        </div>

        <Link to="/upload">
          <button className="upload-button">
            + Upload Video
          </button>
        </Link>

      </div>

      <section className="dashboard-stats">

        <div className="stat-card">
          <h2>3</h2>
          <p>Videos</p>
        </div>

        <div className="stat-card">
          <h2>2.1K</h2>
          <p>Total Views</p>
        </div>

        <div className="stat-card">
          <h2>192</h2>
          <p>Total Likes</p>
        </div>

      </section>

      <section className="dashboard-videos">

        <h2>Your Videos</h2>

        <div className="dashboard-video-list">

          {videos.map((video) => (
            <div
              className="dashboard-video"
              key={video.id}
            >

              <img
                src={video.thumbnail}
                alt={video.title}
              />

              <div className="dashboard-video-info">

                <h3>
                  {video.title}
                </h3>

                <p>
                  {video.views} views
                </p>

                <p>
                  {video.likes} likes
                </p>

                <span
                  className={
                    video.status === "Published"
                      ? "status-published"
                      : "status-draft"
                  }
                >
                  {video.status}
                </span>

              </div>

              <Link to={`/watch/${video.id}`}>
                <button>
                  View
                </button>
              </Link>

            </div>
          ))}

        </div>

      </section>

    </main>
  );
}

export default Dashboard;