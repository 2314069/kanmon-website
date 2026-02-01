import { Link } from 'react-router-dom';
import { useInView } from '../../hooks/useInView';
import './Cta.css';

const Cta = () => {
  const { ref, isInView } = useInView<HTMLElement>({ threshold: 0.3 });

  return (
    <section className={`cta ${isInView ? 'cta-animated' : ''}`} ref={ref}>
      <h2 className="cta-title">参加申し込み</h2>
      <p className="cta-subtitle">感門之盟への参加をお待ちしております</p>
      <Link to="/info" className="btn">参加案内を見る</Link>
    </section>
  );
};

export default Cta;
