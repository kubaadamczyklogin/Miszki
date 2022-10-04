import "./../css/cardList.css";
import { useState, useRef} from "react";
import UnpackedCard from "./UnpackedCard.js";
import EditableCard from "./EditableCard.js";
import SaveButton from "./SaveButton.js";

export default function Add() {
  const [newDeck, setNewDeck] = useState([{ id: 0, editable: true }]);
  const editableCardRef = useRef();

  function saveCard(id) {
    setNewDeck((prev) => {
      let biggestId = 0;
      const updatedDeck = prev.map((item) => {
        if (item.id > biggestId) biggestId = item.id;

        if (id === item.id) {
          return {
            id: id,
            pl: editableCardRef.current.newPl,
            en: editableCardRef.current.newEn,
            editable: false,
          };
        } else {
          return item;
        }
      });

      return [...updatedDeck, { id: ++biggestId, editable: true }];
    });
  }

  function editSavedCard(id, focusRight) {
    setNewDeck((prev) => {
      const updatedDeck = prev.map((item) => {
        if (id === item.id) {
          item.editable = true;
          item.focusRight = focusRight;
          return item;
        } else if (item.editable) {
          return {
            id: item.id,
            pl: editableCardRef.current.newPl,
            en: editableCardRef.current.newEn,
            editable: false,
          };
        } else {
          return item;
        }
      });

      return updatedDeck;
    });
  }
  
  function saveDeck(){
      console.log('zapisz talię');
  };

  return (
    <div className="editable cardList">
        <div className="cont">
        {newDeck.map((item) =>
            item.editable ? (
            <EditableCard
                ref={editableCardRef}
                key={item.id}
                content={item}
                saveCard={saveCard}
            />
            ) : (
            <UnpackedCard
                key={item.id}
                content={item}
                editSavedCard={editSavedCard}
            />
            )
        )}
        </div>
        <SaveButton saveDeck={saveDeck}/>
    </div>
  );
}