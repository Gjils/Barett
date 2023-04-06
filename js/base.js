function showMenu() {
  const htmlElem = document.querySelector("html");
  htmlElem.classList.add("on-background");

  const menuWrap = document.querySelector(".menu-wrap");
  menuWrap.classList.remove("full-hid");
  menu = menuWrap.querySelector(".menu");
  setTimeout(() => {
    menu.style.right = "0px";
  }, 0);
  menu.addEventListener("click", (e) => {
    e.stopPropagation();
  });
  menu.querySelector(".fa-xmark").addEventListener("click", () => {
    htmlElem.classList.remove("on-background");
    menuWrap.classList.add("full-hid");
    menu.style.right = null;
  });
  menuWrap.addEventListener("click", () => {
    htmlElem.classList.remove("on-background");
    menuWrap.classList.add("full-hid");
    menu.style.right = null;
  });
}

document.querySelector("header .bars").addEventListener("click", () => {
  showMenu();
});
