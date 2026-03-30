import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import productCoirPot from "@/assets/product-coir-pot.jpg";
import productMossStick from "@/assets/product-moss-stick.jpg";
import productCocopeat from "@/assets/product-cocopeat.jpg";
import productCoirMat from "@/assets/product-coir-mat.jpg";
import productMulchMat from "@/assets/product-mulch-mat.jpg";
import productBasket from "@/assets/product-basket.jpg";
import productRope from "@/assets/product-rope.jpg";

const categories = ["All", "Pots", "Mats", "Garden", "Accessories"];

const products = [
  { name: "Coco Coir Pot", category: "Pots", image: productCoirPot, desc: "Biodegradable pots for seedlings and plants" },
  { name: "Moss Stick", category: "Garden", image: productMossStick, desc: "Natural support poles for climbing plants" },
  { name: "Cocopeat Pellets", category: "Garden", image: productCocopeat, desc: "Compressed growing medium for germination" },
  { name: "Coir Mat", category: "Mats", image: productCoirMat, desc: "Durable handwoven natural fiber doormats" },
  { name: "Mulch Mat", category: "Mats", image: productMulchMat, desc: "Weed-suppressing mats for tree protection" },
  { name: "Hanging Basket", category: "Pots", image: productBasket, desc: "Coco-lined hanging planters for gardens" },
  { name: "Coir Rope", category: "Accessories", image: productRope, desc: "Strong, natural coconut fiber rope" },
];

const ProductsSection = () => {
  const [active, setActive] = useState("All");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const filtered = active === "All" ? products : products.filter((p) => p.category === active);

  return (
    <section id="products" className="py-24 bg-background">
      <div className="container mx-auto px-4" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-primary font-semibold uppercase tracking-widest text-sm mb-3">Our Range</p>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground">
            Premium Coir Products
          </h2>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`rounded-full px-6 py-2 text-sm font-medium transition-all ${
                active === cat
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-secondary"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((product, i) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 * i, duration: 0.4 }}
              className="group bg-card rounded-xl overflow-hidden border border-border shadow-sm hover:shadow-lg transition-all"
            >
              <div className="relative overflow-hidden aspect-square">
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  width={640}
                  height={640}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-earth/0 group-hover:bg-earth/40 transition-colors duration-300 flex items-center justify-center">
                  <a
                    href="#enquiry"
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground"
                  >
                    Enquire Now
                  </a>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-heading text-lg font-semibold text-foreground">{product.name}</h3>
                <p className="text-muted-foreground text-sm mt-1">{product.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
