
class Account extends Entity {
  static get(id = '', callback) {
    createRequest ({
      url: this.URL + '/' + id,
      method: 'GET',
      callback
    })
  }
}
Account.URL = '/account';