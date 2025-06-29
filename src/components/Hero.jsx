import { motion } from "framer-motion";
import Navbar from "./Navbar";


const projects = [
  {
    title: "E-Commerce App",
    tech: "MERN + Razorpay",
    emoji: "🛒",
    link: "https://your-ecommerce-app.vercel.app",
  },
  {
    title: "Admin Dashboard",
    tech: "React + MUI + Charts",
    emoji: "📊",
    link: "https://your-dashboard.vercel.app",
  },
  {
    title: "Portfolio Website",
    tech: "React + Tailwind + Framer",
    emoji: "💼",
    link: "https://your-portfolio.vercel.app",
  },
];

const Hero = () => {
  return (
    <section className="bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-500 text-white py-24 px-6 min-h-screen">
      <Navbar/>
      <div className="max-w-6xl mx-auto text-center">
        <motion.h1
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-6xl font-extrabold drop-shadow-2xl"
        >
          👋 Hi, I’m <span className="text-yellow-300">Soumya Ranjan Bhanja</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="mt-6 text-xl md:text-2xl leading-relaxed max-w-3xl mx-auto"
        >
          A <span className="text-pink-200 font-semibold">MERN Stack Developer</span> with <strong>1.7 years</strong> of hands-on experience in building responsive, high-performance web applications.
          <br />
          Skilled in <span className="text-green-200">React.js, Express.js, MongoDB</span>, and modern tools like Tailwind CSS & MUI.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.7 }}
          viewport={{ once: true }}
          className="mt-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
        >
          {projects.map((project, idx) => (
            <motion.a
              key={idx}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, rotate: 1 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white/10 border border-white/20 backdrop-blur-lg rounded-2xl p-6 text-left shadow-2xl transition-transform duration-300 hover:shadow-pink-200 cursor-pointer transform"
            >
              <div className="flex items-center justify-between mb-4">
                <motion.span
                  whileHover={{ rotate: 10 }}
                  className="text-3xl"
                >
                  {project.emoji}
                </motion.span>
                <span className="text-sm bg-pink-500/30 px-3 py-1 rounded-full font-medium">
                  {project.tech}
                </span>
              </div>
              <h3 className="text-2xl font-semibold text-white">{project.title}</h3>
              <p className="text-gray-100 mt-2 text-sm">Click to view live project</p>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
