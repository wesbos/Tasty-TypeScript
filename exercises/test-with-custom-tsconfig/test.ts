const myVariable = 200;
// make it a string, expect an error
// myVariable = 'hello';

// This should not throw a TS error (only an eslint one)
function fn(s) {
  console.log(s.subtr(3));
}
