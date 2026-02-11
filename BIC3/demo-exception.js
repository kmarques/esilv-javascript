function InvalidStateError() {
  // … Votre code vient ici

  const instance = new Error("Invalid state");
  instance.name = "InvalidStateError";
  Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
  if (Error.captureStackTrace) {
    Error.captureStackTrace(instance, InvalidStateError);
  }
  return instance;
}

// Gestion d'un garage automobile

function Vehicule(immatriculation, color, brand, model) {
  let state = "NORMAL";
  this.color = color;
  this.getImmatriculation = function () {
    return immatriculation;
  };

  this.getColor = function () {
    return color;
  };

  this.getBrand = function () {
    return brand;
  };

  this.getModel = function () {
    return model;
  };

  this.brake = function () {
    state = "BROKEN";
  };
  this.repair = function () {
    if (state === "BROKEN") state = "NORMAL";
    else throw new InvalidStateError();
  };

  this.display = function () {
    return `Immatriculation: ${immatriculation}, Color: ${color}, Brand: ${brand}, Model: ${model}, State: ${state}`;
  };
}

const car1 = new Vehicule("AB-123-CD", "Red", "Toyota", "Corolla");
const car2 = new Vehicule("EF-456-GH", "Blue", "Honda", "Civic");
const car3 = new Vehicule("IJ-789-KL", "Black", "Ford", "Focus");
console.log("Car1 immat", car1.getImmatriculation());
console.log("Car1 state", car1.state);
console.log("Car1 model", car1.model);
console.log("Car1 color", car1.color);
console.log("Car2 immat", car2.getImmatriculation());
console.log("Car3 immat", car3.getImmatriculation());

function Garage(title, capacity) {
  this.title = title;
  const vehicules = [];

  this.addVehicule = function (vehicule) {
    if (!(vehicule instanceof Vehicule)) {
      throw new TypeError("Invalid vehicle");
    }
    if (vehicules.length === capacity)
      throw new RangeError("Garage capacity reached");
    vehicules.push(vehicule);
    return true;
  };

  this.repair = function (vehicule) {
    if (!(vehicule instanceof Vehicule)) {
      throw new TypeError("Invalid vehicle");
    }

    vehicule.repair();

    return true;
  };

  this.removeVehicule = function (vehicule) {
    if (!(vehicule instanceof Vehicule)) {
      throw new TypeError("Invalid vehicle");
    }
    const index = vehicules.indexOf(vehicule);
    if (index > -1) {
      vehicules.splice(index, 1);
      return true;
    }
    throw new RangeError("Vehicule not present");
  };

  this.listVehicules = function () {
    return vehicules.map((v) => v.display()).join("\n");
  };
}

try {
  const myGarage = new Garage("My Garage", 2);
  car1.brake();
  console.log("Adding car1:", myGarage.addVehicule(car1)); // true
  console.log(myGarage.listVehicules());
  console.log("Adding car2:", myGarage.addVehicule(car2)); // true
  console.log(myGarage.listVehicules());
  try {
    console.log("Adding car3:", myGarage.addVehicule(car3)); // false, capacity reached
  } catch (error) {
    if (error instanceof RangeError) {
      console.error(error.message);
      console.log(
        car3.getImmatriculation(),
        "Go somewhere else, garage is full",
      );
    } else {
      throw error;
    }
  }
  console.log(myGarage.listVehicules());
  console.log("Repairing car1");
  myGarage.repair(car1);
  console.log(myGarage.listVehicules());
  console.log("Removing car1:", myGarage.removeVehicule(car1));
  console.log(myGarage.listVehicules());
  try {
    console.log(
      "Removing car3 (not in garage):",
      myGarage.removeVehicule(car3),
    );
  } catch (error) {
    if (error instanceof RangeError) {
      console.error(error.message);
      console.log(
        car3.getImmatriculation(),
        "owner, your car seems to be somewhere else",
      );
    } else {
      throw error;
    }
  }
  console.log(myGarage.listVehicules());

  // Test invalid addition
  console.log("Adding invalid vehicle:", myGarage.addVehicule({})); // false
} catch (error) {
  console.error(error.message, error.stack);
}
