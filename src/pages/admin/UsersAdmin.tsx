import { API_BASE } from "@/config";
import { useState, useEffect } from 'react';
import { Users, Loader2, RefreshCw, UserPlus, X, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface Customer {
  id: number;
  name: string;
  mobile: string;
  created_at: string;
  total_orders: number;
}

export default function UsersAdmin() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newMobile, setNewMobile] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  

  const fetchCustomers = async () => {
    try {
      const response = await fetch(`${API_BASE}/customers.php`);
      const data = await response.json();
      if (data.success) {
        setCustomers(data.data);
      } else {
        toast.error(data.message || 'Failed to fetch customers');
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
    fetchCustomers();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchCustomers();
  };

  const handleDelete = async (id: number, name: string) => {
    if (!window.confirm(`Are you sure you want to delete customer ${name} and all their orders?`)) return;

    try {
      const response = await fetch(`${API_BASE}/customers.php?id=${id}`, {
        method: 'DELETE'
      });
      const data = await response.json();
      if (data.success) {
        toast.success(data.message);
        setCustomers(customers.filter(c => c.id !== id));
      } else {
        toast.error(data.message);
      }
    } catch (e) {
      toast.error('Error deleting customer');
    }
  };

  const handleAddCustomer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newMobile || !newPassword) {
        toast.error("Please fill all fields");
        return;
    }

    setSubmitting(true);
    try {
        const response = await fetch(`${API_BASE}/customers.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: newName,
                mobile: newMobile,
                password: newPassword
            })
        });
        const data = await response.json();
        if (data.success) {
            toast.success("Customer added successfully!");
            setIsModalOpen(false);
            setNewName('');
            setNewMobile('');
            setNewPassword('');
            fetchCustomers();
        } else {
            toast.error(data.message);
        }
    } catch (error) {
        toast.error("Error creating customer");
    } finally {
        setSubmitting(false);
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
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Registered Users</h1>
          <p className="text-gray-500 text-sm mt-1">Manage customers who can place orders.</p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg text-sm font-semibold shadow-sm transition-colors flex items-center justify-center gap-2 group flex-1 md:flex-none"
            >
            <RefreshCw size={16} className={`text-gray-400 group-hover:text-gray-600 ${refreshing ? 'animate-spin' : ''}`} />
            {refreshing ? 'Refreshing...' : 'Refresh'}
            </button>
            
            <button
            onClick={() => setIsModalOpen(true)}
            className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-sm transition-colors flex items-center justify-center gap-2 flex-1 md:flex-none"
            >
            <UserPlus size={16} />
            Add User
            </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {customers.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center px-4">
            <div className="w-16 h-16 bg-gray-50 flex items-center justify-center rounded-full mb-4">
              <Users className="h-8 w-8 text-gray-300" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">No Users Found</h3>
            <p className="mt-1 text-gray-500 max-w-sm">There are currently no registered customers.</p>
            <button 
                onClick={() => setIsModalOpen(true)}
                className="mt-6 text-primary font-bold hover:underline"
            >
                Create the first user
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Name / Mobile</th>
                  <th scope="col" className="px-6 py-4 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">Total Orders</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Join Date</th>
                  <th scope="col" className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {customers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-gray-900">{customer.name}</span>
                        <div className="flex items-center gap-1 mt-1 text-xs text-gray-500 font-medium">
                          <span>+91 {customer.mobile}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                        <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-blue-50 text-blue-700 font-bold text-sm">
                            {customer.total_orders}
                        </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">
                      {new Date(customer.created_at).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button 
                         onClick={() => handleDelete(customer.id, customer.name)}
                         className="text-red-500 hover:text-red-700 transition-colors p-2 hover:bg-red-50 rounded-full"
                         title="Delete customer"
                      >
                         <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add User Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-md rounded-xl border shadow-2xl relative p-8">
                <button 
                    onClick={() => setIsModalOpen(false)}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 z-10 p-1"
                >
                    <X size={20} />
                </button>

                <h2 className="text-xl font-bold text-gray-900 mb-6">
                    Add New Customer
                </h2>

                <form onSubmit={handleAddCustomer} className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Full Name</label>
                        <input 
                            type="text"
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            className="w-full border border-gray-200 rounded p-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                            placeholder="Customer Name"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Mobile Number</label>
                        <div className="flex border border-gray-200 rounded overflow-hidden focus-within:ring-1 focus-within:ring-primary focus-within:border-primary">
                            <div className="flex items-center gap-1.5 px-3 bg-gray-50 border-r border-gray-200">
                                <span className="text-[13px] font-bold text-gray-700">+91</span>
                            </div>
                            <input 
                                type="tel"
                                value={newMobile}
                                onChange={(e) => setNewMobile(e.target.value)}
                                placeholder="10-digit mobile"
                                className="flex-1 px-3 py-3 text-sm focus:outline-none"
                                maxLength={10}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Password</label>
                        <input 
                            type="text"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full border border-gray-200 rounded p-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                            placeholder="Set initial password"
                        />
                    </div>

                    <div className="pt-2">
                        <button 
                            type="submit"
                            disabled={submitting}
                            className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 rounded transition-colors disabled:opacity-70"
                        >
                            {submitting ? "Adding..." : "Create Customer"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
      )}

    </div>
  );
}
