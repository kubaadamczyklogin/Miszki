export function saveDeckToFile(deck, deckName) {
  //   console.table(deck);
  //   //   console.log(deckName);
  //   const fs = require("fs");
  //   const deckJson = JSON.stringify(deck);

  //   fs.writeFile(`../../decks/${deckName}.json`, deckJson, (err) => {
  //     if (err) throw err;
  //     console.log("Saved!");
  //   });

  const fs = require("fs");
  let fInput = "You are reading the content from Tutorials Point";
  fs.writeFile("tp.txt", fInput, (err) => {
    if (err) throw err;
    else {
      console.log("The file is updated with the given data");
    }
  });
}
