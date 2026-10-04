import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Award, Globe, Shield, Clock } from "lucide-react";

const stats = [
  { icon: Clock, label: "Years Experience", value: "15+" },
  { icon: Globe, label: "Countries Exported", value: "20+" },
  { icon: Award, label: "Quality Certifications", value: "5+" },
  { icon: Shield, label: "Happy Clients", value: "500+" },
];

const AboutSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 bg-gradient-section">
      <div className="container mx-auto px-4" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <p className="text-primary font-semibold uppercase tracking-widest text-sm mb-3">About Us</p>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-6">
            Rooted in Nature, Driven by Quality
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Evergreen Coir is a leading manufacturer and exporter of premium coir products based in
            Pollachi, Tamil Nadu. We transform coconut husks into eco-friendly solutions for
            gardening, agriculture, and beyond — serving customers across 20+ countries.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              className="bg-card rounded-xl p-6 text-center shadow-sm border border-border hover:shadow-md transition-shadow"
            >
              <stat.icon className="h-8 w-8 text-primary mx-auto mb-3" />
              <p className="font-heading text-3xl font-bold text-foreground">{stat.value}</p>
              <p className="text-muted-foreground text-sm mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
