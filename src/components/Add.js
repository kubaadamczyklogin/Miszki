import "./../css/cardList.css";
import { useState, useRef } from "react";
import UnpackedCard from "./UnpackedCard.js";
import EditableCard from "./EditableCard.js";
import SaveButton from "./SaveButton.js";
import {
  saveDeckToFile,
  saveProgressDataToFile,
  readDeckFromFile,
} from "./FilesEditor.js";

export default function Add(props) {
  const [newDeck, setNewDeck] = useState([{ id: 0, editable: true }]);
  const editableCardRef = useRef();

  function newCardData(id) {
    return {
      id: id,
      pl: editableCardRef.current.newPl,
      en: editableCardRef.current.newEn,
      editable: false,
    };
  }

  function saveCard(id) {
    setNewDeck((prev) => {
      let biggestId = 0;
      const updatedDeck = prev.map((item) => {
        if (item.id > biggestId) biggestId = item.id;

        if (id === item.id) {
          return newCardData(id);
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
          return newCardData(item.id);
        } else {
          return item;
        }
      });

      return updatedDeck;
    });
  }

  async function saveDeck() {
    const deckToSave = newDeck.map((item) => {
      let newItem;
      if (item.editable) {
        newItem = newCardData(item.id);
      } else {
        newItem = item;
      }
      delete newItem.editable;

      return newItem;
    });

    saveDeckToFile(deckToSave, "test").then(
      (deckName) => {
        props.openStatement({
          status: "success",
          text: `Talia "${deckName}" została zapisana pomyślnie!`,
        });
        props.choosePage(false);
        saveProgressDataToFile("kuba", "test", { lastRepeat: 0, cards: [] });
      },
      (error) => {
        props.openStatement({ status: "error", text: error });
        props.choosePage(false);
      }
    );
  }

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
      <SaveButton saveDeck={saveDeck} />
    </div>
  );
}
