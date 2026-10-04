import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Settings, 
  Box, 
  ShoppingCart, 
  Users, 
  Wrench, 
  MessageSquare, 
  Image as ImageIcon, 
  Contact, 
  Truck, 
  FileText, 
  Share2,
  ChevronDown,
  ChevronRight,
  LogOut,
  X,
  Video
} from 'lucide-react';
import { cn } from "@/lib/utils";

interface SidebarItem {
  title: string;
  icon: React.ElementType;
  path?: string;
  submenu?: { title: string; path: string }[];
}

const sidebarItems: SidebarItem[] = [
  { title: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
  { 
    title: 'General Masters', 
    icon: Settings, 
    submenu: [
      { title: 'Categories', path: '/admin/categories' }
    ] 
  },
  { 
    title: 'Product Masters', 
    icon: Box, 
    submenu: [
      { title: 'Products', path: '/admin/products' }
    ] 
  },
  { title: 'Orders', icon: ShoppingCart, path: '/admin/orders' },
  { title: 'Users', icon: Users, path: '/admin/users' },
  { title: 'Feedback', icon: MessageSquare, path: '/admin/feedback' },
  { title: 'Slider', icon: ImageIcon, path: '/admin/slider' },
  { title: 'Videos', icon: Video, path: '/admin/videos' },
  { title: 'Contact-Info', icon: Contact, path: '/admin/contact-info' },
  { title: 'Social media', icon: Share2, path: '/admin/social-media' },
];

interface AdminSidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const AdminSidebar = ({ isOpen, setIsOpen }: AdminSidebarProps) => {
  const location = useLocation();
  const [openSubmenu, setOpenSubmenu] = useState<string | null>('General Masters');

  const toggleSubmenu = (title: string) => {
    setOpenSubmenu(openSubmenu === title ? null : title);
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    window.location.href = '/admin/login';
  };

  return (
    <>
      <aside className={cn(
        "w-64 bg-white border-r h-screen overflow-y-auto flex flex-col shrink-0 custom-scrollbar z-50 transition-transform duration-300 fixed md:sticky top-0",
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}>
        <div className="p-6 border-b flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center text-white font-bold">E</div>
            <span className="font-bold text-gray-800 tracking-tight">Evergreen Admin</span>
          </div>
          <button className="md:hidden text-gray-500" onClick={() => setIsOpen(false)}>
            <X className="w-5 h-5" />
          </button>
        </div>

      <nav className="flex-1 py-4 px-3 space-y-1">
        {sidebarItems.map((item) => {
          const isActive = item.path === location.pathname;
          const isSubmenuOpen = openSubmenu === item.title;
          
          return (
            <div key={item.title} className="space-y-1">
              {item.submenu ? (
                <>
                  <button
                    onClick={() => toggleSubmenu(item.title)}
                    className={cn(
                      "w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded-lg transition-colors",
                      isSubmenuOpen ? "bg-primary/5 text-primary" : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="w-5 h-5 flex-shrink-0" />
                      <span>{item.title}</span>
                    </div>
                    {isSubmenuOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                  </button>
                  {isSubmenuOpen && (
                    <div className="ml-9 space-y-1 mt-1">
                      {item.submenu.map((sub) => (
                        <Link
                          key={sub.title}
                          to={sub.path}
                          className={cn(
                            "block px-3 py-2 text-sm rounded-md transition-colors",
                            location.pathname === sub.path 
                              ? "bg-primary/10 text-primary font-semibold" 
                              : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                          )}
                        >
                          {sub.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  to={item.path || '#'}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors",
                    isActive ? "bg-primary text-white shadow-sm" : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                  )}
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  <span>{item.title}</span>
                </Link>
              )}
            </div>
          );
        })}
      </nav>

      <div className="p-4 border-t">
        <button 
          onClick={logout}
          className="flex items-center gap-3 w-full px-3 py-2.5 text-sm font-medium text-red-500 hover:bg-red-50 rounded-lg transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }
      `}} />
    </aside>
    </>
  );
};

export default AdminSidebar;
