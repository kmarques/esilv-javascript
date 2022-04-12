async function test() {
  const foo = 3;
  test2();
  console.log(foo);
}

async function test2() {
  const bar = 4;
  console.log(bar);
}

let foobar = 5;
test();
foobar += 5;
console.log(foobar);

// Stack instructions à jouer
// let foobar = 5;
// foobar += 5;
// console.log(foobar);
// const foo = 3;
// console.log(foo);
// const bar = 4;
// console.log(bar);

// Stack instructions en attente
