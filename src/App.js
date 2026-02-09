import Navbar from "./components/Navbar";
import "./components/style.css";
import one from '../src/assests/img/11.jpg'
import two from '../src/assests/img/22.jpg'
import three from '../src/assests/img/33.jpg'
function App() {
  return (
    <>
      <Navbar />

      <section id="home" className="hero-section snap">
  <h1>Hello, I'm <span>Sivaprakash</span></h1>
  <p>
    I'm a passionate tech enthusiast specialized in Web Development. I love
    building innovative projects that solve real-world problems.
  </p>

  <div className="skills">
    <button>Python</button>
    <button>JavaScript</button>
    <button>React</button>
    <button>Node.js</button>
    <button>SQL & NoSQL</button>
    <button>IoT</button>
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
          <button>JavaScript</button>
          <button>React</button>
          <button>Node.js</button>
          <button>SQL</button>
          <button>IoT</button>
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

          <div className="contact-card">
            <h3>📧 Email</h3>
            <p>jofrashiva04@gmail.com</p>
          </div>

          <div className="contact-card">
            <h3>💻 GitHub</h3>
            <p>jofrashiva</p>
          </div>

          <div className="contact-card">
            <h3>🔗 LinkedIn</h3>
            <p>sivaprakash-m-1525ss</p>
          </div>

          <div className="contact-card">
            <h3>📸 Instagram</h3>
            <p>@jofra_shiva04</p>
          </div>

          <div className="contact-card">
            <h3>📱 WhatsApp</h3>
            <p>Chat Now</p>
          </div>

        </div>
      </section>
    </>
  );
}

export default App;
