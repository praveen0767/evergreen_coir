import React from 'react';
import { 
  Users, 
  ShoppingCart, 
  Package, 
  MessageSquare, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight 
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

const stats = [
  { 
    label: 'Total Users', 
    value: '1,284', 
    change: '+12.5%', 
    trend: 'up', 
    icon: Users,
    color: 'bg-blue-500'
  },
  { 
    label: 'Total Orders', 
    value: '452', 
    change: '+8.2%', 
    trend: 'up', 
    icon: ShoppingCart,
    color: 'bg-green-500'
  },
  { 
    label: 'Products', 
    value: '86', 
    change: '-2.1%', 
    trend: 'down', 
    icon: Package,
    color: 'bg-purple-500'
  },
  { 
    label: 'Messages', 
    value: '12', 
    change: '+4.0%', 
    trend: 'up', 
    icon: MessageSquare,
    color: 'bg-orange-500'
  },
];

const data = [
  { name: 'Jan', orders: 400, revenue: 2400 },
  { name: 'Feb', orders: 300, revenue: 1398 },
  { name: 'Mar', orders: 200, revenue: 9800 },
  { name: 'Apr', orders: 278, revenue: 3908 },
  { name: 'May', orders: 189, revenue: 4800 },
  { name: 'Jun', orders: 239, revenue: 3800 },
];

const Dashboard = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-sm text-gray-500 mt-1">Welcome back, here's what's happening with your store today.</p>
        </div>
        <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-sm hover:shadow-md transition-all flex items-center gap-2">
          <TrendingUp size={16} />
          View Reports
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all group">
            <div className="flex items-start justify-between">
              <div className={cn("p-3 rounded-xl text-white", stat.color)}>
                <stat.icon size={24} />
              </div>
              <div className={cn(
                "flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full",
                stat.trend === 'up' ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
              )}>
                {stat.trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {stat.change}
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Revenue Chart */}
        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold text-gray-900">Revenue Growth</h3>
            <select className="text-sm border-none bg-gray-50 rounded-lg px-2 py-1 focus:ring-0 text-gray-500 font-medium">
              <option>Last 6 Months</option>
              <option>Last Year</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} dy={10} />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Orders Chart */}
        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold text-gray-900">Total Orders</h3>
            <div className="flex gap-2">
              <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
                <span className="w-3 h-3 bg-primary rounded-full"></span>
                Orders
              </div>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="orders" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}

export default Dashboard;
