import { useState } from 'react';
import PageHeader from '../components/PageHeader/PageHeader';
import './ClassroomPage.css';

interface Classroom { name: string; shihandai: string; }
interface Team { name: string; shihan: string; classrooms: Classroom[]; }
interface Dojo { name: string; staff: { name: string; role: string }[]; }

const mamoruTeams: Team[] = [
  { name: 'チーム撈月（ろうげつ）', shihan: '阿久津 健', classrooms: [
    { name: '半ちらつもり教室', shihandai: '後藤 有一郎' }, { name: '連菫ポレポレ教室', shihandai: '高橋 英子' }] },
  { name: '素音巣（そいんすう）', shihan: '景山 和浩', classrooms: [
    { name: '本音かいな教室', shihandai: '木佐 陽' }, { name: 'ないまぜマンション教室', shihandai: '木島 智子' }] },
  { name: 'ZU海', shihan: '一倉 広美', classrooms: [
    { name: 'スクっと芍薬教室', shihandai: '原田 遥夏' }, { name: 'さくさくウムベルト教室', shihandai: '翠川 辰行' }] },
  { name: '燦燦', shihan: '稲森 久純', classrooms: [
    { name: 'はなして星亀教室', shihandai: '永石 あゆみ' }, { name: 'ピノキオ界隈教室', shihandai: '西岡 有美' }] },
  { name: 'チームゆら擬', shihan: '小林 美穂', classrooms: [
    { name: 'ハレルヤ電池教室', shihandai: '家村 吏慧子' }, { name: '編隊サナギ・ハント教室', shihandai: '高橋 剣' }] },
  { name: '蝶兆（チョーチョー）', shihan: '名部 惇', classrooms: [
    { name: '蓮華ソーソー教室', shihandai: 'グッビニ 由香理' }, { name: 'トージ瀬戸際教室', shihandai: '杜本 昌泰' }] },
  { name: 'サマルQand（さまるかんど）', shihan: '福井 千裕', classrooms: [
    { name: '金平ボサノバ教室', shihandai: '岩崎 大' }, { name: 'あやすじデスティーノ教室', shihandai: '板垣 美玲' }] },
  { name: '水無模（みなも）', shihan: '福澤 美穂子', classrooms: [
    { name: 'シャボン泳法教室', shihandai: '中田 ちひろ' }, { name: 'ゆらぎロボ教室', shihandai: '小名 国仁' }] },
  { name: '転穹ギータ（てんきゅう）', shihan: '森本 康裕', classrooms: [
    { name: '半跏グノーシス教室', shihandai: '坂口 弥生' }, { name: 'Bメロ瀑布教室', shihandai: '中野 恵介' }] },
];

const kadenDojos: Dojo[] = [
  { name: 'むらさき道場', staff: [
    { name: '大濱 朋子', role: '花伝師範' }, { name: '山崎 智章', role: '錬成師範' }, { name: '齋藤 成憲', role: '錬成師範' }] },
  { name: 'やまぶき道場', staff: [
    { name: '古谷 奈々', role: '花伝師範' }, { name: '角山 祥道', role: '錬成師範' }, { name: '上原 悦子', role: '錬成師範' }] },
];

type CourseKey = 'mamoru' | 'monogatari' | 'ha' | 'kaden';
const courseTabs: { key: CourseKey; label: string }[] = [
  { key: 'mamoru', label: '守' },
  { key: 'monogatari', label: '物語講座' },
  { key: 'ha', label: '破' },
  { key: 'kaden', label: '花伝所' },
];

const ClassroomPage = () => {
  const [active, setActive] = useState<CourseKey>('mamoru');

  return (
    <>
      <PageHeader label="Classroom" title="教室一覧" />
      <main>
        <section className="section">
          <div className="course-tabs" role="tablist" aria-label="コース選択">
            {courseTabs.map(t => (
              <button
                key={t.key}
                className={`course-tab ${active === t.key ? 'active' : ''}`}
                onClick={() => setActive(t.key)}
                role="tab"
                aria-selected={active === t.key}
              >
                {t.label}
              </button>
            ))}
          </div>

          {active === 'mamoru' && (
            <div className="team-list">
              {mamoruTeams.map(team => (
                <div className="team-block" key={team.name}>
                  <div className="team-header">
                    <h3 className="team-name">{team.name}</h3>
                    <div className="team-shihan">
                      <div className="staff-photo">
                        <img src="" alt={team.shihan} />
                      </div>
                      <div className="staff-info">
                        <span className="staff-role">師範</span>
                        <span className="staff-name">{team.shihan}</span>
                      </div>
                    </div>
                  </div>
                  <div className="classroom-grid">
                    {team.classrooms.map(c => (
                      <article className="classroom-card" key={c.name}>
                        <div className="classroom-header">
                          <h4 className="classroom-name">{c.name}</h4>
                          <span className="classroom-badge">57守</span>
                        </div>
                        <div className="staff-profile">
                          <div className="staff-photo">
                            <img src="" alt={c.shihandai} />
                          </div>
                          <div className="staff-info">
                            <span className="staff-role">師範代</span>
                            <span className="staff-name">{c.shihandai}</span>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {active === 'monogatari' && (
            <div className="classroom-grid">
              {[1, 2, 3, 4].map(n => (
                <article className="classroom-card" key={n}>
                  <div className="classroom-header">
                    <h4 className="classroom-name">教室 {n}</h4>
                    <span className="classroom-badge">物語講座</span>
                  </div>
                  <div className="staff-profile">
                    <div className="staff-photo">
                      <img src="" alt="" />
                    </div>
                    <div className="staff-info">
                      <span className="staff-role">師範代</span>
                      <span className="staff-name">－</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {active === 'ha' && (
            <div className="team-list">
              {[1, 2, 3, 4, 5].map(n => (
                <div className="team-block" key={n}>
                  <div className="team-header">
                    <h3 className="team-name">チーム {n}</h3>
                    <div className="team-shihan">
                      <div className="staff-photo">
                        <img src="" alt="" />
                      </div>
                      <div className="staff-info">
                        <span className="staff-role">師範</span>
                        <span className="staff-name">－</span>
                      </div>
                    </div>
                  </div>
                  <div className="classroom-grid">
                    {[n * 2 - 1, n * 2].map(cn => (
                      <article className="classroom-card" key={cn}>
                        <div className="classroom-header">
                          <h4 className="classroom-name">教室 {cn}</h4>
                          <span className="classroom-badge">55破</span>
                        </div>
                        <div className="staff-profile">
                          <div className="staff-photo">
                            <img src="" alt="" />
                          </div>
                          <div className="staff-info">
                            <span className="staff-role">師範代</span>
                            <span className="staff-name">－</span>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {active === 'kaden' && (
            <div className="classroom-grid">
              {kadenDojos.map(dojo => (
                <article className="classroom-card" key={dojo.name}>
                  <div className="classroom-header">
                    <h4 className="classroom-name">{dojo.name}</h4>
                    <span className="classroom-badge">花伝所</span>
                  </div>
                  <div className="staff-list">
                    {dojo.staff.map(s => (
                      <div className="staff-profile" key={s.name}>
                        <div className="staff-photo">
                          <img src="" alt={s.name} />
                        </div>
                        <div className="staff-info">
                          <span className="staff-role">{s.role}</span>
                          <span className="staff-name">{s.name}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
    </>
  );
};

export default ClassroomPage;
