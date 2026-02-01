import './InterbookingTheme.css';

// 開いた本のSVGアイコンコンポーネント
// JSXでSVGを直接書ける
const BookIcon = () => (
  <svg className="open-book-icon" viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* 本の左ページ */}
    <path d="M60 10 L10 18 L10 70 L60 62 Z" stroke="currentColor" strokeWidth="2" fill="none"/>
    {/* 本の右ページ */}
    <path d="M60 10 L110 18 L110 70 L60 62 Z" stroke="currentColor" strokeWidth="2" fill="none"/>
    {/* 背表紙 */}
    <line x1="60" y1="10" x2="60" y2="62" stroke="currentColor" strokeWidth="2"/>
    {/* ページの線（左） */}
    <line x1="18" y1="28" x2="52" y2="24" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
    <line x1="18" y1="40" x2="52" y2="36" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
    <line x1="18" y1="52" x2="52" y2="48" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
    {/* ページの線（右） */}
    <line x1="68" y1="24" x2="102" y2="28" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
    <line x1="68" y1="36" x2="102" y2="40" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
    <line x1="68" y1="48" x2="102" y2="52" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
  </svg>
);

// InterbookingThemeコンポーネント
// テーマ表示セクション
const InterbookingTheme = () => {
  return (
    <div className="interbooking-intro">
      <p className="interbooking-lead">参加者参加型の本の交換企画</p>
      <div className="interbooking-theme">
        {/* 開いた本のビジュアル */}
        <div className="book-visual" aria-hidden="true">
          <BookIcon />
        </div>
        <p className="interbooking-theme-label">テーマ</p>
        <p className="interbooking-theme-text">
          「読奏エディストリート」と聞いて<br />連想した本
        </p>
      </div>
    </div>
  );
};

export default InterbookingTheme;
