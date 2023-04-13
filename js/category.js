import { ItemCard } from "./items.js";

fetch("data/items.json")
  .then((res) => {
    return res.json();
  })
  .then((res) => {
    function addToScreen() {
      const wrap = document.querySelector(".items .wrap");
      const curCategory = document.querySelector(".items").id;
      wrap.innerHTML = "";
      const items = res[curCategory];
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
