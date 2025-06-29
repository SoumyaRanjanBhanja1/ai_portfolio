import {BrowserRouter, Routes, Route } from 'react-router-dom';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Projects from './components/Projects.jsx';
import Contact from './components/Contact.jsx';

function App() {
  return (
    <div>
      <BrowserRouter>
         <Routes>
             <Route path='/' element={<Hero/>}/>
             <Route path='/about' element={<About/>}/>
             <Route path='/contact' element={<Contact/>}/>
             <Route path='/projects' element={<Projects/>}/>
         </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
