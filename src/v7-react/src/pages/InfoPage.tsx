import PageHeader from '../components/PageHeader/PageHeader';
import './InfoPage.css';

const infoCards = [
  { title: '受付について', items: ['受付は13:00から開始します。', '受付にてお名前をお伝えください。', 'お名前を確認後、名札をお渡しします。'] },
  { title: '持ち物', items: ['参加証（メールでお送りしたもの）', '筆記用具', '名刺（お持ちの方）'] },
  { title: '注意事項', items: ['駐車場はございません。公共交通機関をご利用ください。'] },
];

const InfoPage = () => {
  return (
    <>
      <PageHeader label="Information" title="参加案内" />
      <main>
        <section className="section">
          <div className="info-grid">
            {infoCards.map(card => (
              <div className="info-card" key={card.title}>
                <h3 className="info-card-title">{card.title}</h3>
                <ul className="info-card-list">
                  {card.items.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="cta">
          <h2 className="cta-title">ご質問・お問い合わせ</h2>
          <p className="cta-subtitle">ご不明な点がございましたら、お気軽にお問い合わせください。</p>
          <a href="mailto:info@isis.ne.jp" className="btn">お問い合わせ</a>
        </section>
      </main>
    </>
  );
};

export default InfoPage;
