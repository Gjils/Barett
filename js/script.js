document.addEventListener("DOMContentLoaded", () => {
  let sectionHeights = [0];
  let home = document.querySelector(".home");
  let buttons = home.querySelectorAll("button");

  let buildSlide = function (curSlide) {
    changeHeaderColor();
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

  let homeSlides = [{
      mainColor: "#734222",
      subColor: "#4DBF85",
      slideText: "Подберите инструмент для любимого хобби",
      image: "img/home/top-slider/hobby.jpg",
    },
    {
      mainColor: "#53377A",
      subColor: "#C7C332",
      slideText: "Найдите все для организации концерта",
      image: "img/home/top-slider/perf.jpg",
    },
    {
      mainColor: "#1164B4",
      subColor: "#CC9F72",
      slideText: "Начните учиться прямо сейчас",
      image: "img/home/top-slider/learn.jpg",
    },
  ];

  let curSlide = 0;

  let headerColor = {
    mainColor: homeSlides[curSlide].mainColor,
    subColor: homeSlides[curSlide].subColor,
  };

  buildSlide(curSlide);
  console.log(sectionHeights);
  setInterval(() => {
    curSlide = (curSlide + 1) % 3;
    buildSlide(curSlide);
  }, 20000);

  // Секция категорий

  {
    class CategoryCard {
      constructor(
        width, {
          image,
          rgbColor,
          categoryName,
          faIcon,
          desc,
          href
        } = cardInf
      ) {
        this.image = image;
        this.rgbColor = rgbColor;
        this.categoryName = categoryName;
        this.faIcon = faIcon;
        this.desc = desc;
        this.href = href;
        this.width = width;
      }

      get compilled() {
        if (this.width < 600) {
          return this.mobile();
        } else {
          return this.base();
        }
      }

      base() {
        const card = document.createElement("a");
        card.classList.add("card");
        card.style.backgroundImage = `linear-gradient(180deg, rgba(${this.rgbColor},0.5) 0%, rgba(${this.rgbColor},1) 100%), url(${this.image})`;
        card.href = this.href;
        card.innerHTML = `<div class="desc-wrap">
                          <p>${this.desc}</p>
                          <i class="${this.faIcon} fa-solid"></i>
                        </div>
                        <h4>${this.categoryName}</h4>`;
        return card;
      }

      mobile() {
        const card = this.base();
        const expand = document.createElement("div");
        expand.classList.add("expand");
        expand.textContent = "Подробнее";
        expand.addEventListener("touchstart", (event) => {
          card.addEventListener("click", (e) => {
            e.preventDefault();
          });
          if (card.classList.contains("expanded")) {
            card.classList.remove("expanded");
            expand.textContent = "Подробнее";
          } else {
            card.classList.add("expanded");
            expand.textContent = "Спрятать";
          }
        });
        card.appendChild(expand);
        return card;
      }
    }

    fetch("data/categories.json")
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        res.forEach((elem) => {
          const cards = document.querySelector(".categories .cards");
          cards.appendChild(
            new CategoryCard(window.innerWidth, elem).compilled
          );
        });
      });
  }

  // Секция популярных товаров

  class ItemCard {
    constructor(
      width, {
        id,
        type,
        color,
        typeName,
        name,
        images,
        desc,
        price
      } = item
    ) {
      this.color = color;
      this.width = width;
      this.id = id;
      this.type = type;
      this.typeName = typeName;
      this.name = name;
      this.images = images;
      this.desc = desc;
      this.price = price;
    }
    get compilled() {
      if (this.width < 600) {
        return this.mobile();
      } else {
        return this.desktop();
      }
    }

    colorize(card) {
      card.style.borderColor = this.color;
      card.querySelectorAll(".colored").forEach((element) => {
        element.style.color = this.color;
      });
    }
    uncolorize(card) {
      card.style.borderColor = null;
      card.querySelectorAll(".colored").forEach((element) => {
        element.style.color = null;
        element.classList.remove("colored");
      });
    }

    desktop() {
      const card = document.createElement("a");
      card.classList.add("card");
      card.id = `${this.type}/${this.id}`;

      console.log(this.images[0]);
      card.innerHTML = `
          <div class="hover-bg"></div>
          <div class="picture"></div>
          <i class="fa-heart fa-regular"></i>
          <div class="desc">
            <div class="type">${this.typeName}</div>
            <h4 >${
              this.name.length > 25 ? this.name.slice(0, 25) + "..." : this.name
            }</h4>
            <div class="bot">
              <div class="avaib">В наличии</div>
              <div class="price">${this.price} <span>₽</span></div>
            </div>
          </div>`;

      card.querySelector(
        ".picture"
      ).style.backgroundImage = `url("${this.images[0]}")`;
      const heart = card.querySelector(".fa-heart");
      heart.addEventListener("mouseover", (event) => {
        event.target.classList.add("fa-solid");
        event.target.classList.remove("fa-regular");
      });
      heart.addEventListener("mouseout", (event) => {
        event.target.classList.add("fa-regular");
        event.target.classList.remove("fa-solid");
      });
      const typeElem = card.querySelector(".type");
      const rubSign = card.querySelector("span");
      card.addEventListener("mouseover", (event) => {
        card.classList.add("active");
        heart.classList.add("colored");
        typeElem.classList.add("colored");
        rubSign.classList.add("colored");
        this.colorize(card);
      });
      card.addEventListener("mouseout", (event) => {
        card.classList.remove("active");
        this.uncolorize(card);
      });
      return card;
    }

    mobile() {
      const card = document.createElement("a");
      card.classList.add("card");
      card.id = `${this.type}/${this.id}`;

      console.log(this.images[0]);
      card.innerHTML = `
          <div class="picture"></div>
          <i class="fa-heart fa-regular colored"></i>
          <div class="desc">
            <div class="type colored">${this.typeName}</div>
            <h4 >${
              this.name.length > 25 ? this.name.slice(0, 25) + "..." : this.name
            }</h4>
            <div class="bot">
              <div class="avaib">В наличии</div>
              <div class="price">${this.price} <span class="colored">₽</span></div>
            </div>
          </div>`;
      this.colorize(card);
      card.querySelector(
        ".picture"
      ).style.backgroundImage = `url("${this.images[0]}")`;
      return card;
    }
  }
  fetch("data/items.json")
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      const wrap = document.querySelector(".top-sellers .wrap");
      const items = [].concat(res.acoustic.slice(0, 3), res.electric.slice(0, 3), res.ench.slice(7, 9)).sort(() => Math.random() - 0.5);
      items.forEach((item) => {
        wrap.appendChild(new ItemCard(window.innerWidth, item).compilled);
      });
    });

  // Секция отзывов
  let reviewsList = [{
      "name": "Иван Иванов",
      "reviewText": "Купил гитару в интернет-магазине Barett, очень доволен качеством инструмента и быстрой доставкой.",
      "type": "Положительный",
      "picture": "img/home/reviews/person.jpg"
    },
    {
      "name": "Алексей Петров",
      "reviewText": "Никогда не покупал гитары в интернете, но Barett смог меня убедить. Купил гитару и не пожалел.",
      "type": "Положительный",
      "picture": "img/home/reviews/person.jpg"
    },
    {
      "name": "Мария Сидорова",
      "reviewText": "Заказывала гитару в Barett для своего брата. Он остался очень доволен подарком!.",
      "type": "Положительный",
      "picture": "img/home/reviews/person.jpg"
    },
    {
      "name": "Денис Иванов",
      "reviewText": "Очень доволен своей новой гитарой от Barett. Звук просто потрясающий!.",
      "type": "Положительный",
      "picture": "img/home/reviews/person.jpg"
    },
    {
      "name": "Наталья Ковалева",
      "reviewText": "Быстро и качественно доставили гитару. Рекомендую Barett!.",
      "type": "Положительный",
      "picture": "img/home/reviews/person.jpg"
    },
    {
      "name": "Сергей Семенов",
      "reviewText": "Отличный выбор гитар в интернет-магазине Barett. Я нашел то, что искал!.",
      "type": "Положительный",
      "picture": "img/home/reviews/person.jpg"
    },
    {
      "name": "Ольга Игнатова",
      "reviewText": "Покупала гитару в Barett для своей дочери. Она счастлива!.",
      "type": "Положительный",
      "picture": "img/home/reviews/person.jpg"
    },
    {
      "name": "Александра Григорьева",
      "reviewText": "Отличный магазин гитар. Купила здесь свою первую гитару и очень довольна!.",
      "type": "Положительный",
      "picture": "img/home/reviews/person.jpg"
    },
    {
      "name": "Дмитрий Королев",
      "reviewText": "Получил свою новую гитару от Barett. Просто в восторге!.",
      "type": "Положительный",
      "picture": "img/home/reviews/person.jpg"
    },
    {
      "name": "Евгений Макаров",
      "reviewText": "Заказал гитару в Barett, доставили очень быстро. Качество на высоте!.",
      "type": "Положительный",
      "picture": "img/home/reviews/person.jpg"
    },
    {
      "name": "Виктория Лебедева",
      "reviewText": "Купила гитару в Barett для своего мужа. Он в восторге от звука!.",
      "type": "Положительный",
      "picture": "img/home/reviews/person.jpg"
    },
    {
      "name": "Андрей Николаев",
      "reviewText": "Отличный магазин гитар. Заказал гитару и получил ее на следующих день после оплаты. Качество инструмента просто потрясающее!.",
      "type": "Положительный",
      "picture": "img/home/reviews/person.jpg"
    },
    {
      "name": "Елена Степанова",
      "reviewText": "Купила гитару в Barett для своей дочери, которая начала заниматься музыкой. Гитара оказалась очень качественной!.",
      "type": "Положительный",
      "picture": "img/home/reviews/person.jpg"
    },
    {
      "name": "Анна Попова",
      "reviewText": "Спасибо Barett за быструю доставку гитары. Я уже успела ее опробовать и она звучит просто великолепно!.",
      "type": "Положительный",
      "picture": "img/home/reviews/person.jpg"
    },
    {
      "name": "Михаил Кузнецов",
      "reviewText": "Отличный магазин гитар. Заказывал у них уже несколько раз и всегда остался доволен!.",
      "type": "Положительный",
      "picture": "img/home/reviews/person.jpg"
    },
    {
      "name": "Юлия Петухова",
      "reviewText": "Купила гитару в Barett для своего сына, который играет в группе. Он остался очень доволен!.",
      "type": "Положительный",
      "picture": "img/home/reviews/person.jpg"
    },
    {
      "name": "Павел Крылов",
      "reviewText": "Качество гитары от Barett на высшем уровне. Я очень доволен своей покупкой!.",
      "type": "Положительный",
      "picture": "img/home/reviews/person.jpg"
    },
    {
      "name": "Ирина Максимова",
      "reviewText": "Быстро и качественно доставили мою новую гитару. Спасибо Barett!.",
      "type": "Положительный",
      "picture": "img/home/reviews/person.jpg"
    }
  ];
  let reviews = document.querySelector(".reviews");


  class ReviewCard {
    constructor({
      name,
      reviewText,
      type,
      picture
    } = item) {
      this.name = name;
      this.reviewText = reviewText;
      this.type = type;
      this.picture = picture;
    }
    get compilled() {
      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `
      <div class="type ${this.type == "Положительный" ? "green" : "red"}-text">${
        this.type
      }</div>
      <div class="name">${this.name}</div>
      <p class="review">${this.reviewText}</p>
      <img class="picture" alt="profile picture" src="${this.picture}">`;
      return card;
    }
  }

  class ReviewsPage {
    constructor(cardList, prevPage, curPage) {
      this.cardList = cardList;
      this.prevPage = prevPage;
      this.curPage = curPage;
    }

    renderPage(wrap) {
      wrap.innerHTML = "";
      this.cardList.forEach((item) => {
        wrap.appendChild(new ReviewCard(item).compilled);
      });
    }

    changeIndicators(indicators, arrowLeft, arrowRight, pageQuant) {
      indicators[this.prevPage - 1].classList.remove("active");
      indicators[this.curPage - 1].classList.add("active");
      if (this.curPage == 1) {
        arrowLeft.classList.add("hidden");
        arrowLeft.removeEventListener("click", decPage);
      } else {
        arrowLeft.classList.remove("hidden");
        arrowLeft.addEventListener("click", decPage);
      }
      if (this.curPage == pageQuant) {
        arrowRight.classList.add("hidden");
        arrowRight.removeEventListener("click", incPage);
      } else {
        arrowRight.classList.remove("hidden");
        arrowRight.addEventListener("click", incPage);
      }
    }

  }

  fetch("data/reviews.json")
    .then((res) => {
      return res.json();
    })
    .then((items) => {
      function getReviewsList(curPage, items) {
        return items.slice(
          itemsPerPage * (curPage - 1),
          itemsPerPage * curPage
        );
      }

      function changePage(reviewsList, prevPage, curPage, wrap, indicators, arrowLeft, arrowRight, pageQuant) {
        currentPage = curPage;
        const page = new ReviewsPage(reviewsList, prevPage, curPage, arrowLeft, arrowRight);
        page.renderPage(wrap);
        page.changeIndicators(indicators, arrowLeft, arrowRight, pageQuant);
      }
      let pageQuant = 3;
      let itemsPerPage = 6;
      if (window.innerWidth < 600) {
        pageQuant = 6;
        itemsPerPage = 3;
      }
      let currentPage = 1;
      const wrap = document.querySelector(".reviews .wrap");
      const indicators = document.querySelector(".reviews .switch .indicators");
      const arrowLeft = reviews.querySelector(".fa-chevron-left");
      const arrowRight = reviews.querySelector(".fa-chevron-right");
      for (let i = 1; i <= pageQuant; i++) {
        const indicator = document.createElement("div");
        indicator.classList.add("indicator");
        indicators.appendChild(indicator);
      }
      indicators.querySelectorAll(".indicator").forEach((indicator, i) => {
        indicator.addEventListener("click", () => {
          changePage(getReviewsList(i + 1, items), currentPage, i + 1, wrap, indicators.querySelectorAll(".indicator"), arrowLeft, arrowRight, pageQuant);
        });
      });
      incPage = function () {
        changePage(getReviewsList(currentPage + 1, items), currentPage, currentPage + 1, wrap, indicators.querySelectorAll(".indicator"), arrowLeft, arrowRight, pageQuant);
      };
      decPage = function () {
        changePage(getReviewsList(currentPage - 1, items), currentPage, currentPage - 1, wrap, indicators.querySelectorAll(".indicator"), arrowLeft, arrowRight, pageQuant);
      };
      arrowLeft.addEventListener("click", decPage);
      arrowRight.addEventListener("click", incPage);
      changePage(getReviewsList(1, items), 1, 1, wrap, indicators.querySelectorAll(".indicator"), arrowLeft, arrowRight, pageQuant);

    });


  window.addEventListener("scroll", changeHeaderColor);

  setInterval(() => {
    sectionHeights.push(
      parseFloat(
        window.getComputedStyle(document.querySelector(".home")).height
      )
    );
    sectionHeights.push(
      parseFloat(
        window.getComputedStyle(document.querySelector(".categories")).height
      ) + sectionHeights[1]
    );
    sectionHeights.push(
      parseFloat(
        window.getComputedStyle(document.querySelector(".top-sellers")).height
      ) + sectionHeights[2]
    );
    sectionHeights.push(
      parseFloat(
        window.getComputedStyle(document.querySelector(".reviews")).height
      ) + sectionHeights[3]
    );
  }, 2000);

  function changeHeaderColor(e) {
    if (
      window.scrollY < sectionHeights[1] &&
      window.scrollY >= sectionHeights[0]
    ) {
      headerColor.mainColor = homeSlides[curSlide].mainColor;
      headerColor.subColor = homeSlides[curSlide].subColor;
    }
    if (
      window.scrollY >= sectionHeights[1] &&
      window.scrollY < sectionHeights[2]
    ) {
      headerColor.mainColor = "#f5f5f5";
      headerColor.subColor = "#000000";
    }
    if (
      window.scrollY >= sectionHeights[2] &&
      window.scrollY < sectionHeights[3]
    ) {
      headerColor.mainColor = "#8fbc8f";
      headerColor.subColor = "#ffffff";
    }
    if (
      window.scrollY >= sectionHeights[3] &&
      window.scrollY < sectionHeights[4]
    ) {
      headerColor.mainColor = "#ffffff";
      headerColor.subColor = "#000000";
    }
    const header = document.querySelector("header");
    header.style.backgroundColor = headerColor.mainColor;
    header.querySelector(".logo").style.color = headerColor.subColor;
    header.querySelector(".bars").style.color = headerColor.subColor;
    header.querySelector(".cur-page").style.color = headerColor.subColor;
  }
});