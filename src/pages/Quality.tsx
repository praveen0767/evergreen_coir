import Navbar from "@/components/Navbar";
import MobileBottomNav from "@/components/MobileBottomNav";
import ReviewsSection from "@/components/ReviewsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { ChevronRight, ShieldCheck, CheckCircle, Droplets, Leaf, Globe, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Quality = () => {
    const parameters = [
        { label: "Extreme Durability", icon: ShieldCheck, desc: "Our coir products are tested for structural integrity under various climate conditions." },
        { label: "Water Retention", icon: Droplets, desc: "Optimized fiber density ensures maximum hydration for plants and nurseries." },
        { label: "100% Eco-Friendly", icon: Leaf, desc: "Completely biodegradable solutions with zero chemical additives or artificial dyes." },
        { label: "Export Standard", icon: Globe, desc: "Meeting and exceeding international phytosanitary and quality guidelines." },
    ];

    const processSteps = [
        { title: "Raw Material", desc: "Sourcing premium husks from local organic coconut groves." },
        { title: "Precision Processing", desc: "Advanced fiber extraction and sterilization technology." },
        { title: "Expert Inspection", desc: "Manual check of every pot and mat by our QC cell." },
        { title: "Secure Shipping", desc: "Sea-worthy packaging for safe global transit." },
    ];

    return (
        <div className="bg-white min-h-screen font-sans">
            <Navbar />

            <main className="pt-[140px] md:pt-[180px]">
                {/* Quality Hero Section */}
                <section className="bg-[#0a291d] py-16 md:py-24 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                        <img
                            src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1600&fit=crop"
                            className="w-full h-full object-cover"
                            alt="Quality Assurance"
                        />
                    </div>
                    <div className="container mx-auto px-4 relative z-10">
                        <div className="flex items-center gap-2 text-primary font-black uppercase tracking-[0.2em] text-[10px] mb-6">
                            <Link to="/" className="hover:text-white transition-colors">Home</Link>
                            <ChevronRight size={12} />
                            <span className="text-white/50">Quality Assurance</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-white leading-tight uppercase tracking-tight mb-6">
                            Precision In Every <br />
                            <span className="text-primary italic">Fiber We Produce.</span>
                        </h1>
                        <p className="max-w-2xl text-white/70 text-lg leading-relaxed font-medium">
                            Our commitment to quality isn't just a promise; it's a measurable standard. We follow rigorous internal protocols to ensure every Evergreen Coir product is export-ready.
                        </p>
                    </div>
                </section>

                <div className="container mx-auto px-4 py-24">
                    <div id="philosophy" className="grid lg:grid-cols-2 gap-16 items-center mb-20 scroll-mt-32">
                        <div>
                            <div className="flex items-center gap-2 text-primary font-black uppercase tracking-[0.3em] text-[10px] mb-6">
                                <span className="w-8 h-0.5 bg-primary" />
                                Quality Philosophy
                            </div>
                            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-8 leading-tight uppercase">Zero Compromise on <br />Sustainability.</h2>
                            <div className="space-y-6 text-gray-600 leading-relaxed">
                                <p>
                                    At Evergreen Coir, quality controlling experts keep disciplinary vigilance on the entire business operations. From the initial procurement of raw material to the final delivery, we ensure every step adheres to industry best practices.
                                </p>
                                <p>
                                    Our coir products are strictly examined by proficient quality personnel on numerous parameters to ensure its accordance with the industry laid standards and guidelines. We believe that true quality is reflected in the success of our clients' crops and gardens.
                                </p>
                            </div>
                        </div>

                        <div id="parameters" className="grid grid-cols-1 sm:grid-cols-2 gap-4 scroll-mt-32">
                            {parameters.map((param, i) => (
                                <motion.div
                                    key={i}
                                    whileHover={{ y: -5 }}
                                    className="p-8 bg-gray-50 rounded-2xl border border-gray-100 group hover:bg-white hover:shadow-xl transition-all"
                                >
                                    <param.icon className="text-primary mb-6 group-hover:scale-110 transition-transform" size={32} />
                                    <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-3">{param.label}</h3>
                                    <p className="text-xs text-gray-500 leading-relaxed">{param.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Process Flow */}
                    <div id="process" className="bg-gray-900 rounded-[3rem] p-8 md:p-16 text-white text-center relative overflow-hidden scroll-mt-32">
                        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
                            <div className="w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary via-transparent to-transparent" />
                        </div>

                        <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-16 relative z-10">Our 4-Step <span className="text-primary italic">Assurance Cycle</span></h2>

                        <div className="grid md:grid-cols-4 gap-8 relative z-10">
                            {processSteps.map((step, i) => (
                                <div key={i} className="relative group">
                                    <div className="w-16 h-16 bg-white/[0.05] border border-white/10 rounded-full flex items-center justify-center text-2xl font-black text-primary mx-auto mb-6 group-hover:bg-primary group-hover:text-white transition-all">
                                        0{i + 1}
                                    </div>
                                    <h4 className="text-sm font-black uppercase tracking-widest mb-3">{step.title}</h4>
                                    <p className="text-xs text-white/50 leading-relaxed px-4">{step.desc}</p>
                                    {i < 3 && <div className="hidden md:block absolute top-8 -right-4 w-8 h-px bg-white/10" />}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Global Satisfaction */}
                    <div id="global" className="mt-24 text-center max-w-4xl mx-auto scroll-mt-32">
                        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary border border-primary/20 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest mb-8">
                            Global Reach
                        </div>
                        <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-8 uppercase">Growing Trust Worldwide</h2>
                        <p className="text-gray-600 leading-relaxed mb-12">
                            To satisfy our global clients, production is done under the stringent vigilance of experts in Pollachi. We cater to the emerging requirements of clients in Europe, USA, Middle East, and South-East Asia, developing product specifications that meet their unique local conditions.
                        </p>

                        <div className="flex flex-wrap justify-center gap-12 border-t border-gray-100 pt-12">
                            {[
                                { val: "500+", lbl: "Happy Clients" },
                                { val: "25+", lbl: "Coir Variants" },
                                { val: "10+", lbl: "Global Markets" },
                                { val: "ISO", lbl: "9001:2015" },
                            ].map((stat, i) => (
                                <div key={i}>
                                    <p className="text-3xl font-black text-primary mb-1">{stat.val}</p>
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">{stat.lbl}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <ReviewsSection />
                <ContactSection />
                <Footer />
            </main>
            <MobileBottomNav />
        </div>
    );
};

export default Quality;
