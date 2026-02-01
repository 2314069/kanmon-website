import { useInView } from '../../hooks/useInView';
import './Overview.css';

const overviewItems = [
  { label: 'Date', value: '2026年3月21日（土）\n22日（日）' },
  { label: 'Venue', value: '豪徳寺 本楼' },
  { label: 'Time', value: '13:00 - 18:00' },
];

const Overview = () => {
  const { ref, isInView } = useInView<HTMLElement>();

  return (
    <section className={`section fade-section ${isInView ? 'visible' : ''}`} ref={ref}>
      <div className="section-header">
        <p className="section-label">Overview</p>
        <h2 className="section-title">開催概要</h2>
      </div>
      <div className="overview-grid">
        {overviewItems.map((item, i) => (
          <div className="overview-card" key={item.label} style={{ transitionDelay: `${i * 0.1}s` }}>
            <p className="overview-label">{item.label}</p>
            <p className="overview-value">
              {item.value.split('\n').map((line, j) => (
                <span key={j}>{line}{j < item.value.split('\n').length - 1 && <br />}</span>
              ))}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Overview;
