import { Link, useLocation } from "react-router-dom";

const ProfileSidebar = () => {
    const location = useLocation();

    const sidebarLinks = [
        { label: "Profile", to: "/profile" },
        { label: "Testimonial", to: "/testimonials" },
        { label: "Quality", to: "/quality" },
        { label: "Distributor Enquiry Form", to: "/enquiry" },
        { label: "Download Brochure", to: "#" },
    ];

    const isActive = (to: string) => {
        return location.pathname === to;
    };

    return (
        <aside className="w-full lg:w-72 shrink-0">
            <div className="border border-gray-200 rounded-sm overflow-hidden bg-white shadow-sm">
                <div className="bg-white px-4 py-3 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-gray-900">Profile</h2>
                </div>
                <div className="flex flex-col">
                    {sidebarLinks.map((link) => (
                        <Link
                            key={link.label}
                            to={link.to}
                            className={`px-4 py-3.5 text-left text-[14px] font-medium border-b border-gray-100 last:border-b-0 transition-all flex items-center justify-between group ${isActive(link.to) ? "text-green-600 bg-gray-50/50" : "text-gray-600 hover:text-green-600 hover:bg-gray-50/30"
                                }`}
                        >
                            <span>{link.label}</span>
                            {isActive(link.to) && <div className="w-1.5 h-6 bg-green-600 rounded-l-sm" />}
                        </Link>
                    ))}
                </div>
            </div>
        </aside>
    );
};

export default ProfileSidebar;
