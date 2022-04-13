fs.access("./test", fs.constants.R_OK, function (err) {
  if (err) {
    return console.error(err);
  }
  fs.readFile("./test", function (lines, err) {
    if (err) {
      return console.error(err);
    }
    db.find({ where: { not: { lines: lines } } }, function (result, err) {
      if (err) {
        return console.error(err);
      }
      let nbInserted = 0;
      for (let line of lines) {
        db.insert(line, function (result, err) {
          if (err) {
            return process.exit(1);
          }
          nbInserted++;
          if (nbInserted === lines.length) {
            discord.sendMessage(
              `${nbInserted} lignes insérées`,
              function (err) {
                if (err) {
                  return console.error(err);
                }
                console.log("Finished");
              }
            );
          }
        });
      }
    });
  });
});
function route() {
  fs.access("./test", fs.constants.R_OK)
    .then(() => fs.readFile("./test"))
    .then(() => db.find({ where: { not: { lines: lines } } }))
    .then(() => Promise.all(lines.map((line) => db.insert(line))))
    .then(() => discord.sendMessage(`${nbInserted} lignes insérées`))
    .then(() => console.log("Finished"))
    .catch(() => console.error("error happened"));
}

function map(tab, func) {
  let result = [];
  for (let row of tab) {
    result.push(func(row));
  }
  return result;
}
