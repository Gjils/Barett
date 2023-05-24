// Страница товара

class ItemPage {
	constructor(color, id, type, typeName, name, images, desc, price) {
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
		let imageWidth =
      window.innerWidth > 600 ? 400 : (window.innerWidth * 0.95 - 20) * 0.9;
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
			indicator.style.backgroundImage = `url("${image.ind}")`;
			indicator.addEventListener("click", () => {
				curPage = i;
				imageCarousel.style.right = `${imageWidth * i}px`;
				refreshArrows(i);
				refreshIndicators(i, color);
			});
			indicators.appendChild(indicator);

			const imageBlock = document.createElement("div");
			imageBlock.classList.add("image");
			imageBlock.style.backgroundImage = `url("${image.preview}")`;
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
					offsetInd = Math.min(
						(curPage - 1) * ((imageWidth / 4.5) * (7 / 6)),
						(pageQuant - 4) * ((imageWidth / 4.5) * (7 / 6)),
					);
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
class ItemCard {
	constructor(width, item, isCart) {
		this.color = item.color;
		this.width = width;
		this.id = item.id;
		this.type = item.type;
		this.typeName = item.typeName;
		this.name = item.name;
		this.images = item.images;
		this.desc = item.desc;
		this.price = item.price;
		this.isCart = isCart;
	}
	get compilled() {
		if (this.isCart) {
			return this.cart();
		}
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

	cart() {
		const card = document.createElement("a");
		card.classList.add("card");
		card.id = `${this.type}/${this.id}`;

		card.innerHTML = `
              <div class="picture"></div>
              <i class="fa-heart fa-regular colored"></i>
              <div class="desc">
                <div class="type colored">${this.typeName}</div>
                <h4 >${
	this.name.length > 25
		? this.name.slice(0, 25) + "..."
		: this.name
}</h4>
                <div class="bot">
                  <div class="quant">
                    <button class="delete">Удалить</button>
                  </div>
                  <div class="buy-info">
                    <div class="avaib">В наличии</div>
                    <div class="price">${this.price} <span>₽</span></div>
                  </div>
                </div>
              </div>`;
		this.colorize(card);
		card.querySelector(
			".picture",
		).style.backgroundImage = `url("${this.images[0].preview}")`;
		const rubSign = card.querySelector("span");
		rubSign.style.color = this.color;

		card.addEventListener("click", () => {
			const itemPage = new ItemPage(
				this.color,
				this.id,
				this.type,
				this.typeName,
				this.name,
				this.images,
				this.desc,
				this.price,
			);
			itemPage.loadItemPage();
		});
		return card;
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
	this.name.length > 20 ? this.name.slice(0, 20) + "..." : this.name
}</h4>
            <div class="bot">
              <div class="avaib">В наличии</div>
              <div class="price">${this.price} <span>₽</span></div>
            </div>
          </div>`;

		if (window.innerWidth < 600) {
			card.querySelector(
				".picture",
			).style.backgroundImage = `url("${this.images[0].mobCard}")`;
		} else {
			card.querySelector(
				".picture",
			).style.backgroundImage = `url("${this.images[0].pcCard}")`;
		}
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
			const itemPage = new ItemPage(
				this.color,
				this.id,
				this.type,
				this.typeName,
				this.name,
				this.images,
				this.desc,
				this.price,
			);
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
			".picture",
		).style.backgroundImage = `url("${this.images[0].preview}")`;
		card.addEventListener("click", () => {
			const itemPage = new ItemPage(
				this.color,
				this.id,
				this.type,
				this.typeName,
				this.name,
				this.images,
				this.desc,
				this.price,
			);
			itemPage.loadItemPage();
		});
		return card;
	}
}

export { ItemCard };
