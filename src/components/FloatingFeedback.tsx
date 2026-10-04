import { API_BASE } from "@/config";
import React, { useState } from 'react';
import { MessageSquare, X, Star, ThumbsUp } from 'lucide-react';
import axios from 'axios';
import { useToast } from "@/components/ui/use-toast";

const FloatingFeedback = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    reviewer_name: '',
    location: '',
    product_name: '',
    rating: 5,
    review_text: '',
    metric_response: false,
    metric_quality: false,
    metric_delivery: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleToggleMetric = (metric: 'metric_response' | 'metric_quality' | 'metric_delivery') => {
    setFormData(prev => ({ ...prev, [metric]: !prev[metric] }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.reviewer_name || !formData.product_name || !formData.review_text) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all required fields (Name, Product, and Review).",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await axios.post(`${API_BASE}/feedbacks.php`, formData);
      if (res.data.success) {
        toast({
          title: "Success",
          description: "Thank you for your feedback!",
        });
        setIsOpen(false);
        setFormData({
          reviewer_name: '',
          location: '',
          product_name: '',
          rating: 5,
          review_text: '',
          metric_response: false,
          metric_quality: false,
          metric_delivery: false,
        });
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast({
        title: "Error",
        description: "Failed to submit feedback. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 bg-primary text-white p-4 rounded-full shadow-lg hover:bg-primary/90 hover:scale-105 transition-all duration-300 z-50 flex items-center justify-center ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
        aria-label="Give Feedback"
      >
        <MessageSquare className="w-6 h-6" />
      </button>

      {isOpen && (
        <>
          {/* Backdrop - click outside to close */}
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="fixed bottom-6 right-6 w-full max-w-sm bg-white rounded-xl shadow-2xl z-50 animate-in slide-in-from-bottom border border-gray-100 overflow-hidden flex flex-col max-h-[85vh]">
          <div className="bg-primary p-4 flex items-center justify-between text-white shrink-0">
            <h3 className="font-semibold flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Write a Review
            </h3>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-primary-foreground/80 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-5 flex-1 overflow-y-auto space-y-4 custom-scrollbar">
            
            <div className="flex gap-1 justify-center mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                  className="focus:outline-none transition-transform hover:scale-110"
                >
                  <Star className={`w-8 h-8 ${formData.rating >= star ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'}`} />
                </button>
              ))}
            </div>

            <div>
              <label className="block text-xs font-medium content-center text-gray-700 mb-1">Your Name / Company *</label>
              <input 
                type="text" 
                name="reviewer_name"
                value={formData.reviewer_name}
                onChange={handleChange}
                placeholder="e.g. John Doe"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Location</label>
              <input 
                type="text" 
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. New York, USA"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Product Name *</label>
              <input 
                type="text" 
                name="product_name"
                value={formData.product_name}
                onChange={handleChange}
                placeholder="e.g. Coir Mats"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Review *</label>
              <textarea 
                name="review_text"
                value={formData.review_text}
                onChange={handleChange}
                placeholder="Share your experience..."
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition resize-none"
                required
              />
            </div>

            <div className="space-y-2 pt-2">
              <p className="text-xs font-medium text-gray-700">What did you like?</p>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => handleToggleMetric('metric_response')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition ${formData.metric_response ? 'bg-green-50 text-green-600 border border-green-200' : 'bg-gray-50 text-gray-500 border border-gray-200 hover:bg-gray-100'}`}
                >
                  Response {formData.metric_response && <ThumbsUp className="w-3 h-3" />}
                </button>
                <button
                  type="button"
                  onClick={() => handleToggleMetric('metric_quality')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition ${formData.metric_quality ? 'bg-green-50 text-green-600 border border-green-200' : 'bg-gray-50 text-gray-500 border border-gray-200 hover:bg-gray-100'}`}
                >
                  Quality {formData.metric_quality && <ThumbsUp className="w-3 h-3" />}
                </button>
                <button
                  type="button"
                  onClick={() => handleToggleMetric('metric_delivery')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition ${formData.metric_delivery ? 'bg-green-50 text-green-600 border border-green-200' : 'bg-gray-50 text-gray-500 border border-gray-200 hover:bg-gray-100'}`}
                >
                  Delivery {formData.metric_delivery && <ThumbsUp className="w-3 h-3" />}
                </button>
              </div>
            </div>

          </form>

          <div className="px-5 py-4 border-t border-gray-100 bg-gray-50 mt-auto shrink-0">
             <button
                type="submit"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full bg-primary text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-primary/90 transition shadow-sm disabled:opacity-70 flex justify-center items-center"
              >
                {isSubmitting ? (
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                ) : (
                  'Submit Feedback'
                )}
              </button>
          </div>
          
          <style dangerouslySetInnerHTML={{ __html: `
            .custom-scrollbar::-webkit-scrollbar { width: 4px; }
            .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
            .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
            .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }
          `}} />
        </div>
        </>
      )}
    </>
  );
};

export default FloatingFeedback;
