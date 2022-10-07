//import "./../css/lerning.css";
import { useState } from "react";

export default function Lern(props) {
  const deck = [
    { id: 1, pl: "bla", en: "blah" },
    { id: 2, pl: "kot", en: "cat" },
    { id: 3, pl: "pies", en: "dog" },
  ];
  const [counter, setCounter] = useState(0);
  const [frontSide, setFrontSide] = useState(true);

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
      <div className="cont">
        <LerningCard frontSide={frontSide} data={deck[counter]} />
        <LerningButtons
          frontSide={frontSide}
          rotateCard={rotateCard}
          nextCard={nextCard}
        />
      </div>
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
          <>
            <button className="fail" onClick={props.rotateCard}>
              nie wiem
            </button>
            <button className="succeed" onClick={props.rotateCard}>
              wiem
            </button>
          </>
        ) : (
          <button className="next" onClick={props.nextCard}>
            dalej
          </button>
        )}
      </div>
    </div>
  );
}
