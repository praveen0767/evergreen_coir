import { API_BASE } from "@/config";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactSection";
import { ChevronRight, MapPin, Phone, User, Facebook, Twitter, Linkedin, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";

const Contact = () => {

    const [formData, setFormData] = useState({ mobile: '', name: '', message: '' });
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.mobile || !formData.message) {
            toast.error("Please fill all required fields");
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(`${API_BASE}/contacts.php`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (data.success) {
                toast.success("Message sent successfully! We will contact you soon.");
                setFormData({ mobile: '', name: '', message: '' });
            } else {
                toast.error(data.message || "Failed to send message");
            }
        } catch (error) {
            console.error("Error submitting contact form:", error);
            toast.error("An error occurred. Please try again later.");
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="bg-white min-h-screen font-sans">
            <Navbar />

            <main className="pt-[140px] md:pt-[180px]">
                {/* Banner Section */}
                <div className="bg-[#1b8a5a] text-white pt-8 pb-32">
                    <div className="container mx-auto px-4 max-w-6xl">
                        {/* Breadcrumb */}
                        <div className="flex items-center gap-1 text-[10px] font-medium py-4 opacity-80">
                            <Link to="/" className="hover:underline">Home</Link>
                            <ChevronRight size={10} strokeWidth={3} />
                            <span className="font-bold">Contact Us</span>
                        </div>
                    </div>
                </div>

                {/* Contact Card Overlap */}
                <div className="container mx-auto px-4 max-w-6xl -mt-24 mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-lg shadow-[0_10px_50px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden"
                    >
                        <div className="p-8 md:p-12">
                            <h1 className="text-xl font-bold text-gray-800 mb-8 uppercase tracking-widest border-b border-gray-100 pb-4">
                                Contact Us
                            </h1>

                            <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
                                {/* Left Column: Details */}
                                <div className="space-y-10">
                                    {/* Contact Person */}
                                    <div className="flex gap-5">
                                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center shrink-0">
                                            <User className="text-gray-600" size={24} />
                                        </div>
                                        <div>
                                            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">Contact Person</p>
                                            <p className="text-sm font-bold text-gray-800">M.VIJAYAKUMAR</p>
                                        </div>
                                    </div>

                                    {/* Address */}
                                    <div className="flex gap-5">
                                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center shrink-0">
                                            <MapPin className="text-gray-600" size={24} />
                                        </div>
                                        <div>
                                            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">Address</p>
                                            <p className="text-[13px] font-bold text-gray-700 leading-relaxed max-w-xs">
                                                192, MANAIKKADU THOTTAM, SOLIPALAYAM, 15,VELAMPALAYAM POST, TIRUPUR-641652
                                            </p>
                                            <Link to="#" className="text-primary text-[11px] font-bold flex items-center gap-1 mt-2 hover:underline">
                                                <MapPin size={10} /> Get Directions
                                            </Link>
                                        </div>
                                    </div>

                                    {/* Contact Number */}
                                    <div className="flex gap-5">
                                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center shrink-0">
                                            <Phone className="text-gray-600" size={24} />
                                        </div>
                                        <div>
                                            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">Contact Number</p>
                                            <p className="text-sm font-bold text-gray-800">+91 93345 67890</p>
                                            <p className="text-sm font-bold text-gray-800">+91 98949 99990</p>
                                            <p className="text-sm font-bold text-gray-800">+91 93629 09999</p>
                                        </div>
                                    </div>

                                    {/* Whatsapp Number */}
                                    <div className="flex gap-5">
                                        <div className="w-12 h-12 bg-[#25D366]/10 rounded-full flex items-center justify-center shrink-0">
                                            <MessageCircle className="text-[#25D366]" size={24} />
                                        </div>
                                        <div>
                                            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">WhatsApp Number</p>
                                            <p className="text-sm font-bold text-gray-800">+91 93345 67890</p>
                                        </div>
                                    </div>

                                </div>

                                {/* Right Column: Form */}
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="space-y-4">
                                        <div className="space-y-1.5">
                                            <label className="text-sm font-bold text-gray-700">Your Mobile Number</label>
                                            <div className="flex border border-gray-200 rounded overflow-hidden">
                                                <div className="flex items-center gap-1.5 px-3 bg-gray-50 border-r border-gray-200">
                                                    <img src="https://flagcdn.com/in.svg" className="w-4 h-3" alt="India" />
                                                    <span className="text-[13px] font-bold text-gray-600">+91</span>
                                                </div>
                                                <input
                                                    type="tel"
                                                    name="mobile"
                                                    value={formData.mobile}
                                                    onChange={handleChange}
                                                    placeholder="Enter your number"
                                                    className="flex-1 px-4 py-3 text-sm focus:outline-none focus:ring-0"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-sm font-bold text-gray-700">Your Name</label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                placeholder="Enter your name"
                                                className="w-full px-4 py-3 border border-gray-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-primary/20 focus:border-primary transition-all"
                                            />
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-sm font-bold text-gray-700">Your Message</label>
                                            <textarea
                                                rows={4}
                                                name="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                placeholder="Describe you requirement in detail"
                                                className="w-full px-4 py-3 border border-gray-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                                            />
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full sm:w-auto bg-[#1b8a5a] hover:bg-[#146b45] text-white px-10 py-3.5 rounded font-bold text-sm transition-all shadow-md active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        {loading ? "Sending..." : "Contact Now"}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <ContactSection />
            </main>

            <Footer />
        </div>
    );
};

export default Contact;
