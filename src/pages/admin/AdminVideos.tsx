import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Video, ExternalLink, Eye, EyeOff, X, Save, Loader2, Play } from "lucide-react";
import { API_BASE } from "@/config";
import { useToast } from "@/hooks/use-toast";

interface VideoItem {
  id: number;
  title: string;
  video_url: string;
  embed_url: string;
  thumbnail_url: string | null;
  sort_order: number;
  is_active: number;
  created_at: string;
}

interface VideoForm {
  title: string;
  video_url: string;
  is_active: boolean;
}

const emptyForm: VideoForm = {
  title: "",
  video_url: "",
  is_active: true,
};

function getYouTubeThumb(url: string): string | null {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  if (match) return `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg`;
  return null;
}

function getEmbedUrl(url: string): string {
  const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}`;
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
  return url;
}

const AdminVideos = () => {
  const { toast } = useToast();
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<VideoForm>(emptyForm);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  const fetchVideos = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/videos.php`);
      const data = await res.json();
      setVideos(Array.isArray(data) ? data : []);
    } catch {
      toast({ title: "Error", description: "Failed to fetch videos", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchVideos(); }, []);

  const openAdd = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowModal(true);
  };

  const openEdit = (v: VideoItem) => {
    setEditingId(v.id);
    setForm({
      title: v.title,
      video_url: v.video_url,
      is_active: v.is_active === 1,
    });
    setShowModal(true);
  };

  const handleUrlChange = (url: string) => {
    setForm(f => ({ ...f, video_url: url }));
  };

  const handleSave = async () => {
    if (!form.title.trim()) { toast({ title: "Title is required", variant: "destructive" }); return; }
    if (!form.video_url.trim()) { toast({ title: "Video URL is required", variant: "destructive" }); return; }
    setSaving(true);
    try {
      const payload = {
        title: form.title,
        video_url: form.video_url,
        thumbnail_url: null,
        sort_order: 0,
        is_active: form.is_active ? 1 : 0,
      };
      const url = editingId
        ? `${API_BASE}/videos.php?id=${editingId}`
        : `${API_BASE}/videos.php`;
      const res = await fetch(url, {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      toast({ title: editingId ? "Video updated!" : "Video added!", description: form.title });
      setShowModal(false);
      fetchVideos();
    } catch (e: any) {
      toast({ title: "Error", description: e.message || "Failed to save", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`${API_BASE}/videos.php?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      toast({ title: "Video deleted" });
      setDeleteConfirm(null);
      fetchVideos();
    } catch (e: any) {
      toast({ title: "Error", description: e.message, variant: "destructive" });
    }
  };

  const toggleActive = async (v: VideoItem) => {
    try {
      const res = await fetch(`${API_BASE}/videos.php?id=${v.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: v.title,
          video_url: v.video_url,
          thumbnail_url: v.thumbnail_url,
          sort_order: 0,
          is_active: v.is_active === 1 ? 0 : 1,
        }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      toast({ title: v.is_active === 1 ? "Video hidden" : "Video visible" });
      fetchVideos();
    } catch (e: any) {
      toast({ title: "Error", description: e.message, variant: "destructive" });
    }
  };

  const thumbFor = (v: VideoItem) =>
    v.thumbnail_url || getYouTubeThumb(v.video_url) || null;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Video className="w-6 h-6 text-primary" />
            Video Management
          </h1>
          <p className="text-sm text-gray-500 mt-1">Add YouTube, Vimeo, or direct video URLs to display on the website.</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-primary text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Add Video
        </button>
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex items-center justify-center py-20 text-gray-400">
          <Loader2 className="w-6 h-6 animate-spin mr-2" /> Loading videos…
        </div>
      ) : videos.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-gray-400">
          <Video className="w-12 h-12 mb-3 opacity-30" />
          <p className="text-sm">No videos yet. Click <strong>Add Video</strong> to get started.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border divide-y shadow-sm">
          {videos.map((v) => {
            const thumb = thumbFor(v);
            return (
              <div key={v.id} className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors">
                {/* Thumbnail */}
                <div className="relative w-28 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0 border">
                  {thumb ? (
                    <img src={thumb} alt={v.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                      <Play className="w-6 h-6" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <div className="w-6 h-6 bg-white/90 rounded-full flex items-center justify-center shadow">
                      <Play size={10} className="text-primary fill-primary ml-0.5" />
                    </div>
                  </div>
                  {v.is_active === 0 && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="text-white text-[9px] font-bold uppercase tracking-widest">Hidden</span>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-800 text-sm truncate">{v.title}</p>
                  <a
                    href={v.video_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-500 hover:underline flex items-center gap-1 mt-0.5 truncate"
                  >
                    <ExternalLink className="w-3 h-3 flex-shrink-0" />
                    <span className="truncate">{v.video_url}</span>
                  </a>
                </div>



                {/* Actions */}
                <div className="flex items-center gap-1 flex-shrink-0">
                  <button
                    onClick={() => setPreviewUrl(getEmbedUrl(v.video_url))}
                    title="Preview"
                    className="p-2 rounded-lg text-gray-400 hover:text-blue-500 hover:bg-blue-50 transition-colors"
                  >
                    <Play className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => toggleActive(v)}
                    title={v.is_active ? "Hide" : "Show"}
                    className="p-2 rounded-lg text-gray-400 hover:text-yellow-500 hover:bg-yellow-50 transition-colors"
                  >
                    {v.is_active === 1 ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => openEdit(v)}
                    title="Edit"
                    className="p-2 rounded-lg text-gray-400 hover:text-primary hover:bg-primary/10 transition-colors"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(v.id)}
                    title="Delete"
                    className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add / Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
            <div className="flex items-center justify-between p-5 border-b">
              <h2 className="text-lg font-bold text-gray-800">
                {editingId ? "Edit Video" : "Add New Video"}
              </h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5 space-y-4">
              {/* Title */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Video Title *</label>
                <input
                  type="text"
                  className="w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                  placeholder="e.g. Coco Coir Pot & Premium"
                  value={form.title}
                  onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                />
              </div>

              {/* Video URL */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Video URL *</label>
                <input
                  type="url"
                  className="w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                  placeholder="https://www.youtube.com/watch?v=... or https://vimeo.com/..."
                  value={form.video_url}
                  onChange={e => handleUrlChange(e.target.value)}
                />
                <p className="text-xs text-gray-400 mt-1">Supports YouTube, Vimeo, or any direct video URL.</p>
              </div>

              {/* Auto thumbnail preview (YouTube only) */}
              {getYouTubeThumb(form.video_url) && (
                <div className="rounded-lg overflow-hidden border h-36 bg-gray-100">
                  <img
                    src={getYouTubeThumb(form.video_url) || ""}
                    alt="Thumbnail preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Active toggle */}
              <div className="flex items-center gap-3">
                <div
                  onClick={() => setForm(f => ({ ...f, is_active: !f.is_active }))}
                  className={`w-11 h-6 rounded-full transition-colors cursor-pointer ${form.is_active ? "bg-primary" : "bg-gray-300"} relative`}
                >
                  <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${form.is_active ? "translate-x-5" : ""}`} />
                </div>
                <span className="text-sm text-gray-700 select-none">Active (show on website)</span>
              </div>
            </div>

            <div className="flex justify-end gap-3 p-5 border-t">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 px-5 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 disabled:opacity-60 transition-colors"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                {editingId ? "Update" : "Add Video"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {previewUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4" onClick={() => setPreviewUrl(null)}>
          <div className="relative w-full max-w-3xl" onClick={e => e.stopPropagation()}>
            <button
              onClick={() => setPreviewUrl(null)}
              className="absolute -top-10 right-0 text-white/80 hover:text-white"
            >
              <X className="w-7 h-7" />
            </button>
            <div className="rounded-xl overflow-hidden shadow-2xl aspect-video bg-black">
              <iframe
                src={previewUrl}
                className="w-full h-full"
                allowFullScreen
                allow="autoplay; fullscreen"
                title="Video Preview"
              />
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {deleteConfirm !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full text-center">
            <Trash2 className="w-10 h-10 text-red-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-gray-800 mb-1">Delete Video?</h3>
            <p className="text-sm text-gray-500 mb-5">This action cannot be undone.</p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="px-5 py-2 text-sm text-gray-600 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="px-5 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 font-medium transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminVideos;
