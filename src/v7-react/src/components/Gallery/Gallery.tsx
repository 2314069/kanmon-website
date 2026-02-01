import { useInView } from '../../hooks/useInView';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './Gallery.css';

const galleryItems = [
  { src: '/images/gallery-1.webp', alt: '感門之盟 2003年', year: '2003' },
  { src: '/images/gallery-2.webp', alt: '感門之盟 2008年', year: '2008' },
  { src: '/images/gallery-3.webp', alt: '感門之盟 2010年', year: '2010' },
  { src: '/images/gallery-4.webp', alt: '感門之盟 2011年', year: '2011' },
  { src: '/images/gallery-5.webp', alt: '感門之盟 2013年', year: '2013' },
  { src: '/images/gallery-6.webp', alt: '感門之盟 2015年', year: '2015' },
  { src: '/images/gallery-7.webp', alt: '感門之盟 2018年', year: '2018' },
  { src: '/images/gallery-8.webp', alt: '感門之盟 2020年', year: '2020' },
];

const Gallery = () => {
  const { ref, isInView } = useInView<HTMLElement>();

  return (
    <section className={`gallery section fade-section ${isInView ? 'visible' : ''}`} ref={ref}>
      <div className="section-header">
        <p className="section-label">Gallery</p>
        <h2 className="section-title">過去開催の様子</h2>
      </div>
      <Swiper
        className="gallery-carousel"
        modules={[Navigation, Pagination]}
        slidesPerView={1}
        spaceBetween={16}
        loop
        grabCursor
        pagination={{ clickable: true }}
        navigation
        breakpoints={{
          600: { slidesPerView: 2, spaceBetween: 20 },
          900: { slidesPerView: 3, spaceBetween: 24 },
        }}
      >
        {galleryItems.map((item) => (
          <SwiperSlide key={item.year}>
            <div className="gallery-item">
              <img src={item.src} alt={item.alt} loading="lazy" />
              <span className="gallery-year">{item.year}</span>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Gallery;
