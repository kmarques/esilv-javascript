function Garage(maxVehicule) {
  const vehicules = [];

  this.addVehicule = function addVehicule(vehicule) {
    if (vehicules.length < maxVehicule) vehicules.push(vehicule);
    else console.log("Max vehicule reached");
  };
  this.repairVehicule = function repairVehicule(licensePlate) {
    const vehiculeFound = vehicules.find(function (v) {
      return v.getLicensePlate() === licensePlate;
    });
    if (vehiculeFound) {
      vehiculeFound.repair();
    } else {
      console.log("Vehicule not found");
    }
  };
  this.removeVehicule = function removeVehicule(licensePlate) {
    const vehiculeFoundIndex = vehicules.findIndex(function (v) {
      return v.getLicensePlate() === licensePlate;
    });
    if (vehiculeFoundIndex !== -1) {
      vehicules.splice(vehiculeFoundIndex, 1);
    } else {
      console.log("Vehicule not found");
    }
  };
  this.getState = function getState() {
    if (vehicules.length === 0) return "No vehicule";

    return vehicules
      .map(function (vehicule) {
        return `${vehicule.getLicensePlate()} - ${vehicule.getKms()} - ${vehicule.getState()}`;
      })
      .join("\n");
  };
}

function Vehicule(brand, model, licensePlate) {
  let kms = 0;
  let state = "normal";

  this.ride = function ride(distance) {
    kms += distance;
  };

  this.broke = function broke() {
    state = "broken";
  };
  this.repair = function broke() {
    state = "normal";
  };

  this.getKms = function getKms() {
    return kms;
  };
  this.getState = function getState() {
    return state;
  };
  this.getLicensePlate = function getLicensePlate() {
    return licensePlate;
  };
}

const garage1 = new Garage(3);
const vehicule1 = new Vehicule("Honda", "Civic", "FP-789-PS");
const vehicule2 = new Vehicule("Mercedes", "CLS", "PF-789-PS");
const vehicule3 = new Vehicule("Peugeot", "5008", "FP-789-MX");
const vehicule4 = new Vehicule("Nissan", "Skyline GTR", "YE-789-PS");
vehicule1.broke();
vehicule2.ride(1500);
vehicule2.broke();
vehicule3.ride(2000);
garage1.addVehicule(vehicule1);
garage1.addVehicule(vehicule2);
garage1.addVehicule(vehicule3);
garage1.addVehicule(vehicule4);
console.log("T=0", garage1.getState());
garage1.repairVehicule("FP-789-PS");
garage1.removeVehicule("FP-789-MX");
console.log("T=1", garage1.getState());
garage1.repairVehicule("PF-789-PS");
garage1.removeVehicule("FP-789-PS");
console.log("T=2", garage1.getState());
garage1.removeVehicule("PF-789-PS");
console.log("T=3", garage1.getState());

console.log("Before prototype", vehicule1.display);

String.prototype.ucfirst = function ucfirst() {
  const chaine = this;
  const part1 = chaine[0].toUpperCase();
  const part2 = chaine.slice(1);
  return part1 + part2;
};
console.log("Ucfirst", "fghjkl".ucfirst());

Vehicule.prototype.display = function () {
  return `${this.getLicensePlate()} - ${this.getKms()} - ${this.getState()}`;
};
console.log("After prototype", vehicule1.display());
