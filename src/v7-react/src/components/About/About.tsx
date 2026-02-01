import { useInView } from '../../hooks/useInView';
import './About.css';

const About = () => {
  const { ref, isInView } = useInView<HTMLElement>();

  return (
    <section className={`about section ${isInView ? 'visible' : ''}`} ref={ref}>
      <div className="section-header">
        <p className="section-label">About</p>
        <h2 className="section-title">感門之盟とは</h2>
      </div>
      <div className="about-content">
        <div className="about-image">
          <img src="/capture/王義之.png" alt="王義之の蘭亭の会" loading="lazy" />
        </div>
        <p className="about-text">
          <strong>感門之盟</strong>（かんもんのめい）は、<br />
          イシス編集学校での講座修了ごとに<br />
          学びをともにしたもの同士が一同に会する集いです。<br /><br />
          師範代をはじめ師範陣も学衆も場をともにして<br />
          次の編集を企てる<strong>祝祭</strong>。<br />
          王義之の蘭亭の会に由来します。
        </p>
      </div>
    </section>
  );
};

export default About;
