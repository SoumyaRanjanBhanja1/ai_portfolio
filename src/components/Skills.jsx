import { motion } from "framer-motion";

const skills = [
  "React.js", "Node.js", "Express.js", "MongoDB",
  "Tailwind CSS", "Material UI", "Redux Toolkit", "JavaScript",
  "Git & GitHub", "REST APIs", "Framer Motion", "JWT / Auth"
];

const Skills = () => {
  return (
    <section id="skills" className="py-24 bg-gradient-to-r from-indigo-800 to-purple-700 text-white px-6">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold mb-12"
        >
          Skills
        </motion.h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-white/10 border border-white/20 backdrop-blur-md rounded-xl py-4 px-6 shadow-xl"
            >
              {skill}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
