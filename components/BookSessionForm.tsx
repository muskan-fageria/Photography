"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2 } from "lucide-react";

export default function BookSessionForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    eventType: "portraits",
    date: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate sending inquiry
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSuccess(true);
    setFormData({
      name: "",
      email: "",
      eventType: "portraits",
      date: "",
      message: "",
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-[#0d0d0d] border border-warmGold/10 p-8 md:p-12 rounded-sm shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative overflow-hidden">
      {/* Decorative Warm Glow */}
      <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-warmGold/5 blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-warmGold/5 blur-[120px] pointer-events-none" />

      <AnimatePresence mode="wait">
        {!isSuccess ? (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="space-y-6 md:space-y-8 relative z-10"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {/* Name */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="name"
                  className="text-xs uppercase tracking-widest text-softCream/60 font-medium"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="E.g., Aarav Mehta"
                  className="w-full bg-[#070707] border border-white/10 focus:border-warmGold/60 rounded-none px-4 py-3 text-softCream placeholder-softCream/20 outline-none text-sm transition-colors duration-300"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="email"
                  className="text-xs uppercase tracking-widest text-softCream/60 font-medium"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="E.g., aarav@example.com"
                  className="w-full bg-[#070707] border border-white/10 focus:border-warmGold/60 rounded-none px-4 py-3 text-softCream placeholder-softCream/20 outline-none text-sm transition-colors duration-300"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {/* Event Type */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="eventType"
                  className="text-xs uppercase tracking-widest text-softCream/60 font-medium"
                >
                  Session Type
                </label>
                <div className="relative">
                  <select
                    id="eventType"
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleChange}
                    className="w-full bg-[#070707] border border-white/10 focus:border-warmGold/60 rounded-none px-4 py-3 text-softCream outline-none text-sm appearance-none transition-colors duration-300 cursor-pointer"
                  >
                    <option value="portraits">Royal Heritage Portraiture</option>
                    <option value="weddings">Luxury Destination Wedding</option>
                    <option value="events">Cultural & Festive Commissions</option>
                  </select>
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-warmGold">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Date */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="date"
                  className="text-xs uppercase tracking-widest text-softCream/60 font-medium"
                >
                  Preferred Date
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  required
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full bg-[#070707] border border-white/10 focus:border-warmGold/60 rounded-none px-4 py-3 text-softCream outline-none text-sm transition-colors duration-300 dark-calendar"
                />
              </div>
            </div>

            {/* Message */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="message"
                className="text-xs uppercase tracking-widest text-softCream/60 font-medium"
              >
                Share Your Vision
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us about the narrative or style you would like to explore..."
                className="w-full bg-[#070707] border border-white/10 focus:border-warmGold/60 rounded-none px-4 py-3 text-softCream placeholder-softCream/20 outline-none text-sm resize-none transition-colors duration-300"
              />
            </div>

            {/* Submit CTA */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 text-xs font-semibold uppercase tracking-[0.2em] bg-warmGold hover:bg-warmGold-light text-studioBlack rounded-none transition-all duration-500 hover:shadow-[0_0_20px_rgba(197,155,39,0.4)] flex items-center justify-center gap-2 group relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-4.5 w-4.5 text-studioBlack"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    TRANSMITTING INQUIRY...
                  </>
                ) : (
                  <>
                    SEND RESERVATION DETAILS
                    <Send className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                  </>
                )}
              </span>
            </button>
          </motion.form>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center py-16 text-center"
          >
            <CheckCircle2 className="w-16 h-16 text-warmGold mb-6 stroke-1 animate-pulse" />
            <h3 className="font-serif italic text-3xl text-softCream tracking-wide mb-3">
              Inquiry Received
            </h3>
            <p className="text-sm text-softCream/60 max-w-md mx-auto leading-relaxed mb-8">
              We have captured your request in our ledger. Expect an editorial brief and availability check in your inbox within 24 hours.
            </p>
            <button
              onClick={() => setIsSuccess(false)}
              className="text-xs uppercase tracking-widest text-warmGold hover:text-warmGold-light border-b border-warmGold/20 hover:border-warmGold pb-1 transition-all duration-300"
            >
              Send Another Inquiry
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
