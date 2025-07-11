import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-indigo-800 to-purple-800 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center text-white">
       <Link to="/about" className="hover:text-yellow-300">
                                                          <h1 className="text-xl font-bold">Soumya Ranjan</h1>
        </Link>
        <div className="space-x-6">
          <a href="https://github.com/SoumyaRanjanBhanja1" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-300">GitHub</a>
          <a href="https://www.linkedin.com/in/soumya-ranjan-bhanja-270644247" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-300">LinkedIn</a>
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-300">Resume</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
