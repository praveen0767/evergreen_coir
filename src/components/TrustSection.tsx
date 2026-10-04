import { motion } from "framer-motion";
import {
    Briefcase, Users, Calendar, Scale,
    TrendingUp, Globe, FileText, CheckCircle2
} from "lucide-react";

const businessDetails = [
    { icon: Briefcase, label: "Nature of Business", value: "Exporter & Manufacturer" },
    { icon: Users, label: "Total Employees", value: "Upto 15 Specialized Staff" },
    { icon: Calendar, label: "Registration Date", value: "Established 2017" },
    { icon: Scale, label: "Legal Status", value: "Proprietorship Firm" },
    { icon: TrendingUp, label: "Annual Turnover", value: "₹2 - ₹5 Crores" },
    { icon: Globe, label: "Export Market", value: "Global (Europe, USA, Asia)" },
    { icon: FileText, label: "GST Compliance", value: "33AMDPV4024E1ZD" },
    { icon: CheckCircle2, label: "Quality Standard", value: "ISO 9001:2015 Certified" },
];

const TrustSection = () => {
    return (
        <section className="bg-[#0f3d2a] py-20 text-white overflow-hidden relative">
            {/* Abstract Background Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -mr-48 -mt-48" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -ml-32 -mb-32" />

            <div className="container mx-auto px-4 relative z-10">
                {/* Header Content */}
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12 mb-20">
                    <div className="max-w-3xl text-center lg:text-left">
                        <div className="inline-flex items-center gap-2 bg-primary/20 text-primary border border-primary/30 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-6">
                            <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                            Trusted Manufacturer
                        </div>
                        <h2 className="text-3xl md:text-4xl font-black leading-tight mb-6">
                            Empowering Global Agriculture with <span className="text-primary italic">Sustainable Coir Solutions.</span>
                        </h2>
                        <p className="text-white/70 text-lg leading-relaxed mb-8 font-medium">
                            We specialize in manufacturing premium Hanger Coco Baskets, Coco Pots, and Garden Coco Liners. Our facility in Pollachi utilizes advanced processing technology to ensure consistent quality for our global export partners.
                        </p>
                        <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                            <button className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg font-bold text-sm transition-all shadow-lg active:scale-95">
                                Learn About Our Process
                            </button>
                            <button className="border border-white/20 hover:bg-white/5 px-8 py-3 rounded-lg font-bold text-sm transition-all">
                                Download Brochure
                            </button>
                        </div>
                    </div>

                    {/* IndiaMart Trust Box */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-2xl p-6 flex flex-col items-center gap-2 shadow-2xl shrink-0 group hover:rotate-2 transition-all"
                    >
                        <div className="bg-[#f06d00] text-white font-black text-[11px] px-3 py-1 rounded-full uppercase tracking-tighter shadow-sm">TRUST SEAL</div>
                        <div className="text-[#1a2f5f] font-black text-2xl tracking-tighter group-hover:scale-110 transition-transform">india<span className="text-[#bf1e2e]">MART</span></div>
                        <div className="flex items-center gap-1 mt-2">
                            {[1, 2, 3, 4, 5].map(i => <div key={i} className="w-4 h-4 bg-[#f06d00] rounded-full flex items-center justify-center text-[10px] font-bold text-white leading-none">✓</div>)}
                        </div>
                        <p className="text-[#1a2f5f] text-[10px] font-black mt-2 uppercase opacity-60">Verified Supplier</p>
                    </motion.div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {businessDetails.map((detail, index) => (
                        <motion.div
                            key={detail.label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.05 }}
                            whileHover={{ y: -5 }}
                            className="bg-white/5 border border-white/10 p-6 rounded-xl hover:bg-white/10 hover:border-primary/40 transition-all group"
                        >
                            <div className="bg-primary/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary transition-colors">
                                <detail.icon size={24} className="text-primary group-hover:text-white transition-colors" />
                            </div>
                            <p className="text-[10px] uppercase font-black tracking-widest text-[#10b981] mb-2">{detail.label}</p>
                            <p className="text-sm font-bold text-white/90">{detail.value}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TrustSection;
