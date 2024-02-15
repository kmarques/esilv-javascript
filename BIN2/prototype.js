function NotAPersonError(object) {
  // … Votre code vient ici

  const instance = new Error(`Expected an instance of Person, got ${object}`);
  instance.name = "MyError";
  Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
  if (Error.captureStackTrace) {
    Error.captureStackTrace(instance, MyError);
  }
  return instance;
}

function HolaWave() {
  const persons = [];

  this.addPerson = function addPerson(person) {
    if (person instanceof Person) {
      persons.push(person);
    } else {
      throw new TypeError("Not a person");
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

function Person() {
  //   _-_
  // \_/
  let handRaised = false;

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
Array.from({ length: 50 }, () => hola.addPerson(new Person()));
hola.start();
