function validateData(request) {
  return new Promise(function (resolve, reject) {
    if (request.lastname && request.firstname) resolve();
    else {
      reject();
    }
  });
}

function createUser(request) {
  return validateData(request)
    .then(dbConnect)
    .then(function () {
      return insertUser(request);
    })
    .then(fetchUser);
}

createUser({ lastname: "Foo", firstname: "Bar" })
  .then(send)
  .catch((error) => console.error(error.message));
