
class LoginForm extends AsyncForm {

  onSubmit(data) {
    User.login(data, (err,resp) => {
      if(resp && resp.user) {
        this.element.reset();
        App.setState('user-logged');
        App.getModal('login').close();
      } else 
      console.error(resp.error);
    })
  }
}