import PageHeader from '../components/PageHeader/PageHeader';
import InterbookingTheme from '../components/InterbookingTheme/InterbookingTheme';
import Steps from '../components/Steps/Steps';
import Note from '../components/Note/Note';

const InterbookingPage = () => {
  return (
    <>
      <PageHeader label="Interbooking" title="インターブッキング" />
      <main>
        <section className="section">
          <div className="interbooking-container">
            <InterbookingTheme />
            <Steps />
            <Note />
          </div>
        </section>
      </main>
    </>
  );
};

export default InterbookingPage;
