function yoda(chaine) {
  var c = chaine.split(""),
    ch = c.reverse();
  ch = ch.join("");
  return ch;
}
function verlan(chaine) {
  if (typeof chaine !== "string") return "";
  var ch = chaine.split(" ");
  for (let i; i < ch.length; i++) {
    ch[i] = yoda(ch[i]);
  }
  ch = ch.join(" ");
  return ch;
}
console.log(verlan("test me please"));
