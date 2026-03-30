import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Send } from "lucide-react";
import { toast } from "sonner";

const EnquirySection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Thank you! We'll get back to you shortly.");
    setForm({ name: "", phone: "", email: "", message: "" });
  };

  return (
    <section id="enquiry" className="py-24 bg-background">
      <div className="container mx-auto px-4 max-w-2xl" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-primary font-semibold uppercase tracking-widest text-sm mb-3">Get in Touch</p>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground">
            Request a Quote
          </h2>
          <p className="text-muted-foreground mt-4">
            Interested in our products? Fill out the form and our team will reach out within 24 hours.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="bg-card rounded-2xl p-8 shadow-lg border border-border space-y-6"
        >
          {[
            { id: "name", label: "Full Name", type: "text", placeholder: "Your name" },
            { id: "phone", label: "Phone Number", type: "tel", placeholder: "+91 XXXXX XXXXX" },
            { id: "email", label: "Email Address", type: "email", placeholder: "you@example.com" },
          ].map((field) => (
            <div key={field.id} className="relative">
              <label htmlFor={field.id} className="block text-sm font-medium text-foreground mb-1.5">
                {field.label}
              </label>
              <input
                id={field.id}
                type={field.type}
                required
                placeholder={field.placeholder}
                value={form[field.id as keyof typeof form]}
                onChange={(e) => setForm({ ...form, [field.id]: e.target.value })}
                className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
              />
            </div>
          ))}
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1.5">
              Message
            </label>
            <textarea
              id="message"
              rows={4}
              required
              placeholder="Tell us about your requirements..."
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow resize-none"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-lg bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
          >
            <Send size={16} />
            Send Enquiry
          </button>
        </motion.form>
      </div>
    </section>
  );
};

export default EnquirySection;
