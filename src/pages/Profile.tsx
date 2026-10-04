import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import MobileBottomNav from "@/components/MobileBottomNav";
import ContactSection from "@/components/ContactSection";
import ReviewsSection from "@/components/ReviewsSection";
import Footer from "@/components/Footer";
import { ChevronRight, Calendar, Users, Briefcase, Award, ShieldCheck, Factory, Warehouse } from "lucide-react";
import { motion } from "framer-motion";

const Profile = () => {
    const galleryItems = [
        { title: "Manufacturing Unit", icon: Factory, img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=600&h=400&fit=crop", link: "/quality#process" },
        { title: "Corporate Office", icon: Briefcase, img: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=600&h=400&fit=crop", link: "/quality#philosophy" },
        { title: "Global Warehouse", icon: Warehouse, img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=600&h=400&fit=crop", link: "/quality#global" },
        { title: "Quality Testing", icon: ShieldCheck, img: "https://images.unsplash.com/photo-1579165466511-70e21ad1083d?q=80&w=600&h=400&fit=crop", link: "/quality#parameters" }
    ];

    const facts = [
        { label: "Established", value: "2017", icon: Calendar },
        { label: "Ownership", value: "Proprietorship", icon: Users },
        { label: "Employees", value: "Upto 15 Staff", icon: Users },
        { label: "Export Market", value: "Global", icon: Award },
    ];

    return (
        <div className="bg-white min-h-screen font-sans">
            <Navbar />

            <main className="pt-[140px] md:pt-[180px]">
                {/* Profile Hero Section */}
                <section className="bg-[#0a291d] py-16 md:py-24 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                        <img
                            src="https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=1600&fit=crop"
                            className="w-full h-full object-cover"
                            alt="Background"
                        />
                    </div>
                    <div className="container mx-auto px-4 relative z-10">
                        <div className="flex items-center gap-2 text-primary font-black uppercase tracking-[0.2em] text-[10px] mb-6">
                            <Link to="/" className="hover:text-white transition-colors">Home</Link>
                            <ChevronRight size={12} />
                            <span className="text-white/50">Company Profile</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-white leading-tight uppercase tracking-tight mb-6">
                            Rooted in Quality, <br />
                            <span className="text-primary italic">Exporting Excellence.</span>
                        </h1>
                        <p className="max-w-2xl text-white/70 text-lg leading-relaxed font-medium">
                            Evergreen Coir is a premier manufacturer and global exporter based in Pollachi, India. Since 2017, we have been delivering sustainable coir solutions to nurseries, landscaping professionals, and home gardeners worldwide.
                        </p>
                    </div>
                </section>

                <div className="container mx-auto px-4 py-20">
                    <div className="grid lg:grid-cols-3 gap-16">
                        {/* Company Biography */}
                        <div className="lg:col-span-2 space-y-8">
                            <div>
                                <h2 className="text-sm font-black text-primary uppercase tracking-[0.3em] mb-6 border-b border-gray-100 pb-4 inline-block">Our Story</h2>
                                <div className="text-gray-600 text-[15px] leading-relaxed space-y-6">
                                    <p>
                                        Established in 2017, <span className="font-bold text-gray-900">Evergreen Coir</span> has quickly risen to become a trusted name in the global coir industry. Nestled in the fertile region of Pollachi, Coimbatore, we leverage the finest coconut resources and traditional expertise combined with modern manufacturing processes.
                                    </p>
                                    <p>
                                        Our core mission is to provide eco-friendly alternatives to plastic gardening products. From our decorative Hanging Coco Baskets to our high-yield Cocopeat blocks, every product is crafted with precision and environmental responsibility under the leadership of <span className="font-bold text-gray-900">M.VIJAYAKUMAR</span>.
                                    </p>
                                </div>
                            </div>

                            {/* Factsheet Cards */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-8">
                                {facts.map((fact, i) => (
                                    <div key={i} className="bg-gray-50 p-6 rounded-2xl border border-gray-100 flex flex-col items-center text-center group hover:bg-primary hover:border-primary transition-all">
                                        <fact.icon className="text-primary mb-3 group-hover:text-white transition-colors" size={24} />
                                        <p className="text-[10px] font-black uppercase tracking-wider text-gray-400 group-hover:text-white/70 mb-1">{fact.label}</p>
                                        <p className="text-xs font-bold text-gray-800 group-hover:text-white">{fact.value}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Detailed Info Table (Modernized) */}
                            <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm">
                                <div className="p-8 bg-gray-50 border-b border-gray-100">
                                    <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight">Statutory & Statutory Highlights</h3>
                                </div>
                                <div className="p-8 grid md:grid-cols-2 gap-x-12 gap-y-6 text-sm">
                                    {[
                                        { label: "Legal Status", value: "Proprietorship" },
                                        { label: "GST Registration", value: "01-07-2017" },
                                        { label: "GST Number", value: "33AMDPV4024E1ZD" },
                                        { label: "Export Code (IEC)", value: "3209024821" },
                                        { label: "Main Market", value: "Manufacturer & Exporter" },
                                        { label: "Annual Turnover", value: "₹2 - ₹5 Crores" },
                                    ].map((item, idx) => (
                                        <div key={idx} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0 hover:border-primary/30 transition-colors">
                                            <span className="font-bold text-gray-400 uppercase text-[10px] tracking-widest">{item.label}</span>
                                            <span className="font-bold text-gray-800">{item.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Infrastructure Showcase Sidebar */}
                        <div className="space-y-12">
                            <div>
                                <h3 className="text-sm font-black text-primary uppercase tracking-[0.3em] mb-8">Our Infrastructure</h3>
                                <div className="space-y-6">
                                    {galleryItems.map((item, i) => (
                                        <motion.div
                                            key={i}
                                            whileHover={{ scale: 1.02 }}
                                            className="group relative h-48 rounded-2xl overflow-hidden shadow-md cursor-pointer"
                                        >
                                            <Link to={item.link} className="block w-full h-full">
                                                <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent group-hover:via-primary/20 transition-all" />

                                                {/* Hover Overlay Text */}
                                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <span className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest text-primary shadow-lg">
                                                        View Details
                                                    </span>
                                                </div>

                                                <div className="absolute bottom-4 left-4 flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white">
                                                        <item.icon size={16} />
                                                    </div>
                                                    <span className="text-xs font-black uppercase text-white tracking-widest">{item.title}</span>
                                                </div>
                                            </Link>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* Team Highlights */}
                            <div className="bg-[#0a291d] p-8 rounded-3xl text-white">
                                <h4 className="text-xs font-black uppercase tracking-[0.3em] text-primary mb-6">Our Experts</h4>
                                <ul className="space-y-4">
                                    {[
                                        "Production Managers",
                                        "Quality Inspection Cell",
                                        "Eco-Design Specialists",
                                        "Logistics Team",
                                        "R & D Development Cell"
                                    ].map(team => (
                                        <li key={team} className="flex items-center gap-3 text-xs font-bold text-white/80 italic">
                                            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                            {team}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <ContactSection />
                <ReviewsSection />
                <Footer />
            </main>
            <MobileBottomNav />
        </div>
    );
};

export default Profile;
