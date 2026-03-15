import './GitHubStats.css';

const GITHUB_USERNAME = 'jofrashiva';

const statsUrl = `https://github-readme-stats.vercel.app/api?username=${GITHUB_USERNAME}&show_icons=true&theme=transparent&title_color=8b5cf6&icon_color=8b5cf6&text_color=cbd5e1&border_color=ffffff18&hide_border=false&count_private=true`;
const streakUrl = `https://github-readme-streak-stats.herokuapp.com/?user=${GITHUB_USERNAME}&theme=transparent&fire=8b5cf6&ring=8b5cf6&currStreakLabel=8b5cf6&sideLabels=cbd5e1&currStreakNum=f8fafc&sideNums=f8fafc&dates=64748b&border=ffffff18`;
const langsUrl = `https://github-readme-stats.vercel.app/api/top-langs/?username=${GITHUB_USERNAME}&layout=compact&theme=transparent&title_color=8b5cf6&text_color=cbd5e1&border_color=ffffff18&hide_border=false`;

const StatCard = ({ title, imgSrc, delay }) => (
  <div className="gh-stat-card card" data-aos="fade-up" data-aos-delay={delay}>
    <div className="gh-stat-card__label">{title}</div>
    <img
      src={imgSrc}
      alt={title}
      className="gh-stat-card__img"
      loading="lazy"
    />
  </div>
);

const GitHubStats = () => (
  <section id="github-stats" className="section github-stats">
    <div className="container">
      <div className="section-header" data-aos="fade-up">
        <div className="section-tag">Open Source</div>
        <h2 className="section-title">GitHub <span>Activity</span></h2>
        <div className="divider"></div>
        <p className="section-subtitle">Real-time stats from my GitHub profile — contributions, streaks & languages</p>
      </div>

      <div className="gh-stats__grid">
        <StatCard title="📊 GitHub Stats" imgSrc={statsUrl} delay={0} />
        <StatCard title="🔥 Contribution Streak" imgSrc={streakUrl} delay={100} />
        <StatCard title="🚀 Top Languages" imgSrc={langsUrl} delay={200} />
      </div>

      <div className="gh-stats__cta" data-aos="fade-up">
        <a
          href={`https://github.com/${GITHUB_USERNAME}`}
          target="_blank"
          rel="noreferrer"
          className="btn btn-outline"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
          </svg>
          View Full GitHub Profile
        </a>
      </div>
    </div>
  </section>
);

export default GitHubStats;
