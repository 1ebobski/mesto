import Api from "./api.js";
import Popup from "./popup.js";
import CardList from "./card-list.js";
import Card from "./card.js";

const token = "6136c3c5-98cf-4695-a3ae-ec80520c6102";

const serverUrl =
  NODE_ENV === "development"
    ? "http://praktikum.tk/cohort4"
    : "https://praktikum.tk/cohort4";

const root = document.querySelector(".root");

const username = document.querySelector(".user-info__name");
const about = document.querySelector(".user-info__job");

const placesContainer = document.querySelector(".places-list");

const editButton = document.querySelector(".user-info__edit-button");
const addButton = document.querySelector(".user-info__add-button");

const userPhoto = document.querySelector(".user-info__photo");

const popup = new Popup(root);
addButton.addEventListener("click", function(event) {
  popup.renderPlaceForm(event);
});
editButton.addEventListener("click", function(event) {
  popup.renderProfileForm(event);
});

const api = new Api({
  baseUrl: serverUrl,
  headers: {
    authorization: token,
    "Content-Type": "application/json"
  }
});

let places;

let initialCards = api.getInitialCards().then(r => {
  places = new CardList(
    placesContainer,
    Object.values(r).map(card => new Card(card.name, card.link))
  );
});

export {
  token,
  serverUrl,
  root,
  username,
  about,
  placesContainer,
  userPhoto,
  popup,
  api,
  places,
  initialCards
};
