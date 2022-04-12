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

function mapStudents() {
  return Promise.all([new Promise(getStudent), new Promise(getCourses)]).then(
    function (result) {
      const students = result[0];
      const courses = result[1];
      console.log(students, courses);
      students.map(function (student) {
        const cours = student.cours.map(function (idCours) {
          return courses.find(function (course) {
            return course.id === idCours;
          });
        });
        student.cours = cours;
        return student;
      });
      return Promise.resolve(students);
    }
  );
}

function timer(resolve, reject) {
  setTimeout(function () {
    reject();
  }, 4000);
}

Promise.race([mapStudents(), new Promise(timer)])
  .then(function resolve(result) {
    console.log("Merge OK");
  })
  .catch(function () {
    console.log("Timeout");
  });
