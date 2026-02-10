import Navbar from "./components/Navbar";
import "./components/style.css";
import one from '../src/assests/img/11.jpg'
import two from '../src/assests/img/22.jpg'
import three from '../src/assests/img/33.jpg'
import me from '../src/assests/img/jofra.jpeg'
function App() {
  return (
    <>
      <Navbar />
<section id="home" className="hero-section snap">

  <div className="home-wrapper">

    <div className="home-text">
      <h1>Hello, I'm <span>Sivaprakash</span></h1>
      <p>
        I'm a passionate tech enthusiast specialized in Web Development. I love
        building innovative projects that solve real-world problems.
      </p>

      <div className="skills">
        <button>Python</button>
        <button>React</button>
        <button>SQL & NoSQL</button>
      </div>
    </div>

    <div className="home-image">
      <img src={me} alt="Sivaprakash" />
    </div>

  </div>
</section>



      <section id="profile" className="profile-section snap">
        <h1 className="profile-title">Hello, I'm <span>Sivaprakash</span></h1>
        <p className="profile-sub">
          I'm a passionate technology enthusiast with expertise in Web Development.
        </p>

        <h2 className="edu-title">Education</h2>
        <p className="edu-item">
          🎓 M.C.A - Nehru Institute of Information Technology & Management
        </p>
        <p className="edu-item">
          🎓 B.Sc. Information Technology - Mary Matha College
        </p>

        <h2 className="skills-title">Skills</h2>
        <div className="skills">
          <button>Python</button>
          <button>React</button>
          <button>SQL</button>
        </div>
      </section>

      <section id="projects" className="projects-section snap">
  <h2 className="projects-title">Projects</h2>

  <div className="projects-grid">

    <a 
      href="https://github.com/jofrashiva/Online-Food-Ordering"
      target="_blank"
      rel="noopener noreferrer"
      className="project-card"
    >
      <img src={one} alt="Food App" />
      <h3>Online Food Ordering</h3>
      <p>
        A web app for ordering food online with user login, cart,
        and payment integration.
      </p>
    </a>

    <a 
      href="https://github.com/jofrashiva/emonews"
      target="_blank"
      rel="noopener noreferrer"
      className="project-card"
    >
      <img src={two} alt="EmoNews" />
      <h3>EmoNews</h3>
      <p>
        A mood-based news reader web app using facial emotion detection
        and curated news display.
      </p>
    </a>

    <a 
      href="https://siva-prakash.neocities.org/"
      target="_blank"
      rel="noopener noreferrer"
      className="project-card"
    >
      <img src={three} alt="Shiva" />
      <h3>Shiva</h3>
      <p>
        An action-themed project with interactive UI and dynamic content
        for showcasing.
      </p>
    </a>

  </div>
</section>


      <section id="contact" className="contact-section snap">
  <h2 className="contact-title">Get in Touch 📬</h2>

  <div className="contact-grid">

    {/* EMAIL */}
    <a 
      href="mailto:jofrashiva04@gmail.com"
      className="contact-card"
    >
      <h3>📧 Email</h3>
      <p>jofrashiva04@gmail.com</p>
    </a>

    {/* GITHUB */}
    <a 
      href="https://github.com/sivaprakashakintern"
      target="_blank"
      rel="noopener noreferrer"
      className="contact-card"
    >
      <h3>💻 GitHub</h3>
      <p>sivaprakashakintern</p>
    </a>

    {/* LINKEDIN */}
    <a 
      href="https://www.linkedin.com/in/sivaprakash-m-1525ss/"
      target="_blank"
      rel="noopener noreferrer"
      className="contact-card"
    >
      <h3>🔗 LinkedIn</h3>
      <p>sivaprakash-m-1525ss</p>
    </a>

    {/* INSTAGRAM */}
    <a 
      href="https://www.instagram.com/jofra_shiva04/"
      target="_blank"
      rel="noopener noreferrer"
      className="contact-card"
    >
      <h3>📸 Instagram</h3>
      <p>@jofra_shiva04</p>
    </a>

    {/* WHATSAPP (PROJECT COMMIT DEFAULT MESSAGE) */}
    <a 
      href="https://wa.me/918838939801?text=Hi%20bro,%20I%20want%20to%20discuss%20project%20commit%20and%20code%20review."
      target="_blank"
      rel="noopener noreferrer"
      className="contact-card"
    >
      <h3>📱 WhatsApp</h3>
      <p>Chat Now</p>
    </a>

  </div>
</section>

    </>
  );
}

export default App;
