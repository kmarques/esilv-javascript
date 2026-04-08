function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getStudents() {
  const promise = new Promise(function (resolve, reject) {
    setTimeout(
      function () {
        resolve([
          { name: "Dupont", cours: [1, 3, 5] },
          { name: "Lea", cours: [2, 4] },
          { name: "Charles", cours: [1] },
        ]);
      },
      randomInt(1, 2),
    );
  });

  return promise;
}
function getCourses() {
  return new Promise(function (resolve, reject) {
    setTimeout(
      function () {
        resolve([
          { id: 1, name: "JS" },
          { id: 2, name: "PHP" },
          { id: 3, name: "C#" },
          { id: 4, name: "F#" },
          { id: 5, name: "CSS" },
        ]);
      },
      randomInt(2, 4),
    );
  });
}

function mapStudents(students, courses) {
  return new Promise(function (resolve) {
    setTimeout(function () {}, randomInt(2, 4));
  });
}

function timer() {}

function main() {
  const students = getStudents().then(function (students) {
    return students;
  });
  const courses = getCourses().then(function (courses) {
    return courses;
  });

  Promise.all([students, courses]).then(function (results) {
    const students = results[0];
    const courses = results[1];
    mapStudents(students, courses);
  });
}

main();
