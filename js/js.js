document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.sidenav');
  var instances = M.Sidenav.init(elems, {});
});

document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.carousel');
  var instances = M.Carousel.init(elems, {
    indicators: true,
    noWrap: true,
    dist: 0,
    duration: 50
  });
  let arrowLeft = document.querySelector(".carousel .arrow-left");
  arrowLeft.addEventListener("click", function () { instances.prev });
  let arrowRight = document.querySelector(".carousel .arrow-right");
  arrowRight.addEventListener("click", function () { instances.next })
});