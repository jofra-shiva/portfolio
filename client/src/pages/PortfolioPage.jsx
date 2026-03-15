import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Hero from '../components/Hero/Hero';
import About from '../components/About/About';
import Skills from '../components/Skills/Skills';
import GitHubStats from '../components/GitHubStats/GitHubStats';
import Projects from '../components/Projects/Projects';
import Experience from '../components/Experience/Experience';
import Achievements from '../components/Achievements/Achievements';
import Contact from '../components/Contact/Contact';
import { getProjects, getSkills } from '../api';

const PortfolioPage = () => {
  const { info } = useOutletContext();
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    AOS.init({ duration: 700, once: true, offset: 60, easing: 'ease-out-cubic' });

    const fetchData = async () => {
      try {
        const [projectsRes, skillsRes] = await Promise.all([
          getProjects(),
          getSkills(),
        ]);
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
      <Hero info={info} projects={projects} />
      <About info={info} />
      <Skills skills={skills} />
      <GitHubStats />
      <Projects projects={projects} loading={loading} />
      <Experience />
      <Achievements />
      <Contact info={info} />
    </>
  );
};

export default PortfolioPage;
