import generateTable from "../components/table/table.js";
import { getData, setStorageKey } from "../lib/storage.js";

export default function ItalianBrainrotAnimalsPage() {
  setStorageKey("italian-brainrot-animals-data");
  const div = document.createElement("div");
  const title = document.createElement("h1");
  title.appendChild(document.createTextNode("Italian Brainrot Animals"));
  div.appendChild(title);
  const data = getData([
    {
      name: "Gerry Scotti AI",
      specie: "Dieu de la TV / Entité Multimodale",
    },
    {
      name: "Maranza",
      specie: "Humain en survêtement (Homo Lacostus)",
    },
    {
      name: "Il Masseo",
      specie: "Hurleur professionnel / Streamer",
    },
    {
      name: "Gabibbo",
      specie: "Monstre rouge en peluche / Justicier",
    },
    {
      name: "Berlusconi (Ghost/AI)",
      specie: "Légende du Lore italien",
    },
    {
      name: "Peppa Pig Napoletana",
      specie: "Cochon régionaliste",
    },
    {
      name: "Blur (Tumblurr)",
      specie: "Roi de la King's League / Créature Twitch",
    },
    {
      name: "Skibidi Salvini",
      specie: "Politicien de toilette",
    },
    {
      name: "Hasbulla Italiano",
      specie: "Mini-humain de combat",
    },
    {
      name: "Donato (Con mollica o senza?)",
      specie: "Marchand de paninis hypnotique",
    },
  ]);

  div.appendChild(generateTable(data));

  return div;
}
