import { API_BASE } from "@/config";
import { useState, useEffect } from 'react';
import { Loader2, Save, Facebook, Instagram, Linkedin, Twitter, Youtube } from 'lucide-react';
import { toast } from 'sonner';

export default function SocialMediaAdmin() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [socials, setSocials] = useState({
    social_facebook: '',
    social_instagram: '',
    social_linkedin: '',
    social_twitter: '',
    social_youtube: ''
  });

  

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch(`${API_BASE}/settings.php`);
        const data = await response.json();
        if (data.success) {
          setSocials(prev => ({
            ...prev,
            ...data.data
          }));
        }
      } catch (error) {
        toast.error('Failed to load settings');
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSocials({
      ...socials,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch(`${API_BASE}/settings.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(socials)
      });
      const data = await response.json();
      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Social Media Links</h1>
          <p className="text-gray-500 text-sm mt-1">Manage your brand's social profile URLs shown in the footer.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-lg text-sm font-semibold shadow-sm transition-colors flex items-center gap-2 group w-full sm:w-auto justify-center"
        >
          {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
        <div className="space-y-6">
          
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                    <Facebook size={16} />
                </div>
                Facebook URL
            </label>
            <input 
              type="url"
              name="social_facebook"
              value={socials.social_facebook}
              onChange={handleChange}
              placeholder="https://facebook.com/yourpage"
              className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
                <div className="w-8 h-8 rounded-full bg-pink-50 flex items-center justify-center text-pink-600">
                    <Instagram size={16} />
                </div>
                Instagram URL
            </label>
            <input 
              type="url"
              name="social_instagram"
              value={socials.social_instagram}
              onChange={handleChange}
              placeholder="https://instagram.com/yourprofile"
              className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-700">
                    <Linkedin size={16} />
                </div>
                LinkedIn URL
            </label>
            <input 
              type="url"
              name="social_linkedin"
              value={socials.social_linkedin}
              onChange={handleChange}
              placeholder="https://linkedin.com/company/yourcompany"
              className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
                <div className="w-8 h-8 rounded-full bg-sky-50 flex items-center justify-center text-sky-500">
                    <Twitter size={16} />
                </div>
                X (Twitter) URL
            </label>
            <input 
              type="url"
              name="social_twitter"
              value={socials.social_twitter}
              onChange={handleChange}
              placeholder="https://x.com/yourhandle"
              className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
                <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center text-red-600">
                    <Youtube size={16} />
                </div>
                YouTube Channel URL
            </label>
            <input 
              type="url"
              name="social_youtube"
              value={socials.social_youtube}
              onChange={handleChange}
              placeholder="https://youtube.com/@yourchannel"
              className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>

        </div>
      </div>
    </div>
  );
}
