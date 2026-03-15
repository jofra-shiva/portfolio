import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import Chatbot from '../Chatbot/Chatbot';
import { getPortfolioInfo } from '../../api';

const ClientLayout = () => {
  const [info, setInfo] = useState(null);

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const res = await getPortfolioInfo();
        setInfo(res.data && typeof res.data === 'object' ? res.data : null);
      } catch (err) {
        console.error('Failed to load portfolio info:', err);
      }
    };
    fetchInfo();
    
    // Ensure we start at the top when navigating
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <Outlet context={{ info }} />
      </main>
      <Footer info={info} />
      <Chatbot />
    </>
  );
};

export default ClientLayout;
