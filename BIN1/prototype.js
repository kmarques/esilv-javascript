function Hola(nbFrames, maxPersons) {
  const persons = [];

  function display() {
    return persons.map((person) => person.display()).join("");
  }

  this.addPerson = function (person) {
    persons.push(person);
  };
  this.run = function () {
    for (let i = 0; i < nbFrames; i++) {
      const currentIndex = i % persons.length;
      const previousIndex =
        currentIndex - 1 < 0 ? persons.length - 1 : currentIndex - 1;
      const previousPreviousIndex =
        currentIndex - 2 < 0
          ? persons.length - (2 - currentIndex)
          : currentIndex - 2;
      const nextIndex = (currentIndex + 1) % persons.length;

      persons[previousPreviousIndex].setState("standby");
      persons[previousIndex].setState("raising");
      persons[currentIndex].setState("up");
      persons[nextIndex].setState("raising");

      console.log(display());
    }
  };
}

function Person() {
  let state = "standby";
  this.setState = function setState(newState) {
    state = newState;
  };
  this.display = function display() {
    switch (state) {
      case "standby":
        return "_O_";
      case "raising":
        return "-O-";
      case "up":
        return "\\O/";
    }
  };
}

const hola1 = new Hola(30, 10);
for (let i = 0; i < 10; i++) {
  const person = new Person();
  hola1.addPerson(person);
}
hola1.run();
