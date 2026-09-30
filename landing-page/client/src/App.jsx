import { useState } from 'react'
import {
  Activity,
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  AudioLines,
  Camera,
  Check,
  Menu,
  MoveUpRight,
  ScanLine,
  X,
} from 'lucide-react'
import './App.css'

const features = [
  {
    number: '01',
    icon: ScanLine,
    title: 'Form, in focus',
    description:
      'Your camera reads movement as it happens, turning every rep into useful feedback.',
  },
  {
    number: '02',
    icon: AudioLines,
    title: 'Coaching you can hear',
    description:
      'Short voice cues arrive when you need them, so your eyes stay on the movement.',
  },
  {
    number: '03',
    icon: Activity,
    title: 'Progress that adds up',
    description:
      'Reps, sets, and workout history stay together so consistency is easy to see.',
  },
]

const exercises = ['Squats', 'Push-ups', 'Biceps curls', 'Shoulder press', 'Lunges']
const coachAppUrl = import.meta.env.VITE_COACH_APP_URL || 'http://localhost:8501'
const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/+$/, '')

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [signupState, setSignupState] = useState('idle')
  const [signupMessage, setSignupMessage] = useState('')

  async function handleSignup(event) {
    event.preventDefault()
    setSignupState('loading')
    setSignupMessage('')

    try {
      const response = await fetch(`${apiBaseUrl}/api/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || 'We could not save your email yet.')
      }

      setSignupState('success')
      setSignupMessage('You’re on the list. We’ll be in touch.')
      setEmail('')
    } catch (error) {
      setSignupState('error')
      setSignupMessage(error.message || 'Something went wrong. Please try again.')
    }
  }

  function closeMenu() {
    setMenuOpen(false)
  }

  return (
    <div className="site-shell" id="top">
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Apna AI Gym Coach home">
          <span className="brand-mark" aria-hidden="true">
            <Activity size={20} strokeWidth={2.4} />
          </span>
          <span className="brand-copy">
            <strong>APNA</strong>
            <span>AI GYM COACH</span>
          </span>
        </a>

        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        <nav className={`main-nav${menuOpen ? ' is-open' : ''}`} aria-label="Main navigation">
          <a href="#how-it-works" onClick={closeMenu}>How it works</a>
          <a href="#coach" onClick={closeMenu}>Your coach</a>
          <a href="#early-access" onClick={closeMenu}>Early access</a>
        </nav>

        <a className="header-cta" href={coachAppUrl} target="_blank" rel="noreferrer">
          Sign in <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      </header>

      <main>
        <section className="hero" aria-labelledby="hero-title">
          <img
            className="hero-image"
            src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=2400&q=88"
            alt="Athlete training with weights in a gym"
            fetchPriority="high"
          />
          <div className="hero-shade" aria-hidden="true" />
          <div className="hero-content">
            <p className="eyebrow hero-eyebrow">
              <span className="live-dot" /> REAL-TIME AI GYM TRAINER
            </p>
            <h1 id="hero-title">A sharper eye on every rep.</h1>
            <p className="hero-copy">
              Meet the coach that watches your form, counts your work, and speaks up right on time.
            </p>
            <div className="hero-actions">
              <a className="button button-lime" href={coachAppUrl} target="_blank" rel="noreferrer">
                Open the live coach <ArrowUpRight size={18} aria-hidden="true" />
              </a>
              <a className="text-link" href="#how-it-works">
                See how it works <ArrowDown size={16} aria-hidden="true" />
              </a>
            </div>
          </div>
          <div className="hero-caption" aria-label="Live camera and voice coaching">
            <span className="caption-icon"><Camera size={16} /></span>
            <span>CAMERA-READY</span>
            <span className="caption-divider" />
            <span className="caption-icon"><AudioLines size={16} /></span>
            <span>VOICE-ON</span>
          </div>
          <div className="hero-index">01 <span>/</span> 03</div>
        </section>

        <section className="signal-band" aria-label="Training signals">
          <span>YOUR CAMERA</span><span className="signal-star">✳</span>
          <span>REAL-TIME FORM</span><span className="signal-star">✳</span>
          <span>USEFUL COACHING</span><span className="signal-star">✳</span>
          <span>YOUR NEXT REP</span>
        </section>

        <section className="intro-section section-wrap" id="how-it-works">
          <div className="section-label"><span>01 / THE METHOD</span><span>MADE FOR YOUR SPACE</span></div>
          <div className="intro-grid">
            <h2>Good form changes everything.</h2>
            <div className="intro-copy">
              <p>
                Set your phone down, choose your movement, and get clear feedback as you train.
                No complicated setup. Just a little more confidence in every set.
              </p>
              <a className="dark-link" href="#coach">Meet your training partner <MoveUpRight size={17} /></a>
            </div>
          </div>
          <div className="feature-grid">
            {features.map(({ number, icon: Icon, title, description }) => (
              <article className="feature-item" key={number}>
                <div className="feature-topline">
                  <span>{number}</span>
                  <Icon size={23} strokeWidth={1.8} aria-hidden="true" />
                </div>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="coach-section" id="coach">
          <div className="coach-copy">
            <p className="eyebrow"><span>02 / YOUR TRAINING PARTNER</span></p>
            <h2>Less guessing.<br />More good reps.</h2>
            <p className="coach-description">
              Apna brings real-time pose tracking and voice coaching into the workout you already do.
              Keep moving while your coach keeps an eye on the details.
            </p>
            <div className="coach-checklist">
              <span><Check size={17} /> Tracks movement as you train</span>
              <span><Check size={17} /> Cues you without breaking focus</span>
              <span><Check size={17} /> Keeps your sets and history in view</span>
            </div>
            <a className="button button-lime" href="#early-access">
              Get on the list <ArrowRight size={18} />
            </a>
          </div>
          <div className="coach-visual">
            <div className="coach-photo-wrap">
              <img
                src="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=1400&q=86"
                alt="Athlete practicing a strength movement"
                loading="lazy"
              />
              <div className="scan-corner scan-corner-a" />
              <div className="scan-corner scan-corner-b" />
              <div className="scan-label"><span className="live-dot" /> FORM CHECK ACTIVE</div>
              <div className="angle-marker">01 <span>LIVE</span></div>
            </div>
            <p className="visual-caption">A coach in your corner, wherever you train.</p>
          </div>
        </section>

        <section className="movement-section section-wrap" aria-labelledby="movement-title">
          <div className="section-label"><span>03 / YOUR MOVEMENTS</span><span>START WITH THE BASICS</span></div>
          <div className="movement-heading">
            <h2 id="movement-title">Built around the work.</h2>
            <p>Choose a movement and let your session take shape.</p>
          </div>
          <div className="movement-list">
            {exercises.map((exercise, index) => (
              <div className="movement-row" key={exercise}>
                <span className="movement-number">0{index + 1}</span>
                <span className="movement-name">{exercise}</span>
                <ArrowUpRight className="movement-arrow" size={20} aria-hidden="true" />
              </div>
            ))}
          </div>
        </section>

        <section className="signup-section" id="early-access">
          <div className="signup-inner">
            <p className="eyebrow"><span>YOUR NEXT SET STARTS HERE</span></p>
            <h2>Make room for<br />a better workout.</h2>
            <p className="signup-copy">Join the early-access list for updates from Apna AI Gym Coach.</p>
            <form className="signup-form" onSubmit={handleSignup}>
              <label className="sr-only" htmlFor="signup-email">Email address</label>
              <input
                id="signup-email"
                type="email"
                autoComplete="email"
                placeholder="Your email address"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
              <button className="button button-dark" type="submit" disabled={signupState === 'loading'}>
                {signupState === 'loading' ? 'Joining...' : 'Join the list'}
                <ArrowRight size={18} aria-hidden="true" />
              </button>
            </form>
            <p className={`signup-message ${signupState}`} aria-live="polite">
              {signupMessage}
            </p>
            <span className="signup-stamp" aria-hidden="true">APNA<br />01—26</span>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <a className="brand footer-brand" href="#top" aria-label="Apna AI Gym Coach home">
          <span className="brand-mark" aria-hidden="true"><Activity size={19} /></span>
          <span className="brand-copy"><strong>APNA</strong><span>AI GYM COACH</span></span>
        </a>
        <p>Train with intention. Come back stronger.</p>
        <a className="back-top" href="#top">BACK TO TOP <ArrowUpRight size={15} /></a>
        <span className="copyright">© 2026 APNA AI GYM COACH</span>
      </footer>
    </div>
  )
}

export default App
