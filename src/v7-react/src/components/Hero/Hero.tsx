import { useParallax } from '../../hooks/useParallax';
import './Hero.css';

const Hero = () => {
  const parallaxRef = useParallax<HTMLDivElement>(0.3);

  return (
    <section className="hero">
      {/* Gate Frame */}
      <div className="hero-gate" aria-hidden="true">
        <div className="hero-gate-beam" />
      </div>

      <div className="hero-grid">
        <div className="hero-content">
          <p className="hero-label">90回 感門之盟</p>
          <h1 className="hero-title">読奏<br />エディストリート</h1>
          <p className="hero-subtitle">編集の学びが交差する祝祭</p>
          <div className="hero-date">2026.3.21 SAT - 22 SUN</div>
        </div>
        <div className="hero-visual" ref={parallaxRef}>
          <img
            src="/images/hero-dark.png"
            alt="感門之盟 メインビジュアル"
            className="hero-image"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
