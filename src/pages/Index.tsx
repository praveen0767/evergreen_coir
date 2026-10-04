import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TrustSection from "@/components/TrustSection";
import ProductsSection from "@/components/ProductsSection";
import VideoSection from "@/components/VideoSection";
import ContactSection from "@/components/ContactSection";
import ReviewsSection from "@/components/ReviewsSection";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

const Index = () => (
  <div className="bg-white min-h-screen">
    <Navbar />
    <div className="pt-[140px] md:pt-[180px]">
      <HeroSection />
      <TrustSection />
      <ProductsSection />
      <VideoSection />
      <ContactSection />
      <ReviewsSection />
      <Footer />
      <ScrollToTop />
    </div>
  </div>
);

export default Index;
