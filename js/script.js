document.addEventListener("DOMContentLoaded", () => {
  let home = document.querySelector(".home");
  let buttons = home.querySelectorAll("button");

  let buildSlide = function (curSlide) {
    home.querySelector(".logo").style.filter = homeSlides[curSlide].filter;
    home.querySelector(".bars").style.color = homeSlides[curSlide].subColor;
    home.querySelector("h1").textContent = homeSlides[curSlide].slideText;
    home.querySelector("h1").style.color = homeSlides[curSlide].subColor;
    home.querySelector(".next").style.backgroundColor =
      homeSlides[curSlide].mainColor;
    home.querySelector(".next").classList.add("appear");
    buttons.forEach((item) => {
      item.style.backgroundColor = "transparent";
      item.style.border = `3px solid ${homeSlides[curSlide].subColor}`;
      item.style.color = homeSlides[curSlide].subColor;
      item.addEventListener("mouseover", (e) => {
        item.style.color = homeSlides[curSlide].mainColor;
        item.style.backgroundColor = homeSlides[curSlide].subColor;
      });
      item.addEventListener("mouseout", (e) => {
        item.style.color = homeSlides[curSlide].subColor;
        item.style.backgroundColor = "transparent";
      });
    });
    let pic = home.querySelector(".picture");
    pic.querySelector(".next-pic").src = homeSlides[curSlide].image;
    pic.querySelector(".next-pic").classList.add("appear-pic");
    setTimeout(() => {
      home.style.backgroundColor = homeSlides[curSlide].mainColor;
      home.querySelector(".next").classList.remove("appear");
      pic.querySelector(".curent").src = homeSlides[curSlide].image;
      pic.querySelector(".next-pic").classList.remove("appear-pic");
    }, 1000);
  };

  let homeSlides = [
    {
      mainColor: "#734222",
      subColor: "#4DBF85",
      filter:
        "invert(77%) sepia(10%) saturate(2212%) hue-rotate(96deg) brightness(87%) contrast(78%)",
      slideText: "Подберите инструмент для любимого хобби",
      image: "img/home/top-slider/hobby.jpg",
    },
    {
      mainColor: "#53377A",
      subColor: "#C7C332",
      filter:
        "invert(84%) sepia(86%) saturate(466%) hue-rotate(355deg) brightness(85%) contrast(81%)",
      slideText: "Найдите все для организации концерта",
      image: "img/home/top-slider/perf.jpg",
    },
    {
      mainColor: "#1164B4",
      subColor: "#CC9F72",
      filter:
        "invert(64%) sepia(42%) saturate(331%) hue-rotate(349deg) brightness(93%) contrast(98%)",
      slideText: "Начните учиться прямо сейчас",
      image: "img/home/top-slider/learn.jpg",
    },
  ];

  let curSlide = 0;

  buildSlide(curSlide);
  setInterval(() => {
    curSlide = (curSlide + 1) % 3;
    buildSlide(curSlide);
  }, 100000);




  let categoriesInf = [
    {
      image: "../img/home/categories/electric.jpeg",
      rgbColor: "82,0,77"
    },
    {
      image: "../img/home/categories/acoustic.jpg",
      rgbColor: "0,40,82"
    },
    {
      image: "../img/home/categories/classical.jpeg",
      rgbColor: "1,84,0"
    },
    {
      image: "../img/home/categories/repair.jpeg",
      rgbColor: "110,67,0"
    }
  ]
  const categories = document.querySelector(".categories");
  const cardsWrap = categories.querySelector(".cards");
  categoriesInf.forEach((el, it) => {
    const card = document.createElement("div")
    card.classList.add("card")
    card.style.backgroundImage = `linear-gradient(180deg, rgba(${el["rgbColor"]},0.5) 0%, rgba(${el["rgbColor"]},1) 100%), url(${el["image"]})`;
    cardsWrap.appendChild(card);
  });
});
