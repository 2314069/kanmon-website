import { useState } from 'react';
import PageHeader from '../components/PageHeader/PageHeader';
import SectionDivider from '../components/SectionDivider/SectionDivider';
import './ProgramPage.css';

const day1 = [
  { time: '12:30', title: 'オープニング' },
  { time: '12:40', title: '55破 突破式', desc: '[破]コースを修了した学衆の突破を祝う式典' },
  { time: '14:04', title: '学衆讃証／休憩' },
  { time: '14:36', title: '本楼エディストリート', desc: '感門団紹介 他' },
  { time: '15:34', title: 'インターブッキング／休憩' },
  { time: '16:14', title: '44花 放伝式', desc: '花伝所を修了した師範代の放伝を祝う式典' },
  { time: '16:44', title: '57守 冠界式' },
  { time: '17:34', title: '休憩／インターブッキング結果アワセ' },
  { time: '17:54', title: '学長校話', desc: '田中優子学長による校話' },
  { time: '18:45', title: '林頭メッセージ 他' },
  { time: '19:10', title: '終了' },
];

const day2 = [
  { time: '13:00', title: '開場・受付', desc: '受付にてお名前をお伝えください。' },
  { time: '13:30', title: '開会', desc: 'Day 2 開会宣言' },
  { time: '14:00', title: '花伝所 放伝式', desc: '花伝所を修了した師範代の放伝を祝う式典。新師範代のお披露目。' },
  { time: '15:00', title: '守 冠界式', desc: '新しく[守]コースに入門する学衆の冠界を祝う式典。' },
  { time: '16:00', title: '校長校話', desc: '松岡正剛校長による校話' },
  { time: '17:00', title: '交流会', desc: '参加者同士の交流・歓談の時間。軽食とドリンクをご用意しています。' },
  { time: '18:30', title: '閉会', desc: '第90回感門之盟 閉会' },
];

const speakers = [
  { role: '学長', name: '田中 優子', desc: 'イシス編集学校学長。法政大学名誉教授。江戸文化研究者。' },
  { role: '総合司会', name: '三國紹恵', desc: '' },
  { role: '冠世式司会', name: '上原悦子', desc: '' },
  { role: 'コーナー司会', name: 'プレースホルダー', desc: 'テキストテキストテキスト' },
  { role: 'コーナー司会', name: 'プレースホルダー', desc: 'テキストテキストテキスト' },
];

const ProgramPage = () => {
  const [activeDay, setActiveDay] = useState<1 | 2>(1);
  const items = activeDay === 1 ? day1 : day2;

  return (
    <>
      <PageHeader label="Program" title="プログラム" />
      <main>
        {/* Speakers */}
        <section className="section">
          <div className="section-header">
            <p className="section-label">Speakers</p>
            <h2 className="section-title">登壇者</h2>
          </div>
          <div className="speakers-grid">
            {speakers.map((s, i) => (
              <article className="speaker-card" key={i}>
                <div className="speaker-image-placeholder" />
                <div className="speaker-info">
                  <p className="speaker-role">{s.role}</p>
                  <h3 className="speaker-name">{s.name}</h3>
                  {s.desc && <p className="speaker-desc">{s.desc}</p>}
                </div>
              </article>
            ))}
          </div>
        </section>

        <SectionDivider />

        {/* Timetable */}
        <section className="section">
          <div className="section-header">
            <p className="section-label">Timetable</p>
            <h2 className="section-title">タイムテーブル</h2>
          </div>

          <div className="timetable-tabs" role="tablist">
            <button
              className={`timetable-tab ${activeDay === 1 ? 'active' : ''}`}
              onClick={() => setActiveDay(1)}
              role="tab"
              aria-selected={activeDay === 1}
            >
              Day 1 - 3.21 Sat
            </button>
            <button
              className={`timetable-tab ${activeDay === 2 ? 'active' : ''}`}
              onClick={() => setActiveDay(2)}
              role="tab"
              aria-selected={activeDay === 2}
            >
              Day 2 - 3.22 Sun
            </button>
          </div>

          <div className="timetable-content">
            {items.map((item, i) => (
              <div className="timetable-item" key={i}>
                <span className="timetable-time">{item.time}</span>
                <div className="timetable-info">
                  <h4>{item.title}</h4>
                  {item.desc && <p>{item.desc}</p>}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
};

export default ProgramPage;
