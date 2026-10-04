import { API_BASE } from "@/config";
import { useState, useEffect } from 'react';
import { ShoppingBag, Loader2, RefreshCw, Phone, X } from 'lucide-react';
import { toast } from 'sonner';

interface Order {
  id: number;
  customer_id: number;
  customer_name: string;
  customer_mobile: string;
  product_name: string;
  product_image?: string;
  price: string;
  quantity: number;
  status: 'Pending' | 'Processing' | 'Completed' | 'Cancelled';
  created_at: string;
}

export default function OrdersAdmin() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  

  const fetchOrders = async () => {
    try {
      const response = await fetch(`${API_BASE}/orders.php`);
      const data = await response.json();
      if (data.success) {
        setOrders(data.data);
      } else {
        toast.error(data.message || 'Failed to fetch orders');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      toast.error('Error connecting to server');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchOrders();
  };

  const updateStatus = async (id: number, newStatus: string) => {
    try {
      const response = await fetch(`${API_BASE}/orders.php?id=${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await response.json();
      if (data.success) {
        toast.success(`Order #${id} marked as ${newStatus}`);
        setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus as any } : o));
      } else {
        toast.error(data.message || 'Failed to update order');
      }
    } catch (e) {
      toast.error('Error updating order');
    }
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Customer Orders</h1>
          <p className="text-gray-500 text-sm mt-1">Manage and update customer order requests</p>
        </div>
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg text-sm font-semibold shadow-sm transition-colors flex items-center justify-center gap-2 group w-full sm:w-auto"
        >
          <RefreshCw size={16} className={`text-gray-400 group-hover:text-gray-600 ${refreshing ? 'animate-spin' : ''}`} />
          {refreshing ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center px-4">
            <div className="w-16 h-16 bg-gray-50 flex items-center justify-center rounded-full mb-4">
              <ShoppingBag className="h-8 w-8 text-gray-300" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">No Orders Yet</h3>
            <p className="mt-1 text-gray-500 max-w-sm">When logged-in customers place an order request, it will appear here.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Order ID</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Customer Info</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Product</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Qty / Price</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                  <th scope="col" className="px-6 py-4 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-black text-gray-900">
                      #{order.id.toString().padStart(4, '0')}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-gray-900">{order.customer_name}</span>
                        <div className="flex items-center gap-1 mt-1 text-xs text-gray-500 font-medium">
                          <Phone size={12} className="text-green-600" />
                          <span>+91 {order.customer_mobile}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-10 h-10 bg-gray-100 rounded border border-gray-200 overflow-hidden shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
                          onClick={() => order.product_image && setPreviewImage(order.product_image)}
                        >
                          <img src={order.product_image || 'https://via.placeholder.com/80'} alt={order.product_name} className="w-full h-full object-cover" />
                        </div>
                        <span className="text-sm font-semibold text-gray-800 line-clamp-2">{order.product_name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-gray-900">{order.quantity} Unit(s)</span>
                        <span className="text-xs text-gray-500 font-medium">{order.price}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">
                      {new Date(order.created_at).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                      <select
                        value={order.status}
                        onChange={(e) => updateStatus(order.id, e.target.value)}
                        className={`text-xs font-bold p-2 pr-6 rounded-full border outline-none cursor-pointer appearance-none ${
                            order.status === 'Pending' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                            order.status === 'Processing' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                            order.status === 'Completed' ? 'bg-green-50 text-green-700 border-green-200' :
                            'bg-red-50 text-red-700 border-red-200'
                        }`}
                        style={{
                            backgroundImage: 'url("data:image/svg+xml,%3csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 20 20\'%3e%3cpath stroke=\'%236b7280\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'1.5\' d=\'M6 8l4 4 4-4\'/%3e%3c/svg%3e")',
                            backgroundPosition: 'right 0.25rem center',
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: '1.2em 1.2em'
                        }}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
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
}
