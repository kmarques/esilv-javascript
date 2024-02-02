const fruits = ["pomme", "banane", "poire"];
const voiture = {
  marque: "Peugeot",
  modele: "208",
  couleur: "rouge",
};

// For in
for (let index in fruits) {
  console.log(index, fruits[index]);
}
for (let index in voiture) {
  console.log(index, voiture[index]);
}

// For of
for (let value of fruits) {
  console.log(value);
}
// Error: voiture is not iterable
//for (let value of voiture) {
//  console.log(value);
//}
