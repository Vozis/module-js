import("./main.scss");

import { items } from "./src/items.js";

const galleryRootElement = document.querySelector(".gallery__items");

const createElement = (el) => {
  console.log(el);
  const card = document.createElement("div");
  card.classList = "gallery__item item-gallery";

  const header = document.createElement("h3");
  header.classList = "item-gallery__header";
  header.textContent = el.title;

  const resource = document.createElement(el.type);
  resource.classList = "item-gallery__resource";
  resource.controls = true;
  resource.src = el.src;

  card.appendChild(resource);
  card.appendChild(header);

  return card;
};

items.map((item) => galleryRootElement.appendChild(createElement(item)));
