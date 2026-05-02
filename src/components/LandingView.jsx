import { useNavigate } from 'react-router-dom'
import fish1 from '../assets/fish1.png'
import fish2 from '../assets/fish2.png'
import fish3 from '../assets/fish3.png'
import fish4 from '../assets/fish4.png'
import fish5 from '../assets/fish5.png'
import fish6 from '../assets/fish6.png'
import './LandingView.css'

export default function LandingView() {
  const navigate = useNavigate()

  return (
    <div className="landing" role="main" aria-label="FishyTodo landing page">

      {/* decorative fish — all different species */}
      <img src={fish1} className="landing-fish landing-fish--tl"  alt="" aria-hidden="true" />
      <img src={fish3} className="landing-fish landing-fish--tr"  alt="" aria-hidden="true" />
      <img src={fish4} className="landing-fish landing-fish--br"  alt="" aria-hidden="true" />
      <img src={fish5} className="landing-fish landing-fish--bl"  alt="" aria-hidden="true" />
      <img src={fish2} className="landing-fish landing-fish--mid" alt="" aria-hidden="true" />
      <img src={fish6} className="landing-fish landing-fish--bot" alt="" aria-hidden="true" />

      {/* centre content */}
      <div className="landing-center">
        <h1 className="landing-title">FishyTodo</h1>
        <p className="landing-tagline">
          a quiet little tank for your noisy little brain
        </p>
        <button
          className="btn btn-primary landing-cta"
          onClick={() => navigate('/tank')}
          aria-label="Enter the task tank"
        >
          let&apos;s swim →
        </button>
        <p className="landing-subtitle" aria-label="A calm to-do list, designed for ADHD brains">
          ✦ a calm to-do list, designed for ADHD brains ✦
        </p>
      </div>

      {/* bottom waves */}
      <svg
        className="landing-waves"
        viewBox="0 0 1200 80"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0 50 Q 80 15 160 50 T 320 50 T 480 50 T 640 50 T 800 50 T 960 50 T 1120 50 T 1200 50"
          stroke="var(--tert)"
          strokeWidth="3"
          fill="none"
        />
        <path
          d="M0 60 Q 80 30 160 60 T 320 60 T 480 60 T 640 60 T 800 60 T 960 60 T 1120 60 T 1200 60"
          stroke="var(--sec)"
          strokeWidth="2"
          fill="none"
          opacity="0.6"
        />
      </svg>
    </div>
  )
}
