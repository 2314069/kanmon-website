import Hero from '../components/Hero/Hero';
import SectionDivider from '../components/SectionDivider/SectionDivider';
import About from '../components/About/About';
import Overview from '../components/Overview/Overview';
import Message from '../components/Message/Message';
import Access from '../components/Access/Access';
import Gallery from '../components/Gallery/Gallery';
import Cta from '../components/Cta/Cta';

const TopPage = () => {
  return (
    <main>
      <Hero />
      <SectionDivider />
      <About />
      <SectionDivider />
      <Overview />
      <SectionDivider />
      <Message />
      <SectionDivider />
      <Access />
      <SectionDivider />
      <Gallery />
      <SectionDivider />
      <Cta />
    </main>
  );
};

export default TopPage;
