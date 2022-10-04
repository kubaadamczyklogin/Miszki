export default function SaveButton(props) {
  return (
    <div className="save-button">
      <div className="conti">
        <button onClick={props.saveDeck}>Zapisz</button>
      </div>
    </div>
  );
}
