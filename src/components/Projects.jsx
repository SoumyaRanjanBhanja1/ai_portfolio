import { useEffect, useState, Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, OrbitControls, Stars } from '@react-three/drei';
import Lottie from 'lottie-react';

// Card Component
const ProjectCard3D = ({ project, isSelected }) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  const [hoverAnim, setHoverAnim] = useState(null);

  useEffect(() => {
    fetch("https://assets4.lottiefiles.com/packages/lf20_jzbb7g0j.json")
      .then(res => res.json())
      .then(setHoverAnim);
  }, []);

  useFrame(() => {
    meshRef.current.rotation.y += hovered ? 0.006 : 0.003;
  });

  return (
    <mesh
      ref={meshRef}
      position={[0, 0, 0]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <boxGeometry args={[2.5, 1.5, 0.3]} />
      <meshStandardMaterial color={hovered ? '#f59e0b' : '#1f2937'} metalness={0.3} roughness={0.4} />
      <Html center>
        <div className={`w-64 p-4 text-white rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-center shadow-2xl transition duration-300 ${isSelected ? 'scale-110' : ''}`}>
          {hovered && hoverAnim && (
            <div className="flex justify-center mb-2">
              <Lottie animationData={hoverAnim} style={{ height: 50 }} loop autoplay />
            </div>
          )}
          <img src={project.image} alt={project.title} className="w-full h-24 object-cover rounded mb-2 border border-white/30" />
          <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
          <p className="text-xs text-gray-300 mb-2">{project.description}</p>
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-400 hover:text-yellow-300 text-sm font-semibold"
          >
            🔗 Live Demo
          </a>
        </div>
      </Html>
    </mesh>
  );
};

const Projects = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  // ✅ Static data from your resume
  const projects = [
    {
      _id: "1",
      title: "Tour Buddy – Travel Companion",
      description: "Responsive frontend, Email.js chatbot, SEO optimization.",
      image: "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d", // Replace with real image if you have one
      link: "https://github.com/SoumyaRanjanBhanja1/Projects"
    },
    {
      _id: "2",
      title: "E-Shopping App (MERN + Razorpay)",
      description: "OTP login, JWT auth, Google Login, Razorpay Integration.",
      image: "https://images.unsplash.com/photo-1581091012184-7f62b6b6a5d6", // Replace with real image if you have one
      link: "https://github.com/SoumyaRanjanBhanja1/Projects"
    }
  ];

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white relative">
      <h2 className="text-4xl font-extrabold text-center pt-10 tracking-wider">🚀 3D Projects Showcase</h2>

      <div className="h-[80vh] mt-10">
        <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <OrbitControls enableZoom={false} />
          <Stars radius={150} depth={80} count={10000} factor={6} fade speed={2} />

          <Suspense fallback={null}>
            {projects.map((project, i) => {
              const x = i * 3 - (projects.length - 1);
              const z = selectedIndex === i ? 2 : 0;
              return (
                <group
                  key={project._id}
                  position={[x, 0, z]}
                  onClick={() => setSelectedIndex(i === selectedIndex ? null : i)}
                >
                  <ProjectCard3D project={project} isSelected={selectedIndex === i} />
                </group>
              );
            })}
          </Suspense>
        </Canvas>
      </div>
    </section>
  );
};

export default Projects;
