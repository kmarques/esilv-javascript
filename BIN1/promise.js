// function validateData(request, callback) {
//   setTimeout(function () {
//     if (request.email && request.password) {
//       callback(undefined, true);
//     } else {
//       callback({ errors: "Invalid credentials" });
//     }
//   }, 0);
// }
//
// function handleCreateUserRequest(request, response) {
//   validateData(request, function (err, result) {
//     if (err) {
//       response.send(400, err.errors);
//     } else {
//       if (result === true) {
//         dbConnect(function (err) {
//           if (err) {
//             response.send(500);
//           } else {
//             insertUser(request.data, function (err, result) {
//               if (err) {
//                 response.send(500);
//               } else {
//                 fetchUser(result.lastId, function (err, result) {
//                   if (err) {
//                     response.send(500);
//                   } else {
//                     response.send(result.user);
//                   }
//                 });
//               }
//             });
//           }
//         });
//       }
//     }
//   });
// }

function handleCreateUserRequest(request, response) {
  return validateData(request)
    .then(dbConnect)
    .then(function resolve() {
      return insertUser(request.data);
    })
    .then(fetchUser)
    .then(response.send)
    .catch(function (error) {
      if (error instanceof ValidationError) {
        response.send(400);
      } else {
        response.send(500);
      }
    });
}

function wait(time) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve();
    }, time);
  });
}

async function handleCreateUserRequest(request, response) {
  try {
    await wait(1000);
    await validateData(request);
    await dbConnect();
    const lastId = await insertUser(request.data);
    response.send(await fetchUser(lastId));
  } catch (error) {
    if (error instanceof ValidationError) {
      response.send(400);
    } else {
      response.send(500);
    }
  }
}
