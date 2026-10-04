import { API_BASE } from "@/config";
import { Star, ThumbsUp } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

interface Feedback {
    id: number;
    reviewer_name: string;
    location: string;
    product_name: string;
    rating: number;
    review_text: string;
    metric_response: boolean;
    metric_quality: boolean;
    metric_delivery: boolean;
    seller_response: string | null;
    response_date: string | null;
    status: string;
    created_at: string;
}

const ReviewsSection = () => {
    const [reviews, setReviews] = useState<Feedback[]>([]);
    const [loading, setLoading] = useState(true);

    const totalReviews = reviews.length;
    const avgRating = totalReviews > 0 ? (reviews.reduce((acc, curr) => acc + curr.rating, 0) / totalReviews).toFixed(1) : "0.0";
    
    const ratingCounts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    let metricsCounts = { response: 0, quality: 0, delivery: 0 };
    
    reviews.forEach(r => {
        if (r.rating >= 1 && r.rating <= 5) {
            ratingCounts[r.rating as keyof typeof ratingCounts]++;
        }
        if (r.metric_response) metricsCounts.response++;
        if (r.metric_quality) metricsCounts.quality++;
        if (r.metric_delivery) metricsCounts.delivery++;
    });

    const ratingBars = [5, 4, 3, 2, 1].map(stars => ({
        stars,
        percentage: totalReviews > 0 ? Math.round((ratingCounts[stars as keyof typeof ratingCounts] / totalReviews) * 100) : 0
    }));

    const dynamicMetrics = [
        { l: "Response", p: totalReviews > 0 ? Math.round((metricsCounts.response / totalReviews) * 100) : 0 },
        { l: "Quality", p: totalReviews > 0 ? Math.round((metricsCounts.quality / totalReviews) * 100) : 0 },
        { l: "Delivery", p: totalReviews > 0 ? Math.round((metricsCounts.delivery / totalReviews) * 100) : 0 }
    ];

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const res = await axios.get(`${API_BASE}/feedbacks.php`);
                if (res.data.success) {
                    // Filter only approved reviews
                    const approved = res.data.data.filter((f: Feedback) => f.status === "Approved");
                    setReviews(approved);
                }
            } catch (error) {
                console.error("Error fetching reviews:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, []);

    // Format date string
    const formatDate = (dateStr: string) => {
        if (!dateStr) return "";
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: '2-digit' }).replace(/ /g, '-');
    };

    return (
        <div className="border-t border-gray-100 pt-12 mt-16">
            <div className="text-center mb-8">
                <h2 className="text-lg font-bold text-gray-900 inline-block border-b-2 border-primary pb-1">Ratings & Reviews</h2>
            </div>

            {/* Aggregate Header */}
            <div className="grid md:grid-cols-3 gap-8 mb-12 border border-gray-100 p-8 rounded-sm bg-gray-50/20">
                <div className="text-center flex flex-col items-center justify-center border-r border-gray-100">
                    <div className="text-4xl font-black text-gray-800">{avgRating}<span className="text-xs text-gray-400">/5</span></div>
                    <div className="flex gap-1 my-2">
                        {[1, 2, 3, 4, 5].map(i => <Star key={i} size={14} fill={i <= Math.round(Number(avgRating)) ? "#FACC15" : "transparent"} className={i <= Math.round(Number(avgRating)) ? "text-yellow-400" : "text-gray-300"} />)}
                    </div>
                    <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest">Reviewed by {totalReviews} Users</p>
                </div>

                <div className="flex flex-col gap-1 px-8 border-r border-gray-100">
                    {ratingBars.map(bar => (
                        <div key={bar.stars} className="flex items-center gap-2">
                            <span className="text-[10px] font-bold text-gray-500 w-4">{bar.stars}★</span>
                            <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full bg-green-500" style={{ width: `${bar.percentage}%` }} />
                            </div>
                            <span className="text-[10px] text-gray-400 w-8">{bar.percentage}%</span>
                        </div>
                    ))}
                </div>

                <div className="pl-8 space-y-4">
                    <div className="flex items-center gap-2 text-[10px] font-black text-green-600 uppercase">
                        <ThumbsUp size={12} />
                        User Satisfaction
                    </div>
                    {dynamicMetrics.map(m => (
                        <div key={m.l} className="space-y-1">
                            <div className="flex justify-between text-[10px] font-bold text-gray-500">
                                <span>{m.l}</span>
                                <span>{m.p}%</span>
                            </div>
                            <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full bg-green-600" style={{ width: `${m.p}%` }} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-6 px-1">Most Relevant Reviews</p>

            {/* 3-Column Reviews Grid */}
            {loading ? (
                <div className="text-center py-8 text-gray-400 text-sm">Loading reviews...</div>
            ) : reviews.length === 0 ? (
                <div className="text-center py-8 text-gray-400 text-sm">No recent reviews yet.</div>
            ) : (
                <div className="grid md:grid-cols-3 gap-6 mb-12">
                    {reviews.map(review => (
                        <div key={review.id} className="bg-white border border-gray-100 p-6 rounded-sm shadow-sm hover:shadow-md transition-shadow space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-black text-gray-400">
                                    {review.reviewer_name?.[0]?.toUpperCase() || 'U'}
                                </div>
                                <div className="text-right">
                                    <div className="flex gap-0.5 mb-1">
                                        {[1, 2, 3, 4, 5].map(i => <Star key={i} size={10} fill={i <= review.rating ? "#FACC15" : "transparent"} className={i <= review.rating ? "text-yellow-400" : "text-gray-200"} />)}
                                    </div>
                                    <span className="text-[9px] text-gray-400">{formatDate(review.created_at)}</span>
                                </div>
                            </div>
                            <div>
                                <h4 className="text-xs font-black text-gray-800 uppercase">{review.reviewer_name}</h4>
                                {review.location && <p className="text-[9px] text-gray-400 font-bold uppercase">{review.location}</p>}
                            </div>
                            <p className="text-[10px] font-bold text-gray-500 border-t border-gray-50 pt-2">Product Name : {review.product_name}</p>
                            {review.review_text && <p className="text-[11px] text-gray-600 italic leading-relaxed">{review.review_text}</p>}

                            {(review.metric_response || review.metric_quality || review.metric_delivery) && (
                                <div className="flex gap-3 text-[9px] font-black text-gray-400">
                                    {review.metric_response && <div className="flex items-center gap-1">Response <ThumbsUp size={10} className="text-green-600" /></div>}
                                    {review.metric_quality && <div className="flex items-center gap-1">Quality <ThumbsUp size={10} className="text-green-600" /></div>}
                                    {review.metric_delivery && <div className="flex items-center gap-1">Delivery <ThumbsUp size={10} className="text-green-600" /></div>}
                                </div>
                            )}

                            {review.seller_response && (
                                <div className="bg-gray-50 p-3 rounded-sm space-y-1 border-l-2 border-green-600">
                                    <p className="text-[9px] font-black text-gray-800">Response from Seller ({formatDate(review.response_date || review.created_at)})</p>
                                    <p className="text-[10px] text-gray-600 italic">{review.seller_response}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            <div className="text-center">
                <button className="border border-primary text-primary px-8 py-2 rounded text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all shadow-sm">
                    View More Reviews
                </button>
            </div>
        </div>
    );
};

export default ReviewsSection;
