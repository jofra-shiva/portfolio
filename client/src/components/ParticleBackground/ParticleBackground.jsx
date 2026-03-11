import { useCallback } from 'react';
import { loadSlim } from '@tsparticles/slim';
import Particles from '@tsparticles/react';

const ParticleBackground = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      style={{ position: 'absolute', inset: 0, zIndex: 0 }}
      options={{
        background: { color: { value: 'transparent' } },
        fpsLimit: 60,
        interactivity: {
          events: {
            onHover: { enable: true, mode: 'grab' },
            onClick: { enable: true, mode: 'push' },
          },
          modes: {
            grab: { distance: 140, links: { opacity: 0.5 } },
            push: { quantity: 3 },
          },
        },
        particles: {
          color: { value: ['#6366f1', '#06b6d4', '#f59e0b'] },
          links: {
            color: '#6366f1',
            distance: 130,
            enable: true,
            opacity: 0.12,
            width: 1,
          },
          move: {
            enable: true,
            outModes: { default: 'bounce' },
            speed: 1.2,
          },
          number: { value: 60, density: { enable: true, area: 800 } },
          opacity: { value: { min: 0.2, max: 0.5 } },
          shape: { type: 'circle' },
          size: { value: { min: 1, max: 3 } },
        },
        detectRetina: true,
      }}
    />
  );
};

export default ParticleBackground;
