import { useInView } from '../../hooks/useInView';
import './Access.css';

const Access = () => {
  const { ref, isInView } = useInView<HTMLElement>();

  return (
    <section className={`section fade-section ${isInView ? 'visible' : ''}`} ref={ref}>
      <div className="section-header">
        <p className="section-label">Access</p>
        <h2 className="section-title">アクセス</h2>
      </div>
      <div className="access-grid">
        <div className="access-map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.5!2d139.6425!3d35.6615!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6018f27a1d8e1c5b%3A0x8d6e0e8f8e8e8e8e!2z5p2x5Lqs6YO95LiW55Sw6LC35Yy66LWk5aCC77yS5LiB55uu77yR77yV4oiS77yT!5e0!3m2!1sja!2sjp!4v1700000000000"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="本楼の地図"
          />
        </div>
        <div className="access-info">
          <h3>本楼</h3>
          <div className="access-detail">
            <strong>住所</strong><br />
            〒156-0044　東京都世田谷区赤堤２丁目１５番３号<br />
            編集工学研究所内<br />
            TEL：03-5301-2213
          </div>
          <div className="access-detail">
            <strong>アクセス方法</strong><br />
            小田急線・豪徳寺駅より徒歩７分<br />
            東急世田谷線・山下駅より徒歩7分
          </div>
          <div className="access-detail">
            <strong>駅からの道順</strong><br />
            山下商店街を直進し、「松原六丁目」交差点を左折。<br />
            赤堤通りを２分ほど直進、右手に見える白い建物が編集工学研究所です。<br />
            赤い文字の「ISIS」の看板が目印です。
          </div>
        </div>
      </div>
    </section>
  );
};

export default Access;
