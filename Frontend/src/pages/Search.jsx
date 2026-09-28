import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import VideoCard from "../components/VideoCard";
import { searchVideos } from "../services/videos";

function Search() {
  const [searchParams] = useSearchParams();

  const query = searchParams.get("q") || "";

  const videos = [
    {
      id: 1,
      title: "Introduction to UTube",
      creator: "UTube",
      views: "1.2K",
      time: "2 days ago",
      thumbnail: "https://placehold.co/640x360?text=UTube+Video",
    },
    {
      id: 2,
      title: "Learn React",
      creator: "Tech Creator",
      views: "5.4K",
      time: "1 week ago",
      thumbnail: "https://placehold.co/640x360?text=Learn+React",
    },
    {
      id: 3,
      title: "Building a Video Platform",
      creator: "Developer",
      views: "2.1K",
      time: "3 days ago",
      thumbnail: "https://placehold.co/640x360?text=Video+Platform",
    },
    {
      id: 4,
      title: "JavaScript Tutorial",
      creator: "Code Academy",
      views: "12K",
      time: "2 weeks ago",
      thumbnail: "https://placehold.co/640x360?text=JavaScript",
    },
  ];

  return (
    <main className="search-page">

      <h1>
        {query
          ? `Search results for "${query}"`
          : "Search UTube"}
      </h1>

      {!query && (
        <p>
          Enter something in the search bar to find videos.
        </p>
      )}

      {query && (
        <div className="search-results">
          {videos.map((video) => (
            <VideoCard
              key={video.id}
              video={video}
            />
          ))}
        </div>
      )}

    </main>
  );
}

export default Search;