import { API_BASE } from "@/config";
import { useState } from "react";
import { X } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { setCustomer } = useAuth();
  

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mobile || !password || (isRegister && !name)) {
      toast.error("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      const endpoint = isRegister ? 'register' : 'login';
      const payload = isRegister 
        ? { action: endpoint, name, mobile, password }
        : { action: endpoint, mobile, password };

      const response = await fetch(`${API_BASE}/customer_auth.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      
      if (data.success) {
        toast.success(data.message);
        setCustomer(data.customer);
        onClose();
        // Reset form
        setName("");
        setMobile("");
        setPassword("");
        setIsRegister(false);
      } else {
        toast.error(data.message || "Authentication failed");
      }
    } catch (error) {
      console.error("Auth error:", error);
      toast.error("An error occurred during authentication.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md rounded-xl border shadow-2xl relative p-8">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 z-10 p-1"
        >
          <X size={20} />
        </button>

        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {isRegister ? "Create an Account" : "Welcome Back"}
        </h2>
        <p className="text-gray-500 text-sm mb-6">
          {isRegister ? "Sign up to track orders easily." : "Login to place orders or view history."}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
             <div>
               <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Full Name</label>
               <input 
                 type="text"
                 value={name}
                 onChange={(e) => setName(e.target.value)}
                 className="w-full border border-gray-200 rounded p-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                 placeholder="e.g. John Doe"
               />
             </div>
          )}

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Mobile Number</label>
            <div className="flex border border-gray-200 rounded overflow-hidden focus-within:ring-1 focus-within:ring-primary focus-within:border-primary">
                <div className="flex items-center gap-1.5 px-3 bg-gray-50 border-r border-gray-200">
                    <span className="text-[13px] font-bold text-gray-700">+91</span>
                </div>
                <input 
                    type="tel"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    placeholder="Enter your mobile"
                    className="flex-1 px-3 py-3 text-sm focus:outline-none"
                    maxLength={10}
                />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Password</label>
            <input 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-200 rounded p-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              placeholder={isRegister ? "Create a password" : "Enter your password"}
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 rounded mt-4 transition-colors disabled:opacity-70"
          >
            {loading ? "Please wait..." : (isRegister ? "Sign Up" : "Login")}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          {isRegister ? (
            <>Already have an account? <button onClick={() => setIsRegister(false)} className="text-primary font-bold hover:underline">Login here</button></>
          ) : (
            <>New to Evergreen Coir? <button onClick={() => setIsRegister(true)} className="text-primary font-bold hover:underline">Register here</button></>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
