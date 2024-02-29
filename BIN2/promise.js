/*
https://dev.to/lydiahallie/javascript-visualized-promises-async-await-5gke


1) Créer une Promise getStudents qui récupère une liste d’étudiants entre 1 et 2 secondes
EX: [ { name: "Dupont", cours: [ 1, 3, 5 ] }, { name: "Lea", cours: [ 2, 4 ] }, { name: "Charles", cours: [ 1 ] } ]
2) Créer une Promise getCourses qui récupère une liste de cours entre 2 et 4 secondes
EX: [ { id: 1, name: "JS" }, { id: 2, name: "PHP" }, { id: 3, name: "C#" }, { id: 4, name: "F#" }, { id: 5, name: "CSS" } ]
3) Créer une Promise qui mappe à l’ensemble des étudiants les cours associés entre 1 et 4 secondes
4)Créer une Promise qui contrôle le temps d’accès global
Celle-ci doit rejeter si le temps max dépasse 7 secondes
5)Afficher "Merge OK" si tout s’est bien passé sinon "Timeout"
*/
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getStudents() {
  console.log("Callstack 0");
  return new Promise(function (resolve, reject) {
    console.log("Callstack students 0");
    setTimeout(function () {
      console.log("Macrostack 0");
      resolve([
        { name: "Dupont", cours: [1, 3, 5] },
        { name: "Lea", cours: [2, 4] },
        { name: "Charles", cours: [1] },
      ]);
    }, randomInt(1000, 2000));
  });
}

function getCourses() {
  console.log("Callstack 0");
  return new Promise(function (resolve, reject) {
    console.log("Callstack students 0");
    setTimeout(function () {
      console.log("Macrostack 0");
      resolve([
        { id: 1, name: "JS" },
        { id: 2, name: "PHP" },
        { id: 3, name: "C#" },
        { id: 4, name: "F#" },
        { id: 5, name: "CSS" },
      ]);
    }, randomInt(2000, 4000));
  });
}

function mapStudents(students, courses) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve(
        students.map(function (student) {
          student.cours = student.cours.map(function (idCours) {
            return courses.find(function (cours) {
              return cours.id === idCours;
            });
          });
          return student;
        })
      );
    }, randomInt(1000, 4000));
  });
}

function timeout() {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      reject();
    }, 30000);
  });
}

function process() {
  return Promise.all([getStudents(), getCourses()]).then(function (results) {
    const students = results[0];
    const courses = results[1];

    return mapStudents(students, courses);
  });
}

Promise.race([process(), timeout()])
  .then(function (result) {
    console.log("Merge OK");
  })
  .catch(function (result) {
    console.log("Timeout");
  });
