import {root} from './variables.js'

export default class Card {
  constructor(name, link) {
    this.cardElement = this.create(name, link);
    this.cardElement
      .querySelector(".place-card__like-icon")
      .addEventListener("click", this.like);
    this.cardElement
      .querySelector(".place-card__delete-icon")
      .addEventListener("click", this.remove);
    this.cardElement.addEventListener("click", this.openImage);
  }

  create(name, link) {
    const card = document.createElement("div");
    card.classList.add("place-card");
    card.innerHTML = `
    <div class="place-card__image">
      <button class="place-card__delete-icon"></button>
    </div>
    <div class="place-card__description">
      <h3 class="place-card__name"></h3>
      <button class="place-card__like-icon"></button>
    </div>`;
    card.querySelector(".place-card__name").textContent = name;
    card.querySelector(
      ".place-card__image"
    ).style.backgroundImage = `url(${link})`;

    return card;
  }

  remove(event) {
    event.preventDefault();
    const targetCard = event.target.closest(".place-card");
    targetCard.parentNode.removeChild(targetCard);
  }

  like(event) {
    event.preventDefault();
    event.target.classList.toggle("place-card__like-icon_liked");
  }

  openImage = event => {
    event.preventDefault();

    if (
      event.target.classList.contains("place-card__image") &&
      !event.target.classList.contains("place-card__delete-icon")
    ) {
      const imageLink = event.target.style.backgroundImage
        .slice(4, -1)
        .replace(/"/g, "");
      const overlay = document.createElement("div");

      overlay.classList.add("overlay");
      overlay.innerHTML = `
        <div class="overlay__content">
          <img src="./images/close.svg" alt="" class="overlay__close" />
          <img class="overlay__image" alt="Красивая картинка" />
        </div>
      `;
      overlay.querySelector(".overlay__image").src = imageLink;
      root.appendChild(overlay);

      const closeOverlay = overlay.querySelector(".overlay__close");
      closeOverlay.addEventListener("click", closeImage);

      function closeImage(event) {
        event.preventDefault();
        event.target.closest(".root").removeChild(overlay);
        event.target.removeEventListener("click", closeImage);
      }
    }
  };
}
