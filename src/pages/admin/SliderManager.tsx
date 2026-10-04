import { API_BASE } from "@/config";
import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Save, X, Image as ImageIcon, ArrowUp, ArrowDown, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface Slide {
  id?: number;
  image_url: string;
  badge_text: string;
  title: string;
  subtitle: string;
  button_primary_text: string;
  button_secondary_text: string;
  order_index: number;
}

const SliderManager = () => {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentSlide, setCurrentSlide] = useState<Slide>({
    image_url: "",
    badge_text: "CERTIFIED MANUFACTURER",
    title: "",
    subtitle: "",
    button_primary_text: "VIEW OUR RANGE",
    button_secondary_text: "GET CUSTOM QUOTE",
    order_index: 0
  });

  const [uploading, setUploading] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  

  useEffect(() => {
    fetchSlides();
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`${API_BASE}/upload.php`, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      
      setCurrentSlide({ ...currentSlide, image_url: data.url });
      toast.success("Image uploaded successfully");
    } catch (error: any) {
      toast.error(error.message || "Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const fetchSlides = async () => {
    try {
      const response = await fetch(`${API_BASE}/slider.php`);
      const data = await response.json();
      setSlides(data);
    } catch (error) {
      toast.error("Failed to load slides");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (uploading) {
        toast.error("Please wait for image upload to complete");
        return;
    }
    const method = currentSlide.id ? "PUT" : "POST";
    
    try {
      const response = await fetch(`${API_BASE}/slider.php`, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(currentSlide)
      });
      
      const result = await response.json();
      if (result.error) throw new Error(result.error);
      
      toast.success(currentSlide.id ? "Slide updated" : "Slide created");
      setIsEditing(false);
      resetForm();
      fetchSlides();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this slide?")) return;
    
    try {
      const response = await fetch(`${API_BASE}/slider.php?id=${id}`, { method: "DELETE" });
      const result = await response.json();
      if (result.error) throw new Error(result.error);
      
      toast.success("Slide deleted");
      fetchSlides();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const resetForm = () => {
    setCurrentSlide({
      image_url: "",
      badge_text: "CERTIFIED MANUFACTURER",
      title: "",
      subtitle: "",
      button_primary_text: "VIEW OUR RANGE",
      button_secondary_text: "GET CUSTOM QUOTE",
      order_index: slides.length
    });
  };

  if (loading) return <div className="p-8 flex justify-center"><Loader2 className="animate-spin text-primary" /></div>;

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Hero Slider Management</h1>
          <p className="text-gray-500 text-sm">Update the main banners on your home page.</p>
        </div>
        {!isEditing && (
          <button 
            onClick={() => { setIsEditing(true); resetForm(); }}
            className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-bold shadow-md hover:shadow-lg transition-all"
          >
            <Plus size={18} /> Add New Slide
          </button>
        )}
      </div>

      {isEditing && (
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-black uppercase text-gray-800">
              {currentSlide.id ? "Edit Slide" : "Create New Slide"}
            </h2>
            <button onClick={() => setIsEditing(false)} className="text-gray-400 hover:text-gray-600">
              <X size={20} />
            </button>
          </div>
          
          <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="block text-[10px] font-black uppercase text-gray-500 mb-3 tracking-widest">Background Banner Image</label>
                <div className="relative group overflow-hidden rounded-2xl bg-gray-50 border-2 border-dashed border-gray-100 hover:border-primary/30 transition-all p-3">
                  {currentSlide.image_url ? (
                    <div className="relative aspect-video rounded-xl overflow-hidden shadow-sm">
                      <img src={currentSlide.image_url} alt="Preview" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button 
                           type="button"
                           onClick={() => fileInputRef.current?.click()}
                           className="bg-white text-primary px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest shadow-xl active:scale-95 transition-all"
                        >
                          Change Image
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button 
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full aspect-video flex flex-col items-center justify-center text-gray-400 hover:text-primary transition-colors"
                    >
                      {uploading ? (
                        <Loader2 className="animate-spin mb-2" size={32} />
                      ) : (
                        <ImageIcon size={32} className="mb-2" />
                      )}
                      <span className="text-[10px] font-black uppercase tracking-widest">{uploading ? "Uploading..." : "Click to Upload Image"}</span>
                    </button>
                  )}
                  <input 
                    type="file" 
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    className="hidden"
                    accept="image/*"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-[10px] font-black uppercase text-gray-500 mb-1">Badge Text</label>
                <input 
                  type="text" 
                  value={currentSlide.badge_text}
                  onChange={e => setCurrentSlide({...currentSlide, badge_text: e.target.value})}
                  className="w-full bg-gray-50 border border-gray-100 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-1 focus:ring-primary"
                  required
                />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase text-gray-500 mb-1">Hero Title (Main Heading)</label>
                <textarea 
                  value={currentSlide.title}
                  onChange={e => setCurrentSlide({...currentSlide, title: e.target.value})}
                  className="w-full bg-gray-50 border border-gray-100 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-1 focus:ring-primary min-h-[100px]"
                  placeholder="e.g. PREMIUM COIR PRODUCTS..."
                  required
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-black uppercase text-gray-500 mb-1">Subtitle (Description)</label>
                <textarea 
                  value={currentSlide.subtitle}
                  onChange={e => setCurrentSlide({...currentSlide, subtitle: e.target.value})}
                  className="w-full bg-gray-50 border border-gray-100 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-1 focus:ring-primary min-h-[100px]"
                  placeholder="e.g. Eco-friendly solutions for modern landscaping..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black uppercase text-gray-500 mb-1">Primary Button</label>
                  <input 
                    type="text" 
                    value={currentSlide.button_primary_text}
                    onChange={e => setCurrentSlide({...currentSlide, button_primary_text: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-100 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase text-gray-500 mb-1">Secondary Button</label>
                  <input 
                    type="text" 
                    value={currentSlide.button_secondary_text}
                    onChange={e => setCurrentSlide({...currentSlide, button_secondary_text: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-100 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase text-gray-500 mb-1">Display Order</label>
                <input 
                  type="number" 
                  value={currentSlide.order_index}
                  onChange={e => setCurrentSlide({...currentSlide, order_index: parseInt(e.target.value)})}
                  className="w-full bg-gray-50 border border-gray-100 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>

            <div className="md:col-span-2 pt-4 flex gap-4">
              <button 
                type="submit"
                className="bg-primary text-white px-8 py-3 rounded-xl font-black uppercase tracking-widest text-xs flex items-center gap-2 shadow-lg active:scale-95 transition-all"
              >
                <Save size={18} /> {currentSlide.id ? "Update Banner" : "Publish Banner"}
              </button>
              <button 
                type="button"
                onClick={() => setIsEditing(false)}
                className="bg-gray-100 text-gray-500 px-8 py-3 rounded-xl font-black uppercase tracking-widest text-xs active:scale-95 transition-all"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {slides.map((slide) => (
          <div key={slide.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 group">
            <div className="relative h-48 overflow-hidden bg-gray-100">
              <img src={slide.image_url} alt={slide.title} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/20" />
              <div className="absolute top-4 left-4">
                <span className="bg-primary text-[8px] font-black uppercase text-white px-2 py-1 rounded shadow-sm tracking-widest">
                  {slide.badge_text}
                </span>
              </div>
              <div className="absolute top-4 right-4 flex gap-2">
                <button onClick={() => { setCurrentSlide(slide); setIsEditing(true); }} className="p-2 bg-white/90 backdrop-blur-md rounded-lg text-primary shadow-sm hover:bg-white transition-all">
                  <Edit size={16} />
                </button>
                <button onClick={() => slide.id && handleDelete(slide.id)} className="p-2 bg-white/90 backdrop-blur-md rounded-lg text-red-500 shadow-sm hover:bg-white transition-all">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            <div className="p-6">
              <h3 className="font-black text-gray-900 text-sm line-clamp-1 uppercase tracking-tight mb-2">{slide.title}</h3>
              <p className="text-gray-500 text-xs line-clamp-2 italic mb-4">{slide.subtitle}</p>
              <div className="flex items-center justify-between text-[10px] font-black text-gray-400 uppercase tracking-widest pt-4 border-t border-gray-50">
                <span>Order: {slide.order_index}</span>
                <div className="flex gap-2">
                   {/* Reorder logic could go here */}
                </div>
              </div>
            </div>
          </div>
        ))}
        {slides.length === 0 && !isEditing && (
          <div className="col-span-full py-20 text-center bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
            <ImageIcon size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-400 font-black uppercase tracking-widest text-xs">No hero slides found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SliderManager;
