document.addEventListener("DOMContentLoaded", () => {
  window.condition = window.innerWidth < 600 ? "mobile" : "desktop";
  const sections = [
    document.querySelector(".home"),
    document.querySelector(".categories"),
    document.querySelector(".top-sellers"),
    document.querySelector(".reviews"),
    document.querySelector(".footer"),
  ];



  let homeSlides = [{
      mainColor: "115, 66, 34",
      subColor: "#4DBF85",
      slideText: "Подберите инструмент для любимого хобби",
      image: "img/home/top-slider/hobby.jpg",
    },
    {
      mainColor: "83, 55, 122",
      subColor: "#C7C332",
      slideText: "Найдите все для организации концерта",
      image: "img/home/top-slider/perf.jpg",
    },
    {
      mainColor: "17, 100, 180",
      subColor: "#CC9F72",
      slideText: "Начните учиться прямо сейчас",
      image: "img/home/top-slider/learn.jpg",
    },
  ];
  let curSlide = 0;
  let prevColor = homeSlides[curSlide].mainColor;
  let home = document.querySelector(".home");

  let buttons = home.querySelectorAll("button");

  buttons.forEach((item) => {
    item.style.backgroundColor = "transparent";
    item.style.border = `3px solid ${homeSlides[curSlide].subColor}`;
    item.style.color = homeSlides[curSlide].subColor;

    item.addEventListener("mouseover", (e) => {
      item.style.color = `rgb(${homeSlides[curSlide].mainColor})`;
      item.style.backgroundColor = homeSlides[curSlide].subColor;
    });
    item.addEventListener("mouseout", (e) => {
      item.style.color = homeSlides[curSlide].subColor;
      item.style.backgroundColor = "transparent";
    });
  });


  function buildSlide(curSlide, prevColor) {
    home.mainColor = `rgb(${homeSlides[curSlide].mainColor})`;
    home.subColor = `${homeSlides[curSlide].subColor}`;
    changeHeaderColor();
    home.querySelector("h1").textContent = homeSlides[curSlide].slideText;
    home.querySelector("h1").style.color = homeSlides[curSlide].subColor;
    buttons.forEach((item) => {
      item.style.backgroundColor = "transparent";
      item.style.border = `3px solid ${homeSlides[curSlide].subColor}`;
      item.style.color = homeSlides[curSlide].subColor;
    });


    let t = 0;

    function easeInOut(t) {
      if (t <= 0.5)
        return 2.0 * t * t;
      t -= 0.5;
      return 2.0 * t * (1.0 - t) + 0.5;
    }
    const changeBg = setInterval(function () {
      let arg = easeInOut(t / 100) * 100;
      home.style.background = `linear-gradient(rgba(${homeSlides[curSlide].mainColor}, 1) 0%, rgba(${homeSlides[curSlide].mainColor}, 1) ${arg}%, rgba(${prevColor}, 1) ${arg}%, rgba(${prevColor}, 1) 100%`;
      t += 0.5;
      if (t > 100) {
        clearInterval(changeBg);
        setTimeout(() => {
          i = 0;
        }, 10);

      }
    }, 1);


    let pic = home.querySelector(".picture");
    pic.querySelector(".curent").src = homeSlides[curSlide].image;
  }


  buildSlide(curSlide, prevColor);

  setInterval(() => {
    let prevColor = homeSlides[curSlide].mainColor;
    curSlide = (curSlide + 1) % 3;
    buildSlide(curSlide, prevColor);
  }, 4000);

  // Секция категорий
  document.querySelector(".categories").mainColor = "#f5f5f5";
  document.querySelector(".categories").subColor = "#000000"; {
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
          return this.desktop();
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
          card.addEventListener("touchend", (e) => {
            e.preventDefault();
          });
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

      desktop() {
        const card = this.base();
        card.addEventListener("mouseover", () => {
          card.classList.add("on-hover");
        });
        card.addEventListener("mouseout", () => {
          card.classList.remove("on-hover");
        });
        return card;
      }
    }

    fetch("data/categories.json")
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        addToScreen();

        function addToScreen() {
          const cards = document.querySelector(".categories .cards");
          cards.innerHTML = "";
          res.forEach((elem) => {
            cards.appendChild(
              new CategoryCard(window.innerWidth, elem).compilled
            );
          });
        }
        addToScreen();
        window.addEventListener("resize", () => {
          if (window.condition == "mobile" && window.innerWidth >= 600) {
            addToScreen();
            window.condition = "desktop";
          }
          if (window.condition == "desktop" && window.innerWidth < 600) {
            addToScreen();
            window.condition = "mobile";
          }
        });
      });
  }

  // Страница товара
  class ItemPage {
    constructor(
      color,
      id,
      type,
      typeName,
      name,
      images,
      desc,
      price
    ) {
      this.color = color;
      this.id = id;
      this.type = type;
      this.typeName = typeName;
      this.name = name;
      this.images = images;
      this.desc = desc;
      this.price = price;
    }

    loadItemPage() {
      const htmlElem = document.querySelector("html");
      htmlElem.classList.add("on-background");
      const body = document.querySelector("body");

      const itemPageWrap = document.createElement("div");
      itemPageWrap.classList.add("item-page-wrap");
      itemPageWrap.innerHTML = `
        <div class="item-page">
          <div class="item-page-container">
            <i class="fa-solid fa-xmark"></i>
            <div class="top-container">
              <div class="images">
                <div class="indicators-wrap">
                  <div class="indicators"></div>
                </div>
                <div class="image-wrap">
                  <div class="image-carousel">
                    <div class="image-carousel-wrap"></div>
                  </div>
                  <div class="switch">
                    <i class="fa-solid fa-chevron-left"></i>
                    <i class="fa-solid fa-chevron-right"></i>
                  </div>
                </div>
              </div> 
              <div class="info">
                <div class="type">${this.typeName}</div>
                <div class="name-wrap">
                  <h3 class="name">${this.name}</h3>
                  <div class="guarantee">Гарантия 6 мес</div>
                </div>
                <div class="price">${this.price}<span>₽</span></div>
                <div class="buttons">
                  <button class="add-to-cart"><i class="fa-solid fa-cart-plus"></i> В корзину</button>
                  <button class="buy-now">Купить сейчас</button>
                </div>
                <div class="delivery-options">
                  <div class="delivery">Доставка <a>завтра</a> <i class="fa-sharp fa-solid fa-truck"></i></div>
                  <div class="self-pick-up">В наличии в <a>3 магазинах</a> <i class="fa-solid fa-shop"></i></div>
                </div>
              </div>
            </div>
            <div class="desc">
              <h4>Описание</h4>
              <div>
                ${this.desc}
              </div>
            </div>
          </div>
        </div>      
      `;
      const itemPage = itemPageWrap.querySelector(".item-page");
      let imageWidth = (window.innerWidth > 600) ? 400 : ((window.innerWidth * 0.95 - 20) * 0.9);
      itemPage.addEventListener("click", (e) => {
        e.stopPropagation();
      });
      itemPageWrap.querySelector(".fa-xmark").addEventListener("click", () => {
        htmlElem.classList.remove("on-background");
        body.removeChild(itemPageWrap);
      });
      itemPageWrap.addEventListener("click", () => {
        htmlElem.classList.remove("on-background");
        body.removeChild(itemPageWrap);
      });


      const indicators = itemPageWrap.querySelector(".indicators");
      const imageCarousel = itemPageWrap.querySelector(".image-carousel-wrap");
      let curPage = 0;
      const color = this.color;
      itemPageWrap.querySelector(".image-carousel").style.borderColor = color;
      const pageQuant = this.images.length;
      const arrowLeft = itemPageWrap.querySelector(".fa-chevron-left");
      const arrowRight = itemPageWrap.querySelector(".fa-chevron-right");

      this.images.forEach((image, i) => {
        const indicator = document.createElement("div");
        indicator.classList.add("indicator");
        if (window.innerWidth < 600) {
          indicator.style.width = `${imageWidth / 4.5}px`;
          indicator.style.marginRight = `${imageWidth / 4.5 / 6}px`;
        }
        indicator.style.backgroundImage = `url("${image}")`;
        indicator.addEventListener("click", () => {
          curPage = i;
          imageCarousel.style.right = `${imageWidth * i}px`;
          refreshArrows(i);
          refreshIndicators(i, color);
        });
        indicators.appendChild(indicator);

        const imageBlock = document.createElement("div");
        imageBlock.classList.add("image");
        imageBlock.style.backgroundImage = `url("${image}")`;
        imageCarousel.append(imageBlock);
      });

      arrowLeft.addEventListener("click", decPage);
      arrowRight.addEventListener("click", incPage);

      function decPage() {
        curPage--;
        imageCarousel.style.right = `${imageWidth * curPage}px`;
        refreshArrows(curPage);
        refreshIndicators(curPage, color);
      }

      function incPage() {
        curPage++;
        imageCarousel.style.right = `${imageWidth * curPage}px`;
        refreshArrows(curPage);
        refreshIndicators(curPage, color);
      }

      refreshArrows(0);
      refreshIndicators(0, color);

      function refreshArrows(curPage) {
        if (curPage == 0) {
          arrowLeft.classList.add("hidden");
          arrowLeft.removeEventListener("click", decPage);
        } else {
          arrowLeft.classList.remove("hidden");
          arrowLeft.addEventListener("click", decPage);
        }
        if (curPage == pageQuant - 1) {
          arrowRight.classList.add("hidden");
          arrowRight.removeEventListener("click", incPage);
        } else {
          arrowRight.classList.remove("hidden");
          arrowRight.addEventListener("click", incPage);
        }
      }

      function refreshIndicators(curPage, color) {
        let offsetInd = 0;
        if (window.innerWidth > 600) {
          if (pageQuant > 5 && curPage >= 2) {
            offsetInd = Math.min((curPage - 1) * 100, (pageQuant - 5) * 100);
          }
          indicators.style.top = `-${offsetInd}px`;
        } else {
          if (pageQuant > 4 && curPage >= 2) {
            offsetInd = Math.min((curPage - 1) * (imageWidth / 4.5 * (7 / 6)), (pageQuant - 4) * (imageWidth / 4.5 * (7 / 6)));
          }
          indicators.style.left = `-${offsetInd}px`;
        }
        const indicatorsList = indicators.querySelectorAll(".indicator");
        indicatorsList.forEach((el) => {
          el.classList.remove("active");
          el.style.borderColor = "grey";
        });
        indicatorsList[curPage].classList.add("active");
        indicatorsList[curPage].style.borderColor = color;
      }


      const info = itemPageWrap.querySelector(".info");
      info.querySelector(".type").style.color = this.color;
      info.querySelector("span").style.color = this.color;
      info.querySelector(".buy-now").style.backgroundColor = this.color;
      info.querySelectorAll(".delivery-options a").forEach((el) => {
        el.style.color = this.color;
        el.style.borderColor = this.color;
      });


      body.appendChild(itemPageWrap);
    }


  }

  // Секция популярных товаров
  document.querySelector(".top-sellers").mainColor = "#8fbc8f";
  document.querySelector(".top-sellers").subColor = "#ffffff";
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
      card.addEventListener("click", () => {
        const itemPage = new ItemPage(this.color, this.id, this.type, this.typeName, this.name, this.images, this.desc, this.price);
        itemPage.loadItemPage();
      });
      return card;
    }

    mobile() {
      const card = document.createElement("a");
      card.classList.add("card");
      card.id = `${this.type}/${this.id}`;

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
              <div class="price">${
                this.price
              } <span class="colored">₽</span></div>
            </div>
          </div>`;
      this.colorize(card);
      card.querySelector(
        ".picture"
      ).style.backgroundImage = `url("${this.images[0]}")`;
      card.addEventListener("click", () => {
        const itemPage = new ItemPage(this.color, this.id, this.type, this.typeName, this.name, this.images, this.desc, this.price);
        itemPage.loadItemPage();
      });
      card.addEventListener("touchend", () => {
        const itemPage = new ItemPage(this.color, this.id, this.type, this.typeName, this.name, this.images, this.desc, this.price);
        itemPage.loadItemPage();
      });
      return card;
    }
  }
  fetch("data/items.json")
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      function addToScreen() {
        const wrap = document.querySelector(".top-sellers .wrap");
        wrap.innerHTML = "";
        const items = []
          .concat(
            res.acoustic.slice(0, 3),
            res.electric.slice(0, 3),
            res.ench.slice(7, 9)
          )
          .sort(() => Math.random() - 0.5);
        items.forEach((item) => {
          wrap.appendChild(new ItemCard(window.innerWidth, item).compilled);
        });
      }
      addToScreen();
      window.addEventListener("resize", () => {
        if (window.condition == "mobile" && window.innerWidth >= 600) {
          addToScreen();
          window.condition = "desktop";
        }
        if (window.condition == "desktop" && window.innerWidth < 600) {
          addToScreen();
          window.condition = "mobile";
        }
      });
    });

  // Секция отзывов
  document.querySelector(".reviews").mainColor = "#ffffff";
  document.querySelector(".reviews").subColor = "#000000";
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
      <div class="type ${
        this.type == "Положительный" ? "green" : "red"
      }-text">${this.type}</div>
      <div class="name">${this.name}</div>
      <p class="review">${this.reviewText}</p>
      <div class="picture" alt="profile picture"></div>`;
      const pic = card.querySelector(".picture");
      pic.style.backgroundImage = `url("../${this.picture}")`;

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
      function addToScreen() {
        function getReviewsList(curPage, items) {
          return items.slice(
            itemsPerPage * (curPage - 1),
            itemsPerPage * curPage
          );
        }

        function changePage(
          reviewsList,
          prevPage,
          curPage,
          wrap,
          indicators,
          arrowLeft,
          arrowRight,
          pageQuant
        ) {
          currentPage = curPage;
          const page = new ReviewsPage(
            reviewsList,
            prevPage,
            curPage,
            arrowLeft,
            arrowRight
          );
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
        wrap.innerHTML = "";
        const indicators = document.querySelector(".reviews .switch .indicators");
        indicators.innerHTML = "";
        const arrowLeft = reviews.querySelector(".fa-chevron-left");
        const arrowRight = reviews.querySelector(".fa-chevron-right");
        for (let i = 1; i <= pageQuant; i++) {
          const indicator = document.createElement("div");
          indicator.classList.add("indicator");
          indicators.appendChild(indicator);
        }
        indicators.querySelectorAll(".indicator").forEach((indicator, i) => {
          indicator.addEventListener("click", () => {
            changePage(
              getReviewsList(i + 1, items),
              currentPage,
              i + 1,
              wrap,
              indicators.querySelectorAll(".indicator"),
              arrowLeft,
              arrowRight,
              pageQuant
            );
          });
        });
        incPage = function () {
          changePage(
            getReviewsList(currentPage + 1, items),
            currentPage,
            currentPage + 1,
            wrap,
            indicators.querySelectorAll(".indicator"),
            arrowLeft,
            arrowRight,
            pageQuant
          );
        };
        decPage = function () {
          changePage(
            getReviewsList(currentPage - 1, items),
            currentPage,
            currentPage - 1,
            wrap,
            indicators.querySelectorAll(".indicator"),
            arrowLeft,
            arrowRight,
            pageQuant
          );
        };
        arrowLeft.addEventListener("click", decPage);
        arrowRight.addEventListener("click", incPage);
        changePage(
          getReviewsList(1, items),
          1,
          1,
          wrap,
          indicators.querySelectorAll(".indicator"),
          arrowLeft,
          arrowRight,
          pageQuant
        );
      }
      addToScreen();
      window.addEventListener("resize", () => {
        if (window.condition == "mobile" && window.innerWidth >= 600) {
          addToScreen();
          window.condition = "desktop";
        }
        if (window.condition == "desktop" && window.innerWidth < 600) {
          addToScreen();
          window.condition = "mobile";
        }
      });
    });
  window.addEventListener("scroll", changeHeaderColor);

  document.querySelector(".footer").mainColor = "#49423D";
  document.querySelector(".footer").subColor = "#ffefd5";

  function changeHeaderColor(e) {
    sections.forEach((elem) => {
      if (window.scrollY >= elem.offsetTop - ((window.innerWidth < 600) ? 50 : 80) && window.scrollY < elem.offsetTop + elem.offsetHeight - ((window.innerWidth < 600) ? 50 : 80)) {

        const header = document.querySelector("header");
        header.style.backgroundColor = elem.mainColor;
        header.querySelector(".logo").style.color = elem.subColor;
        header.querySelector(".bars").style.color = elem.subColor;
        header.querySelector(".cur-page").style.color = elem.subColor;
        return;
      }
    });
  }
});