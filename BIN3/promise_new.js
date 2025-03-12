async function validateData(request) {
  if (request.lastname && request.firstname) return;
  throw new Error("Invalid Data");
}

async function createUser(request) {
  await validateData(request);
  await dbConnect();
  const lastId = await insertUser(request);
  const user = await fetchUser(lastId);
  return user;
}

try {
  const user = await createUser({ lastname: "Foo", firstname: "Bar" });
  send(user);
} catch (error) {
  console.error(error.message);
}
