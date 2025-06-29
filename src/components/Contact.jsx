import { motion } from "framer-motion";
import Footer from "./Footer";

const Contact = () => {
  return (
    <>
    <section id="contact" className="py-24 bg-gray-950 text-white px-6">
      <div className="max-w-3xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold mb-6"
        >
          Contact Me
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-gray-400 mb-10"
        >
          Have a project or opportunity? Let’s collaborate!
        </motion.p>

        <form className="grid gap-6 text-left">
          <input type="text" placeholder="Your Name" className="p-3 rounded-lg bg-gray-800 text-white border border-gray-600" />
          <input type="email" placeholder="Your Email" className="p-3 rounded-lg bg-gray-800 text-white border border-gray-600" />
          <textarea rows="5" placeholder="Your Message" className="p-3 rounded-lg bg-gray-800 text-white border border-gray-600" />
          <button type="submit" className="bg-pink-600 hover:bg-pink-700 py-3 px-6 rounded-lg font-semibold">
            Send Message
          </button>
        </form>
      </div>
    </section>
     <Footer/>
     </>
  );
};

export default Contact;
