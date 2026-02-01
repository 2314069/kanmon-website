import PageHeader from '../components/PageHeader/PageHeader';
import './ApplyPage.css';

const ApplyPage = () => {
  return (
    <>
      <PageHeader label="Application" title="参加申し込み" />
      <main>
        <section className="section">
          <div className="apply-info">
            <h2 className="apply-event">第90回 感門之盟</h2>
            <p className="apply-subtitle">読奏エディストリート</p>
            <dl className="apply-details">
              <div className="apply-detail-row">
                <dt>日程</dt>
                <dd>2026年3月21日（土）- 22日（日）</dd>
              </div>
              <div className="apply-detail-row">
                <dt>会場</dt>
                <dd>豪徳寺 本楼</dd>
              </div>
            </dl>
          </div>
        </section>

        <section className="section" style={{ textAlign: 'center' }}>
          <p style={{ marginBottom: 24 }}>参加申し込みは下記のリンクからお願いします。</p>
          <a href="#" className="btn" style={{ background: 'var(--color-accent)', color: 'var(--color-white)' }}>
            申し込みフォームへ
          </a>
          <p className="apply-note">※外部サイトに移動します</p>
        </section>
      </main>
    </>
  );
};

export default ApplyPage;
