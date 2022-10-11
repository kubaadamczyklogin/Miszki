import "./../css/lerning.css";
import { useState, useEffect } from "react";
import { readDeckFromFile } from "./FilesEditor.js";

export default function Lern(props) {
  const [rootDeck, setRootDeck] = useState(false);
  const [repeatCounter, setRepeatCounter] = useState(0);
  const [toRepeat, setToRepeat] = useState("");

  useEffect(() => {
    readDeckFromFile("test").then(
      (resolve) => {
        const loadedDeck = JSON.parse(resolve);
        setRootDeck(loadedDeck);
        setRepeatCounter(0);
        setToRepeat([]);
      },
      (error) => {
        props.openStatement({
          status: "error",
          text: error,
        });
        props.choosePage(false);
      }
    );
  }, []);

  function endRound(newToRepeat) {
    props.openStatement({
      status: "success",
      text: `Dziś przerobiłeś ${rootDeck.length} słów, nie wiedziałeś ${newToRepeat.length}`,
    });

    if (newToRepeat.length === 0) {
      props.choosePage(false);
    } else {
      setToRepeat(newToRepeat);
      setRepeatCounter((prev) => ++prev);
    }
  }

  if (rootDeck) {
    const deck =
      toRepeat.length > 0
        ? rootDeck.filter((item) => {
            return toRepeat.includes(item.id);
          })
        : rootDeck;
    return (
      <LerningRound deck={deck} deckLength={deck.length} endRound={endRound} />
    );
  } else {
    return "loading...";
  }
}

function LerningRound(props) {
  const [counter, setCounter] = useState(0);
  const [frontSide, setFrontSide] = useState(true);
  const [toRepeat, setToRepeat] = useState([]);

  const { deck, deckLength, endRound } = props;

  function rotateCard() {
    setFrontSide(false);
  }

  function nextCard(addCardToRepeat) {
    const newCounter = counter + 1;
    let newToRepeatArray = toRepeat;
    console.log(newToRepeatArray);
    setFrontSide(true);

    if (addCardToRepeat) {
      newToRepeatArray.push(deck[counter].id);
      console.log(newToRepeatArray, "powiększ");
    }

    if (newCounter < deckLength) {
      setCounter(newCounter);
      setToRepeat(newToRepeatArray);
    } else {
      setCounter(0);
      setToRepeat([]);
      endRound(newToRepeatArray);
    }
  }

  return (
    <div className="lerning">
      <div className="cont card-container">
        <LerningCard frontSide={frontSide} data={deck[counter]} />
      </div>
      <LerningButtons
        frontSide={frontSide}
        rotateCard={rotateCard}
        nextCard={nextCard}
      />
    </div>
  );
}

function LerningCard(props) {
  if (props.frontSide) {
    return <CardFront pl={props.data.pl} />;
  } else {
    return <CardBack en={props.data.en} />;
  }
}

function CardFront(props) {
  return <div className="lerning-card front">{props.pl}</div>;
}

function CardBack(props) {
  return <div className="lerning-card back">{props.en}</div>;
}

function LerningButtons(props) {
  const { frontSide, rotateCard, nextCard } = props;

  return (
    <div className="lerning-buttons bottom-buttons">
      <div className="cont">
        {frontSide ? (
          <button className="blue" onClick={rotateCard}>
            sprawdź
          </button>
        ) : (
          <>
            <button
              className="red"
              onClick={() => {
                nextCard(true);
              }}
            >
              powtórzę
            </button>
            <button
              className="green"
              onClick={() => {
                nextCard(false);
              }}
            >
              wiedziałem
            </button>
          </>
        )}
      </div>
    </div>
  );
}
