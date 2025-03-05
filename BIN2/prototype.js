function InvalidParamsError(errors) {
  const instance = new Error("Invalid params: " + JSON.stringify(errors));
  instance.name = "InvalidParamsError";
  Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
  if (Error.captureStackTrace) {
    Error.captureStackTrace(instance, InvalidParamsError);
  }
  return instance;
}

function Tournament(maxPerson, title) {
  const persons = [];

  const errors = {};
  if (!(typeof maxPerson === "number") || maxPerson < 2) {
    errors.maxPerson = "MaxPerson must be greater or equals than 2";
  }
  if (!title) {
    errors.title = "Title is required";
  }
  if (Object.keys(errors).length) {
    throw new InvalidParamsError(errors);
  }

  this.participate = function participate(person) {
    if (persons.length < maxPerson) {
      persons.push(person);
    } else {
      throw new Error("Max players reached");
    }
  };

  this.launch = function launch() {
    if (persons.length < 2) {
      throw new Error("Invalid player numbers, expected at least 2");
    }
    console.log(`Welcome to the ${title} tournament`);
    do {
      const player1 = persons[0];
      const player2 = persons[1];
      let result;
      do {
        result = play(player1, player2);
      } while (result === null);
      if (result === player1) {
        persons.splice(1, 1);
      } else {
        persons.splice(0, 1);
      }
      console.log(`   Winner is ${result.getName()}`);
    } while (persons.length !== 1);

    console.log(`****** The final winner is ${persons[0].getName()}`);
  };

  function play(person1, person2) {
    const p1 = person1.play();
    const p2 = person2.play();
    if (!["rock", "paper", "scissors"].includes(p1)) {
      throw new Error(`${person1.getName()} invalid move : ${p1}`);
    }
    if (!["rock", "paper", "scissors"].includes(p2)) {
      throw new Error(`${person2.getName()} invalid move : ${p2}`);
    }
    console.log(`${person1.getName()} plays ${p1}`);
    console.log(`${person2.getName()} plays ${p2}`);
    if (p1 === p2) {
      return null;
    } else if (
      (p1 === "rock" && p2 === "scissors") ||
      (p1 === "scissors" && p2 === "paper") ||
      (p1 === "paper" && p2 === "rock")
    ) {
      return person1;
    } else {
      return person2;
    }
  }
}
function Person(pseudo, country) {
  const errors = {};
  if (!(typeof pseudo === "string") || pseudo.length < 3) {
    errors.pseudo = "Pseudo is required, and must have at least 3 characters";
  }
  if (!(typeof country === "string") || country.length !== 2) {
    errors.country = "Country is required, and must have 2 characters";
  }
  if (Object.keys(errors).length) {
    throw new InvalidParamsError(errors);
  }

  this.play = function play() {
    const random = Math.floor(Math.random() * 4);
    return ["rock", "paper", "scissors", "well"][random];
  };

  this.getName = function () {
    return `${pseudo} (${country})`;
  };
}

try {
  const t0 = new Tournament(2, "Test tournament");
  t0.participate(new Person("riri", "US"));
  t0.participate(new Person("fifi", "FR"));
  try {
    t0.participate(new Person("fi", "FR"));
  } catch (error) {
    console.error(error.name, error.message);
  }
  try {
    t0.participate(new Person("lulu", "GB"));
  } catch (error) {
    if (error instanceof InvalidParamsError) {
      console.error(error.name, error.message);
    } else {
      throw error;
    }
  }
  t0.launch();
} catch (error) {
  console.error(error.name, error.message);
}

try {
  const t1 = new Tournament(8, "Worlds of Gears");
  for (let i = 0; i < 8; i++) {
    t1.participate(new Person(`pseudo@${i}`, `@${i}`));
  }
  t1.launch();

  //t1.titi();
  Tournament.prototype.titi = function () {
    console.log("titi");
  };

  t1.titi();
} catch (error) {
  console.error(error.name, error.message);
}
