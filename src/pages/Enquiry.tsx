import Navbar from "@/components/Navbar";
import ProfileSidebar from "@/components/ProfileSidebar";
import ReviewsSection from "@/components/ReviewsSection";
import Footer from "@/components/Footer";
import { ChevronRight, Paperclip, Send } from "lucide-react";
import { Link } from "react-router-dom";

const Enquiry = () => {
    return (
        <div className="bg-white min-h-screen font-sans">
            <Navbar />

            <main className="pt-[140px] md:pt-[180px] pb-12">
                {/* Breadcrumb */}
                <div className="container mx-auto px-4">
                    <div className="flex items-center gap-1 text-[11px] text-gray-500 py-4">
                        <Link to="/" className="hover:text-primary">Home</Link>
                        <ChevronRight size={10} />
                        <span className="text-gray-900 font-bold">Distributor Enquiry Form</span>
                    </div>
                </div>

                {/* Green Banner */}
                <div className="bg-green-600 py-6 mb-8 mt-4">
                    <div className="container mx-auto px-4 text-center">
                        <h1 className="text-2xl font-bold text-white uppercase tracking-wider">
                            WE ARE LOOKING FOR DISTRIBUTOR.
                            <div className="w-16 h-1 bg-white/40 mx-auto mt-2 rounded-full" />
                        </h1>
                    </div>
                </div>

                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row gap-12">
                        {/* Sidebar */}
                        <ProfileSidebar />

                        {/* Main Form Content */}
                        <div className="flex-1">
                            <div className="bg-white border border-gray-100 rounded shadow-lg p-8 md:p-12 -mt-16 relative z-10">
                                <form className="max-w-3xl mx-auto space-y-8">
                                    {/* Name */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-800">Your Name</label>
                                        <input
                                            type="text"
                                            placeholder="Enter your Name"
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded text-sm focus:outline-none focus:border-primary transition-colors"
                                        />
                                    </div>

                                    {/* Mobile Number */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-800">Your Mobile Number</label>
                                        <div className="flex">
                                            <div className="flex items-center gap-1 px-4 py-3 bg-gray-50 border border-gray-200 border-r-0 rounded-l text-sm">
                                                <img src="https://flagcdn.com/in.svg" className="w-4 h-3" alt="India flag" />
                                                <span className="text-gray-600">+91</span>
                                            </div>
                                            <input
                                                type="tel"
                                                placeholder="Enter your Mobile Number:"
                                                className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-r text-sm focus:outline-none focus:border-primary transition-colors"
                                            />
                                        </div>
                                    </div>

                                    {/* Email */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-800">Your Email</label>
                                        <input
                                            type="email"
                                            placeholder="Enter your Email"
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded text-sm focus:outline-none focus:border-primary transition-colors"
                                        />
                                    </div>

                                    {/* Company Name */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-800">Your Company Name</label>
                                        <input
                                            type="text"
                                            placeholder="Enter your Company Name"
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded text-sm focus:outline-none focus:border-primary transition-colors"
                                        />
                                    </div>

                                    {/* Business Experience */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-800">Total experience in business</label>
                                        <input
                                            type="text"
                                            placeholder="Enter your Total experience in business"
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded text-sm focus:outline-none focus:border-primary transition-colors"
                                        />
                                    </div>

                                    {/* Message */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-800">Your Message</label>
                                        <textarea
                                            placeholder="Your Message"
                                            rows={6}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded text-sm focus:outline-none focus:border-primary transition-colors resize-none"
                                        />
                                    </div>

                                    {/* Attachment */}
                                    <div className="flex items-center gap-4 py-2">
                                        <div className="flex items-center gap-2 text-xs font-bold text-gray-500 cursor-pointer hover:text-primary">
                                            <Paperclip size={16} />
                                            Attachment
                                        </div>
                                        <input type="file" className="text-xs text-gray-400 file:mr-4 file:py-1 file:px-4 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-gray-100 file:text-gray-500 hover:file:bg-gray-200" />
                                    </div>

                                    {/* Submit Button */}
                                    <div className="pt-4">
                                        <button className="bg-primary hover:bg-primary/90 text-white px-12 py-3.5 rounded font-black uppercase tracking-widest text-xs transition-all shadow-md flex items-center gap-2">
                                            Submit
                                        </button>
                                    </div>
                                </form>
                            </div>

                            {/* Shared Reviews Section */}
                            <ReviewsSection />
                        </div>
                    </div>
                </div>

                <Footer />
            </main>
        </div>
    );
};

export default Enquiry;
