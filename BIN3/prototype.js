function Garage(maxVehicule) {
  const vehicules = [];

  if (!maxVehicule || maxVehicule < 2) {
    console.log("maxVehicule must be greater than or equals to 2");
    return;
  }

  this.addVehicule = function addVehicule(vehicule) {
    if (vehicules.length < maxVehicule) {
      vehicules.push(vehicule);
    } else {
      console.log("Max vehicule reached");
      return false;
    }
  };
  this.repairVehicule = function repairVehicule(licensePlate) {
    const vehiculeFound = vehicules.find(function (v) {
      return v.getLicensePlate() === licensePlate;
    });
    if (vehiculeFound) {
      vehiculeFound.repair();
    } else {
      console.log("Vehicule not found");
      return false;
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
      return false;
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
  if (!brand || brand.length < 2) {
    console.log("brand must have at least 2 characters");
    return;
  }
  if (!model || model.length < 2) {
    console.log("model must have at least 2 characters");
    return;
  }
  if (!licensePlate || licensePlate.length !== 9) {
    console.log("licensePlate must have 9 characters");
    return;
  }

  let kms = 0;
  let state = "normal";

  this.ride = function ride(distance) {
    if (state === "broken") {
      console.log("Vehicule broken");
      return false;
    }
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
if (garage1.addVehicule) {
  const vehicule0 = new Vehicule("Honda", "Civic", "FP-789-PS");
  if (vehicule0.ride) {
    const vehicule1 = new Vehicule("Honda", "Civic", "FP-789-PS");
    if (vehicule1.ride) {
      const vehicule2 = new Vehicule("Mercedes", "CLS", "PF-789-PS");
      if (vehicule2.ride) {
        const vehicule3 = new Vehicule("Peugeot", "5008", "FP-789-MX");
        if (vehicule3.ride) {
          const vehicule4 = new Vehicule("Nissan", "Skyline GTR", "YE-789-PS");
          if (vehicule4.ride) {
            vehicule0.broke();
            const result = vehicule0.ride(400);
            if (result !== false) {
              vehicule1.broke();
              const result = vehicule2.ride(1500);
              if (result !== false) {
                vehicule2.broke();
                const result = vehicule3.ride(2000);
                if (result !== false) {
                  garage1.addVehicule(vehicule0);
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
                } else {
                  console.error("Vehicule3 cannot ride");
                }
              } else {
                console.error("Vehicule2 cannot ride");
              }
            } else {
              console.error("Vehicule0 cannot ride");
            }
          } else {
            console.error("Cannot instantied vehicule 4");
          }
        } else {
          console.error("Cannot instantied vehicule 3");
        }
      } else {
        console.error("Cannot instantied vehicule 2");
      }
    } else {
      console.error("Cannot instantied vehicule 1");
    }
  } else {
    console.error("Cannot instantied vehicule 0");
  }
} else {
  console.error("Garage cannot be instantiated");
}

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
