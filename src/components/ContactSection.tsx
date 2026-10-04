import { API_BASE } from "@/config";
import { motion } from "framer-motion";
import { MapPin, Phone, User, Facebook, Twitter, Linkedin, MessageCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const ContactSection = () => {
  const [message, setMessage] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [loading, setLoading] = useState(false);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mobileNumber.trim()) {
      toast.error("Please enter your mobile number");
      return;
    }
    if (!message.trim()) {
      toast.error("Please enter a message");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/contacts.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Website Visitor",
          mobile: mobileNumber,
          message: message
        }),
      });

      const data = await response.json();
      if (data.success) {
        toast.success("Thank you for your message!");
        setMessage("");
        setMobileNumber("");
      } else {
        toast.error(data.message || "Failed to send message");
      }
    } catch (error) {
      console.error("Error submitting message:", error);
      toast.error("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <section id="contact" className="py-16 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-0 rounded-xl overflow-hidden shadow-xl border border-gray-100">
          {/* Left Side: Green Info Box */}
          <div className="lg:w-5/12 bg-primary p-8 md:p-12 text-white">
            <h2 className="text-2xl font-bold mb-10">V² PRODUCT</h2>

            <div className="space-y-8">
              <div className="flex gap-4 items-start">
                <div className="bg-white/20 p-2 rounded shrink-0">
                  <User size={20} />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold tracking-widest opacity-80 mb-1">CONTACT PERSON</p>
                  <p className="text-sm font-semibold">M.VIJAYAKUMAR</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="bg-white/20 p-2 rounded shrink-0">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold tracking-widest opacity-80 mb-1">ADDRESS</p>
                  <p className="text-sm font-semibold leading-relaxed">
                    192, MANAIKKADU THOTTAM, SOLIPALAYAM,<br />
                    15,VELAMPALAYAM POST,<br />
                    TIRUPUR-641652
                  </p>
                  <a href="#" className="text-xs underline mt-2 block opacity-80 hover:opacity-100">Get Directions</a>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="bg-white/20 p-2 rounded shrink-0">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold tracking-widest opacity-80 mb-1">CONTACT NUMBERS</p>
                  <p className="text-sm font-semibold mb-1">+91 93345 67890</p>
                  <p className="text-sm font-semibold mb-1">+91 98949 99990</p>
                  <p className="text-sm font-semibold">+91 93629 09999</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="bg-white/20 p-2 rounded shrink-0">
                  <MessageCircle size={20} />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold tracking-widest opacity-80 mb-1">WHATSAPP NUMBER</p>
                  <p className="text-sm font-semibold">+91 93345 67890</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Contact Form */}
          <div className="lg:w-7/12 bg-white p-8 md:p-12">
            <div className="inline-block border-b-2 border-primary pb-1 mb-8">
              <h2 className="text-xl font-bold text-gray-800 tracking-wider uppercase">
                CONTACT US
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Your Mobile Number</label>
                <div className="flex border border-gray-200 rounded-lg overflow-hidden focus-within:ring-1 focus-within:ring-primary focus-within:border-primary transition-all shadow-sm">
                  <div className="flex items-center gap-2 px-4 bg-gray-50 border-r border-gray-200">
                    <img src="https://flagcdn.com/in.svg" className="w-5 h-3.5" alt="India" />
                    <span className="text-[13px] font-bold text-gray-700">+91</span>
                  </div>
                  <input
                    type="tel"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    placeholder="Enter your mobile number"
                    className="flex-1 w-full p-3.5 text-sm focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Your Message</label>
                <textarea
                  rows={6}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us about your requirement..."
                  className="w-full border border-gray-200 rounded-lg p-4 text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all"
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="bg-primary hover:bg-primary/90 text-white font-bold px-10 py-3 rounded text-sm transition-all shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? "Sending..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
