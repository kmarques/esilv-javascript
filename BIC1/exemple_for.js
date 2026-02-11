const Marques = ["Toyota", "Honda", "Ford", "Chevrolet", "Nissan"];

for (let marque of Marques) {
  console.log(marque);
}
for (let marqueIndex in Marques) {
  console.log(marqueIndex);
}

const voiture = {
  marque: "Toyota",
  modele: "Corolla",
  annee: 2020,
  afficherDetails: function () {
    console.log(
      `Marque: ${this.marque}, Modèle: ${this.modele}, Année: ${this.annee}`,
    );
  },
};

for (let key in voiture) {
  console.log(key);
}

//  Impossible avec un objet
// for (let value of voiture) {
//   console.log(value);
// }
