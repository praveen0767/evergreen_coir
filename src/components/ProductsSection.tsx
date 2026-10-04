import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight, CheckCircle } from "lucide-react";
import productCoirPot from "@/assets/product-coir-pot.jpg";
import productMossStick from "@/assets/product-moss-stick.jpg";
import productCocopeat from "@/assets/product-cocopeat.jpg";
import productCoirMat from "@/assets/product-coir-mat.jpg";
import productMulchMat from "@/assets/product-mulch-mat.jpg";
import productNewItems from "@/assets/product-rope.jpg";
import productCoconutOil from "@/assets/product-coconut-oil.png";

const productCategories = [
  {
    title: "V² PRODUCT",
    slug: "v2-coconut-oil",
    image: productCoconutOil,
    description: "Premium cold-pressed and extra virgin organic coconut oil for health and wellness.",
    features: ["100% Organic", "Cold Pressed", "Pure & Natural"]
  },
  {
    title: "Coir Pot",
    slug: "coir-pot",
    image: productCoirPot,
    description: "Eco-friendly biodegradable pots in various sizes for healthy root growth.",
    features: ["100% Natural", "Air Permeable", "Root friendly"]
  },
  {
    title: "Moss Sticks",
    slug: "moss-sticks",
    image: productMossStick,
    description: "Sturdy support for climbing plants using premium natural coco fibers.",
    features: ["Moisture Retentive", "Plant friendly", "Durable"]
  },
  {
    title: "Cocopeat Products",
    slug: "cocopeat-products",
    image: productCocopeat,
    description: "Premium growth medium for hydroponics, nurseries, and home gardening.",
    features: ["High Water Retention", "Low EC", "Organic"]
  },
  {
    title: "Coir Mat",
    slug: "coir-mat",
    image: productCoirMat,
    description: "Heavy-duty erosion control and weed suppression mats for landscaping.",
    features: ["Erosion Control", "Weed Suppression", "Long Lasting"]
  },
  {
    title: "Mulch Mats",
    slug: "mulch-mats",
    image: productMulchMat,
    description: "Round coir mats designed to protect plant roots and retain moisture.",
    features: ["Root Protection", "Moisture Retention", "Eco-friendly"]
  },
  {
    title: "New Items",
    slug: "new-items",
    image: productNewItems,
    description: "Innovative new coir applications including needles felt and specialized ropes.",
    features: ["Innovative Design", "Versatile Use", "Premium Quality"]
  }
];

const ProductsSection = () => {
  return (
    <section id="products" className="py-24 bg-gray-50/50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-primary font-black uppercase tracking-[0.2em] text-[10px] mb-4">
              <span className="w-8 h-0.5 bg-primary" />
              Our Product Portfolio
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 leading-tight uppercase tracking-tight">
              Premium Coco Liners & <br /><span className="text-primary italic">Sustainable Coir Solutions</span>
            </h2>
          </div>
          <Link
            to="/category/coir-pot"
            className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-primary border-b-2 border-primary pb-1 hover:gap-4 transition-all"
          >
            Explore All Categories <ArrowUpRight size={18} />
          </Link>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {productCategories.map((cat, idx) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100 group flex flex-col h-full"
            >
              {/* Image Box */}
              <div className="relative aspect-square overflow-hidden bg-gray-50/80 m-4 rounded-xl border border-gray-100 flex items-center justify-center">
                <div className="absolute top-4 left-4 z-20">
                  <span className="bg-white text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-sm text-gray-800 flex items-center gap-2 border border-gray-100/50">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                    Export Quality
                  </span>
                </div>
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-contain p-10 group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Content */}
              <div className="px-8 pb-8 flex flex-col flex-1">
                <h3 className="text-2xl font-black text-gray-900 mb-3 group-hover:text-primary transition-colors tracking-tight">
                  {cat.title}
                </h3>
                <p className="text-[13px] text-gray-500 leading-relaxed mb-6 flex-1 font-medium italic">
                  {cat.description}
                </p>

                <div className="space-y-2.5 mb-8">
                  {cat.features.slice(0, 3).map(feature => (
                    <div key={feature} className="flex items-center gap-2.5 text-[10px] font-black text-gray-800 uppercase tracking-widest">
                      <div className="w-5 h-5 rounded-full bg-green-50 flex items-center justify-center">
                        <CheckCircle size={12} className="text-green-600 fill-green-600/10" />
                      </div>
                      {feature}
                    </div>
                  ))}
                </div>

                <Link
                  to={`/category/${cat.slug}`}
                  className="w-full py-3.5 text-center bg-gray-50 text-gray-400 group-hover:bg-primary group-hover:text-white rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-sm border border-gray-100"
                >
                  Explore Details
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <div className="inline-flex items-center gap-8 px-10 py-6 bg-white border border-gray-100 rounded-2xl shadow-sm">
            <div className="text-left">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-1">Bulk Orders</p>
              <p className="text-sm font-bold text-gray-800">Looking for custom dimensions or wholesale pricing?</p>
            </div>
            <Link
              to="/contact-us"
              className="bg-primary text-white px-8 py-3 rounded-lg font-black uppercase tracking-widest text-xs hover:scale-105 active:scale-95 transition-all shadow-md"
            >
              Request Quote
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
