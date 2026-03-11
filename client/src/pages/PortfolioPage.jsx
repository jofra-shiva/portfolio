import { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Navbar from '../components/Navbar/Navbar';
import Hero from '../components/Hero/Hero';
import About from '../components/About/About';
import Skills from '../components/Skills/Skills';
import Projects from '../components/Projects/Projects';
import Contact from '../components/Contact/Contact';
import Footer from '../components/Footer/Footer';
import Chatbot from '../components/Chatbot/Chatbot';
import { getPortfolioInfo, getProjects, getSkills } from '../api';

const PortfolioPage = () => {
  const [info, setInfo] = useState(null);
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 700, once: true, offset: 60, easing: 'ease-out-cubic' });

    const fetchData = async () => {
      try {
        const [infoRes, projectsRes, skillsRes] = await Promise.all([
          getPortfolioInfo(),
          getProjects(),
          getSkills(),
        ]);
        
        // Defensive checks to prevent crashes if API returns HTML strings instead of JSON arrays/objects
        setInfo(infoRes.data && typeof infoRes.data === 'object' ? infoRes.data : null);
        setProjects(Array.isArray(projectsRes.data) ? projectsRes.data : []);
        setSkills(Array.isArray(skillsRes.data) ? skillsRes.data : []);
        
      } catch (err) {
        console.error('Failed to load portfolio data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <Hero info={info} projects={projects} />
      <About info={info} />
      <Skills skills={skills} />
      <Projects projects={projects} loading={loading} />
      <Contact info={info} />
      <Footer info={info} />
      <Chatbot />
    </>
  );
};

export default PortfolioPage;
