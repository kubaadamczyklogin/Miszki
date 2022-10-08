const fs = require("browserify-fs");
const path = "../../decks";

export function saveDeckToFile(deck, deckName) {
  const deckJson = JSON.stringify(deck);

  return new Promise((resolve, reject) => {
    fs.mkdir(path, function () {
      fs.writeFile(
        `${path}/${deckName}.txt`,
        deckJson,
        { encoding: "utf8" },
        function (err) {
          if (err) {
            reject(err);
          } else {
            resolve(`Talia "${deckName}" została zapisana pomyślnie!`);
          }
        }
      );
    });
  });
}

export function readDeckFromFile(deckName) {
  return new Promise((resolve, reject) => {
    fs.mkdir(path, function () {
      fs.readFile(`${path}/${deckName}.txt`, "utf8", function (err, data) {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  });
}
