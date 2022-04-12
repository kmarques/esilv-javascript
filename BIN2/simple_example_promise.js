const getStudent = function (resolve, reject) {
  setTimeout(function () {
    resolve([
      { name: "Dupont", cours: [1, 3, 5] },
      { name: "Lea", cours: [2, 4] },
      { name: "Charles", cours: [1] },
    ]);
  }, 5000);
};

const getCourses = function (resolve, reject) {
  setTimeout(function () {
    resolve([
      { id: 1, name: "JS" },
      { id: 2, name: "PHP" },
      { id: 3, name: "C#" },
      { id: 4, name: "F#" },
      { id: 5, name: "CSS" },
    ]);
  }, 3000);
};

const studentsPromise = new Promise(getStudent);
studentsPromise
  .then(
    function resolve(result) {
      return result;
    },
    function reject(error) {} // optionelle car pas de reject utilisé
  )
  .then(function (result) {
    console.log(result.length);
  });
