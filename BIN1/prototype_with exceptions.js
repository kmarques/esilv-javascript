function HolaError(msg) {
  // … Votre code vient ici

  const instance = new Error(msg);
  instance.name = "HolaError";
  Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
  if (Error.captureStackTrace) {
    Error.captureStackTrace(instance, HolaError);
  }
  return instance;
}
function PersonError(msg) {
  const instance = new Error(msg);
  instance.name = "PersonError";
  Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
  if (Error.captureStackTrace) {
    Error.captureStackTrace(instance, PersonError);
  }
  return instance;
}

function Hola(nbFrames, maxPersons) {
  if (!maxPersons || maxPersons < 3) {
    throw new HolaError("Max persons must be greater than 2");
  }
  if (!nbFrames || nbFrames < maxPersons) {
    throw new HolaError("NbFrames must be greater than maxPersons");
  }

  const persons = [];

  function display() {
    return persons.map((person) => person.display()).join("");
  }

  this.addPerson = function (person) {
    if (person instanceof Person) {
      persons.push(person);
    } else {
      throw new HolaError("person must be an instance of Person");
    }
  };
  this.run = function () {
    if (persons.length === 0) {
      throw new HolaError("Empty Hola");
    }
    if (persons.length < 3) {
      throw new HolaError("Nb persons must be greater or equals than 3");
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

function Person(name) {
  if (typeof name !== "string" || name.length < 3) {
    throw new PersonError("Person name must have at least 3 characters");
  }
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

try {
  const hola0 = new Hola(10, 5);
  try {
    hola0.addPerson(new Person());
  } catch (error) {
    if (error instanceof PersonError) {
      console.error(error.message);
    } else {
      throw error;
    }
  }
  try {
    hola0.addPerson(3);
  } catch (error) {
    if (error instanceof PersonError) {
      console.error(error.message);
    } else {
      throw error;
    }
  }
  hola0.addPerson(new Person("gjhkl"));
  hola0.addPerson(new Person("ghjk"));
  hola0.addPerson(new Person("sdrytui"));
  hola0.run();
} catch (error) {
  if (error instanceof HolaError) {
    console.error(error.message);
  } else {
    throw error;
  }
}

const hola1 = new Hola();
for (let i = 0; i < 10; i++) {
  const person = new Person();
  hola1.addPerson(person);
}
hola1.run();
