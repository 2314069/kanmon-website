import { useInView } from '../../hooks/useInView';
import './Message.css';

interface MessageItem {
  course: string;
  text: string;
  name: string;
  role: string;
  photo: string;
}

const messages: MessageItem[] = [
  { course: '守', text: 'メッセージをここに入力してください。', name: '氏名', role: '57守', photo: '' },
  { course: '物語講座', text: 'メッセージをここに入力してください。', name: '氏名', role: '物語講座', photo: '' },
  { course: '破', text: 'メッセージをここに入力してください。', name: '氏名', role: '55破', photo: '' },
  { course: '花伝所', text: 'メッセージをここに入力してください。', name: '氏名', role: '花伝所', photo: '' },
];

const Message = () => {
  const { ref, isInView } = useInView<HTMLElement>();

  return (
    <section className={`section fade-section ${isInView ? 'visible' : ''}`} ref={ref}>
      <div className="section-header">
        <p className="section-label">Message</p>
        <h2 className="section-title">各講座からのメッセージ</h2>
      </div>
      <div className="message-grid">
        {messages.map((msg, i) => (
          <article className="message-card" key={i}>
            <div className="message-course">{msg.course}</div>
            <blockquote className="message-text">
              <p>{msg.text}</p>
            </blockquote>
            <div className="message-author">
              <div className="message-photo">
                {msg.photo ? <img src={msg.photo} alt="写真" /> : null}
              </div>
              <div className="message-author-info">
                <span className="message-name">{msg.name}</span>
                <span className="message-role">{msg.role}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Message;
