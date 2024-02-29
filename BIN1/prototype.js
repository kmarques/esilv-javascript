function Voiture(numSerie, marque, model, kilometrage) {
  let state = "ready";

  function computeVelocityFromModel() {
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
  }

  const vitesse = computeVelocityFromModel(model);
  let toRun = 0;
  let kmRestant = 0;

  this.getState = function getState() {
    return state;
  };

  this.setToRun = function setToRun(km) {
    toRun = km;
    kmRestant = km;
  };

  this.roule = function roule() {
    if (state === "accident") {
    }
    state = "roule";

    const toSubstract = toRun - vitesse < 0 ? toRun : vitesse;
    kmRestant -= toSubstract;
    kilometrage += toSubstract;
    if (toRun <= 0) {
      state = "ready";
    }
    switch (model) {
      case "911":
        if (toRun - kmRestant > 3000) {
          state = "accident";
          throw new RangeError(`La voiture #${numSerie} a eu un accident`);
        }
        break;
      case "206":
        if (toRun - kmRestant > 1000) {
          state = "accident";
          throw new RangeError(`La voiture #${numSerie} a eu un accident`);
        }
        break;
      default:
        break;
    }
  };

  this.accident = function accident() {
    state = "accident";
    console.error(
      `(${numSerie}) La voiture ${marque} ${model} a eu un accident`
    );
  };

  this.display = function display() {
    console.log(
      `(${numSerie}) La voiture ${marque} ${model} a ${kilometrage}km, et est ${state}`
    );
  };
}

function Course() {
  const voitures = [];

  this.addVoiture = function addVoiture(voiture) {
    voitures.push(voiture);
  };

  this.start = function start(km) {
    if (meteo === "pluie")
      throw new Error("Le terrain est impraticable, la course est annulée");
    voitures.forEach((voiture) => voiture.setToRun(km));

    let time = 0;
    const intervalObserver = setInterval(function () {
      time += 2000;
      console.log(`Temps: ${time / 1000}s`);
      voitures.forEach((voiture) => {
        try {
          voiture.roule();
        } catch (e) {
          console.error(e.message);
        }
      });

      if (
        voitures.every((voiture) => {
          return voiture.getState() !== "roule";
        })
      ) {
        clearInterval(intervalObserver);
      }

      voitures.forEach((voiture) => voiture.display());
    }, 2000);
  };
}

let meteo = "pluie";

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
