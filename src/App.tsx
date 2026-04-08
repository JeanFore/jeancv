import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Education from './components/Education';
import Contact from './components/Contact';
import CodeParallaxBackground from './components/CodeParallaxBackground';

function App() {
  return (
    <div className="app app-shell">
      <CodeParallaxBackground />

      <div className="app-content">
        <Navbar />
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Education />
        <Contact />

        <footer style={{ padding: '4rem 0', textAlign: 'center', opacity: 0.5, fontSize: '0.9rem' }}>
          <p>&copy; {new Date().getFullYear()} Jean Breiner Forero.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
