import { API_BASE } from "@/config";
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Star, MessageCircle, Phone, IndianRupee,
  FileText, ChevronUp, ChevronDown, ChevronRight,
  ShieldCheck, Loader2, ArrowLeft, X
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactSection";
import { toast } from 'sonner';
import { useAuth } from "@/contexts/AuthContext";

interface Product {
  id: number;
  name: string;
  category_name: string;
  price: string;
  moq: number;
  description: string;
  brochure_url: string;
  specifications: string;
  images: { image_url: string }[];
}

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
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
        // Place an actual order
        const response = await fetch(`${API_BASE}/orders.php`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            customer_id: customer.id,
            product_id: product?.id,
            product_name: product?.name,
            price: product?.price,
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
        // Generic contact request
        const response = await fetch(`${API_BASE}/contacts.php`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: "Quick Inquiry User",
            mobile: mobileNumber,
            message: `I am interested in the product: ${product?.name}`
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

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${API_BASE}/products.php?id=${id}`);
        const data = await response.json();
        if (data.error) throw new Error(data.error);
        setProduct(data);
      } catch (error) {
        console.error('Fetch error:', error);
        toast.error('Product not found');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-primary opacity-20" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
        <h1 className="text-2xl font-bold text-gray-800">Product not found</h1>
        <Link to="/products" className="text-primary font-bold hover:underline">Back to Products</Link>
      </div>
    );
  }

  const specs = product.specifications ? JSON.parse(product.specifications) : {};

  return (
    <div className="bg-white min-h-screen font-sans">
      <Navbar />

      <main className="pt-[140px] md:pt-[180px] pb-12">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Breadcrumb */}
          <div className="flex items-center gap-1 text-[11px] text-gray-500 py-4 mb-6">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight size={10} />
            <Link to="/products" className="hover:text-primary transition-colors">Products</Link>
            <ChevronRight size={10} />
            <span className="text-gray-900 font-bold">{product.name}</span>
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm p-6 md:p-10 mb-12">
            <div className="flex flex-col md:flex-row gap-12">

              {/* Left: Vertical Thumbnail Strip + Main Image */}
              <div className="flex gap-4 shrink-0 w-full md:w-auto">
                <div className="hidden sm:flex flex-col gap-3 w-20">
                  <button className="h-8 flex items-center justify-center text-gray-300 hover:text-primary transition-colors bg-gray-50 rounded-lg">
                    <ChevronUp size={20} />
                  </button>
                  {product.images.map((img, i) => (
                    <div
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      className={`aspect-square border-2 rounded-xl overflow-hidden cursor-pointer transition-all ${selectedImage === i ? 'border-primary shadow-md' : 'border-gray-100 hover:border-gray-300'}`}
                    >
                      <img src={img.image_url} alt={`${product.name} thumb ${i}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                  <button className="h-8 flex items-center justify-center text-gray-300 hover:text-primary transition-colors bg-gray-50 rounded-lg">
                    <ChevronDown size={20} />
                  </button>
                </div>

                <div className="flex-1 md:w-[450px] aspect-square relative border border-gray-100 rounded-2xl bg-white p-6 shadow-inner group">
                  <div className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm border border-blue-50">
                    <ShieldCheck className="text-blue-500 w-5 h-5" />
                    <span className="text-[10px] font-black text-blue-900 uppercase tracking-widest">Verified Multi-Vendor</span>
                  </div>
                  <img
                    src={product.images[selectedImage]?.image_url || 'https://via.placeholder.com/450'}
                    alt={product.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>

              {/* Right Content Area */}
              <div className="flex-1 space-y-8">
                <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                  <div>
                    <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-[10px] font-black uppercase tracking-widest mb-3 inline-block">
                      {product.category_name}
                    </span>
                    <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tight leading-tight">{product.name}</h1>
                  </div>
                  <button onClick={handleActionClick} className="whitespace-nowrap border-2 border-green-600 text-green-700 px-6 py-2.5 rounded-xl flex items-center gap-2 text-[11px] font-black uppercase tracking-widest hover:bg-green-50 transition-all shadow-sm active:scale-95 group">
                    <Phone size={16} className="fill-green-700 group-hover:scale-110 transition-transform" />
                    Request a Call Back
                  </button>
                </div>

                <div className="space-y-6">
                  <div className="flex items-baseline gap-4">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-black text-gray-900 flex items-center">
                        {product.price.includes('₹') ? (
                          <>{product.price.split(' ')[0]} <span className="ml-1">{product.price.split(' ')[1]}</span></>
                        ) : (
                          <>₹ {product.price}</>
                        )}
                      </span>
                    </div>
                    <button onClick={handleActionClick} className="text-[12px] font-black text-green-600 hover:underline uppercase tracking-widest bg-green-50 px-3 py-1 rounded-lg">Price on Request</button>
                  </div>

                  <p className="text-sm font-bold text-gray-500 flex items-center gap-2 italic">
                    <span className="w-2 h-2 bg-primary rounded-full"></span>
                    Minimum Order Quantity: <span className="text-gray-900 not-italic">{product.moq} Piece</span>
                  </p>

                  {product.brochure_url && (
                    <a
                      href={product.brochure_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-sm font-bold text-gray-600 group cursor-pointer hover:text-primary w-fit"
                    >
                      <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center text-red-500 shadow-sm border border-red-100 group-hover:scale-110 transition-transform">
                        <FileText size={22} />
                      </div>
                      <span className="border-b-2 border-dotted border-gray-300 group-hover:border-primary transition-colors">Product Brochure</span>
                    </a>
                  )}

                  {/* Spec Table */}
                  <div className="border border-gray-100 rounded-2xl overflow-hidden bg-gray-50/10 shadow-sm max-w-lg">
                    {Object.entries(specs).map(([key, value], i) => (
                      <div key={i} className="grid grid-cols-2 border-b border-gray-50 last:border-0 hover:bg-white transition-colors">
                        <div className="px-6 py-4 text-[12px] font-bold text-gray-400 uppercase tracking-widest border-r border-gray-50">{String(key)}</div>
                        <div className="px-6 py-4 text-[13px] font-black text-gray-800">{String(value)}</div>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-4 pt-6">
                    <button onClick={handleActionClick} className="bg-green-600 hover:bg-green-700 text-white px-10 py-4 rounded-2xl flex items-center gap-3 text-sm font-black uppercase tracking-widest shadow-xl shadow-green-600/30 transition-all active:scale-95 group">
                      <MessageCircle size={20} className="group-hover:rotate-12 transition-transform" />
                      Get Best Quote
                    </button>
                    <button onClick={handleActionClick} className="border-2 border-green-600 text-green-600 hover:bg-green-50 px-10 py-4 rounded-2xl text-sm font-black uppercase tracking-widest transition-all active:scale-95">
                      Yes! I am interested
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Description Section */}
            <div className="mt-16 pt-16 border-t border-gray-100">
              <h2 className="text-xl font-black text-gray-900 mb-6 uppercase tracking-tight">Product Description</h2>
              <div className="text-gray-600 text-[15px] leading-relaxed space-y-4 max-w-4xl font-medium">
                {product.description.split('\n').map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
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
                    <img src={product.images[0]?.image_url || 'https://via.placeholder.com/400'} alt={product.name} className="w-full object-cover aspect-video sm:aspect-square" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg leading-tight">{product.name}</h3>
                    <p className="text-gray-800 mt-3 font-semibold">
                      {product.price.includes('₹') ? product.price : `₹ ${product.price}`}
                    </p>
                    <p className="text-[11px] text-gray-500 mt-1 mb-3">Sold By - <span className="text-gray-700">V² Production</span></p>

                    <div className="mt-2 text-[11px] text-gray-700 space-y-1 font-medium">
                      {Object.entries(specs).slice(0, 5).map(([k, v]) => (
                        <p key={k}>{String(k)}-{String(v)}</p>
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

        <ContactSection />
        <Footer />
      </main>
    </div>
  );
};

export default ProductDetail;
