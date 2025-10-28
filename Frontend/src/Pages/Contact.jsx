import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../apicall/axios";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post("/contact/", formData);
      
      toast.success(response.data.message || "✅ Thank you for contacting us! We'll get back to you soon.", {
        position: "top-center",
        autoClose: 4000,
      });

      // Reset form
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error submitting contact form:", error);
      toast.error("❌ Failed to send message. Please try again later.", {
        position: "top-center",
        autoClose: 4000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-extrabold text-gray-800 text-center mb-3">
          Contact <span className="text-blue-600">Us</span>
        </h1>
        <p className="text-sm text-gray-600 text-center mb-6 max-w-2xl mx-auto">
          Have questions or need help? Fill out the form below and our team will
          get in touch with you shortly.
        </p>

        <div className="bg-white p-4 rounded-xl shadow-md">
          <form onSubmit={handleSubmit} className="space-y-3">
        
            <div>
              <label className="block text-gray-700 font-medium mb-1.5 text-sm">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Enter your name"
              />
            </div>

            
            <div>
              <label className="block text-gray-700 font-medium mb-1.5 text-sm">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Enter your email"
              />
            </div>

          
            <div>
              <label className="block text-gray-700 font-medium mb-1.5 text-sm">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="4"
                className="w-full p-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Write your message..."
              ></textarea>
            </div>

          
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 text-sm rounded-lg font-semibold transition duration-300 ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>

      
        <div className="mt-6 text-center">
          <h3 className="text-lg font-bold text-gray-800 mb-2">
            Or reach us directly:
          </h3>
          <p className="text-sm text-gray-600">📞 1234567</p>
          <p className="text-sm text-gray-600">✉ support@shoewave.com</p>
        </div>
      </div>

    
      <ToastContainer />
    </section>
  );
};

export default Contact;
