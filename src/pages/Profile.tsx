import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import MobileBottomNav from "@/components/MobileBottomNav";
import ContactSection from "@/components/ContactSection";
import ReviewsSection from "@/components/ReviewsSection";
import Footer from "@/components/Footer";
import { ChevronRight, Calendar, Users, Briefcase, Award, ShieldCheck, Factory, Warehouse, Pencil, LogOut, Save, X } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { API_BASE } from "@/config";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

const Profile = () => {
    const { customer, setCustomer, logout, setLoginModalOpen } = useAuth();
    const [editing, setEditing] = useState(false);
    const [saving, setSaving] = useState(false);
    const [name, setName] = useState(customer?.name ?? "");
    const [mobile, setMobile] = useState(customer?.mobile ?? "");

    const beginEdit = () => {
        if (!customer) {
            setLoginModalOpen(true);
            return;
        }
        setName(customer.name);
        setMobile(customer.mobile);
        setEditing(true);
    };

    const cancelEdit = () => {
        setName(customer?.name ?? "");
        setMobile(customer?.mobile ?? "");
        setEditing(false);
    };

    const saveProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!customer) return;

        const normalizedMobile = mobile.replace(/\D/g, "");
        if (!name.trim() || normalizedMobile.length !== 10) {
            toast.error("Enter a valid name and 10-digit mobile number.");
            return;
        }

        setSaving(true);
        try {
            const response = await fetch(`${API_BASE}/customer_auth.php`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    action: "update_profile",
                    id: customer.id,
                    name: name.trim(),
                    mobile: normalizedMobile
                })
            });
            const data = await response.json();
            if (!response.ok || !data.success) throw new Error(data.message || "Failed to update profile");

            setCustomer(data.customer);
            setEditing(false);
            toast.success("Profile updated successfully.");
        } catch (error: any) {
            toast.error(error.message || "Failed to update profile.");
        } finally {
            setSaving(false);
        }
    };

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
                <section className="bg-[#0a291d] py-16 md:py-24 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                        <img src="https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=1600&fit=crop" className="w-full h-full object-cover" alt="Background" />
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

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-8">
                                {facts.map((fact, i) => (
                                    <div key={i} className="bg-gray-50 p-6 rounded-2xl border border-gray-100 flex flex-col items-center text-center group hover:bg-primary hover:border-primary transition-all">
                                        <fact.icon className="text-primary mb-3 group-hover:text-white transition-colors" size={24} />
                                        <p className="text-[10px] font-black uppercase tracking-wider text-gray-400 group-hover:text-white/70 mb-1">{fact.label}</p>
                                        <p className="text-xs font-bold text-gray-800 group-hover:text-white">{fact.value}</p>
                                    </div>
                                ))}
                            </div>

                            <section className="bg-[#f8faf8] border border-gray-100 rounded-3xl p-6 md:p-8 shadow-sm">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-2">Customer Account</p>
                                        <h2 className="text-2xl font-black text-gray-900">Profile & Settings</h2>
                                        <p className="text-sm text-gray-500 mt-1">
                                            {customer ? "Manage the name and mobile number attached to your customer account." : "Sign in to manage your customer profile and settings."}
                                        </p>
                                    </div>
                                    {customer ? (
                                        <div className="flex gap-2">
                                            {!editing && (
                                                <button onClick={beginEdit} className="inline-flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest hover:border-primary hover:text-primary transition-all">
                                                    <Pencil size={14} /> Edit Profile
                                                </button>
                                            )}
                                            <button onClick={logout} className="inline-flex items-center gap-2 bg-white border border-red-100 text-red-500 px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-red-50 transition-all">
                                                <LogOut size={14} /> Logout
                                            </button>
                                        </div>
                                    ) : (
                                        <button onClick={() => setLoginModalOpen(true)} className="bg-primary text-white px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-primary/90 transition-all">
                                            Sign In
                                        </button>
                                    )}
                                </div>

                                {customer ? (
                                    editing ? (
                                        <form onSubmit={saveProfile} className="grid md:grid-cols-2 gap-5">
                                            <div>
                                                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Full Name</label>
                                                <input value={name} onChange={e => setName(e.target.value)} className="w-full border border-gray-200 bg-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" required />
                                            </div>
                                            <div>
                                                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Mobile Number</label>
                                                <div className="flex border border-gray-200 bg-white rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary">
                                                    <span className="flex items-center px-3 bg-gray-50 border-r border-gray-200 text-sm font-bold text-gray-700">+91</span>
                                                    <input type="tel" value={mobile} onChange={e => setMobile(e.target.value.replace(/\D/g, "").slice(0,10))} className="flex-1 px-3 py-3 text-sm focus:outline-none" maxLength={10} required />
                                                </div>
                                            </div>
                                            <div className="md:col-span-2 flex gap-3">
                                                <button type="submit" disabled={saving} className="inline-flex items-center gap-2 bg-primary text-white px-5 py-3 rounded-xl text-xs font-black uppercase tracking-widest disabled:opacity-60">
                                                    <Save size={14} /> {saving ? "Saving..." : "Save Changes"}
                                                </button>
                                                <button type="button" onClick={cancelEdit} className="inline-flex items-center gap-2 bg-white border border-gray-200 text-gray-600 px-5 py-3 rounded-xl text-xs font-black uppercase tracking-widest">
                                                    <X size={14} /> Cancel
                                                </button>
                                            </div>
                                        </form>
                                    ) : (
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div className="bg-white border border-gray-100 rounded-2xl p-5">
                                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Name</p>
                                                <p className="font-bold text-gray-900">{customer.name}</p>
                                            </div>
                                            <div className="bg-white border border-gray-100 rounded-2xl p-5">
                                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Mobile</p>
                                                <p className="font-bold text-gray-900">+91 {customer.mobile}</p>
                                            </div>
                                        </div>
                                    )
                                ) : (
                                    <div className="bg-white border border-dashed border-gray-200 rounded-2xl p-6 text-sm text-gray-500">
                                        Your customer session is currently signed out. Use <button onClick={() => setLoginModalOpen(true)} className="font-bold text-primary hover:underline">Welcome Back</button> to sign in.
                                    </div>
                                )}
                            </section>

                            <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm">
                                <div className="p-8 bg-gray-50 border-b border-gray-100">
                                    <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight">Statutory Highlights</h3>
                                </div>
                                <div className="p-8 grid md:grid-cols-2 gap-x-12 gap-y-6 text-sm">
                                    {[
                                        { label: "Legal Status", value: "Proprietorship" },
                                        { label: "GST Registration", value: "01-07-2017" },
                                        { label: "GST Number", value: "33AMDPV4024E1ZD" },
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

                        <div className="space-y-12">
                            <div>
                                <h3 className="text-sm font-black text-primary uppercase tracking-[0.3em] mb-8">Our Infrastructure</h3>
                                <div className="space-y-6">
                                    {galleryItems.map((item, i) => (
                                        <motion.div key={i} whileHover={{ scale: 1.02 }} className="group relative h-48 rounded-2xl overflow-hidden shadow-md cursor-pointer">
                                            <Link to={item.link} className="block w-full h-full">
                                                <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent group-hover:via-primary/20 transition-all" />
                                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <span className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest text-primary shadow-lg">View Details</span>
                                                </div>
                                                <div className="absolute bottom-4 left-4 flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white"><item.icon size={16} /></div>
                                                    <span className="text-xs font-black uppercase text-white tracking-widest">{item.title}</span>
                                                </div>
                                            </Link>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-[#0a291d] p-8 rounded-3xl text-white">
                                <h4 className="text-xs font-black uppercase tracking-[0.3em] text-primary mb-6">Our Experts</h4>
                                <ul className="space-y-4">
                                    {["Production Managers", "Quality Inspection Cell", "Eco-Design Specialists", "Logistics Team", "R & D Development Cell"].map(team => (
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
