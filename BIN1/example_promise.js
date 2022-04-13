function getStudents(resolve, reject) {
  setTimeout(function () {
    resolve([
      { name: "John", cours: [1, 3, 5] },
      { name: "Jane", cours: [1, 4] },
      { name: "Mary", cours: [2, 3, 5] },
    ]);
  }, 7000);
}

function getCourse(resolve) {
  setTimeout(function () {
    resolve([
      { id: 1, name: "JS" },
      { id: 2, name: "PHP" },
      { id: 3, name: "C#" },
      { id: 4, name: "F#" },
      { id: 5, name: "CSS" },
    ]);
  }, 3000);
}

function mapStudents() {
  return Promise.all([new Promise(getStudents), new Promise(getCourse)]).then(
    function resolve(result) {
      const students = result[0];
      const courses = result[1];
      console.log(
        students.map(function (student) {
          student.cours = student.cours.map(function (idCours) {
            return courses.find(function (course) {
              return course.id === idCours;
            });
          });

          return student;
        })
      );
    },
    function reject() {}
  );
}

function timer() {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      reject();
    }, 7000);
  });
}

Promise.race([mapStudents(), timer()])
  .then(function () {
    console.log("Merge OK");
  })
  .catch(function () {
    console.log("Timeout");
  });

// Implémentation de l'objet Promise
function Promise(myfunction) {
  let _resolve, _reject;
  this.then = function (resolve, reject) {
    _resolve = resolve;
    reject = reject;
  };

  this.catch = function (reject) {
    _reject = reject;
  };

  setTimeout(function () {
    myfunction(_resolve, _reject);
  }, 0);
}

// Example de code utilisant les callbacks
fs.access("./test", fs.constants.F_OK, () => {
  fs.readFile("./test", (content) => {
    db.find({ filename: "./test" }, (rows) => {
      //...
      const newRowsCount = 0;
      for (let row of newRows) {
        db.insert(row, () => {
          newRowsCount++;
          if (newRowsCount === newRows.length) {
            discord.notify("new rows inserted", () =>
              console.log("Notification sent")
            );
          }
        });
      }
    });
  });
});

// Même exemple en utilisant les promises
fs.access("./test")
  .then(() => fs.readFile("./test"))
  .then(() => db.find())
  .then(() => Promise.all(newRows.map((row) => db.insert(row))))
  .then(() => discord.notify("new rows inserted"))
  .then(() => console.log("Notification sent"));

// Même exemple en utilisant la nouvelle écriture des promises
(async () => {
  await fs.access("./test");
  await fs.readFile("./test");
  await db.find();
  await Promise.all(newRows.map((row) => db.insert(row)));
  await discord.notify("new rows inserted");
  console.log("Notification sent");
  throw new Error();
})();

// Implémentation en pseudo-code du mot clé async
// async function test() {}
// <==>
// function asyncFunc(myFunction, ...args) {
//   return new Promise(function(resolve, reject){
//     try {
//       resolve(myFunction(...args));
//     } catch (e) {
//       reject(e);
//     }
//   });
// }
