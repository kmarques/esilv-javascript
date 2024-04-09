class CrashError extends RangeError {
  constructor(numSerie) {
    super(`La voiture #${numSerie} a eu un accident`);
    this.name = "CrashError";
  }
}

class Voiture {
  #state = "ready";
  #vitesse = 0;
  #toRun = 0;
  #kmRestant = 0;
  numSerie;
  marque;
  model;
  #kilometrage;

  constructor(numSerie, marque, model, kilometrage) {
    numSerie = numSerie;
    marque = marque;
    model = model;
    this.#kilometrage = kilometrage;
    this.#vitesse = Voiture.computeVelocityFromModel(model);
  }

  getState() {
    return this.#state;
  }

  setToRun(km) {
    this.#toRun = km;
    this.#kmRestant = km;
  }

  roule() {
    if (this.#state === "accident") {
    }
    this.#state = "roule";

    const toSubstract =
      this.#toRun - this.#vitesse < 0 ? this.#toRun : this.#vitesse;
    this.#kmRestant -= toSubstract;
    this.#kilometrage += toSubstract;
    if (this.#toRun <= 0) {
      this.#state = "ready";
    }
    switch (this.model) {
      case "911":
        if (this.#toRun - this.#kmRestant > 3000) {
          this.#state = "accident";
          throw new RangeError(`La voiture #${numSerie} a eu un accident`);
        }
        break;
      case "206":
        if (this.#toRun - this.#kmRestant > 1000) {
          this.#state = "accident";
          throw new RangeError(`La voiture #${numSerie} a eu un accident`);
        }
        break;
      default:
        break;
    }
  }

  accident() {
    this.#state = "accident";
    console.error(
      `(${this.numSerie}) La voiture ${this.marque} ${this.model} a eu un accident`
    );
  }

  display() {
    console.log(
      `(${this.numSerie}) La voiture ${this.marque} ${this.model} a ${
        this.#kilometrage
      }km, et est ${this.#state}`
    );
  }
}
Voiture.computeVelocityFromModel = function (model) {
  switch (model) {
    case "911":
      return 301;
    case "206":
      return 170;
    case "Skyline":
      return 266;
    default:
      throw new Error(
        `Model "${model}" not found, expected ["911", "206", "Skyline"]`
      );
  }
};

class Course {
  #voitures = [];

  addVoiture(voiture) {
    this.#voitures.push(voiture);
  }

  start(km) {
    if (meteo === "pluie")
      throw new Error("Le terrain est impraticable, la course est annulée");
    this.#voitures.forEach((voiture) => voiture.setToRun(km));

    let time = 0;
    const intervalObserver = setInterval(() => {
      time += 2000;
      console.log(`Temps: ${time / 1000}s`);
      this.#voitures.forEach((voiture) => {
        try {
          voiture.roule();
        } catch (e) {
          console.error(e.message);
        }
      });

      if (
        this.#voitures.every((voiture) => {
          return voiture.getState() !== "roule";
        })
      ) {
        clearInterval(intervalObserver);
      }

      this.#voitures.forEach((voiture) => voiture.display());
    }, 2000);
  }
}

let meteo = "soleil";

try {
  const course = new Course();

  try {
    const porsche911 = new Voiture("123", "Porsche", "911", 0);
    course.addVoiture(porsche911);
    const peugeot206 = new Voiture("456", "Peugeot", "206", 0);
    course.addVoiture(peugeot206);
    const nissanSkyline = new Voiture("789", "Nissan", "Skyline", 0);
    course.addVoiture(nissanSkyline);
    const opelTigra = new Voiture("789", "Open", "Tigra", 0);
    course.addVoiture(opelTigra);
  } catch (e) {
    console.error(e.message);
  }

  course.start(1000);
} catch (e) {
  console.error(e.message);
}
