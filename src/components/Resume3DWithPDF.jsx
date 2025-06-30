import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import { motion } from 'framer-motion';

const RotatingCard = () => {
  const cardRef = useRef();

  useFrame(() => {
    if (cardRef.current) {
      cardRef.current.rotation.y += 0.002;
    }
  });

  return (
    <mesh ref={cardRef} position={[0, 0, 0]}>
      <boxGeometry args={[3.5, 5, 0.1]} />
      <meshStandardMaterial color="#ffffff" />
      <Html distanceFactor={1.3}>
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="w-[300px] h-[430px] rounded-lg shadow-2xl overflow-hidden bg-white"
        >
          <iframe
            src="/resume.pdf"
            title="Soumya Resume"
            className="w-full h-full"
            style={{ border: 'none' }}
          />
        </motion.div>
      </Html>
    </mesh>
  );
};

const Resume3DWithPDF = () => {
  return (
    <div className="h-screen w-full bg-gradient-to-br from-indigo-900 to-black relative">
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[0, 3, 5]} intensity={1} />
        <OrbitControls enableZoom={false} />
        <RotatingCard />
      </Canvas>

      {/* Download Button */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <a
          href="/resume.pdf"
          download="Soumya_Ranjan_Resume.pdf"
          className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300"
        >
          Download Resume
        </a>
      </div>
    </div>
  );
};

export default Resume3DWithPDF;
