function test(callback) {
  const foo = 3;
  console.log(foo);
  setTimeout(function () {
    callback();
  }, 0);
}

function main(callback) {
  let foobar = 5;
  test(function test2() {
    const bar = 4;
    console.log(bar);
  });
  foobar += 5;
  console.log(foobar);
  setTimeout(function () {
    callback();
  }, 0);
}

main(function test3() {
  const foobar = 5;
  console.log(foobar);
});
