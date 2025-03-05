function Hola(nbFrames, maxPersons) {
  if (!maxPersons || maxPersons < 3) {
    console.error("Max persons must be greater than 2");
    return;
  }
  if (!nbFrames || nbFrames < maxPersons) {
    console.error("NbFrames must be greater than maxPersons");
    return;
  }

  const persons = [];

  function display() {
    return persons.map((person) => person.display()).join("");
  }

  this.addPerson = function (person) {
    if (person instanceof Person) {
      persons.push(person);
    } else {
      console.error("person must be an instance of Person");
      return false;
    }
  };
  this.run = function () {
    if (persons.length === 0) {
      console.error("Empty Hola");
      return false;
    }
    if (persons.length < 3) {
      console.error("Nb persons must be greater or equals than 3");
      return -1;
    }
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

const hola0 = new Hola(10, 3);
if (hola0.run) {
  const resultAddPerson = hola0.addPerson(new Person());
  if (resultAddPerson === false) {
    console.error("Invalid argument for addPerson0");
  } else {
    const resultAddPerson = hola0.addPerson(new Person());
    if (resultAddPerson === false) {
      console.error("Invalid argument for addPerson1");
    } else {
      const resultAddPerson = hola0.addPerson(new Person());
      if (resultAddPerson === false) {
        console.error("Invalid argument for addPerson2");
      } else {
        const resultRun = hola0.run();
        if (resultRun === false) {
          console.error("Could not start the hola, empty person");
        } else if (resultRun === -1) {
          console.error("Could not start the hola, to low persons");
        }
      }
    }
  }
} else {
  console.error("Hola cannot be instantiated");
}

const hola1 = new Hola(30, 10);
for (let i = 0; i < 10; i++) {
  const person = new Person();
  hola1.addPerson(person);
}
hola1.run();
