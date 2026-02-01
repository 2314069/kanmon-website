import './Steps.css';

// ステップデータの型定義
interface Step {
  number: number;
  title: string;
  description: string;
}

// ステップのデータ
// データを配列で持つことで、追加・変更が簡単になる
const stepsData: Step[] = [
  {
    number: 1,
    title: '本を選ぶ',
    description: '「読奏エディストリート」と聞いて連想した文庫本を1冊選んでください。',
  },
  {
    number: 2,
    title: 'メッセージを書く',
    description: 'なぜその本を選んだのか、理由とともにメッセージを書いてください。',
  },
  {
    number: 3,
    title: '交換する',
    description: '当日、本を持参して交換に出しましょう。誰かの選んだ本があなたのもとへ届きます。',
  },
];

// Stepsコンポーネント
// 配列のmapを使って繰り返しレンダリング
const Steps = () => {
  return (
    <div className="interbooking-howto">
      <h2>参加方法</h2>
      <ol className="interbooking-steps">
        {stepsData.map((step) => (
          <li key={step.number}>
            <span className="step-number">{step.number}</span>
            <div className="step-content">
              <h3>{step.title}</h3>
              <p>
                {step.description.includes('文庫本') ? (
                  <>
                    {step.description.split('文庫本')[0]}
                    <strong>文庫本</strong>
                    {step.description.split('文庫本')[1]}
                  </>
                ) : (
                  step.description
                )}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Steps;
