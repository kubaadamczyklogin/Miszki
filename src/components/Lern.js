import "./../css/lerning.css";
import { useState, useEffect } from "react";
import { readDeckFromFile } from "./FilesEditor.js";

export default function Lern(props) {
  //   const deck = [
  //     { id: 1, pl: "bla", en: "blah" },
  //     { id: 2, pl: "kot", en: "cat" },
  //     { id: 3, pl: "pies", en: "dog" },
  //   ];
  const [deck, setDeck] = useState(false);
  const [counter, setCounter] = useState(0);
  const [frontSide, setFrontSide] = useState(true);

  useEffect(() => {
    readDeckFromFile("test").then(
      (resolve) => {
        const loadedDeck = JSON.parse(resolve);
        setDeck(loadedDeck);
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

  function rotateCard() {
    setFrontSide(false);
  }

  function nextCard() {
    const cardsQuantity = deck.length;
    console.log(counter, cardsQuantity);

    if (counter + 1 < cardsQuantity) {
      console.log("next");
      setCounter((prev) => ++prev);
      setFrontSide(true);
    } else {
      console.log("finish");
      props.openStatement({
        status: "success",
        text: `Dziś przerobiłeś ${cardsQuantity} słów`,
      });
      props.choosePage(false);
    }
  }

  return (
    <div className="lerning">
      {!deck ? (
        "loading..."
      ) : (
        <>
          <div className="cont card-container">
            <LerningCard frontSide={frontSide} data={deck[counter]} />
          </div>
          <LerningButtons
            frontSide={frontSide}
            rotateCard={rotateCard}
            nextCard={nextCard}
          />
        </>
      )}
      ;
    </div>
  );
}

function LerningCard(props) {
  if (props.frontSide) {
    return <CardFront data={props.data.pl} />;
  } else {
    return <CardBack data={props.data.en} />;
  }
}

function CardFront(props) {
  return <div className="lerning-card front">{props.data}</div>;
}

function CardBack(props) {
  return <div className="lerning-card back">{props.data}</div>;
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
            <button className="red" onClick={nextCard}>
              powtórzę
            </button>
            <button className="green" onClick={nextCard}>
              wiedziałem
            </button>
          </>
        )}
      </div>
    </div>
  );
}
