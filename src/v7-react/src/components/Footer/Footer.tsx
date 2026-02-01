import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <p className="footer-logo">感門之盟</p>
      <div className="footer-links">
        <a href="https://es.isis.ne.jp/" target="_blank" rel="noopener noreferrer">
          イシス編集学校
        </a>
        <a href="https://edist.isis.ne.jp/" target="_blank" rel="noopener noreferrer">
          エディスト
        </a>
        <Link to="/info">お問い合わせ</Link>
      </div>
      <p className="footer-copyright">&copy; イシス編集学校 All Rights Reserved.</p>
    </footer>
  );
};

export default Footer;
