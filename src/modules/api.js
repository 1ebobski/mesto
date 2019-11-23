import { username, about, userPhoto } from "./variables";

export default class Api {
  constructor(options) {
    this.options = options;
  }

  getProfile() {
    fetch(this.options.baseUrl + "/users/me", {
      headers: this.options.headers
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then(result => {
        username.textContent = result.name;
        about.textContent = result.about;
        userPhoto.style.backgroundImage = `url(${result.avatar})`;
      })
      .catch(err => console.log(err));
  }

  sendProfile(popup) {
    fetch(this.options.baseUrl + "/users/me", {
      method: "PATCH",
      headers: this.options.headers,
      body: JSON.stringify({
        name: popup.firstInput.value,
        about: popup.secondInput.value
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then(result => {
        username.textContent = result.name;
        about.textContent = result.about;
        userPhoto.style.backgroundImage = `url(${result.avatar})`;
      })
      .catch(err => console.log(err));
  }

  getInitialCards() {
    return fetch(this.options.baseUrl + "/cards", {
      headers: this.options.headers
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })

      .catch(err => console.log(err));
  }
}
