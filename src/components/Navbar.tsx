import { useState, useEffect } from "react";
import { API_BASE } from "@/config";
import v2Logo from "@/assets/v2square-logo2.jpeg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Phone, Search, ChevronDown, Send, UserCircle, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import MobileBottomNav from "./MobileBottomNav";
import LoginModal from "./LoginModal";
import { useAuth } from "@/contexts/AuthContext";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { customer, logout, isLoginModalOpen, setLoginModalOpen } = useAuth();

  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState<any[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);

  useEffect(() => {
    if (showSearchResults && products.length === 0) {
      const fetchProducts = async () => {
        try {
          const res = await fetch(`${API_BASE}/products.php`);
          const data = await res.json();
          if (Array.isArray(data)) {
            setProducts(data);
          }
        } catch (err) {
          console.error("Failed to fetch products:", err);
        }
      };
      fetchProducts();
    }
  }, [showSearchResults, products.length]);

  const filteredProducts = products
    .filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) && p.status === 'Active')
    .slice(0, 6);


  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "HOME", to: "/" },
    { label: "PROFILE", to: "/profile" },
    { label: "CONTACT US", to: "/contact-us" },
  ];

  const [categoriesList, setCategoriesList] = useState<{ name: string, slug: string }[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${API_BASE}/categories.php`);
        const data = await res.json();
        if (Array.isArray(data)) {
          // Filter out categories with NULL slugs or Inactive status
          setCategoriesList(data.filter(c => c.status === 'Active' && c.slug));
        }
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    };
    fetchCategories();
  }, []);

  const isActive = (to: string) => {
    if (to === "/" && location.pathname === "/") return true;
    if (to === "/profile" && location.pathname === "/profile") return true;
    if (to === "/contact-us" && (location.pathname === "/contact-us" || location.pathname === "/enquiry")) return true;
    return false;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white transition-all shadow-sm">
      {/* Top Bar: Company Info & CTAs */}
      <div className="bg-white border-b border-gray-100 px-4 py-3">
        <div className="container mx-auto flex items-center justify-between gap-4">
          {/* Logo and Brand */}
          <Link to="/" className="flex items-center gap-2 shrink-0 hover:opacity-90 transition-opacity">
            <img src={v2Logo} alt="V² PRODUCT Logo" className="h-14 w-auto object-contain" />
            <div className="hidden sm:block">
              <p className="text-[20px] font-black leading-tight tracking-wide bg-gradient-to-r from-[#b8860b] via-[#d4a017] to-[#4a7c2f] bg-clip-text text-transparent uppercase">V² PRODUCT</p>
            </div>
          </Link>

          {/* Navigation Links (Desktop Middle) */}
          <nav className="hidden lg:flex items-stretch self-stretch">
            <ul className="flex items-stretch">
              {navLinks.map((link) => (
                <li key={link.label} className="flex border-r border-gray-50 last:border-r-0">
                  <Link
                    to={link.to}
                    className={`px-8 flex items-center text-xs font-black tracking-widest transition-all ${isActive(link.to)
                      ? "bg-primary text-white"
                      : "text-gray-600 hover:text-primary"
                      }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Call and Enquiry (Right) */}
          <div className="flex items-center gap-4">

            {/* Login/Register button hidden */}

            <div className="text-right hidden md:block">
              <p className="text-[10px] uppercase font-bold text-gray-400">Call Us Anytime</p>
              <div className="flex items-center gap-1.5 text-primary text-sm font-black">
                <Phone size={14} className="fill-primary" />
                <span>+91 93345 67890</span>
              </div>
            </div>
            <Link to="/contact-us" className="bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-lg flex items-center gap-2 text-xs font-black shadow-md transition-all active:scale-95">
              <Send size={14} />
              <span className="hidden sm:inline">Send Enquiry</span>
            </Link>
            <button
              className="lg:hidden p-2 text-gray-600"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Range & Search */}
      <div className="bg-gray-50/80 px-4 py-2 hidden sm:block">
        <div className="container mx-auto flex items-center justify-between gap-8">
          <div className="flex items-center gap-6">
            <div className="relative group">
              <button className="flex items-center gap-2 text-xs font-black text-primary group-hover:text-primary/80 transition-all">
                <span className="uppercase tracking-widest border-b-2 border-primary">Our Range</span>
                <ChevronDown size={14} className="group-hover:translate-y-0.5 transition-transform" />
              </button>

              {/* Dropdown Menu */}
              <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 py-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-[100] translate-y-2 group-hover:translate-y-0">
                <div className="px-4 pb-2 mb-2 border-b border-gray-50">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Product Categories</p>
                </div>
                <div className="max-h-[60vh] overflow-y-auto custom-scrollbar">
                  {Array.isArray(categoriesList) && categoriesList.map(cat => (
                    <Link
                      key={cat.slug}
                      to={`/category/${cat.slug}`}
                      className="block px-6 py-2.5 text-[11px] font-bold text-gray-600 hover:text-primary hover:bg-gray-50 transition-all flex items-center gap-3"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-primary/20 group-hover:bg-primary transition-colors" />
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="hidden xl:flex items-center gap-5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
              {Array.isArray(categoriesList) && categoriesList.slice(0, 6).map(cat => (
                <Link key={cat.slug} to={`/category/${cat.slug}`} className="hover:text-primary transition-colors whitespace-nowrap">{cat.name}</Link>
              ))}
            </div>
          </div>

          <div className="relative flex-1 max-w-sm w-full z-50">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setShowSearchResults(true)}
              onBlur={() => setTimeout(() => setShowSearchResults(false), 200)}
              className="w-full bg-white border border-gray-200 rounded-lg pl-10 pr-4 py-2 text-xs focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all shadow-sm"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
            
            {showSearchResults && searchQuery && (
              <div className="absolute top-full right-0 mt-2 w-full bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map(product => (
                    <div 
                      key={product.id}
                      onClick={() => {
                        navigate(`/product/${product.id}`);
                        setSearchQuery("");
                        setShowSearchResults(false);
                      }}
                      className="px-4 py-2.5 hover:bg-gray-50 cursor-pointer flex items-center gap-3 transition-colors"
                    >
                      {product.primary_image ? (
                        <img src={product.primary_image} alt={product.name} className="w-10 h-10 rounded-lg object-cover border border-gray-100 bg-white" />
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400">
                          <Search size={14} />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-gray-700 truncate">{product.name}</p>
                        <p className="text-[10px] text-gray-400 font-medium">{product.category_name}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-5 text-xs font-semibold text-center text-gray-500">
                    No products found.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-b border-gray-100 overflow-hidden"
          >
            <div className="px-4 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className={`text-sm font-bold tracking-widest py-2 px-4 rounded ${isActive(link.to) ? "bg-primary text-white" : "text-gray-600"
                    }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="h-px bg-gray-100 my-2"></div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-4">Categories</p>
              <div className="grid grid-cols-2 gap-2 px-4">
                {Array.isArray(categoriesList) && categoriesList.map(cat => (
                  <Link key={cat.slug} to={`/category/${cat.slug}`} onClick={() => setMobileOpen(false)} className="text-xs text-gray-600 hover:text-primary">{cat.name}</Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <MobileBottomNav />
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setLoginModalOpen(false)} />
    </header>
  );
};

export default Navbar;
