import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Education from './components/Education';
import Contact from './components/Contact';

function App() {
  return (
    <div className="app">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Education />
      <Contact />
      
      <footer style={{ padding: '4rem 0', textAlign: 'center', opacity: 0.5, fontSize: '0.9rem' }}>
        <p>&copy; {new Date().getFullYear()} Jean Breiner Forero. Built with React & Framer Motion.</p>
      </footer>
    </div>
  );
}

export default App;
