function a() {
  let x = 1;
  console.log("AAA1");
  console.log(x);
  b();
  console.log("AAA2");
  console.log(x);
}
function b() {
  console.log("BBB");
  console.log(x);
  x++;
  console.log("BBB2");
  console.log(x);
}
a();
