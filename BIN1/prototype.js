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
    }
  }

  const vitesse = computeVelocityFromModel(model);

  this.getState = function getState() {
    return state;
  };

  this.roule = function roule(km) {
    state = "roule";
    let kmRestant = km;

    const interval = setInterval(function () {
      if (state === "accident") {
        clearInterval(interval);
      }
      const toSubstract = kmRestant - vitesse < 0 ? kmRestant : vitesse;
      kmRestant -= toSubstract;
      kilometrage += toSubstract;
      if (kmRestant === 0) {
        state = "ready";
        clearInterval(interval);
      }
    }, 1000);
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

const porsche911 = new Voiture("123", "Porsche", "911", 0);
const peugeot206 = new Voiture("456", "Peugeot", "206", 0);
const nissanSkyline = new Voiture("789", "Nissan", "Skyline", 0);

porsche911.roule(5000);
peugeot206.roule(5000);
nissanSkyline.roule(5000);

let time = 0;
const intervalObserver = setInterval(function () {
  time += 2000;

  if (time === 10000) {
    peugeot206.accident();
  }
  if (time === 14000) {
    porsche911.accident();
  }

  if (time === 16000) {
    nissanSkyline.accident = function () {
      console.log("Cette voiture est indestructible !");
    };
    nissanSkyline.accident();
  }

  if (
    porsche911.getState() !== "roule" &&
    peugeot206.getState() !== "roule" &&
    nissanSkyline.getState() !== "roule"
  ) {
    clearInterval(intervalObserver);
  }
  porsche911.display();
  peugeot206.display();
  nissanSkyline.display();
}, 2000);
