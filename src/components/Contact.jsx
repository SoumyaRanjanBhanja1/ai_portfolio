// src/components/Contact.jsx
import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { Stars, OrbitControls } from "@react-three/drei";
import Footer from "./Footer";



export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const API="https://backend-user-l8s4.onrender.com";

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/contact`, formData);
      setSent(true);
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Message not sent", error);
    }
  };

  return (
    <>
      <section id="contact" className="relative py-24 bg-black text-white px-6 overflow-hidden">
        {/* 🌌 Three.js Background */}
        <Canvas className="absolute inset-0 -z-10">
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <Stars
            radius={100}
            depth={80}
            count={7000}
            factor={4}
            saturation={0}
            fade
            speed={2}
          />
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2.2} />
        </Canvas>

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl font-bold mb-6 text-cyan-400"
          >
            Contact Me
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-gray-400 mb-10 text-lg"
          >
            Have a project or opportunity? Let’s collaborate!
          </motion.p>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="grid gap-6 text-left"
          >
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
              className="p-4 rounded-lg bg-gray-800 text-white border border-gray-700 placeholder-gray-400"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              required
              className="p-4 rounded-lg bg-gray-800 text-white border border-gray-700 placeholder-gray-400"
            />
            <textarea
              name="message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              required
              className="p-4 rounded-lg bg-gray-800 text-white border border-gray-700 placeholder-gray-400"
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-pink-500 to-cyan-500 hover:from-pink-600 hover:to-cyan-600 py-3 px-6 rounded-lg font-semibold shadow-md hover:scale-105 transition-all duration-300"
            >
              Send Message
            </button>
          </motion.form>

          {sent && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-6 text-green-400 font-medium"
            >
              ✅ Message sent successfully!
            </motion.div>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
}