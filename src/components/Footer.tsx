import { API_BASE } from "@/config";
import v2Logo from "@/assets/v2square-logo2.jpeg";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Send, MessageCircle } from "lucide-react";
import { useState, useEffect } from "react";

const Footer = () => {
  const [socials, setSocials] = useState({
    social_facebook: '#',
    social_instagram: '#',
    social_linkedin: '#'
  });

  const [categories, setCategories] = useState<{ name: string, slug: string }[]>([]);

  useEffect(() => {
    fetch(`${API_BASE}/settings.php`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          setSocials(prev => ({
            ...prev,
            ...data.data
          }));
        }
      })
      .catch(err => console.error("Error loading settings:", err));

    fetch(`${API_BASE}/categories.php`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setCategories(data.filter(c => c.status === 'Active' && c.slug));
        }
      })
      .catch(err => console.error("Error loading categories:", err));
  }, []);

  return (
    <footer className="relative bg-[#0a291d] text-white pt-24 pb-12 overflow-hidden">
      {/* Decorative Top Border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          {/* Brand Column */}
          <div className="space-y-8">
            <Link to="/" className="flex items-center gap-3 group">
              <img src={v2Logo} alt="V² PRODUCT Logo" className="h-16 w-auto object-contain bg-white rounded-xl p-1 shadow-lg group-hover:scale-105 transition-transform" />
              <div>
                <h2 className="text-xl font-black tracking-tight uppercase">V² PRODUCT</h2>
                <p className="text-[10px] text-primary font-black uppercase tracking-[0.2em]">Quality First</p>
              </div>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed">
              Leading manufacturer and exporter of premium coir products from Pollachi, India. Committed to sustainable agriculture and global quality standards.
            </p>
            <div className="flex gap-4">
              {socials.social_facebook && (
                <a href={socials.social_facebook} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary transition-all text-white/50 hover:text-white">
                  <Facebook size={18} />
                </a>
              )}
              {socials.social_instagram && (
                <a href={socials.social_instagram} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary transition-all text-white/50 hover:text-white">
                  <Instagram size={18} />
                </a>
              )}
              {socials.social_linkedin && (
                <a href={socials.social_linkedin} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary transition-all text-white/50 hover:text-white">
                  <Linkedin size={18} />
                </a>
              )}
            </div>
          </div>

          {/* Categories Column */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.3em] text-primary mb-8 ml-4 border-l-2 border-primary pl-4">Our Products</h4>
            <ul className="space-y-4">
              {Array.isArray(categories) && categories.map((item) => (
                <li key={item.slug}>
                  <Link to={`/category/${item.slug}`} className="text-sm text-white/50 hover:text-primary hover:pl-2 transition-all flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/10" /> {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.3em] text-primary mb-8 ml-4 border-l-2 border-primary pl-4">Company</h4>
            <ul className="space-y-4">
              {[
                { name: "About Profile", to: "/profile" },
                { name: "Quality Standards", to: "/quality" },
                { name: "Testimonials", to: "/testimonials" },
                { name: "Contact Us", to: "/contact-us" },
                { name: "Sitemap", to: "#" }
              ].map((item) => (
                <li key={item.name}>
                  <Link to={item.to} className="text-sm text-white/50 hover:text-primary hover:pl-2 transition-all flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/10" /> {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.3em] text-primary mb-8 ml-4 border-l-2 border-primary pl-4">Contact Detail</h4>
            <div className="space-y-6">
              <div className="flex items-start gap-4 text-white/60 group">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-white transition-all">
                  <MapPin size={18} />
                </div>
                <p className="text-sm leading-relaxed">
                  192, MANAIKKADU THOTTAM, SOLIPALAYAM, 15,VELAMPALAYAM POST, TIRUPUR-641652
                </p>
              </div>
              <div className="flex items-start gap-4 text-white/60 group">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-white transition-all">
                  <Phone size={18} />
                </div>
                <div>
                  <p className="text-sm font-black text-white">+91 93345 67890</p>
                  <p className="text-sm font-black text-white">+91 98949 99990</p>
                  <p className="text-sm font-black text-white">+91 93629 09999</p>
                  <p className="text-[10px] uppercase font-bold text-white/40">Contact Numbers</p>
                </div>
              </div>
              <div className="flex items-start gap-4 text-white/60 group">
                <div className="w-10 h-10 rounded-lg bg-[#25D366]/20 flex items-center justify-center text-[#25D366] shrink-0 group-hover:bg-[#25D366] group-hover:text-white transition-all">
                  <MessageCircle size={18} />
                </div>
                <div>
                  <p className="text-sm font-black text-white">+91 93345 67890</p>
                  <p className="text-[10px] uppercase font-bold text-white/40">WhatsApp Number</p>
                </div>
              </div>
              <div className="flex items-start gap-4 text-white/60 group">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-white transition-all">
                  <Mail size={18} />
                </div>
                <p className="text-sm">v2squareproducts@gmail.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <p className="text-[10px] font-black uppercase tracking-widest text-white/40">
              © {new Date().getFullYear()} V² PRODUCT. All rights reserved.
            </p>
            <div className="hidden md:block h-4 w-px bg-white/10" />
            <p className="text-[10px] font-bold text-white/30 uppercase">GST No: 33AMDPV4024E1ZD</p>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 grayscale brightness-200 opacity-30 hover:opacity-100 transition-all cursor-pointer">
              <span className="text-[9px] font-bold uppercase tracking-widest">Verified on</span>
              <div className="bg-white rounded px-2 py-0.5">
                <span className="text-[8px] font-black italic text-[#1a2f5f]">indiamart</span>
              </div>
            </div>
            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/20">Pollachi, India</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
