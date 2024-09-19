export default class Category {
  static categories = [
    "following",
    "trending",
    "artificial-intelligence",
    "hollywood-happen",
    "horoscope",
  ];

  // static getByPk(id) {
  //   return this.categories.find((c) => c.id == id);
  // }

  static getAll() {
    return this.categories;
  }
}
