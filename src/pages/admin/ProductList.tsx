import { API_BASE } from "@/config";
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, Edit, Trash2, Search, Filter, 
  Package, MoreHorizontal, CheckCircle2, XCircle, 
  Eye, Download, Loader2, X
} from 'lucide-react';
import { toast } from 'sonner';

interface Product {
  id: number;
  name: string;
  category_name: string;
  price: string;
  moq: number;
  status: string;
  primary_image: string | null;
  created_at: string;
}

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API_BASE}/products.php`);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Fetch error:', error);
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;

    try {
      const response = await fetch(`${API_BASE}/products.php?id=${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        toast.success('Product deleted successfully');
        fetchProducts();
      } else {
        toast.error('Failed to delete product');
      }
    } catch (error) {
      toast.error('Connection error');
    }
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Product Master</h1>
          <p className="text-gray-500 mt-1 font-medium">Manage your product catalog and specifications</p>
        </div>
        <Link 
          to="/admin/products/new" 
          className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl font-bold text-sm shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all"
        >
          <Plus size={18} />
          Add New Product
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex flex-col md:flex-row gap-4 items-center justify-between bg-gray-50/50">
          <div className="relative w-full md:w-96 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search products..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>
          <div className="flex items-center gap-2">
             <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all">
               <Filter size={16} />
               Filters
             </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Product</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Category</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Price / MOQ</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-20 text-center">
                    <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary opacity-20" />
                  </td>
                </tr>
              ) : filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-20 text-center text-gray-400 font-medium">
                    No products found
                  </td>
                </tr>
              ) : filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    <div className="flex items-center gap-4">
                      {product.primary_image ? (
                        <img 
                          src={product.primary_image} 
                          alt={product.name} 
                          className="w-12 h-12 rounded-lg object-cover border border-gray-100 cursor-pointer hover:opacity-80 transition-opacity" 
                          onClick={() => setPreviewImage(product.primary_image)}
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400">
                          <Package size={20} />
                        </div>
                      )}
                      <div>
                        <div className="font-bold text-sm">{product.name}</div>
                        <div className="text-xs text-gray-500 font-medium">Added on {new Date(product.created_at).toLocaleDateString()}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                     <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-bold tracking-tight">
                       {product.category_name}
                     </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-bold text-gray-700">{product.price || 'Price on Request'}</div>
                    <div className="text-xs text-gray-400 font-medium">Min. Order: {product.moq} Piece</div>
                  </td>
                  <td className="px-6 py-4">
                    {product.status === 'Active' ? (
                      <span className="flex items-center gap-1.5 text-emerald-600 text-xs font-bold">
                        <CheckCircle2 size={14} />
                        Active
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5 text-rose-500 text-xs font-bold">
                        <XCircle size={14} />
                        Inactive
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link 
                        to={`/admin/products/edit/${product.id}`}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit Product"
                      >
                        <Edit size={18} />
                      </Link>
                      <button 
                        onClick={() => handleDelete(product.id)}
                        className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                        title="Delete Product"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {previewImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={() => setPreviewImage(null)}>
          <div className="relative max-w-4xl max-h-[90vh] flex flex-col bg-white rounded-2xl overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <h3 className="font-bold text-gray-900">Image Preview</h3>
              <button 
                onClick={() => setPreviewImage(null)}
                className="p-1 text-gray-500 hover:text-gray-900 transition-colors bg-gray-100 hover:bg-gray-200 rounded-full"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-4 overflow-auto flex items-center justify-center bg-gray-50">
              <img src={previewImage} alt="Product Preview" className="max-w-full max-h-[70vh] object-contain rounded-lg" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
