import { useEffect, useState } from "react";
import { Play, X } from "lucide-react";
import { API_BASE } from "@/config";

interface VideoItem {
  id: number;
  title: string;
  video_url: string;
  embed_url: string;
  thumbnail_url: string | null;
  sort_order: number;
  is_active: number;
}

function getYouTubeThumb(url: string): string | null {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  if (match) return `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg`;
  return null;
}

const VideoSection = () => {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);

  useEffect(() => {
    fetch(`${API_BASE}/videos.php?active=1`)
      .then((r) => r.json())
      .then((data) => setVideos(Array.isArray(data) ? data : []))
      .catch(() => setVideos([]));
  }, []);

  if (videos.length === 0) return null;

  const thumbFor = (v: VideoItem) =>
    v.thumbnail_url || getYouTubeThumb(v.video_url) || null;

  const topRow = videos.slice(0, 3);
  const bottomRow = videos.slice(3, 5);

  return (
    <>
      <section className="py-16 bg-gray-50 border-t border-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <div className="inline-block border-b-2 border-primary pb-1">
              <h2 className="text-xl font-bold text-gray-800 tracking-wider uppercase">
                PRODUCT VIDEOS
              </h2>
            </div>
          </div>

          <div className="flex flex-col items-center gap-8">
            {/* Top Row: up to 3 Videos */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
              {topRow.map((v) => (
                <VideoCard key={v.id} video={v} thumb={thumbFor(v)} onPlay={() => setActiveVideo(v)} />
              ))}
            </div>

            {/* Bottom Row: remaining (up to 2) */}
            {bottomRow.length > 0 && (
              <div
                className={`grid grid-cols-1 gap-6 w-full ${
                  bottomRow.length === 1
                    ? "max-w-sm"
                    : "md:grid-cols-2 max-w-2xl"
                }`}
              >
                {bottomRow.map((v) => (
                  <VideoCard key={v.id} video={v} thumb={thumbFor(v)} onPlay={() => setActiveVideo(v)} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Video Player Modal */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setActiveVideo(null)}
        >
          <div className="relative w-full max-w-3xl" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute -top-10 right-0 text-white/80 hover:text-white transition-colors"
              aria-label="Close video"
            >
              <X className="w-7 h-7" />
            </button>
            <p className="text-white text-sm font-semibold mb-3 truncate">
              {activeVideo.title}
            </p>
            <div className="rounded-xl overflow-hidden shadow-2xl aspect-video bg-black">
              <iframe
                src={activeVideo.embed_url}
                className="w-full h-full"
                allowFullScreen
                allow="autoplay; fullscreen"
                title={activeVideo.title}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

interface VideoCardProps {
  video: VideoItem;
  thumb: string | null;
  onPlay: () => void;
}

const VideoCard = ({ video, thumb, onPlay }: VideoCardProps) => (
  <div className="flex flex-col items-center">
    <div
      className="relative group cursor-pointer w-full aspect-video rounded-lg overflow-hidden border-2 border-white shadow-sm hover:shadow-md transition-all"
      onClick={onPlay}
    >
      {thumb ? (
        <img
          src={thumb}
          alt={video.title}
          className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-300"
        />
      ) : (
        <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
          <Play className="w-10 h-10 opacity-30" />
        </div>
      )}
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
        <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
          <Play size={20} className="text-primary fill-primary ml-1" />
        </div>
      </div>
    </div>
    <p className="mt-3 text-xs font-bold text-gray-700 text-center uppercase tracking-tight">
      {video.title}
    </p>
  </div>
);

export default VideoSection;
