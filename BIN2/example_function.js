function helloWorld(name) {
  return "Hello " + name;
}

function discussion(user1, user2) {
  console.log(helloWorld(user1));
  console.log(helloWorld(user2));
}

discussion("Riri", "Fifi");
discussion("Loulou", "Donald");
