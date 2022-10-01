import "./css/cardList.css";
import { useState, useRef } from "react";

export default function Add() {
  const [newDeck, setNewDeck] = useState([{ id: 0, editable: true }]);
  //const [newCard, setNewCard] = useState();

  function saveCard(id, card) {
    console.log(id);
    setNewDeck((prev) => {
      let biggestId = 0;
      const updatedDeck = prev.map((item) => {
        if (item.id > biggestId) biggestId = item.id;

        if (id === item.id) {
          return card;
        } else {
          return item;
        }
      });

      return [...updatedDeck, { id: ++biggestId, editable: true }];
    });
  }

  return (
    <div className="Editable cardList">
      <div className="cont">
        {newDeck.map((item) =>
          item.editable ? (
            <EditableCard key={item.id} id={item.id} saveCard={saveCard} />
          ) : (
            <UnpackedCard key={item.id} content={item} />
          )
        )}
      </div>
    </div>
  );
}

function EditableCard(props) {
  const pl = useRef("");
  const en = useRef("");

  function focusNextInputOnEnter(e, targetInput) {
    if (e.key === "Enter" || e.keyCode === 13) {
      targetInput.current.focus();
    }
  }

  function saveCardOnEnter(e) {
    if (e.key === "Enter" || e.keyCode === 13) {
      props.saveCard(props.id, {
        id: props.id,
        pl: pl.current.value,
        en: en.current.value,
        editable: false,
      });
    }
  }

  return (
    <div className="Card Editable">
      <div className="Forward">
        <input
          autoFocus
          type="text"
          placeholder="pl"
          ref={pl}
          onKeyUp={(e) => {
            focusNextInputOnEnter(e, en);
          }}
        />
      </div>
      <div className="Backward">
        <input
          type="text"
          placeholder="en"
          ref={en}
          onKeyUp={(e) => {
            saveCardOnEnter(e);
          }}
        />
      </div>
    </div>
  );
}

function UnpackedCard(props) {
  const { pl, en } = props.content;

  return (
    <div className="Card Unpacked">
      <div className="Forward">{pl}</div>
      <div className="Backward">{en}</div>
    </div>
  );
}
