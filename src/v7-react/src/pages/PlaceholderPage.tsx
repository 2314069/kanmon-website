import PageHeader from '../components/PageHeader/PageHeader';

interface PlaceholderPageProps {
  label: string;
  title: string;
}

const PlaceholderPage = ({ label, title }: PlaceholderPageProps) => {
  return (
    <>
      <PageHeader label={label} title={title} />
      <main>
        <section className="section" style={{ textAlign: 'center', color: '#999' }}>
          <p>このページは準備中です。</p>
        </section>
      </main>
    </>
  );
};

export default PlaceholderPage;
