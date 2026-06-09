import { Link } from 'react-router-dom';
import './HomePage.css';

const stats = [
  { value: '32,000 +', label: 'Experienced tutors' },
  { value: '300,000 +', label: '5-star tutor reviews' },
  { value: '120 +', label: 'Subjects taught' },
  { value: '200 +', label: 'Tutor nationalities' },
]


function HomePage() {
  return (
    <main className="home">
      <section className="hero">
        <div className="hero-content">

        <h1>Unlock your potential with the best language tutors</h1>

          <p>
            Embark on an Exciting Language Journey with Expert Language Tutors:
            Elevate your language proficiency to new heights by connecting with
            highly qualified and experienced tutors.
          </p>

          <Link to="/teachers" className="hero-btn">
            Get started
          </Link>
          </div>
      </section>

          <section className="stats">
            <ul className="stats-list">
              {stats.map((item) => (
                <li key={item.label} class="stats-item">
                  <span className="stats-value">{item.value}</span>
                  <span className="stats-label">{item.label}</span>
                </li>
              ))}
            </ul>
      </section>
    </main>
  );
}

export default HomePage;