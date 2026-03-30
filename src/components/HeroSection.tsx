import { motion } from "framer-motion";
import heroImage from "@/assets/hero-coir.jpg";

const HeroSection = () => (
  <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
    <div className="absolute inset-0">
      <img src={heroImage} alt="Natural coir fibers" className="h-full w-full object-cover" width={1920} height={1080} />
      <div className="absolute inset-0 bg-gradient-hero" />
    </div>
    <div className="relative z-10 container mx-auto px-4 text-center">
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-sage font-medium tracking-widest uppercase text-sm mb-4"
      >
        Eco-Friendly · Natural · Premium
      </motion.p>
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground leading-tight max-w-4xl mx-auto"
      >
        Sustainable Coir Products for a{" "}
        <span className="text-gold">Greener Future</span>
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-6 text-lg text-primary-foreground/80 max-w-2xl mx-auto font-body"
      >
        From coconut husks to premium products — we craft nature's finest fibers
        into solutions that nurture your garden and protect our planet.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
      >
        <a
          href="#products"
          className="rounded-lg bg-gold px-8 py-3.5 font-semibold text-accent-foreground hover:opacity-90 transition-opacity text-sm"
        >
          Explore Products
        </a>
        <a
          href="#contact"
          className="rounded-lg border-2 border-primary-foreground/30 px-8 py-3.5 font-semibold text-primary-foreground hover:bg-primary-foreground/10 transition-colors text-sm"
        >
          Contact Us
        </a>
      </motion.div>
    </div>
    {/* scroll indicator */}
    <motion.div
      animate={{ y: [0, 10, 0] }}
      transition={{ repeat: Infinity, duration: 2 }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2"
    >
      <div className="w-6 h-10 rounded-full border-2 border-primary-foreground/40 flex items-start justify-center p-1.5">
        <div className="w-1.5 h-2.5 bg-primary-foreground/60 rounded-full" />
      </div>
    </motion.div>
  </section>
);

export default HeroSection;
