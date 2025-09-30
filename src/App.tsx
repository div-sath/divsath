import './App.css'
import CustomCursor from './CustomCursor'
import ParticleBackground from './ParticleBackground'
import { useState, useEffect } from 'react'

function RotatingPhrases() {
  const phrases = [
    'Biochemistry student',
    'BME enthusiast',
    'Problem solver',
    'Protein engineer in-training',
  ]
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const fullText = phrases[phraseIndex]
    let timer: number

    if (!isDeleting) {
      if (displayText !== fullText) {
        timer = window.setTimeout(() => setDisplayText(fullText.slice(0, displayText.length + 1)), 120)
      } else {
        // pause before deleting
        timer = window.setTimeout(() => setIsDeleting(true), 1000)
      }
    } else {
      if (displayText !== '') {
        timer = window.setTimeout(() => setDisplayText(fullText.slice(0, displayText.length - 1)), 60)
      } else {
        setIsDeleting(false)
        setPhraseIndex((i) => (i + 1) % phrases.length)
      }
    }

    return () => clearTimeout(timer)
  }, [displayText, isDeleting, phraseIndex])

  return (
    <div className="rotating-phrases">
      <span className="phrase">{displayText}</span>
    </div>
  )
}

function App() {
  const [view, setView] = useState<'home' | 'resume' | 'extracurriculars' | 'contact'>('home')

  const renderSection = () => {
    switch (view) {
      
      case 'resume':
        return (
          <section className="internship-section section-card">
            <div className="card-list">
              <div className="resume-card">
                <div className="card-left">
                  <img className="company-logo" src="/images/umass-logo.png" alt="UMass Chan logo" />
                </div>
                <div className="card-right">
                  <div className="role-row">
                    <h4 className="role-title">Research Intern</h4>
                    <div className="company-name">UMass Chan Medical School</div>
                  </div>
                  <div className="meta-row">
                    <span className="meta">July 2023 - August 2024</span>
                    <span className="meta">Worcester, MA</span>
                  </div>
                  <p className="card-desc">Conducted in vitro experiments including nanoparticle-based assays, buffer preparation, and protein/nucleic acid analysis to study therapeutic applications. Assisted in developing and optimizing lab protocols for molecular assays and documented experimental changes for team review.</p>
                  <h5 className="impact-title">Impact & Results</h5>
                  <ul className="impact-list">
                    <li>Applied statistical methods to analyze experimental data and prepared written reports that supported ongoing projects.</li>
                    <li>Maintained lab inventory and performed preventative equipment maintenance to ensure consistent experiment operations.</li>
                  </ul>
                  <div className="tech-stack">
                    <span className="chip">Nanoparticle assays</span>
                    <span className="chip">Protein & nucleic acid analysis</span>
                    <span className="chip">Protocol development</span>
                    <span className="chip">Statistical analysis</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )
      case 'extracurriculars':
        return (
          <section className="extracurricular-section section-card">
            <h3 className="section-title">Professional Development</h3>
            <div className="card-list">
              <div className="activity-card">
                <strong>Technical Skills</strong>
                <p>Protein engineering, molecular biology, high-throughput screening, CRISPR/Cas9 systems</p>
              </div>
              <div className="activity-card">
                <strong>Publications & Presentations</strong>
                <p>Published research on protein engineering methodologies and presented at industry conferences</p>
              </div>
            </div>
          </section>
        )
      case 'contact':
        return (
          <section className="contact-section section-card">
            <h3 className="section-title">Get in Touch</h3>
            <form className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" placeholder="Your Name" required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" placeholder="Your Email" required />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" placeholder="Your Message" required rows={4}></textarea>
              </div>
              <button type="submit" className="submit-button">Send Message</button>
            </form>
          </section>
        )
      default:
        return null
    }
  }

  return (
    <>
  <CustomCursor />
      <nav className="navbar">
        <a href="#" onClick={(e) => { e.preventDefault(); setView('home') }}>Home</a>
  <a href="#" onClick={(e) => { e.preventDefault(); setView('resume') }}>Resume</a>
        <a href="#" onClick={(e) => { e.preventDefault(); setView('extracurriculars') }}>Extracurriculars</a>
        <a href="#" onClick={(e) => { e.preventDefault(); setView('contact') }}>Contact</a>
      </nav>

      <div className="portfolio-root modern-layout">
        <ParticleBackground />
        {view === 'home' && (
          <header className="header-section">
            <h1 className="main-title">Divya Sathya</h1>
            <RotatingPhrases />
            <h2 className="subtitle">Biochemistry and Molecular Biology student</h2>
          </header>
        )}

        

        <main className="main-content">
          {renderSection()}
        </main>

        
      </div>
    </>
  )
}

export default App
