function createPlayer() {
  let username = "Guest";
  function getUsername() {
    return username;
  }
  function setUsername(newName) {
    username = newName;
  }
  return {
    getUsername: getUsername,
    setUsername: setUsername,
  };
}

let player1 = createPlayer();
let player2 = createPlayer();
console.log("Player 1", player1.getUsername());
console.log("Player 2", player2.getUsername());
player1.setUsername("PlayerOne");
console.log("Player 1", player1.getUsername());
console.log("Player 2", player2.getUsername());
player2.setUsername("PlayerTwo");
console.log("Player 1", player1.getUsername());
console.log("Player 2", player2.getUsername());
