import { API_BASE } from "@/config";
import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  Loader2, 
  ChevronRight, 
  LayoutGrid,
  CheckCircle2,
  XCircle,
  AlertCircle
} from 'lucide-react';
import { toast } from 'sonner';

interface Category {
  id: number;
  name: string;
  status: 'Active' | 'Inactive';
}

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [search, setSearch] = useState('');
  
  // Form State
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [status, setStatus] = useState<'Active' | 'Inactive'>('Active');

  const API_URL = `${API_BASE}/categories.php`;

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      if (Array.isArray(data)) {
        setCategories(data);
      }
    } catch (error) {
      toast.error('Failed to load categories');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return toast.error('Category name is required');

    setSubmitting(true);
    try {
      const method = isEditing ? 'PUT' : 'POST';
      const body = isEditing ? { id: editId, name, slug, status } : { name, slug, status };

      const res = await fetch(API_URL, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const result = await res.json();
      
      if (res.ok) {
        toast.success(result.message);
        resetForm();
        fetchCategories();
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error('Operation failed');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (cat: Category) => {
    setIsEditing(true);
    setEditId(cat.id);
    setName(cat.name);
    setSlug((cat as any).slug || '');
    setStatus(cat.status);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this category?')) return;

    try {
      const res = await fetch(`${API_URL}?id=${id}`, { method: 'DELETE' });
      const result = await res.json();
      if (res.ok) {
        toast.success(result.message);
        fetchCategories();
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error('Delete failed');
    }
  };

  const resetForm = () => {
    setIsEditing(false);
    setEditId(null);
    setName('');
    setSlug('');
    setStatus('Active');
  };

  const filteredCategories = categories.filter(cat => 
    cat.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header & Breadcrumb */}
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-xs text-gray-500 font-medium uppercase tracking-wider">
          <span>Dashboard</span>
          <ChevronRight size={14} className="text-gray-300" />
          <span className="text-primary font-bold">Categories</span>
        </div>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-3">
             <LayoutGrid className="text-primary" size={28} />
             Category Management
          </h1>
          <div className="flex items-center gap-2 bg-primary/10 text-primary px-3 py-1.5 rounded-full text-xs font-bold">
             <CheckCircle2 size={14} />
             {categories.length} Categories
          </div>
        </div>
      </div>

      {/* Add/Edit Form Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-50 bg-gray-50/50 flex items-center justify-between">
          <h2 className="text-sm font-bold text-gray-800 flex items-center gap-2 uppercase tracking-widest">
            {isEditing ? <Edit2 size={16} /> : <Plus size={18} />}
            {isEditing ? 'Update Category' : 'Add New Category'}
          </h2>
          {isEditing && (
            <button 
              onClick={resetForm}
              className="text-xs font-bold text-gray-500 hover:text-red-500 transition-colors uppercase tracking-widest"
            >
              Cancel Edit
            </button>
          )}
        </div>
        
        <form onSubmit={handleSubmit} className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
            <div className="md:col-span-8 space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Category Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter category name (e.g. Bangles - Raw Materials)"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>
            <div className="md:col-span-8 space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Category Slug</label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="Enter category slug (e.g. bangles-raw-materials)"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>
            <div className="md:col-span-2 space-y-4">
               <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Status</label>
                  <div className={`w-10 h-5 rounded-full relative transition-colors cursor-pointer ${status === 'Active' ? 'bg-primary' : 'bg-gray-300'}`} onClick={() => setStatus(status === 'Active' ? 'Inactive' : 'Active')}>
                    <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${status === 'Active' ? 'right-1' : 'left-1'}`} />
                  </div>
               </div>
               <div className={`text-xs font-bold uppercase tracking-wider ${status === 'Active' ? 'text-primary' : 'text-gray-400'}`}>
                 {status}
               </div>
            </div>
            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-primary hover:bg-primary/90 text-white px-6 py-3.5 rounded-xl font-black uppercase tracking-widest text-xs transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
              >
                {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : (isEditing ? 'Update' : '+ Add')}
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* List Table Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h2 className="text-sm font-bold text-gray-800 uppercase tracking-widest flex items-center gap-2">
            <LayoutGrid size={16} />
            Category List
          </h2>
          
          <div className="relative group max-w-sm w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={16} />
            <input 
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search categories..."
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-50">
                <th className="px-8 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">ID</th>
                <th className="px-8 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">Name</th>
                <th className="px-8 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">Slug</th>
                <th className="px-8 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">Status</th>
                <th className="px-8 py-4 text-xs font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-8 py-20 text-center">
                    <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
                    <p className="text-gray-400 font-medium">Loading amazing categories...</p>
                  </td>
                </tr>
              ) : filteredCategories.length > 0 ? (
                filteredCategories.map((cat) => (
                  <tr key={cat.id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-8 py-5 text-sm font-bold text-gray-400">#{cat.id}</td>
                    <td className="px-8 py-5 text-sm font-bold text-gray-900 group-hover:text-primary transition-colors">{cat.name}</td>
                    <td className="px-8 py-5 text-xs text-gray-500 font-mono">{(cat as any).slug}</td>
                    <td className="px-8 py-5">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                        cat.status === 'Active' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                      }`}>
                        {cat.status === 'Active' ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
                        {cat.status}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => handleEdit(cat)}
                          className="p-2 text-gray-400 hover:text-primary bg-white hover:bg-primary/10 rounded-lg transition-all border border-transparent hover:border-primary/20"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button 
                          onClick={() => handleDelete(cat.id)}
                          className="p-2 text-gray-400 hover:text-red-500 bg-white hover:bg-red-50 rounded-lg transition-all border border-transparent hover:border-red-100"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-8 py-20 text-center space-y-4">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto text-gray-300">
                       <AlertCircle size={32} />
                    </div>
                    <div className="space-y-1">
                      <p className="text-gray-900 font-bold">No categories found</p>
                      <p className="text-gray-400 text-sm">Try adjusting your search or add a new category.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        <div className="p-6 border-t border-gray-50 bg-gray-50/30">
           <p className="text-xs text-gray-400 font-medium">Showing {filteredCategories.length} of {categories.length} total entries</p>
        </div>
      </div>
    </div>
  );
};

export default Categories;
