import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import FloatingChat from "./FloatingChat";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="bg-gray-900 text-gray-400 pt-10 pb-6 px-6 border-t-4 border-pink-600 shadow-inner"
    >
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center space-y-4">
        <motion.h3
          whileHover={{ scale: 1.05 }}
          className="text-white text-lg font-semibold"
        >
          Let's connect!
        </motion.h3>

        <div className="flex space-x-6 text-xl">
          <motion.a
            whileHover={{ scale: 1.2 }}
            href="https://github.com/SoumyaRanjanBhanja1"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition duration-300"
          >
            <FaGithub />
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.2 }}
            href="https://www.linkedin.com/in/soumya-ranjan-bhanja-270644247"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition duration-300"
          >
            <FaLinkedin />
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.2 }}
            href="mailto:youremail@example.com"
            className="hover:text-white transition duration-300"
          >
            <FaEnvelope />
          </motion.a>
        </div>

        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} <span className="text-pink-400">Soumya Ranjan Bhanja</span> — Built with 💖 using React & Tailwind CSS
        </p>
      </div>
      <FloatingChat/>
    </motion.footer>
  );
};

export default Footer;
