import Card from "./card.js";
import { api, places, username, about } from "./variables.js";

export default class Popup {
  constructor(container) {
    this.container = container;
    this.popupElement = this.create();
    this.render();

    this.title = this.popupElement.querySelector(".popup__title");
    this.firstInput = this.popupElement.querySelector("input:first-of-type");
    this.secondInput = this.popupElement.querySelector("input:nth-of-type(2)");
    this.button = this.popupElement.querySelector("button");

    this.popupElement
      .querySelector(".popup__form")
      .addEventListener("input", this.inputHandler);

    this.popupElement
      .querySelector(".popup__close")
      .addEventListener("click", this.close);
  }

  open(event) {
    event.preventDefault();
    this.popupElement.classList.add("popup_is-opened");
  }

  close = event => {
    event.preventDefault();
    event.target.closest(".popup").classList.remove("popup_is-opened");
  };

  renderPlaceForm = event => {
    event.preventDefault();
    this.title.textContent = "Новое место";

    this.firstInput.name = "placename";
    this.firstInput.value = "";
    this.firstInput.placeholder = "Название";

    this.secondInput.name = "link";
    this.secondInput.value = "";
    this.secondInput.placeholder = "Ссылка на картинку";

    this.button.textContent = "+";
    this.button.classList.remove("popup__button_edit");
    this.button.classList.add("popup__button_add");

    this.button.addEventListener("click", this.saveCard);

    this.open(event);
  };

  saveCard = event => {
    event.preventDefault();

    const name = this.firstInput.value;
    const link = this.secondInput.value;

    places.addCard(new Card(name, link));

    this.button.removeEventListener("click", this.saveCard);

    this.close(event);
  };

  renderProfileForm(event) {
    this.title.textContent = "Редактировать профиль";

    api.getProfile();

    this.firstInput.name = "username";
    this.firstInput.value = username.textContent;
    this.firstInput.placeholder = "Имя";

    this.secondInput.name = "about";
    this.secondInput.value = about.textContent;
    this.secondInput.placeholder = "О себе";

    this.button.textContent = "Сохранить";
    this.button.classList.remove("popup__button_add");
    this.button.classList.add("popup__button_edit");

    this.button.addEventListener("click", this.saveProfile);

    this.open(event);
  }

  saveProfile = event => {
    event.preventDefault();

    api.sendProfile(this);

    this.button.removeEventListener("click", this.saveProfile);

    this.close(event);
  };

  create() {
    const popup = document.createElement("div");

    popup.classList.add("popup");
    popup.innerHTML = `<div class="popup__content">
      <img
        src="./images/close.svg"
        alt=""
        class="popup__close"
      />
      <h3 class="popup__title"></h3>
      <form class="popup__form" name="form">
        <p class="popup__validator popup__validator_first"></p>
        <p class="popup__validator popup__validator_second"></p>
        <input class="popup__input popup__input_first">
        <input class="popup__input popup__input_second">
      </form>
      <button class="button popup__button popup__button_disabled">
    </div>`;

    return popup;
  }

  inputHandler = event => {
    event.preventDefault();

    const firstContent = this.firstInput.value;
    const secondContent = this.secondInput.value;

    const firstWarning = this.popupElement.querySelector(
      ".popup__validator_first"
    );
    const secondWarning = this.popupElement.querySelector(
      ".popup__validator_second"
    );

    const requiredField = "Это обязательное поле";
    const wrongLength = "Должно быть от 2 до 30 символов";
    const linkRequired = "Здесь должна быть ссылка";
    const emptyString = "";

    // Проверка текста
    function validateText(str) {
      if (str.length === 0) {
        return requiredField;
      } else if (str.length < 2 || str.length > 30) {
        return wrongLength;
      } else {
        return emptyString;
      }
    }

    // Проверка ссылки
    function validateLink(str) {
      if (str.length === 0) {
        return requiredField;
      } else {
        const pattern = new RegExp(
          "^(https?:\\/\\/)?" + // protocol
          "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
          "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
          "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
          "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
            "(\\#[-a-z\\d_]*)?$",
          "i"
        ); // fragment locator
        return !!pattern.test(str) ? emptyString : linkRequired;
      }
    }
    // Разные проверки для формы добавления места и формы с информацией о пользователе
    firstWarning.textContent = validateText(firstContent);
    if (this.secondInput.name === "link")
      secondWarning.textContent = validateLink(secondContent);
    else secondWarning.textContent = validateText(secondContent);

    // Активация кнопки если провалидированы все формы
    if (
      firstWarning.textContent === emptyString &&
      secondWarning.textContent === emptyString
    ) {
      this.button.removeAttribute("disabled");
      this.button.classList.remove("popup__button_disabled");
    } else {
      this.button.setAttribute("disabled", true);
      this.button.classList.add("popup__button_disabled");
    }
  };

  render() {
    this.container.appendChild(this.popupElement);
  }
}
