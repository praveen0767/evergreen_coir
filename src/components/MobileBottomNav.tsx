import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, User, Grid, Mail, Phone, ChevronUp, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { API_BASE } from "@/config";
import { normalizeBrandingName } from "@/lib/branding";

const MobileBottomNav = () => {
    const location = useLocation();
    const [activeDrawer, setActiveDrawer] = useState<"profile" | "range" | null>(null);

    const [categories, setCategories] = useState<{name: string, slug: string}[]>([]);

    useEffect(() => {
        fetch(`${API_BASE}/categories.php`)
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setCategories(data.filter(c => c.status === 'Active' && c.slug).map(c => ({ ...c, name: normalizeBrandingName(c.name) })));
                }
            })
            .catch(err => console.error("Error loading categories:", err));
    }, []);

    const profileLinks = [
        { name: "Profile", to: "/profile" },
        { name: "Testimonial", to: "/testimonials" },
        { name: "Quality", to: "/quality" },
        { name: "Distributor Enquiry Form", to: "/contact-us" },
    ];

    const navItems = [
        { label: "Home", icon: Home, to: "/", type: "link" },
        { label: "Profile", icon: User, type: "drawer", id: "profile" },
        { label: "Our Range", icon: Grid, type: "main", id: "range" },
        { label: "Contact Us", icon: Mail, to: "/contact-us", type: "link" },
        { label: "Call Us", icon: Phone, to: "tel:+917860567867", type: "external" },
    ];

    return (
        <>
            {/* Bottom Nav Bar */}
            <div className="fixed bottom-0 left-0 right-0 z-[60] lg:hidden">
                <div className="bg-white border-t border-gray-100 flex items-end justify-around px-2 pb-2 h-16 relative">

                    {/* Raised Center Background Circle (Visual only) */}
                    <div className="absolute left-1/2 -translate-x-1/2 -top-6 w-16 h-16 bg-white rounded-full border-t border-gray-100 shadow-[-1px_-5px_10px_rgba(0,0,0,0.02)] z-[-1]" />

                    {navItems.map((item, idx) => {
                        const Icon = item.icon;
                        const IsActive = item.to === location.pathname;

                        if (item.type === "main") {
                            return (
                                <button
                                    key={idx}
                                    onClick={() => setActiveDrawer(activeDrawer === "range" ? null : "range")}
                                    className="flex flex-col items-center mb-4 relative z-10"
                                >
                                    <div className="w-14 h-14 bg-white rounded-full flex flex-col items-center justify-center -mt-6 border border-gray-50 shadow-md">
                                        <ChevronUp size={16} className={`mb-0.5 text-primary transition-transform ${activeDrawer === "range" ? "rotate-180" : ""}`} />
                                        <Icon size={22} className={activeDrawer === "range" ? "text-primary" : "text-gray-400"} />
                                    </div>
                                    <span className={`text-[10px] mt-1 font-medium ${activeDrawer === "range" ? "text-primary" : "text-gray-500"}`}>
                                        {item.label}
                                    </span>
                                </button>
                            );
                        }

                        if (item.type === "drawer") {
                            return (
                                <button
                                    key={idx}
                                    onClick={() => setActiveDrawer(activeDrawer === "profile" ? null : "profile")}
                                    className="flex flex-col items-center py-2 h-full justify-center flex-1"
                                >
                                    <Icon size={22} className={activeDrawer === "profile" ? "text-primary" : "text-gray-400"} />
                                    <span className={`text-[10px] mt-1 font-medium ${activeDrawer === "profile" ? "text-primary" : "text-gray-500"}`}>
                                        {item.label}
                                    </span>
                                </button>
                            );
                        }

                        const isExternal = item.type === "external";
                        const LinkComponent = isExternal ? "a" : Link;
                        const linkProps = isExternal ? { href: item.to } : { to: item.to || "/" };

                        return (
                            <LinkComponent
                                key={idx}
                                {...(linkProps as any)}
                                className="flex flex-col items-center py-2 h-full justify-center flex-1"
                            >
                                <Icon size={22} className={IsActive ? "text-primary font-bold" : "text-gray-400"} />
                                <span className={`text-[10px] mt-1 font-medium ${IsActive ? "text-primary font-bold" : "text-gray-500"}`}>
                                    {item.label}
                                </span>
                            </LinkComponent>
                        );
                    })}
                </div>
            </div>

            {/* Drawers */}
            <AnimatePresence>
                {activeDrawer && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setActiveDrawer(null)}
                            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[70] lg:hidden"
                        />
                        <motion.div
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-[80] lg:hidden shadow-2xl p-6"
                        >
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-bold text-primary uppercase tracking-wider">
                                    {activeDrawer === "range" ? "Products" : "Profile"}
                                </h3>
                                <button onClick={() => setActiveDrawer(null)} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                                    <X size={20} className="text-gray-400" />
                                </button>
                            </div>

                            <div className="space-y-4 relative">
                                {/* Accent Pink Line */}
                                <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-pink-500 rounded-full" />

                                {(Array.isArray(activeDrawer === "range" ? categories : profileLinks) ? (activeDrawer === "range" ? categories : profileLinks) : []).map((item, idx) => (
                                    <Link
                                        key={idx}
                                        to={activeDrawer === "range" ? `/category/${(item as any).slug}` : (item as any).to}
                                        onClick={() => setActiveDrawer(null)}
                                        className="block pl-5 py-2 text-[14px] text-gray-700 hover:text-primary font-medium hover:translate-x-1 transition-all"
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                            <div className="h-20" /> {/* Space for bottom nav */}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default MobileBottomNav;
