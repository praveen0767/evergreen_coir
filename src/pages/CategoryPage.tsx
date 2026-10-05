import { API_BASE } from "@/config";
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { ChevronRight, Filter, Loader2, Search } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { toast } from "sonner";
import { normalizeBrandingName } from "@/lib/branding";

interface Product {
    id: number;
    name: string;
    price: string;
    moq: number;
    description: string;
    images: { image_url: string }[];
    specifications: any;
    brochure_url?: string;
}

const CategoryPage = () => {
    const { categoryId } = useParams<{ categoryId: string }>();
    const [products, setProducts] = useState<Product[]>([]);
    const [categoryName, setCategoryName] = useState("");
    const [categoryDesc, setCategoryDesc] = useState("");
    const [loading, setLoading] = useState(true);
    

    useEffect(() => {
        const fetchCategoryProducts = async () => {
            setLoading(true);
            try {
                // Fetch by slug (which is passed as categoryId parameter from URL)
                const response = await fetch(`${API_BASE}/products.php?category_slug=${categoryId}`);
                const data = await response.json();
                
                if (data.error) {
                    throw new Error(data.error);
                }
                
                if (data.length > 0) {
                    setCategoryName(normalizeBrandingName(data[0].category_name));
                    setCategoryDesc(data[0].category_description || "");
                    setProducts(data);
                } else {
                    // Fallback to static title if no products yet
                    setCategoryName(normalizeBrandingName(categoryId?.replace(/-/g, " ").toUpperCase() || ""));
                }
            } catch (error) {
                console.error("Fetch error:", error);
                toast.error("Failed to load products");
            } finally {
                setLoading(false);
            }
        };

        if (categoryId) {
            fetchCategoryProducts();
        }
    }, [categoryId]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-12 h-12 animate-spin text-primary opacity-20" />
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen font-sans">
            <Navbar />

            <main className="pt-[140px] md:pt-[180px] pb-12">
                <div className="container mx-auto px-4 max-w-6xl">
                    {/* Breadcrumb */}
                    <div className="flex items-center gap-1 text-[11px] text-gray-500 py-4 mb-2">
                        <Link to="/" className="hover:text-primary transition-colors">Home</Link>
                        <ChevronRight size={10} />
                        <span className="text-gray-400">Garden Coco Liners and Coir Products</span>
                        <ChevronRight size={10} />
                        <span className="text-gray-900 font-bold">{categoryName}</span>
                    </div>

                    <div className="mb-10">
                        <h1 className="text-3xl font-black text-gray-900 mb-4 inline-block border-b-4 border-green-600 pb-1 uppercase tracking-tight">
                            {categoryName}
                        </h1>
                        <p className="text-[13px] text-gray-600 leading-relaxed max-w-5xl font-medium">
                            {categoryDesc || "We are a leading Manufacturer and exporter of high-quality coco coir products from Pollachi, India."}
                        </p>
                    </div>

                    {/* Product List */}
                    <div className="space-y-4 border-b border-gray-100 mb-12">
                        {products.length > 0 ? (
                            products.map((product) => (
                                <ProductCard 
                                    key={product.id} 
                                    id={product.id}
                                    title={product.name}
                                    price={product.price}
                                    unit="Piece"
                                    moq={`${product.moq} Piece`}
                                    images={product.images.map(img => img.image_url)}
                                    specs={Object.entries(product.specifications || {}).map(([label, value]) => ({ label, value: String(value) }))}
                                    description={product.description}
                                    brochure={product.brochure_url}
                                />
                            ))
                        ) : (
                            <div className="py-20 text-center border-2 border-dashed border-gray-100 rounded-2xl">
                                <Search className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                                <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">No products found in this category</p>
                            </div>
                        )}
                    </div>

                    {/* Footer Filter Area */}
                    <div className="flex justify-between items-center py-6 text-[10px] font-black text-green-700 uppercase tracking-widest border-t border-gray-50">
                        <div className="flex gap-8">
                            <button className="hover:underline uppercase tracking-widest">View More Products</button>
                            <button className="hover:underline uppercase tracking-widest">Contact Supplier</button>
                        </div>
                        <div className="flex gap-4 items-center">
                            <Filter size={12} />
                            <span>Refine Search</span>
                        </div>
                    </div>
                </div>

                <ContactSection />
                <Footer />
            </main>
        </div>
    );
};

export default CategoryPage;
