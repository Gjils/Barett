import { ItemCard } from "./items.js";

fetch("data/items.json")
	.then((res) => {
		return res.json();
	})
	.then((res) => {
		function addToScreen() {
			const wrap = document.querySelector(".items .container .wrap");
			const items = [res["electric"][1], res["ench"][3], res["ench"][13]];
			items.forEach((item) => {
				wrap.appendChild(new ItemCard(1, item, true).compilled);
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