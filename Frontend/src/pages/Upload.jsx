import { useState } from "react";

function Upload() {
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    console.log({
      videoFile,
      thumbnail,
      title,
      description,
    });

    alert("Video details ready for upload!");
  }

  return (
    <main className="upload-page">

      <h1>Upload Video</h1>

      <form
        className="upload-form"
        onSubmit={handleSubmit}
      >

        <label>
          Video File
        </label>

        <input
          type="file"
          accept="video/*"
          onChange={(event) =>
            setVideoFile(event.target.files[0])
          }
        />

        {videoFile && (
          <p>
            Selected: {videoFile.name}
          </p>
        )}

        <label>
          Video Title
        </label>

        <input
          type="text"
          placeholder="Enter video title"
          value={title}
          onChange={(event) =>
            setTitle(event.target.value)
          }
          required
        />

        <label>
          Description
        </label>

        <textarea
          placeholder="Tell viewers about your video..."
          value={description}
          onChange={(event) =>
            setDescription(event.target.value)
          }
          rows="6"
        />

        <label>
          Thumbnail
        </label>

        <input
          type="file"
          accept="image/*"
          onChange={(event) =>
            setThumbnail(event.target.files[0])
          }
        />

        {thumbnail && (
          <p>
            Selected: {thumbnail.name}
          </p>
        )}

        <button type="submit">
          Upload Video
        </button>

      </form>

    </main>
  );
}

export default Upload;