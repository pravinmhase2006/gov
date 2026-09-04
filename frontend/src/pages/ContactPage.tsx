import React, { useState } from 'react';
import { Mail, Send, Phone, MapPin, CheckCircle } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
            Contact GovtPrep India Support
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Have a question, feedback, or report a vacancy discrepancy? We are here to assist you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1 space-y-4">
            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-blue-600" />
                <div>
                  <span className="text-xs font-bold text-slate-900 dark:text-white block">Email Us</span>
                  <span className="text-xs text-slate-500">support@govtprep.in</span>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <MapPin className="w-5 h-5 text-emerald-600" />
                <div>
                  <span className="text-xs font-bold text-slate-900 dark:text-white block">Location</span>
                  <span className="text-xs text-slate-500">New Delhi / Pune, India</span>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
              {submitted ? (
                <div className="text-center py-8 space-y-3">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">Message Received!</h3>
                  <p className="text-xs text-slate-500">Our editorial and support team will respond to your query shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Your Name</label>
                      <input
                        type="text"
                        required
                        placeholder="Rahul Sharma"
                        className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Your Email</label>
                      <input
                        type="email"
                        required
                        placeholder="aspirant@email.com"
                        className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Subject / Query Type</label>
                    <select className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>Report Vacancy Link or Error</option>
                      <option>Mock Test Engine Feedback</option>
                      <option>Tech Course or Internship Inquiry</option>
                      <option>General Support Question</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Message</label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Write your query here..."
                      className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" /> Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
