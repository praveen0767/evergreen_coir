import { API_BASE } from "@/config";
import React, { useEffect, useState } from 'react';
import { Mail, Phone, User, Clock, CheckCircle, RefreshCcw } from 'lucide-react';

interface Contact {
  id: number;
  mobile: string;
  name: string;
  message: string;
  status: string;
  created_at: string;
}

const ContactsAdmin = () => {
  
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/contacts.php`);
      const data = await res.json();
      if (data.success) {
        setContacts(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch contacts", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Contact Submissions</h1>
          <p className="text-sm text-gray-500 mt-1">View and manage customer inquiries.</p>
        </div>
        <button 
          onClick={fetchContacts}
          className="flex items-center gap-2 bg-white border px-4 py-2 rounded shadow-sm hover:bg-gray-50 text-sm font-medium transition-colors"
        >
          <RefreshCcw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
        {loading && contacts.length === 0 ? (
          <div className="p-8 text-center text-gray-500">Loading contacts...</div>
        ) : contacts.length === 0 ? (
          <div className="p-12 pl-8 pr-8 flex flex-col items-center justify-center text-center">
             <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                <Mail className="w-8 h-8 text-gray-400" />
             </div>
             <h3 className="text-lg font-medium text-gray-900 mb-1">No Inquiries Yet</h3>
             <p className="text-sm text-gray-500 max-w-sm">When customers submit the contact form, their queries will show up here.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
                <tr>
                  <th className="px-6 py-4 font-medium">Name & Phone</th>
                  <th className="px-6 py-4 font-medium">Message</th>
                  <th className="px-6 py-4 font-medium">Date</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {contacts.map((contact) => (
                  <tr key={contact.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center shrink-0">
                          <User className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{contact.name}</div>
                          <div className="text-gray-500 flex items-center gap-1 mt-0.5 text-[13px]">
                            <Phone className="w-3 h-3" />
                            {contact.mobile}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 max-w-md">
                      <p className="text-gray-700 whitespace-pre-wrap">{contact.message}</p>
                    </td>
                    <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        {formatDate(contact.created_at)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {contact.status === 'Read' ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200">
                          <CheckCircle className="w-3 h-3" />
                          Read
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                          Unread
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactsAdmin;
