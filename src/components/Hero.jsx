import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, Html, useGLTF, Float } from "@react-three/drei";
import { useRef, Suspense, useState, useMemo } from "react";
// Assuming these exist in your project structure
import Navbar from "./Navbar";
import Footer from "./Footer";
import Contact from "./Contact";

// --- DATA ---
const projects = [
  {
    title: "E-Commerce App",
    tech: "MERN + Razorpay",
    emoji: "🛒",
    link: "https://e-shop-new-fcff.vercel.app/",
    color: "from-blue-400 to-cyan-300"
  },
  {
    title: "Admin Dashboard",
    tech: "React + MUI + Charts",
    emoji: "📊",
    link: "https://mono-repo-client.vercel.app",
    color: "from-purple-400 to-pink-300"
  },
  {
    title: "Portfolio Website",
    tech: "React + Tailwind + Framer",
    emoji: "💼",
    link: "https://ai-portfolio-wheat-three.vercel.app",
    color: "from-yellow-400 to-orange-300"
  },
];

const skills = [
  { name: "React", level: 90 },
  { name: "Node", level: 85 },
  { name: "Mongo", level: 80 },
  { name: "Express", level: 85 },
  { name: "Tailwind", level: 95 },
  { name: "TS", level: 75 },
];

// --- CUSTOM SVG COMPONENT (Replaces react-circular-progressbar) ---
const ProgressRing = ({ radius, stroke, progress, color }) => {
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center">
      <svg height={radius * 2} width={radius * 2} className="rotate-[-90deg]">
        {/* Track */}
        <circle
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth={stroke}
          fill="transparent"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        {/* Indicator */}
        <circle
          stroke={color}
          strokeWidth={stroke}
          strokeDasharray={circumference + ' ' + circumference}
          style={{ strokeDashoffset, transition: 'stroke-dashoffset 1s ease-in-out' }}
          strokeLinecap="round"
          fill="transparent"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
      </svg>
      {/* Text centered absolutely */}
      <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white">
        {progress}%
      </div>
    </div>
  );
};

// --- 3D COMPONENTS ---

const SkillSphere = ({ skill, position }) => {
  const ref = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if(ref.current) {
        // Slow rotation
        ref.current.rotation.y += 0.005;
        ref.current.rotation.x += 0.002;
        
        // Hover expansion effect
        const targetScale = hovered ? 1.2 : 1;
        ref.current.scale.x += (targetScale - ref.current.scale.x) * 0.1;
        ref.current.scale.y += (targetScale - ref.current.scale.y) * 0.1;
        ref.current.scale.z += (targetScale - ref.current.scale.z) * 0.1;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh 
        ref={ref} 
        position={position} 
        onPointerOver={() => setHovered(true)} 
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[0.7, 32, 32]} />
        <meshStandardMaterial 
            color={hovered ? "#fbbf24" : "#4f46e5"} 
            emissive={hovered ? "#fbbf24" : "#312e81"}
            emissiveIntensity={hovered ? 0.8 : 0.2}
            roughness={0.2}
            metalness={0.8}
        />
        
        <Html position={[0, 0, 0]} center transform sprite distanceFactor={10}>
          <div className={`transition-all duration-300 transform ${hovered ? 'scale-110 opacity-100' : 'scale-100 opacity-90'}`}>
             <div className="flex flex-col items-center justify-center w-24 h-24 bg-black/40 backdrop-blur-sm rounded-full border border-white/10 shadow-xl">
              
              {/* Custom SVG Ring */}
              <ProgressRing 
                radius={32} 
                stroke={4} 
                progress={skill.level} 
                color={hovered ? '#fbbf24' : '#818cf8'} 
              />
              
              <div className="text-[10px] font-bold text-gray-200 mt-1 uppercase tracking-wider">{skill.name}</div>
            </div>
          </div>
        </Html>
      </mesh>
    </Float>
  );
};

const Astronaut = () => {
  const { scene } = useGLTF("https://modelviewer.dev/shared-assets/models/Astronaut.glb");
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <primitive object={scene} scale={1.8} position={[0, -2.5, 0]} rotation={[0, Math.PI / 5, 0]} />
    </Float>
  );
};

// --- MAIN HERO COMPONENT ---

const Hero = () => {
  const activateJarvis = () => {
    const text = "Welcome Soumya. System protocols initiated. Displaying project portfolio and technical skill matrix.";
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;
    utterance.pitch = 0.9;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="relative bg-[#0f0c29] text-white min-h-screen overflow-x-hidden selection:bg-indigo-500 selection:text-white">
      <Navbar />

      {/* 1. BACKGROUND 3D CANVAS (Full Viewport) */}
      <div className="fixed inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 12], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1.5} color="#818cf8" />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#f472b6" />
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          
          <Suspense fallback={null}>
             <Astronaut />
             <group rotation={[0.2, 0, 0]}>
                {skills.map((skill, index) => {
                  const angle = (index / skills.length) * Math.PI * 2;
                  const radius = 5.5; 
                  // Calculate 3D positions for a tilted orbit
                  const x = Math.cos(angle) * radius;
                  const z = Math.sin(angle) * radius * 0.5; 
                  const y = Math.sin(angle * 2) * 1.5; 
                  
                  return <SkillSphere key={index} skill={skill} position={[x, y, z]} />;
                })}
             </group>
          </Suspense>
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </div>

      {/* 2. FOREGROUND CONTENT (Scrollable) */}
      <div className="relative z-10 px-6 max-w-7xl mx-auto flex flex-col items-center w-full">
        
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col justify-center items-center pt-20">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="text-center space-y-6 backdrop-blur-sm bg-black/10 p-8 rounded-3xl border border-white/5"
            >
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-green-400/30 bg-green-400/10 text-green-300 text-sm font-medium animate-pulse">
                    <span className="w-2 h-2 rounded-full bg-green-400"></span>
                    Available for hire
                </div>
                
                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
                    Soumya <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Ranjan</span>
                </h1>
                
                <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto">
                    Architecting <span className="text-indigo-400 font-bold">MERN</span> solutions with 
                    precision and passion.
                </p>

                <div className="flex flex-wrap justify-center gap-4 mt-8">
                    <button 
                        onClick={activateJarvis}
                        className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full font-bold shadow-lg shadow-indigo-500/20 hover:scale-105 transition-transform"
                    >
                        Activate Assistant
                    </button>
                </div>
            </motion.div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="w-full py-20">
             <motion.h2 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="text-4xl font-bold mb-12 text-center"
             >
                Featured Projects
             </motion.h2>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {projects.map((project, idx) => (
                    <motion.a
                        key={idx}
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        whileHover={{ y: -10 }}
                        className="group relative rounded-2xl bg-white/5 border border-white/10 overflow-hidden hover:border-indigo-500/50 transition-colors"
                    >
                        {/* Hover Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        
                        <div className="relative p-6 h-full flex flex-col backdrop-blur-md">
                            <div className="flex justify-between items-start mb-6">
                                <span className="text-5xl drop-shadow-lg">{project.emoji}</span>
                                <div className={`h-3 w-3 rounded-full bg-gradient-to-r ${project.color} shadow-[0_0_10px_currentColor]`} />
                            </div>
                            
                            <h3 className="text-2xl font-bold mb-2 group-hover:text-indigo-300 transition-colors">{project.title}</h3>
                            <p className="text-sm text-gray-400 font-mono mb-4">{project.tech}</p>
                            
                            <div className="mt-auto flex items-center gap-2 text-sm font-semibold text-white/50 group-hover:text-white transition-colors">
                                Explore <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </div>
                        </div>
                    </motion.a>
                ))}
            </div>
        </section>

        <div className="w-full">
            <Contact />
            <Footer />
        </div>
      </div>
    </div>
  );
};

export default Hero;
