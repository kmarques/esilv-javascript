function validateData(request, callback) {
  setTimeout(function () {
    if (request.lastname && request.firstname) callback();
    else {
      callback(undefined, new Error("Invalid data"));
    }
  }, 0);
}

function createUser(request, callback) {
  validateData(request, (_, err) => {
    if (err) throw new Error("InvalidData");
    dbConnect((_, err) => {
      if (err) throw new Error("Connection failed");
      insertUser(request, (lastId, err) => {
        if (err) throw new Error("Inserting user failed");
        fetchUser(lastId, (user, err) => {
          if (err) throw new Error("Fetching user failed");
          callback(user);
        });
      });
    });
  });
}

createUser({ lastname: "Foo", firstname: "Bar" }, (user) => {
  send(user);
});
