//源自老師之程式碼改編
var circle = {
  r: 5,
  area: function () {
    return 3.14 * this.r * this.r;
  }
}

console.log("circle.r=%d", circle.r);

console.log("circle.area()=%d", circle.area());