import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

  
    toast.success("✅ Thank you for contacting us! We’ll get back to you soon.", {
      position: "top-center",
      autoClose: 3000,
    });

   
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl font-extrabold text-gray-800 text-center mb-6">
          Contact <span className="text-blue-600">Us</span>
        </h1>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Have questions or need help? Fill out the form below and our team will
          get in touch with you shortly.
        </p>

        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
        
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Enter your name"
              />
            </div>

            
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Enter your email"
              />
            </div>

          
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Write your message..."
              ></textarea>
            </div>

          
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition duration-300"
            >
              Send Message
            </button>
          </form>
        </div>

      
        <div className="mt-12 text-center">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Or reach us directly:
          </h3>
          <p className="text-gray-600">📞 1234567</p>
          <p className="text-gray-600">✉ support@shoewave.com</p>
        </div>
      </div>

    
      <ToastContainer />
    </section>
  );
};

export default Contact;
