import './PageHeader.css';

// Props の型定義
// TypeScriptでは、コンポーネントに渡すデータの型を定義する
interface PageHeaderProps {
  label: string;   // 英語のラベル
  title: string;   // 日本語のタイトル
}

// PageHeaderコンポーネント
// Props を受け取って表示する再利用可能なコンポーネント
const PageHeader = ({ label, title }: PageHeaderProps) => {
  return (
    <header className="page-header">
      <p className="page-label">{label}</p>
      <h1 className="page-title">{title}</h1>
    </header>
  );
};

export default PageHeader;
