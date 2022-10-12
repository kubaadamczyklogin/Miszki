import { readDeckFromFile, readProgressDataFromFile } from "./FilesEditor.js";

const day = 86400000;

export async function prepareDeckToLern(user, name) {
  const cardsLimit = 50;
  const newCardsLinit = 10;

  let deck,
    progressData,
    progressCards,
    deckToLern = [],
    deckNotToLearn = [];

  let today = new Date().setHours(0, 0, 0, 0);

  deck = await readDeckFromFile(name);
  deck = JSON.parse(deck);
  progressData = await readProgressDataFromFile(user, name);
  progressData = JSON.parse(progressData);

  // synchronizacja danych z talią
  deck = deck.map((deckItem) => {
    const progressDataItem = progressData.cards.find(
      (progressItem) => progressItem.id === deckItem.id
    );

    if (typeof progressDataItem === "undefined") {
      return { ...deckItem, status: 10 };
    } else {
      return { ...progressDataItem, ...deckItem };
    }
  });

  //sortowanie talii
  deck.sort((a, b) => {
    return a.status - b.status;
  });

  // segregacja talii
  // problem daty niezdeklarowanej
  let cardsQuantity = 0;
  let newCardsQuantity = 0;

  deck.forEach((card) => {
    if (card.repeatDate <= today) {
      if (card.status < 10) {
        if (cardsQuantity <= cardsLimit) {
          deckToLern.push(card);
          cardsQuantity++;
        } else {
          deckNotToLearn.push(card);
        }
      } else {
        if (cardsQuantity <= cardsLimit && newCardsQuantity <= newCardsLimit) {
          deckToLern.push(card);
          cardsQuantity++;
          newCardsQuantity++;
        } else {
          deckNotToLearn.push(card);
        }
      }
    } else {
      deckNotToLearn.push(card);
    }

    // if (card.status < 10) {
    //   if (card.repeatDate <= today) {
    //     if (cardsQuantity <= cardsLimit) {
    //       deckToLern.push(card);
    //       cardsQuantity++;
    //     } else {
    //       deckNotToLearn.push(card);
    //     }
    //   } else {
    //     deckNotToLearn.push(card);
    //   }
    // } else {
    //   if (cardsQuantity <= cardsLimit && newCardsQuantity <= newCardsLimit) {
    //     deckToLern.push(card);
    //     cardsQuantity++;
    //     newCardsQuantity++;
    //   } else {
    //     deckNotToLearn.push(card);
    //   }
    // }
  });

  console.log("deckToLern", deckToLern);
  console.log("deckNotToLearn", deckNotToLearn);

  return [deckToLern, deckNotToLearn];
}
