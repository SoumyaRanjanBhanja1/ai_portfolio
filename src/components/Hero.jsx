import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, Html, useGLTF } from "@react-three/drei";
import { useRef, Suspense } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Contact from "./Contact";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const projects = [
  {
    title: "E-Commerce App",
    tech: "MERN + Razorpay",
    emoji: "🛒",
    link: "https://mono-repo-client.vercel.app",
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

const skills = [
  "React.js",
  "Node.js",
  "MongoDB",
  "Express.js",
  "Tailwind CSS",
  "TypeScript",
  "MUI",
  "Redux Toolkit",
];

const skillLevels = {
  "React.js": 90,
  "Node.js": 85,
  "MongoDB": 80,
  "Express.js": 85,
  "Tailwind CSS": 95,
  "TypeScript": 75,
  "MUI": 90,
  "Redux Toolkit": 80,
};

const SkillSphere = ({ skill, position }) => {
  const ref = useRef();
  useFrame(() => {
    ref.current.rotation.y += 0.003;
    ref.current.rotation.x += 0.003;
  });

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.9, 32, 32]} />
      <meshStandardMaterial color="#6b21a8" emissive="#9333ea" emissiveIntensity={0.6} />
      <Html center>
        <div className="w-16 h-16">
          <CircularProgressbar
            value={skillLevels[skill] || 70}
            text={skill}
            styles={buildStyles({
              textSize: '26px',
              pathColor: '#facc15',
              textColor: '#fff',
              trailColor: '#333',
            })}
          />
        </div>
      </Html>
    </mesh>
  );
};

const Avatar = () => {
  const { scene } = useGLTF("https://modelviewer.dev/shared-assets/models/Astronaut.glb");
  return <primitive object={scene} scale={2} position={[0, -3, -5]} rotation={[0, Math.PI, 0]} />;
};

const Hero = () => {
  return (
    <>
      <section className="bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-500 text-white py-24 px-6 min-h-screen">
        <Navbar />
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
            A <span className="text-pink-200 font-semibold">MERN Stack Developer</span> with <strong>1.7 years</strong> experience.
            <br />
            Skilled in <span className="text-green-200">React.js, Express.js, MongoDB</span>, and tools like Tailwind CSS & MUI.
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
                className="bg-white/10 border border-white/20 backdrop-blur-lg rounded-2xl p-6 text-left shadow-2xl hover:shadow-pink-200 cursor-pointer transform transition-transform duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <motion.span whileHover={{ rotate: 10 }} className="text-3xl">
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

      {/* Skills 3D Section */}
      <section className="bg-black text-white py-24 px-6 relative z-10">
        <h2 className="text-4xl font-bold text-center mb-12">🧠 My Tech Stack</h2>
        <div className="h-[600px] w-full">
          <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <Stars radius={150} depth={80} count={10000} factor={6} fade speed={1.5} />
            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
            <Suspense fallback={null}>
              <Avatar />
              <group>
                {skills.map((skill, index) => {
                  const angle = (index / skills.length) * Math.PI * 2;
                  const x = Math.cos(angle) * 4;
                  const y = Math.sin(angle) * 2;
                  return <SkillSphere key={index} skill={skill} position={[x, y, 0]} />;
                })}
              </group>
            </Suspense>
          </Canvas>
        </div>

        {/* Jarvis Button */}
        <div className="flex justify-center mt-10">
          <button
            onClick={() => {
              const utterance = new SpeechSynthesisUtterance(
                "Here are my key technical skills. I am proficient in React, Node.js, MongoDB, Express, and more."
              );
              speechSynthesis.speak(utterance);
            }}
            className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-full font-semibold shadow-lg"
          >
            🧑‍🚀 Activate Jarvis
          </button>
        </div>
      </section>
      <Contact/>
      <Footer />
    </>
  );
};

export default Hero;
