function validateDataCb(request, callback) {
  setTimeout(function () {
    if (true) {
      console.log("Data validated");
      callback(true);
    } else {
      callback(undefined, new Error("fdger"));
    }
  }, 0);
}

function validateData(request) {
  return new Promise(function (resolve, reject) {
    if (request === true) {
      console.log("Data validated");
      resolve(true);
    } else {
      reject(new Error("fdger"));
    }
  });
}

function dbConnect() {
  console.log("Db connect");
}

function createUser(request) {
  try {
    validateData(false)
      .then(dbConnect)
      .then(function () {
        return insertUser(request);
      })
      .then(fetchUser)
      .then(response.send)
      .catch(console.log);
    console.log("Inserting User...");
    //const lastId = insertUser(request);
    //const user = fetchUser(lastId);
    //response.send(user);
  } catch (error) {
    console.error(error);
  }
}

async function createUserAsync(request) {
  try {
    console.log("Inserting User...");
    await validateData(true);
    await dbConnect();
    const lastId = await insertUser(request);
    const user = await fetchUser(lastId);
    response.send(user);
  } catch (error) {
    console.error(error);
  }
}

createUserAsync({});
