import { API_BASE } from "@/config";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Slide {
  id: number;
  image_url: string;
  badge_text: string;
  title: string;
  subtitle: string;
  button_primary_text: string;
  button_secondary_text: string;
}

const HeroSection = () => {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);

  

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const response = await fetch(`${API_BASE}/slider.php`);
        const data = await response.json();
        if (data.length > 0) {
          setSlides(data);
        }
      } catch (error) {
        console.error("Hero slider error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSlides();
  }, []);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides]);

  if (loading) {
    return (
      <section className="relative h-[600px] md:h-[800px] bg-gray-100 flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-primary animate-spin opacity-20" />
      </section>
    );
  }

  // Fallback slide if none in DB
  const displaySlides = slides.length > 0 ? slides : [{
    id: 0,
    image_url: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=1600&h=800&fit=crop",
    badge_text: "CERTIFIED MANUFACTURER",
    title: "PREMIUM COIR PRODUCTS FOR SUSTAINABLE GROWTH",
    subtitle: "Eco-friendly solutions for modern landscaping, gardening, and erosion control. Trusted by 500+ global clients.",
    button_primary_text: "VIEW OUR RANGE",
    button_secondary_text: "GET CUSTOM QUOTE"
  }];

  return (
    <section className="relative h-[600px] md:h-[850px] overflow-hidden bg-gray-900">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0"
        >
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
            <img
              src={displaySlides[current].image_url}
              alt="Hero Background"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          </div>

          <div className="container mx-auto h-full px-4 relative z-10 flex flex-col justify-center">
            <div className="max-w-3xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="mb-6"
              >
                <span className="inline-block bg-primary/20 backdrop-blur-md border border-primary/30 text-white text-[10px] md:text-xs font-black px-4 py-2 rounded-full tracking-[0.2em] uppercase shadow-lg">
                  {displaySlides[current].badge_text}
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="text-4xl md:text-7xl font-black text-white leading-[1.1] mb-8 tracking-tight uppercase"
              >
                {displaySlides[current].title}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.8 }}
                className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl leading-relaxed font-medium"
              >
                {displaySlides[current].subtitle}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.8 }}
                className="flex flex-wrap gap-4"
              >
                <Link
                  to="/products"
                  className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-xl flex items-center gap-3 text-xs md:text-sm font-black tracking-widest shadow-2xl transition-all hover:scale-105 active:scale-95"
                >
                  {displaySlides[current].button_primary_text}
                  <ArrowRight size={18} />
                </Link>
                <Link
                  to="/enquiry"
                  className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white px-8 py-4 rounded-xl text-xs md:text-sm font-black tracking-widest transition-all hover:scale-105 active:scale-95 shadow-xl"
                >
                  {displaySlides[current].button_secondary_text}
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Controls */}
      {displaySlides.length > 1 && (
        <>
          <button
            onClick={() => setCurrent((prev) => (prev - 1 + displaySlides.length) % displaySlides.length)}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 text-white transition-all hover:scale-110"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={() => setCurrent((prev) => (prev + 1) % displaySlides.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 text-white transition-all hover:scale-110"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}

      {/* Slide Indicators */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {displaySlides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`h-1.5 transition-all duration-500 rounded-full ${current === idx ? "w-10 bg-primary" : "w-4 bg-white/20 hover:bg-white/40"
              }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
