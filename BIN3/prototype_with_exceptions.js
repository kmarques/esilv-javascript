function VehiculeError(msg, vehicule) {
  // … Votre code vient ici

  const instance = new Error(
    `${msg}: ${vehicule ? vehicule.getLicensePlate() : ""}`
  );
  instance.name = "VehiculeError";
  Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
  if (Error.captureStackTrace) {
    Error.captureStackTrace(instance, VehiculeError);
  }
  return instance;
}

function GarageError(msg) {
  // … Votre code vient ici

  const instance = new Error(msg);
  instance.name = "GarageError";
  Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
  if (Error.captureStackTrace) {
    Error.captureStackTrace(instance, GarageError);
  }
  return instance;
}

function Garage(maxVehicule) {
  const vehicules = [];

  if (!maxVehicule || maxVehicule < 2) {
    throw new GarageError("maxVehicule must be greater than or equals to 2");
  }

  this.addVehicule = function addVehicule(vehicule) {
    if (vehicules.length < maxVehicule) {
      vehicules.push(vehicule);
    } else {
      throw new GarageError("Max vehicule count reached");
    }
  };
  this.repairVehicule = function repairVehicule(licensePlate) {
    const vehiculeFound = vehicules.find(function (v) {
      return v.getLicensePlate() === licensePlate;
    });
    if (vehiculeFound) {
      vehiculeFound.repair();
    } else {
      throw new GarageError("Vehicule not found");
    }
  };
  this.removeVehicule = function removeVehicule(licensePlate) {
    const vehiculeFoundIndex = vehicules.findIndex(function (v) {
      return v.getLicensePlate() === licensePlate;
    });
    if (vehiculeFoundIndex !== -1) {
      vehicules.splice(vehiculeFoundIndex, 1);
    } else {
      throw new GarageError("Vehicule not found");
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
    throw new VehiculeError("brand must have at least 2 characters");
  }
  if (!model || model.length < 2) {
    throw new VehiculeError("model must have at least 2 characters");
  }
  if (!licensePlate || licensePlate.length !== 9) {
    throw new VehiculeError("licensePlate must have 9 characters");
  }

  let kms = 0;
  let state = "normal";

  this.ride = function ride(distance) {
    if (state === "broken") {
      throw new VehiculeError("Vehicule broken", this);
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

try {
  const garage1 = new Garage(3);
  const vehicule1 = new Vehicule("Honda", "Civic", "FP-789-PS");
  const vehicule2 = new Vehicule("Mercedes", "CLS", "PF-789-PS");
  const vehicule3 = new Vehicule("Peugeot", "5008", "FP-789-MX");
  const vehicule4 = new Vehicule("Nissan", "Skyline GTR", "YE-789-PS");
  vehicule1.broke();
  vehicule2.ride(1500);
  vehicule3.ride(2000);
  garage1.addVehicule(vehicule1);
  garage1.addVehicule(vehicule2);
  garage1.addVehicule(vehicule3);
  try {
    const vehicule0 = new Vehicule("Honda", "Civic", "FP-789-PS");
    vehicule0.broke();
    vehicule0.ride(400);
    garage1.addVehicule(vehicule0);
  } catch (error) {
    if (error instanceof VehiculeError) {
      console.error("vehicule0", error.message);
    } else {
      throw error;
    }
  }
  vehicule1.broke();
  vehicule2.ride(1500);
  vehicule2.broke();
  vehicule3.ride(2000);
  garage1.addVehicule(vehicule4);
  console.log("T=0", garage1.getState());
  garage1.repairVehicule("FP-789-PS");
  garage1.removeVehicule("FP-789-MX");
  console.log("T=1", garage1.getState());
  garage1.repairVehicule("PF-789-PS");
  //throw new Error("test");
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
} catch (error) {
  if (error instanceof GarageError) {
    console.error(error.name, error.message);
  } else {
    throw error;
  }
}
