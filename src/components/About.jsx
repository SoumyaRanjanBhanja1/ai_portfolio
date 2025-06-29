import { motion } from "framer-motion";
import Skills from "./Skills";

const About = () => {
  return (
    <section id="about" className="py-24 bg-gray-900 text-white px-6">
      <div className="max-w-5xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold mb-6"
        >
          About Me
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-lg leading-relaxed max-w-3xl mx-auto text-gray-300"
        >
          I'm <strong className="text-yellow-400">Soumya Ranjan Bhanja</strong>, a MERN Stack Developer with <strong>1.7 years</strong> of experience. I love building beautiful, scalable, and robust web apps using the MERN stack and tools like Tailwind CSS, Framer Motion, and Material UI. I’m passionate about modern UI/UX, clean code, and performance optimization.
        </motion.p>
      </div>
      <Skills/>
    </section>
  );
};

export default About;
