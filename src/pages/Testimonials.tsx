import Navbar from "@/components/Navbar";
import ProfileSidebar from "@/components/ProfileSidebar";
import ContactSection from "@/components/ContactSection";
import ReviewsSection from "@/components/ReviewsSection";
import Footer from "@/components/Footer";
import { ChevronRight, Star, CheckCircle2, ChevronDown, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

const Testimonials = () => {
    const ratingBars = [
        { stars: 5, percentage: 56 },
        { stars: 4, percentage: 22 },
        { stars: 3, percentage: 11 },
        { stars: 2, percentage: 0 },
        { stars: 1, percentage: 11 },
    ];

    const satisfactionMetrics = [
        { label: "Response", percentage: 80 },
        { label: "Quality", percentage: 90 },
        { label: "Delivery", percentage: 85 },
    ];

    const reviews = [
        {
            id: 1,
            initial: "R",
            name: "Ranjan",
            location: "Bhubaneswar, Odisha",
            rating: 5,
            date: "05 Dec, 2023",
            text: "Product is good and delivered on time. Very satisfied with the service.",
            product: "Hanger Coco Basket",
            metrics: { response: true, quality: true, delivery: true },
        },
        {
            id: 2,
            initial: "A",
            name: "Anil",
            location: "Coimbatore, Tamil Nadu",
            rating: 4,
            date: "12 Nov, 2023",
            text: "Quality is decent. Packaging could be better but product is excellent.",
            product: "Coco Coir Pots",
            metrics: { response: true, quality: true, delivery: false },
        },
        {
            id: 3,
            initial: "S",
            name: "Siva Kumar",
            location: "Bangalore, Karnataka",
            rating: 5,
            date: "28 Oct, 2023",
            text: "Best price and fast delivery. Evergreen Coir is highly recommended for coir products.",
            product: "Moss Sticks",
            metrics: { response: true, quality: true, delivery: true },
            response: "Thank you for your valuable feedback! We are glad you liked our service."
        }
    ];

    return (
        <div className="bg-white min-h-screen font-sans">
            <Navbar />

            <main className="pt-[140px] md:pt-[180px] pb-12">
                <div className="container mx-auto px-4">
                    {/* Breadcrumb */}
                    <div className="flex items-center gap-1 text-[11px] text-gray-500 py-4">
                        <Link to="/" className="hover:text-primary">Home</Link>
                        <ChevronRight size={10} />
                        <span className="text-gray-900 font-bold">Testimonial</span>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Sidebar */}
                        <ProfileSidebar />

                        {/* Main Content */}
                        <div className="flex-1">
                            <h1 className="text-xl font-bold text-gray-800 mb-8 border-b border-gray-100 pb-2">Ratings & Reviews</h1>

                            {/* Ratings Header Section */}
                            <div className="grid md:grid-cols-3 gap-8 mb-12 border border-gray-100 p-8 rounded-sm bg-gray-50/30 shadow-sm">
                                {/* Aggregate Score */}
                                <div className="text-center flex flex-col items-center justify-center border-r border-gray-100 pr-8">
                                    <div className="text-5xl font-black text-gray-800 mb-2">4.2<span className="text-sm font-bold text-gray-400">/5</span></div>
                                    <div className="flex gap-1 mb-2">
                                        {[1, 2, 3, 4].map(i => <Star key={i} size={16} fill="#FACC15" className="text-yellow-400" />)}
                                        <Star size={16} className="text-gray-300" />
                                    </div>
                                    <div className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Based on 27 Reviews</div>
                                </div>

                                {/* Star Distribution */}
                                <div className="flex flex-col gap-2 justify-center border-r border-gray-100 px-8">
                                    {ratingBars.map((bar) => (
                                        <div key={bar.stars} className="flex items-center gap-3">
                                            <span className="text-[11px] font-bold text-gray-500 w-4">{bar.stars}s</span>
                                            <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                                <div className="h-full bg-green-500" style={{ width: `${bar.percentage}%` }} />
                                            </div>
                                            <span className="text-[11px] font-bold text-gray-400 w-8">{bar.percentage}%</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Performance Metrics */}
                                <div className="flex flex-col gap-4 justify-center pl-8">
                                    <div className="flex items-center gap-2 text-[10px] font-black text-green-600 uppercase tracking-widest mb-1">
                                        <CheckCircle2 size={14} />
                                        How Satisfied are you?
                                    </div>
                                    {satisfactionMetrics.map((metric) => (
                                        <div key={metric.label} className="space-y-1">
                                            <div className="flex justify-between text-[11px] font-bold text-gray-500">
                                                <span>{metric.label}</span>
                                                <span>{metric.percentage}%</span>
                                            </div>
                                            <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                                                <div className="h-full bg-green-500" style={{ width: `${metric.percentage}%` }} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Review Filter */}
                            <div className="flex items-center gap-2 text-[12px] text-gray-500 mb-8 border-b border-gray-50 pb-4">
                                <span className="font-bold">SortBy:</span>
                                <button className="flex items-center gap-1 font-black text-gray-800 border border-gray-200 px-3 py-1 rounded hover:bg-gray-50 transition-colors">
                                    Top Rated
                                    <ChevronDown size={14} />
                                </button>
                            </div>

                            {/* Review List */}
                            <div className="space-y-10">
                                {reviews.map((review) => (
                                    <div key={review.id} className="flex gap-4 pb-10 border-b border-gray-50 last:border-0 relative">
                                        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center shrink-0 border border-gray-200 shadow-sm">
                                            <span className="text-lg font-black text-gray-400">{review.initial}</span>
                                        </div>
                                        <div className="flex-1 space-y-3">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <h4 className="text-sm font-black text-gray-800">{review.name}</h4>
                                                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-tighter">{review.location}</p>
                                                </div>
                                                <div className="text-right">
                                                    <div className="flex gap-0.5 mb-1">
                                                        {Array.from({ length: 5 }).map((_, i) => (
                                                            <Star
                                                                key={i}
                                                                size={12}
                                                                fill={i < review.rating ? "#FACC15" : "none"}
                                                                className={i < review.rating ? "text-yellow-400" : "text-gray-200"}
                                                            />
                                                        ))}
                                                    </div>
                                                    <span className="text-[11px] text-gray-400">{review.date}</span>
                                                </div>
                                            </div>

                                            <p className="text-[13px] text-gray-700 leading-relaxed italic">{review.text}</p>

                                            <div className="pt-2 flex flex-wrap gap-x-6 gap-y-2 items-center text-[11px] font-bold text-gray-400">
                                                <span className="text-gray-800">Product/Service: {review.product}</span>
                                                <div className="flex items-center gap-1">
                                                    Response: <span className={review.metrics.response ? "text-green-600" : "text-gray-300"}><CheckCircle2 size={12} /></span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    Quality: <span className={review.metrics.quality ? "text-green-600" : "text-gray-300"}><CheckCircle2 size={12} /></span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    Delivery: <span className={review.metrics.delivery ? "text-green-600" : "text-gray-300"}><CheckCircle2 size={12} /></span>
                                                </div>
                                            </div>

                                            {review.response && (
                                                <div className="mt-4 bg-gray-50/80 p-4 rounded-sm border-l-4 border-green-600 space-y-2">
                                                    <div className="flex items-center gap-2 text-[11px] font-black text-gray-800 uppercase tracking-widest">
                                                        <MessageCircle size={14} className="text-green-600" />
                                                        Response from Owner
                                                    </div>
                                                    <p className="text-[12px] text-gray-600 italic leading-relaxed">{review.response}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}

                                {/* Load More Button */}
                                <div className="text-center pt-8">
                                    <button className="border border-gray-200 px-10 py-2.5 rounded text-xs font-black text-gray-500 hover:bg-gray-50 hover:text-primary transition-all uppercase tracking-widest shadow-sm">
                                        View More Reviews
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <ContactSection />
                <ReviewsSection />
                <Footer />
            </main>
        </div>
    );
};

export default Testimonials;
