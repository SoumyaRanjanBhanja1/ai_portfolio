import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import { motion } from 'framer-motion';

const ResumeCard = () => {
  return (
    <Html center>
      <motion.div
        initial={{ opacity: 0, rotateY: 90 }}
        animate={{ opacity: 1, rotateY: 0 }}
        transition={{ duration: 1 }}
        className="w-[85vw] max-w-4xl p-6 bg-white bg-opacity-90 text-black rounded-2xl shadow-2xl overflow-y-auto h-[70vh] backdrop-blur-sm"
      >
        <h2 className="text-3xl font-bold text-center mb-4">Soumya Ranjan Bhanja</h2>
        <p className="text-center text-gray-700 mb-2">MERN Stack Developer</p>
        <p className="text-center text-sm mb-4">📧 soumyabhanja113@gmail.com | 📞 6304199322</p>

        <hr className="my-2" />
        <h3 className="text-xl font-semibold mt-4">💼 Professional Summary</h3>
        <p className="text-sm mt-1">
          Detail-oriented MERN Stack Developer with 1.7 years of experience building high-performance apps using MongoDB, Express.js, React.js, and Node.js.
        </p>

        <h3 className="text-xl font-semibold mt-4">🛠 Technical Skills</h3>
        <p className="text-sm mt-1">
          React.js, Redux Toolkit, Material UI, TypeScript, Node.js, Express, MongoDB, MySQL, Google OAuth, Razorpay, REST APIs, JWT
        </p>

        <h3 className="text-xl font-semibold mt-4">💼 Experience</h3>
        <p className="text-sm mt-1">
          Brightcom Group Pvt. Ltd – MERN Developer (Nov 2022 – Jul 2024)
          <br />
          ▪ Built full-stack apps, reduced load time by 30%, added real-time JWT auth, Razorpay integration.
        </p>

        <h3 className="text-xl font-semibold mt-4">🚀 Key Projects</h3>
        <p className="text-sm mt-1">
          • Tour Buddy – Travel web app with chatbot & SEO<br />
          • E-Shopping App – Full MERN, OTP, Google Login, Razorpay
        </p>

        <h3 className="text-xl font-semibold mt-4">🎓 Education</h3>
        <p className="text-sm mt-1">B.Tech, Electrical & Electronics, GIET, Odisha</p>

        <h3 className="text-xl font-semibold mt-4">📜 Certifications</h3>
        <p className="text-sm mt-1">
          • Certified Full-Stack Web Developer – Holberton School<br />
          • Advanced React.js – Holberton School
        </p>
      </motion.div>
    </Html>
  );
};

const Resume3D = () => {
  return (
    <div className="h-screen w-full bg-gradient-to-r from-slate-900 to-indigo-900">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[0, 5, 5]} />
        <OrbitControls enableZoom={false} />
        <ResumeCard />
      </Canvas>
    </div>
  );
};

export default Resume3D;
