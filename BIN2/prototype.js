function NotAPersonError(object) {
  const instance = new Error(
    `Expected an instance of Person, got ${object.__proto__.constructor.name}`
  );
  instance.name = "NotAPersonError";
  Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
  if (Error.captureStackTrace) {
    Error.captureStackTrace(instance, NotAPersonError);
  }
  return instance;
}

function HolaWave() {
  const persons = [];

  this.addPerson = function addPerson(person) {
    if (person instanceof Person) {
      if (person.name === "hacker") {
        throw new Error("No hackers allowed");
      }
      persons.push(person);
    } else {
      throw new NotAPersonError(person);
    }
  };

  this.start = function start() {
    let cursor = 0;
    const refInterval = setInterval(function () {
      if (persons[cursor - 3]) {
        persons[cursor - 3].setHandRaised(false);
      }
      if (persons[cursor]) {
        persons[cursor].setHandRaised(true);
      }

      const hola = persons.reduce((acc, person) => {
        acc += person.display();
        return acc;
      }, "");
      console.clear();
      console.log(hola);
      console.log(hola);
      console.log(hola);
      console.log(hola);
      cursor++;
      if (cursor === persons.length + 3) clearInterval(refInterval);
    }, 300);
  };
}

function Person(name) {
  //   _-_
  // \_/
  let handRaised = false;

  this.name = name;

  this.setHandRaised = function setHandRaised(value) {
    handRaised = value;
  };

  this.display = function display() {
    if (handRaised) {
      return "\\_/";
    } else {
      return "_-_";
    }
  };
}

const hola = new HolaWave();
try {
  Array.from({ length: 50 }, (_, index) =>
    hola.addPerson(new Person(index === 3 ? "hacker" : "Name-" + index))
  );
  hola.addPerson(new String("I am a robot"));
} catch (error) {
  if (error instanceof NotAPersonError)
    console.error(error.name + ": ", error.message);
  else throw error;
}
setTimeout(() => {
  hola.start();
}, 3000);
