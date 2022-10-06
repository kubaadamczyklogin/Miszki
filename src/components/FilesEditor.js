export function saveDeckToFile(deck, deckName) {
  const fs = require("browserify-fs");
  const deckJson = JSON.stringify(deck);

  return new Promise((resolve, reject) => {
    fs.mkdir("../../decks", function () {
      fs.writeFile(`../../decks/${deckName}.txt`, deckJson, function (err) {
        console.count("promise");
        if (err) {
          reject(err);
        } else {
          resolve(`Talia "${deckName}" została zapisana pomyślnie!`);
        }
      });
    });
  });
}
