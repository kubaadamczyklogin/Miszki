import "./css/cardList.css";
import { useState, useRef } from "react";

export default function Add() {
  const [newDeck, setNewDeck] = useState([{ id: 0, editable: true }]);
  //const [newCard, setNewCard] = useState();

  function saveCard(id, card) {
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

  function editSavedCard(id, side) {
    setNewDeck((prev) => {
      const updatedDeck = prev.map((item) => {
        if (id === item.id) {
          item.editable = true;
          return item;
        } else {
          return item;
        }
      });

      return updatedDeck;
    });
  }

  return (
    <div className="editable cardList">
      <div className="cont">
        {newDeck.map((item) =>
          item.editable ? (
            <EditableCard key={item.id} id={item.id} saveCard={saveCard} />
          ) : (
            <UnpackedCard
              key={item.id}
              content={item}
              editSavedCard={editSavedCard}
            />
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
    <div className="card editable">
      <div className="backward">
        <input
          autoFocus
          type="text"
          placeholder="en"
          ref={en}
          onKeyUp={(e) => {
            focusNextInputOnEnter(e, pl);
          }}
        />
      </div>
      <div className="forward">
        <input
          type="text"
          placeholder="pl"
          ref={pl}
          onKeyUp={(e) => {
            saveCardOnEnter(e);
          }}
        />
      </div>
    </div>
  );
}

function UnpackedCard(props) {
  const { id, pl, en } = props.content;

  return (
    <div className="card unpacked">
      <div
        className="backward"
        onClick={() => {
          props.editSavedCard(id, "backward");
        }}
      >
        {en}
      </div>
      <div
        className="forward"
        onClick={() => {
          props.editSavedCard(id, "forward");
        }}
      >
        {pl}
      </div>
    </div>
  );
}
