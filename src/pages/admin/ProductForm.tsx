import { API_BASE } from "@/config";
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, Save, Upload, X, Plus, 
  Trash2, FileText, Image as ImageIcon,
  Loader2, CheckCircle2, AlertCircle, Download
} from 'lucide-react';
import { toast } from 'sonner';

interface Category {
  id: number;
  name: string;
}

interface Specification {
  key: string;
  value: string;
}

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(!!id);
  const [categories, setCategories] = useState<Category[]>([]);
  
  const [name, setName] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [price, setPrice] = useState('');
  const [moq, setMoq] = useState('1');
  const [description, setDescription] = useState('');
  const [brochureUrl, setBrochureUrl] = useState('');
  const [status, setStatus] = useState('Active');
  const [images, setImages] = useState<string[]>([]);
  const [specifications, setSpecifications] = useState<Specification[]>([
    { key: 'Top Diameter', value: '' },
    { key: 'Material', value: 'Coco Fiber' }
  ]);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const brochureInputRef = useRef<HTMLInputElement>(null);
  

  useEffect(() => {
    fetchCategories();
    if (id) fetchProduct();
  }, [id]);

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${API_BASE}/categories.php`);
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      toast.error('Failed to load categories');
    }
  };

  const fetchProduct = async () => {
    try {
      const response = await fetch(`${API_BASE}/products.php?id=${id}`);
      const data = await response.json();
      if (data.error) throw new Error(data.error);

      setName(data.name);
      setCategoryId(data.category_id.toString());
      setPrice(data.price || '');
      setMoq(data.moq.toString());
      setDescription(data.description || '');
      setBrochureUrl(data.brochure_url || '');
      setStatus(data.status);
      setImages(data.images.map((img: any) => img.image_url));
      
      if (data.specifications) {
        const specs = JSON.parse(data.specifications);
        setSpecifications(Object.entries(specs).map(([key, value]) => ({ key, value: String(value) })));
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to load product');
      navigate('/admin/products');
    } finally {
      setInitialLoading(false);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>, type: 'image' | 'brochure') => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(`${API_BASE}/upload.php`, {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      if (data.success) {
        if (type === 'image') {
          setImages(prev => [...prev, data.url]);
        } else {
          setBrochureUrl(data.url);
        }
        toast.success('Upload successful');
      } else {
        toast.error(data.error || 'Upload failed');
      }
    } catch (error) {
      toast.error('Connection error during upload');
    }
  };

  const addSpecification = () => {
    setSpecifications([...specifications, { key: '', value: '' }]);
  };

  const removeSpecification = (index: number) => {
    setSpecifications(specifications.filter((_, i) => i !== index));
  };

  const updateSpecification = (index: number, field: 'key' | 'value', value: string) => {
    const newSpecs = [...specifications];
    newSpecs[index][field] = value;
    setSpecifications(newSpecs);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const specObject = specifications.reduce((acc: any, spec) => {
      if (spec.key) acc[spec.key] = spec.value;
      return acc;
    }, {});

    const payload = {
      id,
      name,
      category_id: categoryId,
      price,
      moq,
      description,
      brochure_url: brochureUrl,
      status,
      images,
      specifications: specObject
    };

    try {
      const response = await fetch(`${API_BASE}/products.php`, {
        method: id ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await response.json();

      if (response.ok) {
        toast.success(id ? 'Product updated successfully' : 'Product created successfully');
        navigate('/admin/products');
      } else {
        toast.error(data.error || 'Operation failed');
      }
    } catch (error) {
      toast.error('Connection error');
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-12 h-12 animate-spin text-primary opacity-20" />
      </div>
    );
  }

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/admin/products" className="p-2.5 bg-white border border-gray-100 rounded-xl text-gray-400 hover:text-primary transition-all shadow-sm">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-2xl font-black text-gray-900 tracking-tight">
              {id ? 'Edit Product' : 'Add New Product'}
            </h1>
            <p className="text-gray-500 mt-1 font-medium italic">Configure product details and specifications</p>
          </div>
        </div>
        <button 
          onClick={handleSubmit}
          disabled={loading}
          className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-bold text-sm shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all disabled:opacity-70"
        >
          {loading ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
          {id ? 'Update Product' : 'Create Product'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Standard Info */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
            <h2 className="text-lg font-black text-gray-900 mb-4 flex items-center gap-2">
              <FileText className="text-primary" size={20} />
              Basic Information
            </h2>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Product Name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Coco Coir 4 Inch Pot"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Category</label>
                   <select 
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium"
                   >
                     <option value="">Select Category</option>
                     {categories.map(c => (
                       <option key={c.id} value={c.id}>{c.name}</option>
                     ))}
                   </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Price Info</label>
                  <input 
                    type="text" 
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="e.g. ₹ 10 / Piece"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Min Order Quantity</label>
                  <input 
                    type="number" 
                    value={moq}
                    onChange={(e) => setMoq(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Status</label>
                   <select 
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium"
                   >
                     <option value="Active">Active</option>
                     <option value="Inactive">Inactive</option>
                   </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Description</label>
                <textarea 
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter detailed product description..."
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium resize-none"
                />
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-black text-gray-900 flex items-center gap-2">
                <Plus className="text-blue-500" size={20} />
                Specifications
              </h2>
              <button 
                type="button"
                onClick={addSpecification}
                className="text-xs font-bold text-primary flex items-center gap-1 hover:underline"
              >
                <Plus size={14} /> Add Field
              </button>
            </div>
            
            <div className="space-y-3">
              {specifications.map((spec, index) => (
                <div key={index} className="flex gap-3 group animate-in slide-in-from-left duration-200">
                  <input 
                    type="text" 
                    value={spec.key}
                    onChange={(e) => updateSpecification(index, 'key', e.target.value)}
                    placeholder="Key (e.g. Material)"
                    className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium"
                  />
                  <input 
                    type="text" 
                    value={spec.value}
                    onChange={(e) => updateSpecification(index, 'value', e.target.value)}
                    placeholder="Value (e.g. Coco Fiber)"
                    className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium"
                  />
                  <button 
                    type="button"
                    onClick={() => removeSpecification(index)}
                    className="p-2.5 text-gray-300 hover:text-rose-500 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Media */}
        <div className="space-y-8">
           <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
            <h2 className="text-lg font-black text-gray-900 flex items-center gap-2">
              <ImageIcon className="text-purple-500" size={20} />
              Product Images
            </h2>
            
            <div className="grid grid-cols-2 gap-4">
              {images.map((img, index) => (
                <div key={index} className="relative group aspect-square rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
                  <img src={img} alt="Product" className="w-full h-full object-cover" />
                  <button 
                    onClick={() => setImages(images.filter((_, i) => i !== index))}
                    className="absolute top-2 right-2 p-1.5 bg-rose-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={14} />
                  </button>
                  {index === 0 && (
                    <div className="absolute bottom-2 left-2 px-2 py-1 bg-primary text-[10px] text-white font-black rounded-lg">PRIMARY</div>
                  )}
                </div>
              ))}
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="aspect-square rounded-xl border-2 border-dashed border-gray-200 hover:border-primary/50 hover:bg-gray-50 flex flex-col items-center justify-center gap-2 transition-all group"
              >
                <Upload className="text-gray-300 group-hover:text-primary transition-colors" size={24} />
                <span className="text-[10px] font-black text-gray-400 group-hover:text-primary tracking-widest uppercase">Add Image</span>
              </button>
            </div>
            <input 
              type="file" 
              className="hidden" 
              ref={fileInputRef} 
              accept="image/*"
              onChange={(e) => handleFileUpload(e, 'image')}
            />
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
             <h2 className="text-lg font-black text-gray-900 flex items-center gap-2">
              <Download className="text-emerald-500" size={20} />
              Product Brochure
            </h2>
            
            {brochureUrl ? (
              <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg">
                    <FileText size={20} />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-emerald-900">Brochure Linked</div>
                    <div className="text-[10px] text-emerald-700 font-medium">Click icon to change</div>
                  </div>
                </div>
                <button 
                  onClick={() => setBrochureUrl('')}
                  className="text-emerald-400 hover:text-emerald-600"
                >
                  <X size={18} />
                </button>
              </div>
            ) : (
               <button 
                onClick={() => brochureInputRef.current?.click()}
                className="w-full py-6 rounded-xl border-2 border-dashed border-gray-200 hover:border-emerald-500/50 hover:bg-emerald-50 flex flex-col items-center justify-center gap-2 transition-all group"
              >
                <Download className="text-gray-300 group-hover:text-emerald-500 transition-colors" size={24} />
                <span className="text-[10px] font-black text-gray-400 group-hover:text-emerald-500 tracking-widest uppercase">Upload Brochure (PDF)</span>
              </button>
            )}
            <input 
              type="file" 
              className="hidden" 
              ref={brochureInputRef} 
              accept=".pdf"
              onChange={(e) => handleFileUpload(e, 'brochure')}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
