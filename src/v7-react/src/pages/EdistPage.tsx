import PageHeader from '../components/PageHeader/PageHeader';
import './EdistPage.css';

const articles = [
  { category: 'DUST', date: '2025.XX.XX', title: '感門之盟レポート記事タイトル', excerpt: '記事の概要テキストが入ります。' },
  { category: 'CAST', date: '2025.XX.XX', title: '登壇者インタビュー記事', excerpt: '記事の概要テキストが入ります。' },
  { category: 'NEST', date: '2025.XX.XX', title: '教室レポート記事', excerpt: '記事の概要テキストが入ります。' },
];

const EdistPage = () => {
  return (
    <>
      <PageHeader label="Edist Articles" title="エディスト記事" />
      <main>
        <section className="section">
          <p className="edist-desc">
            感門之盟に関連するエディストの記事をご紹介します。過去の感門之盟レポートや、登壇者インタビューなどをお読みいただけます。
          </p>

          {/* Featured */}
          <a
            href="https://edist.isis.ne.jp/dust/89kanmon_nomikurabema/"
            className="featured-article"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="featured-image-placeholder" />
            <div className="featured-info">
              <span className="article-category">DUST</span>
              <h3 className="featured-title">89感門 総合司会は呑み比べ魔・青井隼人</h3>
              <p className="featured-excerpt">
                青井隼人さんへのインタビュー記事。言語研究と独自の視点で感門之盟を語る。
              </p>
            </div>
          </a>
        </section>

        {/* Related Articles */}
        <section className="section">
          <div className="section-header">
            <p className="section-label">Related</p>
            <h2 className="section-title">関連記事</h2>
          </div>
          <div className="articles-grid">
            {articles.map((a, i) => (
              <article className="article-card" key={i}>
                <div className="article-image-placeholder" />
                <div className="article-info">
                  <div className="article-meta">
                    <span className="article-category">{a.category}</span>
                    <span className="article-date">{a.date}</span>
                  </div>
                  <h3 className="article-title">{a.title}</h3>
                  <p className="article-excerpt">{a.excerpt}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section" style={{ textAlign: 'center' }}>
          <p style={{ marginBottom: 16 }}>その他の感門之盟関連記事は、遊刊エディストでご覧いただけます。</p>
          <a href="https://edist.isis.ne.jp/" className="btn" target="_blank" rel="noopener noreferrer"
            style={{ background: 'var(--color-accent)', color: 'var(--color-white)' }}>
            遊刊エディストへ
          </a>
        </section>
      </main>
    </>
  );
};

export default EdistPage;
