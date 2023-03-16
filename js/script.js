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
      rgbColor: "82,0,77",
      name: "Электрогитары",
      faIcon: "fa-bolt",
      desc: "Электрогитара представляет собой современную и надежную инструментальную модель с широкими музыкальными возможностями и привлекательным дизайном",
      href: "",
    },
    {
      image: "../img/home/categories/acoustic.jpg",
      rgbColor: "0,40,82",
      name: "Акустические гитары",
      faIcon: "fa-music",
      desc: "Акустическая гитара идеально подходит для любителей музыки, благодаря своему качественному звуку и красивому ансамблю материалов",
      href: "",
    },
    {
      image: "../img/home/categories/classical.jpeg",
      rgbColor: "1,84,0",
      name: "Классические гитары",
      faIcon: "fa-record-vinyl",
      desc: "Классическая гитара – это идеальный инструмент для музыкальной игры различных жанров, благодаря ее качественному звуку и надежному корпусу",
      href: "",
    },
    {
      image: "../img/home/categories/repair.jpeg",
      rgbColor: "110,67,0",
      name: "Аксессуары",
      faIcon: "fa-screwdriver-wrench",
      desc: "В нашем интернет-магазине гитар вы можете найти все необходимые аксессуары для гитары, от передовых электронных устройств до импортных струн",
      href: "",
    },
  ];
  const categories = document.querySelector(".categories");
  const cardsWrap = categories.querySelector(".cards");
  categoriesInf.forEach((el, it) => {
    const card = document.createElement("a");
    card.classList.add("card");
    card.href = el["href"];
    card.style.backgroundImage = `linear-gradient(180deg, rgba(${el["rgbColor"]},0.5) 0%, rgba(${el["rgbColor"]},1) 100%), url(${el["image"]})`;
    let name = document.createElement("h4");
    name.textContent = el["name"];
    let descWrap = document.createElement("div");
    descWrap.classList.add("desc-wrap");
    let icon = document.createElement("i");
    icon.classList.add("fa-solid");
    icon.classList.add(el["faIcon"]);
    let desc = document.createElement("p");
    desc.classList.add("desc");
    desc.textContent = el["desc"];
    descWrap.appendChild(desc);
    descWrap.appendChild(icon);
    card.appendChild(descWrap);
    card.appendChild(name);
    cardsWrap.appendChild(card);
  });

  items = fetch("info.json")
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      for (let i = 0; i < 8; i++) {
        const topSellers = document.querySelector(".top-sellers");
        const itemsWrap = topSellers.querySelector(".wrap");
        const card = document.createElement("a");
        card.classList.add("card");

        const hovBg = document.createElement("div");
        hovBg.classList.add("hover-bg");
        card.appendChild(hovBg);

        const picture = document.createElement("div");
        picture.classList.add("picture");
        picture.style.backgroundImage = `url("${res["acoustic"][i]["images"][0]}")`;
        card.appendChild(picture);

        const heart = document.createElement("i");
        heart.classList.add("fa-heart");
        heart.classList.add("fa-regular");
        heart.addEventListener("mouseover", (e) => {
          heart.classList.add("fa-solid");
          heart.classList.remove("fa-regular");
        });
        heart.addEventListener("mouseout", (e) => {
          heart.classList.add("fa-regular");
          heart.classList.remove("fa-solid");
        });
        card.appendChild(heart);

        const desc = document.createElement("div");
        desc.classList.add("desc");
        desc.innerHTML = `
      <div class="type">${res["acoustic"][i]["typeName"]}</div>
      <h4>${
        res["acoustic"][i]["name"].length > 35
          ? res["acoustic"][i]["name"].slice(0, 35) + "..."
          : res["acoustic"][i]["name"]
      }</h4>
      <div class="bot">
        <div class="avaib">В наличии</div>
        <div class="price">${res["acoustic"][i]["price"]} <span>₽</span></div>
      </div>
      `;
        card.appendChild(desc);

        itemsWrap.appendChild(card);
      }
    });

  let reviewsList = [
    {
      name: "Lorem Ipsum",
      type: "Положительный",
      reviewText:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet atque, voluptatem sint ipsa voluptates illo qui, molestiae aspernatur alias perferendis porro quasi itaque nihil ex deserunt minima. Commodi, magnam ducimus.",
      picture:
        "img/home/reviews/0b7f4e9b-f59c-4024-9f06-b3dc12850ab7-1920-1080.jpg",
    },
    {
      name: "Lorem Ipsum",
      type: "Положительный",
      reviewText:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet atque, voluptatem sint ipsa voluptates illo qui, molestiae aspernatur alias perferendis porro quasi itaque nihil ex deserunt minima. Commodi, magnam ducimus.",
      picture:
        "img/home/reviews/0b7f4e9b-f59c-4024-9f06-b3dc12850ab7-1920-1080.jpg",
    },
    {
      name: "Lorem Ipsum",
      type: "Положительный",
      reviewText:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet atque, voluptatem sint ipsa voluptates illo qui, molestiae aspernatur alias perferendis porro quasi itaque nihil ex deserunt minima. Commodi, magnam ducimus.",
      picture:
        "img/home/reviews/0b7f4e9b-f59c-4024-9f06-b3dc12850ab7-1920-1080.jpg",
    },
    {
      name: "Lorem Ipsum",
      type: "Положительный",
      reviewText:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet atque, voluptatem sint ipsa voluptates illo qui, molestiae aspernatur alias perferendis porro quasi itaque nihil ex deserunt minima. Commodi, magnam ducimus.",
      picture:
        "img/home/reviews/0b7f4e9b-f59c-4024-9f06-b3dc12850ab7-1920-1080.jpg",
    },
    {
      name: "Lorem Ipsum",
      type: "Положительный",
      reviewText:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet atque, voluptatem sint ipsa voluptates illo qui, molestiae aspernatur alias perferendis porro quasi itaque nihil ex deserunt minima. Commodi, magnam ducimus.",
      picture:
        "img/home/reviews/0b7f4e9b-f59c-4024-9f06-b3dc12850ab7-1920-1080.jpg",
    },
    {
      name: "Lorem Ipsum",
      type: "Положительный",
      reviewText:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet atque, voluptatem sint ipsa voluptates illo qui, molestiae aspernatur alias perferendis porro quasi itaque nihil ex deserunt minima. Commodi, magnam ducimus.",
      picture:
        "img/home/reviews/0b7f4e9b-f59c-4024-9f06-b3dc12850ab7-1920-1080.jpg",
    },
    {
      name: "Lorem Ipsum",
      type: "Положительный",
      reviewText:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet atque, voluptatem sint ipsa voluptates illo qui, molestiae aspernatur alias perferendis porro quasi itaque nihil ex deserunt minima. Commodi, magnam ducimus.",
      picture:
        "img/home/reviews/0b7f4e9b-f59c-4024-9f06-b3dc12850ab7-1920-1080.jpg",
    },
  ];
  let reviews = document.querySelector(".reviews");
  function buildReviewsPage(reviewsOnPage) {
    let reviews = document.querySelector(".reviews");
    let wrap = reviews.querySelector(".wrap");
    wrap.innerHTML = "";
    reviewsOnPage.forEach((it) => {
      let card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `
      <div class="type ${it.type == "Положительный" ? "green" : "red"}-text">${
        it.type
      }</div>
      <div class="name">${it.name}</div>
      <p class="review">${it.reviewText}</p>
      <img class="picture" alt="profile picture" src="${it.picture}">`;
      wrap.appendChild(card);
    });
  }

  const pageQuant = 3;
  let curPage = 1;
  let itemsPerPage = 6;
  const indicators = reviews.querySelector(".indicators");
  for (let i = 1; i <= pageQuant; i++) {
    const indicator = document.createElement("div");
    indicator.classList.add("indicator");
    indicator.customIndex = i;
    indicators.appendChild(indicator);
  }

  function changeIndicator(indicators, targetPage, curPage) {
    const indicatorList = indicators.querySelectorAll(".indicator");
    indicatorList[curPage - 1].classList.remove("active");
    indicatorList[targetPage - 1].classList.add("active");
  }

  function changePage(targetPage, reviewsList) {
    const reviewsOnPage = reviewsList.slice(
      itemsPerPage * (targetPage - 1),
      itemsPerPage * targetPage
    );
    changeIndicator(indicators, targetPage, curPage);
    buildReviewsPage(reviewsOnPage);
    curPage = targetPage;
  }

  changePage(1, reviewsList);

  const indicatorList = indicators.querySelectorAll(".indicator");
  indicatorList.forEach((i, it) => {
    i.addEventListener("click", (e) => {
      changePage(e.currentTarget.customIndex, reviewsList);
    });
  });
});
