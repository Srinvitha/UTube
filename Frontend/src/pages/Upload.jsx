import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { uploadVideo } from "../services/api";
import { Upload as UploadIcon, Film, Image as ImageIcon, CheckCircle, LogIn, AlertCircle } from "lucide-react";

function Upload() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [videoFile, setVideoFile] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [statusText, setStatusText] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    if (!videoFile) {
      alert("Please select a video file first.");
      return;
    }

    setIsUploading(true);
    setUploadProgress(15);
    setStatusText("Uploading video to SeaweedFS storage...");

    try {
      setUploadProgress(35);
      const result = await uploadVideo({
        videoFile,
        thumbnail,
        title,
        description,
      });
      setUploadProgress(100);
      setStatusText(`Video queued for processing. Status: ${result.status}`);
      setTimeout(() => navigate("/dashboard"), 700);
    } catch (error) {
      setIsUploading(false);
      setUploadProgress(0);
      setStatusText("");
      alert(`Upload failed: ${error.message}`);
    }
  }

  if (!isAuthenticated) {
    return (
      <main className="main-content">
        <div className="guest-prompt-banner">
          <div className="logo-badge" style={{ margin: "0 auto 16px", width: 48, height: 36 }}>
            <div className="logo-icon" style={{ borderWidth: "8px 0 8px 14px" }}></div>
          </div>
          <h2>Sign in to upload videos</h2>
          <p>Share your videos with viewers around the world. Connect your account to get started.</p>
          <Link to="/login" className="btn-signin" style={{ display: "inline-flex" }}>
            <LogIn size={18} />
            <span>Sign in to UTube</span>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="main-content" style={{ maxWidth: 840, margin: "0 auto" }}>
      <h1 className="section-heading" style={{ fontSize: 24, marginBottom: 8 }}>
        <UploadIcon size={24} color="#ff1e38" />
        Upload Video
      </h1>
      <p style={{ color: "var(--text-muted)", marginBottom: 28, fontSize: 14 }}>
        Upload your video file to transcode HLS multi-bitrate streams.
      </p>

      {isUploading ? (
        <div className="auth-card" style={{ width: "100%", textAlign: "center", padding: 50 }}>
          <Film size={48} color="#ff1e38" style={{ margin: "0 auto 16px", animation: "pulseRed 1.5s infinite" }} />
          <h2 style={{ fontFamily: "var(--font-heading)", marginBottom: 12 }}>Processing Video...</h2>
          <p style={{ color: "var(--text-secondary)", fontSize: 14, marginBottom: 20 }}>{statusText}</p>

          <div style={{ width: "100%", height: 8, background: "var(--bg-pill)", borderRadius: 4, overflow: "hidden" }}>
            <div
              style={{
                width: `${uploadProgress}%`,
                height: "100%",
                background: "var(--brand-gradient)",
                transition: "width 400ms ease",
              }}
            />
          </div>
          <span style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 10, display: "block" }}>
            {uploadProgress}%
          </span>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="auth-card" style={{ width: "100%", padding: 32 }}>
          {/* Drag & Drop File Input */}
          <div className="form-group">
            <label>Video File (MP4, MOV, MKV)</label>
            <div
              style={{
                border: "2px dashed var(--border-medium)",
                borderRadius: 16,
                padding: "36px 20px",
                textAlign: "center",
                background: "var(--bg-input)",
                cursor: "pointer",
              }}
            >
              <Film size={36} color="var(--brand-red-bright)" style={{ margin: "0 auto 10px" }} />
              <div style={{ fontSize: 14, fontWeight: 600 }}>
                {videoFile ? videoFile.name : "Click or drag video file here to upload"}
              </div>
              <input
                type="file"
                accept="video/*"
                onChange={(e) => setVideoFile(e.target.files[0])}
                style={{ display: "none" }}
                id="video-upload-input"
              />
              <label
                htmlFor="video-upload-input"
                className="action-pill-btn"
                style={{ display: "inline-flex", marginTop: 12, cursor: "pointer" }}
              >
                Select Video File
              </label>
            </div>
          </div>

          <div className="form-group">
            <label>Video Title</label>
            <input
              type="text"
              placeholder="Give your video a catchy title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              placeholder="Tell viewers what your video is about..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
            />
          </div>

          <div className="form-group">
            <label>Thumbnail Image (Optional)</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setThumbnail(e.target.files[0])}
            />
          </div>

          <button type="submit" className="btn-primary-block" style={{ marginTop: 10 }}>
            Upload and Transcode
          </button>
        </form>
      )}
    </main>
  );
}

export default Upload;