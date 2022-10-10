import "./../css/lerning.css";
import { useState, useEffect } from "react";
import { readDeckFromFile } from "./FilesEditor.js";

export default function Lern(props) {
  const [deck, setDeck] = useState(false);
  const [counter, setCounter] = useState(0);
  const [frontSide, setFrontSide] = useState(true);
  const [toRepeat, setToRepeat] = useState([]);
  const [repeatCounter, setRepeatCounter] = useState(0);

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

  function nextCard(addCardToRepeat) {
    const cardsQuantity = deck.length;
    const newCounter = counter + 1;
    let toRepeatQuantity = toRepeat.length;

    if (addCardToRepeat) {
      toRepeatQuantity++;
      setToRepeat((prevAddCardToRepeat) => [
        ...prevAddCardToRepeat,
        deck[counter].id,
      ]);
    }

    if (newCounter < cardsQuantity) {
      setCounter(newCounter);
      setFrontSide(true);
    } else {
      props.openStatement({
        status: "success",
        text: `Dziś przerobiłeś ${cardsQuantity} słów, nie wiedziałeś ${toRepeatQuantity}`,
      });

      if (toRepeatQuantity > 0 && repeatCounter <= 3) {
        setFrontSide(true);
        setRepeatCounter((prev) => ++prev);
        setDeck((prevDeck) => {
          let newDeck = prevDeck;
          //   const newDeck = prevDeck.map((item) => {
          //     if (toRepeat.includes(item.id)) {
          //       return item;
          //     }
          //   });
          //   console.log(newDeck);
          console.log("wy");
          setToRepeat([]);
          // return newDeck;
        });
        setCounter(0);
      } else {
        props.choosePage(false);
      }
    }
  }

  return (
    <div className="lerning">
      {deck && counter < deck.length ? (
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
      ) : (
        "loading..."
      )}
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
