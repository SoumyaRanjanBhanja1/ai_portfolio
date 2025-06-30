import {BrowserRouter, Routes, Route } from 'react-router-dom';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Projects from './components/Projects.jsx';
import Contact from './components/Contact.jsx';
import Resume3DWithPDF from './components/Resume3DWithPDF';
import Resume3D from './components/Resume3D.jsx';


function App() {
  return (
    <div>
      <BrowserRouter>
         <Routes>
             <Route path='/' element={<Hero/>}/>
             <Route path='/about' element={<About/>}/>
             <Route path='/contact' element={<Contact/>}/>
             <Route path='/projects' element={<Projects/>}/>
             <Route path='/Resume' element={<Resume3DWithPDF/>}/>
             <Route path='/Resume3D' element={<Resume3D/>}/>
         </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
