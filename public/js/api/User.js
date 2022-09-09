
class User {
 
  static setCurrent(user) {
    localStorage.setItem('user', JSON.stringify(user));
  }

 
  static unsetCurrent() {
    localStorage.removeItem('user');
    localStorage.removeItem('lastOptions');
  }

  
  static current() {
    const user = localStorage.getItem('user');
    return user? JSON.parse(user):user;
  }

 
  static fetch(callback) {
    createRequest ({
      url: this.URL +'/current',
      method: 'GET',
      callback: (err, resp) => {
        if (resp && resp.user) {
          this.setCurrent(resp.user);
        }else{
          alert(err.error);
          this.unsetCurrent();
        }
          callback(err, resp);
      }
    })
  }

  
  static login(data, callback) {
    createRequest({
      url: this.URL + '/login',
      method: 'POST',
      responseType: 'json',
      data,
      callback: (err, resp) => {
        if (resp && resp.user) {
          this.setCurrent(resp.user);
        }
        callback(err, resp);
      }
    });
  }

 
  static register(data, callback) {
    createRequest({
      url: this.URL + '/register',
      method: 'POST',
      data,
      callback: (err, resp) => {
        if (resp && resp.user) {
          this.setCurrent(resp.user);
        } else {
          alert(err.error); 
        }
        callback(err, resp);
      }
    });
  }


  static logout(callback) {
    createRequest({
      url: this.URL + '/logout',
      method: 'POST',
      callback: (err, resp) => {
        if (resp) {        
          this.unsetCurrent();
        }else err;
        callback(err, resp);
      }
    });
  }
}
User.URL = '/user';