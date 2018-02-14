/**
 *
 *
 * @class MockLocalStorage
 */
class MockLocalStorage {
  /**
 * Creates an instance of MockLocalStorage.
 * @memberof MockLocalStorage
 */
  constructor() {
    this.data = {};
  }
  /**
   * @returns {null} null
   *
   * @memberof MockLocalStorage
   */
  clear() {
    this.data = {};
  }
  /**
   *
   *
   * @param {any} item
   * @returns {string} data item
   * @memberof MockLocalStorage
   */
  getItem(item) {
    return this.data[item] || null;
  }
  /**
   *
   * @returns {null} null
   * @param {string} item
   * @param {string} value
   * @memberof MockLocalStorage
   */
  setItem(item, value) {
    this.data[item] = value.toString();
  }
  /**
   *
   * @returns {null} null
   * @param {any} item
   * @memberof MockLocalStorage
   */
  removeItem(item) {
    delete this.data[item];
  }
}

global.localStorage = new MockLocalStorage();
