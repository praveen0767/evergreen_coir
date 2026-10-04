import { API_BASE } from "@/config";
import { Star, MessageCircle, Phone, IndianRupee, FileText, ChevronUp, ChevronDown, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

interface ProductCardProps {
    id: number | string;
    title: string;
    price: string;
    unit: string;
    moq: string;
    images: string[];
    specs: { label: string; value: string }[];
    description: string;
    brochure?: string;
}

const ProductCard = ({ id, title, price, unit, moq, images, specs, description, brochure }: ProductCardProps) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [mobileNumber, setMobileNumber] = useState('');
    const [loadingSubmit, setLoadingSubmit] = useState(false);
    const { customer, setLoginModalOpen } = useAuth();

    const handleActionClick = () => {
        if (!customer) {
            setLoginModalOpen(true);
        } else {
            setIsModalOpen(true);
        }
    };

    const handleQuickInquiry = async () => {
        if (!customer && !mobileNumber) {
            toast.error('Please enter your mobile number');
            return;
        }

        setLoadingSubmit(true);
        try {
            if (customer) {
                const response = await fetch(`${API_BASE}/orders.php`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        customer_id: customer.id,
                        product_id: parseInt(id as string),
                        product_name: title,
                        price: price,
                        quantity: 1
                    }),
                });

                const data = await response.json();
                if (data.success) {
                    toast.success("Order request placed successfully! We will contact you soon.");
                    setIsModalOpen(false);
                } else {
                    toast.error(data.message || "Failed to place order");
                }
            } else {
                const response = await fetch(`${API_BASE}/contacts.php`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        name: "Quick Inquiry User",
                        mobile: mobileNumber,
                        message: `I am interested in the product: ${title}`
                    }),
                });

                const data = await response.json();
                if (data.success) {
                    toast.success("Inquiry sent successfully! We will contact you soon.");
                    setIsModalOpen(false);
                    setMobileNumber('');
                } else {
                    toast.error(data.message || "Failed to send inquiry");
                }
            }
        } catch (error) {
            console.error("Error submitting inquiry:", error);
            toast.error("An error occurred. Please try again later.");
        } finally {
            setLoadingSubmit(false);
        }
    };

    return (
        <div className="bg-white border-t border-gray-100 py-8 first:border-0 relative">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Left: Vertical Thumbnail Strip + Main Image */}
                <div className="flex gap-4 shrink-0">
                    <div className="hidden sm:flex flex-col gap-2 w-16">
                        <button className="h-6 flex items-center justify-center text-gray-300 hover:text-primary transition-colors">
                            <ChevronUp size={16} />
                        </button>
                        {images.map((img, i) => (
                            <div key={i} className="aspect-square border border-gray-100 rounded-sm overflow-hidden cursor-pointer hover:border-primary transition-colors">
                                <img src={img} alt={`${title} thumb ${i}`} className="w-full h-full object-cover" />
                            </div>
                        ))}
                        <button className="h-6 flex items-center justify-center text-gray-300 hover:text-primary transition-colors">
                            <ChevronDown size={16} />
                        </button>
                    </div>

                    <div className="w-full md:w-[320px] aspect-square relative border border-gray-50 rounded bg-white p-4">
                        <img
                            src="https://img.icons8.com/color/48/000000/verified-badge.png"
                            className="absolute top-2 left-2 w-8 h-8 z-10"
                            alt="Brand Logo"
                        />
                        <img
                            src={images[0]}
                            alt={title}
                            className="w-full h-full object-contain"
                        />
                    </div>
                </div>

                {/* Right Content Area */}
                <div className="flex-1">
                    <div className="flex justify-between items-start mb-4">
                        <Link to={`/product/${id}`}>
                            <h3 className="text-xl font-bold text-gray-900 uppercase tracking-tight hover:text-primary transition-colors cursor-pointer">{title}</h3>
                        </Link>
                        <button onClick={handleActionClick} className="border border-green-600/30 text-green-700 px-4 py-1.5 rounded flex items-center gap-2 text-[10px] font-black uppercase tracking-widest hover:bg-green-50 transition-colors shadow-sm">
                            <Phone size={14} className="fill-green-700" />
                            Request a Call Back
                        </button>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-baseline gap-4">
                            <div className="flex items-baseline gap-1">
                                <span className="text-2xl font-black text-gray-900 flex items-center">
                                    <IndianRupee size={20} strokeWidth={3} />
                                    {price}
                                </span>
                                <span className="text-sm font-bold text-gray-400">/ {unit}</span>
                            </div>
                            <button onClick={handleActionClick} className="text-[11px] font-bold text-green-600 hover:underline">Price on Request</button>
                        </div>

                        <p className="text-xs font-bold text-gray-500">Minimum Order Quantity: <span className="text-gray-900">{moq}</span></p>

                        {brochure && (
                            <a href={brochure.startsWith('http') ? brochure : `${API_BASE}/${brochure}`} target="_blank" rel="noreferrer" download className="flex items-center gap-2 text-xs font-bold text-gray-600 group cursor-pointer hover:text-primary w-fit">
                                <div className="w-8 h-8 bg-red-50 rounded flex items-center justify-center text-red-500">
                                    <FileText size={18} />
                                </div>
                                <span className="border-b border-dotted border-gray-400 group-hover:border-primary">Product Brochure</span>
                            </a>
                        )}

                        {/* Spec Table */}
                        <div className="border border-gray-100 rounded-sm overflow-hidden bg-gray-50/10">
                            {specs.map((spec, i) => (
                                <div key={i} className="grid grid-cols-2 border-b border-gray-50 last:border-0 hover:bg-white transition-colors">
                                    <div className="px-4 py-2.5 text-xs font-medium text-gray-500 border-r border-gray-50">{spec.label}</div>
                                    <div className="px-4 py-2.5 text-xs font-bold text-gray-800">{spec.value}</div>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-wrap gap-4 pt-4">
                            <button onClick={handleActionClick} className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded flex items-center gap-2 text-xs font-black uppercase tracking-widest shadow-md transition-all active:scale-95">
                                <MessageCircle size={16} />
                                Get Best Quote
                            </button>
                            <button onClick={handleActionClick} className="border border-green-600 text-green-600 hover:bg-green-50 px-8 py-3 rounded text-xs font-black uppercase tracking-widest transition-all">
                                Yes! I am interested
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal Overlay */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white w-full max-w-4xl rounded border shadow-2xl relative flex flex-col md:flex-row overflow-y-auto max-h-[90vh]">
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 z-10"
                        >
                            <X size={24} />
                        </button>

                        {/* Left Pane - Product Details */}
                        <div className="w-full md:w-[40%] bg-gray-50 border-r border-gray-100 p-6 flex flex-col gap-4">
                            <div className="bg-white border border-gray-100 rounded shadow-sm overflow-hidden items-center justify-center flex">
                                <img src={images[0] || 'https://via.placeholder.com/400'} alt={title} className="w-full object-cover aspect-video sm:aspect-square" />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900 text-lg leading-tight">{title}</h3>
                                <p className="text-gray-800 mt-3 font-semibold">
                                    {price.includes('₹') ? price : `₹ ${price}`} {unit && `/ ${unit}`}
                                </p>
                                <p className="text-[11px] text-gray-500 mt-1 mb-3">Sold By - <span className="text-gray-700">V² Production</span></p>

                                <div className="mt-2 text-[11px] text-gray-700 space-y-1 font-medium">
                                    {specs.slice(0, 5).map((spec, i) => (
                                        <p key={i}>{spec.label}-{spec.value}</p>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Pane - Form */}
                        <div className="w-full md:w-[60%] p-8 md:p-12 flex flex-col justify-center">
                            <h2 className="text-xl text-gray-800 mb-6">Share your requirement with "<span className="font-bold">V² Production</span>"</h2>

                            <div className="space-y-6 max-w-sm">
                                {customer ? (
                                    <div>
                                        <p className="text-[13px] text-gray-700 block mb-2 font-bold">Ordering as: {customer.name}</p>
                                        <p className="text-[12px] text-gray-500 mt-1 mb-4 flex items-center gap-2">
                                            <Phone size={14} /> +91 {customer.mobile}
                                        </p>
                                    </div>
                                ) : (
                                    <div>
                                        <label className="text-[13px] text-gray-700 block mb-2">Mobile Number</label>
                                        <div className="flex border border-teal-300 rounded overflow-hidden">
                                            <div className="flex items-center gap-1.5 px-3 bg-gray-50 border-r border-teal-300 shrink-0">
                                                <img src="https://flagcdn.com/in.svg" className="w-4 h-3" alt="India" />
                                                <span className="text-[13px] font-bold text-gray-700">+91</span>
                                            </div>
                                            <input
                                                type="tel"
                                                value={mobileNumber}
                                                onChange={(e) => setMobileNumber(e.target.value)}
                                                placeholder="Enter your mobile"
                                                className="flex-1 px-4 py-2.5 text-sm focus:outline-none"
                                            />
                                        </div>
                                        <p className="text-[11px] text-gray-500 mt-2">We will contact you on this number</p>
                                    </div>
                                )}

                                <button
                                    onClick={handleQuickInquiry}
                                    disabled={loadingSubmit || (!customer && !mobileNumber)}
                                    className="bg-[#00a884] hover:bg-[#008f6f] text-white px-8 py-2.5 rounded font-bold text-sm transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {loadingSubmit ? 'Sending...' : (customer ? 'Confirm Order' : 'Contact Now')}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductCard;
