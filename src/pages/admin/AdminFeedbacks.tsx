import { API_BASE } from "@/config";
import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, MessageSquare, ThumbsUp, Star, Trash2 } from 'lucide-react';
import axios from 'axios';

interface Feedback {
  id: number;
  reviewer_name: string;
  location: string;
  product_name: string;
  rating: number;
  review_text: string;
  metric_response: boolean;
  metric_quality: boolean;
  metric_delivery: boolean;
  seller_response: string | null;
  response_date: string | null;
  status: 'Pending' | 'Approved' | 'Rejected';
  created_at: string;
}

const AdminFeedbacks = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [replyText, setReplyText] = useState('');
  const [replyingTo, setReplyingTo] = useState<number | null>(null);

  const fetchFeedbacks = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE}/feedbacks.php`);
      if (res.data.success) {
        setFeedbacks(res.data.data);
      }
    } catch (error) {
      console.error('Error fetching feedbacks:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const handleUpdateStatus = async (id: number, newStatus: string) => {
    try {
      const res = await axios.put(`${API_BASE}/feedbacks.php?id=${id}`, {
        status: newStatus
      });
      if (res.data.success) {
        setFeedbacks(feedbacks.map(f => f.id === id ? { ...f, status: newStatus as any } : f));
      }
    } catch (error) {
      console.error(`Error updating status to ${newStatus}:`, error);
      alert('Failed to update status.');
    }
  };

  const handleReplySubmit = async (id: number) => {
    if (!replyText.trim()) return;
    try {
      const res = await axios.put(`${API_BASE}/feedbacks.php?id=${id}`, {
        seller_response: replyText
      });
      if (res.data.success) {
        fetchFeedbacks(); // Refresh to get the actual timezone response_date
        setReplyingTo(null);
        setReplyText('');
      }
    } catch (error) {
      console.error('Error submitting reply:', error);
      alert('Failed to submit reply.');
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Loading feedbacks...</div>;
  }

  return (
    <div className="p-8 pb-32">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Feedback Management</h1>
        <p className="text-gray-500 text-sm mt-1">Review, approve, and reply to customer feedback here.</p>
      </div>

      <div className="space-y-6">
        {feedbacks.length === 0 ? (
          <div className="text-center p-12 bg-white rounded-xl border border-gray-100 shadow-sm">
            <p className="text-gray-500">No feedbacks available.</p>
          </div>
        ) : (
          feedbacks.map((item) => {
            const dateStr = item.created_at ? new Date(item.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: '2-digit' }).replace(/ /g, '-') : '';
            return (
              <div key={item.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 max-w-3xl">
                {/* Header */}
                <div className="flex justify-between items-start mb-6">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-medium text-lg">
                      {item.reviewer_name?.[0]?.toUpperCase() || 'U'}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 tracking-wide uppercase">{item.reviewer_name}</h3>
                      <p className="text-sm text-gray-500 uppercase">{item.location}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center justify-end text-yellow-400 mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < item.rating ? 'fill-current' : 'text-gray-200'}`} />
                      ))}
                    </div>
                    <p className="text-xs text-gray-400">{dateStr}</p>
                  </div>
                </div>

                {/* Content */}
                <div className="mb-4">
                  <p className="text-gray-600 text-sm mb-2"><span className="font-medium text-gray-800">Product Name : </span>{item.product_name}</p>
                  <p className="text-gray-700 italic border-l-2 border-gray-200 pl-3">
                    {item.review_text}
                  </p>
                </div>

                {/* Metrics */}
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                  {item.metric_response && (
                    <div className="flex items-center gap-1.5">
                      <span>Response</span>
                      <ThumbsUp className="w-4 h-4 text-green-500" />
                    </div>
                  )}
                  {item.metric_quality && (
                    <div className="flex items-center gap-1.5">
                      <span>Quality</span>
                      <ThumbsUp className="w-4 h-4 text-green-500" />
                    </div>
                  )}
                  {item.metric_delivery && (
                    <div className="flex items-center gap-1.5">
                      <span>Delivery</span>
                      <ThumbsUp className="w-4 h-4 text-green-500" />
                    </div>
                  )}
                </div>

                {/* Seller Response */}
                {item.seller_response && (
                  <div className="bg-gray-50 rounded-lg p-4 border-l-2 border-green-500 mb-6">
                    <p className="text-sm font-semibold text-gray-800 mb-1">
                      Response from Seller <span className="font-normal text-gray-500">({item.response_date ? new Date(item.response_date).toLocaleDateString() : 'N/A'})</span>
                    </p>
                    <p className="text-gray-600 text-sm italic">{item.seller_response}</p>
                  </div>
                )}

                {/* Reply Form */}
                {replyingTo === item.id && !item.seller_response && (
                  <div className="mb-6">
                    <textarea
                      className="w-full border border-gray-300 rounded-lg p-3 text-sm mb-2 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                      rows={3}
                      placeholder="Write your response..."
                      value={replyText}
                      onChange={e => setReplyText(e.target.value)}
                    />
                    <div className="flex gap-2 justify-end">
                      <button 
                        onClick={() => { setReplyingTo(null); setReplyText(''); }}
                        className="px-4 py-2 text-sm text-gray-500 hover:bg-gray-100 rounded-lg transition"
                      >
                        Cancel
                      </button>
                      <button 
                        onClick={() => handleReplySubmit(item.id)}
                        className="px-4 py-2 text-sm bg-primary text-white rounded-lg hover:bg-primary/90 transition"
                      >
                        Submit Reply
                      </button>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
                  {item.status === 'Pending' && (
                    <>
                      <button 
                        onClick={() => handleUpdateStatus(item.id, 'Approved')}
                        className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-600 hover:bg-green-100 rounded-lg text-sm font-medium transition"
                      >
                        <CheckCircle className="w-4 h-4" />
                        Approve
                      </button>
                      <button 
                        onClick={() => handleUpdateStatus(item.id, 'Rejected')}
                        className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg text-sm font-medium transition"
                      >
                        <XCircle className="w-4 h-4" />
                        Reject
                      </button>
                    </>
                  )}

                  {item.status === 'Approved' && (
                    <span className="flex items-center gap-2 px-4 py-2 text-green-600 font-medium text-sm">
                      <CheckCircle className="w-4 h-4" />
                      Approved
                    </span>
                  )}
                  {item.status === 'Rejected' && (
                    <span className="flex items-center gap-2 px-4 py-2 text-red-600 font-medium text-sm">
                      <XCircle className="w-4 h-4" />
                      Rejected
                    </span>
                  )}

                  <div className="flex-1" />

                  {!item.seller_response && replyingTo !== item.id && (
                    <button 
                      onClick={() => setReplyingTo(item.id)}
                      className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg text-sm font-medium transition border border-gray-200"
                    >
                      <MessageSquare className="w-4 h-4" />
                      Reply
                    </button>
                  )}
                  
                  {item.status !== 'Pending' && (
                    <button 
                      onClick={() => handleUpdateStatus(item.id, 'Pending')}
                      className="text-xs text-gray-400 hover:text-gray-600 ml-4 underline"
                    >
                      Reset Status
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default AdminFeedbacks;
