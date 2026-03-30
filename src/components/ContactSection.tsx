import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const contactInfo = [
  { icon: MapPin, label: "Address", value: "Sulakkal, Pollachi, Coimbatore, Tamil Nadu, India" },
  { icon: Phone, label: "Phone", value: "+91 80477 632 190" },
  { icon: Mail, label: "Email", value: "info@srivaricoirs.com" },
  { icon: Clock, label: "Hours", value: "Mon – Sat: 9:00 AM – 6:00 PM" },
];

const ContactSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="py-24 bg-gradient-section">
      <div className="container mx-auto px-4" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-primary font-semibold uppercase tracking-widest text-sm mb-3">Contact</p>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground">
            Find Us Here
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            {contactInfo.map((item) => (
              <div key={item.label} className="flex gap-4 items-start">
                <div className="rounded-lg bg-primary/10 p-3">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">{item.label}</p>
                  <p className="text-muted-foreground text-sm">{item.value}</p>
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="rounded-xl overflow-hidden border border-border shadow-sm h-80"
          >
            <iframe
              title="Srivari Coirs Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.123456!2d76.95!3d10.65!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sPollachi%2C+Tamil+Nadu!5e0!3m2!1sen!2sin!4v1234567890"
              className="w-full h-full"
              loading="lazy"
              allowFullScreen
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
