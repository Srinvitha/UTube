import { useParams } from "react-router-dom";

function Watch() {
  const { id } = useParams();

  return (
    <main className="watch-page">

      <div className="watch-video-container">
        <video
          className="watch-video"
          controls
          poster="https://placehold.co/1280x720?text=UTube+Video"
        >
          <p>
            Your browser does not support video playback.
          </p>
        </video>
      </div>

      <section className="watch-info">

        <h1>
          UTube Video {id}
        </h1>

        <div className="watch-meta">
          <span>UTube Creator</span>
          <span>1.2K views</span>
          <span>2 days ago</span>
        </div>

        <div className="watch-actions">

          <button>
            👍 Like
          </button>

          <button>
            👎 Dislike
          </button>

          <button>
            Share
          </button>

        </div>

        <div className="watch-description">
          <p>
            This is the video description.
          </p>
        </div>

      </section>

    </main>
  );
}

export default Watch;