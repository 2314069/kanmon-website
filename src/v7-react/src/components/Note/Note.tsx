import './Note.css';

// 注意事項のデータ
const notes = [
  '交換に出す本は文庫本をご使用ください。',
  '本にはメッセージカードを添えてください。',
];

// Noteコンポーネント
// 配列のmapで注意事項を繰り返し表示
const Note = () => {
  return (
    <div className="interbooking-note">
      <h3>ご注意</h3>
      <ul>
        {notes.map((note, index) => (
          <li key={index}>
            <strong>{note.includes('文庫本') ? note.split('文庫本')[0] : ''}</strong>
            {note.includes('文庫本') ? (
              <>
                <strong>文庫本</strong>
                {note.split('文庫本')[1]}
              </>
            ) : (
              note
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Note;
