import "./css/cardList.css";
import { useState, useRef, forwardRef, useImperativeHandle } from "react";
import React from "react";

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
    </div>
  );
}

//const EditableCard = React.forwardRef((props, newPL) => {
function EditableCard(props, ref) {
  const { id, pl, en, focusRight } = props.content;
  const newEn = useRef();
  const newPl = useRef();

  useImperativeHandle(ref, () => ({
    get newPl() {
      return newPl.current.value;
    },
    get newEn() {
      return newEn.current.value;
    },
  }));

  function focusNextInputOnEnter(e, targetInput) {
    if (e.key === "Enter" || e.keyCode === 13) {
      targetInput.current.focus();
    }
  }

  function saveCardOnEnter(e) {
    if (e.key === "Enter" || e.keyCode === 13) {
      props.saveCard(id);
    }
  }

  return (
    <div className="card editable">
      <div className="backward">
        <input
          autoFocus={!focusRight}
          type="text"
          placeholder="en"
          defaultValue={en}
          ref={newEn}
          onKeyUp={(e) => {
            focusNextInputOnEnter(e, newPl);
          }}
        />
      </div>
      <div className="forward">
        <input
          autoFocus={focusRight}
          type="text"
          placeholder="pl"
          defaultValue={pl}
          ref={newPl}
          onKeyUp={(e) => {
            saveCardOnEnter(e);
          }}
        />
      </div>
    </div>
  );
}
EditableCard = forwardRef(EditableCard);

function UnpackedCard(props) {
  const { id, pl, en } = props.content;

  return (
    <div className="card unpacked">
      <div
        className="backward"
        onClick={() => {
          props.editSavedCard(id);
        }}
      >
        {en}
      </div>
      <div
        className="forward"
        onClick={() => {
          props.editSavedCard(id, true);
        }}
      >
        {pl}
      </div>
    </div>
  );
}
