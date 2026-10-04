import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import Index from "./pages/Index.tsx";
import Profile from "./pages/Profile.tsx";
import Testimonials from "./pages/Testimonials.tsx";
import Quality from "./pages/Quality.tsx";
import Enquiry from "./pages/Enquiry.tsx";
import CategoryPage from "./pages/CategoryPage.tsx";
import Contact from "./pages/Contact.tsx";
import ProductDetail from "./pages/ProductDetail.tsx";
import NotFound from "./pages/NotFound.tsx";
import FloatingFeedback from "./components/FloatingFeedback.tsx";

// Admin Imports
import AdminLayout from "./components/admin/AdminLayout.tsx";
import Login from "./pages/admin/Login.tsx";
import Dashboard from "./pages/admin/Dashboard.tsx";
import Categories from "./pages/admin/Categories.tsx";
import ProtectedRoute from "./components/admin/ProtectedRoute.tsx";

import ProductList from "./pages/admin/ProductList.tsx";
import ProductForm from "./pages/admin/ProductForm.tsx";
import SliderManager from "./pages/admin/SliderManager.tsx";
import ContactsAdmin from "./pages/admin/ContactsAdmin.tsx";
import OrdersAdmin from "./pages/admin/OrdersAdmin.tsx";
import UsersAdmin from "./pages/admin/UsersAdmin.tsx";
import SocialMediaAdmin from "./pages/admin/SocialMediaAdmin.tsx";
import AdminFeedbacks from "./pages/admin/AdminFeedbacks.tsx";
import AdminVideos from "./pages/admin/AdminVideos.tsx";

import { AuthProvider } from "./contexts/AuthContext.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <FloatingFeedback />
        <BrowserRouter>
          <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Index />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/quality" element={<Quality />} />
          <Route path="/enquiry" element={<Contact />} />
          <Route path="/contact-us" element={<Contact />} />
          <Route path="/category/:categoryId" element={<CategoryPage />} />
          <Route path="/products" element={<CategoryPage />} />
          <Route path="/product/:id" element={<ProductDetail />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="categories" element={<Categories />} />
            
            {/* Product Management */}
            <Route path="products" element={<ProductList />} />
            <Route path="products/new" element={<ProductForm />} />
            <Route path="products/edit/:id" element={<ProductForm />} />
            
            <Route path="slider" element={<SliderManager />} />
            <Route path="orders" element={<OrdersAdmin />} />
            <Route path="users" element={<UsersAdmin />} />
            <Route path="services" element={<div className="p-8"><h1>Services Coming Soon</h1></div>} />
            <Route path="feedback" element={<AdminFeedbacks />} />
            <Route path="videos" element={<AdminVideos />} />
            <Route path="contact-info" element={<ContactsAdmin />} />
            <Route path="shipping-partner" element={<div className="p-8"><h1>Shipping Partner Coming Soon</h1></div>} />
            <Route path="terms-and-condition" element={<div className="p-8"><h1>Terms & Condition Coming Soon</h1></div>} />
            <Route path="social-media" element={<SocialMediaAdmin />} />
          </Route>

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
