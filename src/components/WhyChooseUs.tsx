import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Leaf, Shield, Globe, Recycle, Sun, Truck } from "lucide-react";

const features = [
  { icon: Leaf, title: "100% Eco-Friendly", desc: "All products are biodegradable and made from renewable coconut husks." },
  { icon: Shield, title: "Premium Quality", desc: "Rigorous quality control ensures every product meets international standards." },
  { icon: Globe, title: "Export Ready", desc: "We export to 20+ countries with proper certifications and documentation." },
  { icon: Recycle, title: "Sustainable Process", desc: "Zero-waste manufacturing that turns every part of the husk into value." },
  { icon: Sun, title: "Natural & Chemical-Free", desc: "No harmful chemicals used — safe for plants, soil, and the environment." },
  { icon: Truck, title: "Reliable Delivery", desc: "On-time delivery with flexible MOQ for businesses of all sizes." },
];

const WhyChooseUs = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="why-us" className="py-24 bg-earth text-earth-foreground">
      <div className="container mx-auto px-4" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sage font-semibold uppercase tracking-widest text-sm mb-3">Why Choose Us</p>
          <h2 className="font-heading text-3xl md:text-5xl font-bold">
            Crafted with Care, Built to Last
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 * i, duration: 0.4 }}
              className="flex gap-4 p-6 rounded-xl bg-earth-foreground/5 border border-earth-foreground/10 hover:bg-earth-foreground/10 transition-colors"
            >
              <f.icon className="h-8 w-8 text-gold shrink-0 mt-1" />
              <div>
                <h3 className="font-heading text-lg font-semibold mb-2">{f.title}</h3>
                <p className="text-earth-foreground/70 text-sm leading-relaxed">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
