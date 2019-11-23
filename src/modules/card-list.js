export default class CardList {
  constructor(container, cards) {
    this.container = container;
    this.cards = cards;
    this.render();
  }

  addCard(card) {
    this.cards.push(card);
    this.render();
  }

  render() {
    this.cards.forEach(card => {
      this.container.appendChild(card.cardElement);
    });
  }
}
