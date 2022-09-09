
class RegisterForm extends AsyncForm {
  
  onSubmit(data) {

    User.register(data, (err,resp) => {
      if(resp && resp.user) {
        this.element.reset();
        App.setState('user-logged');
        App.getModal('register').close();
        UserWidget.update(); 
      } else {
        this.element.reset();
        App.getModal('register').close();
      }
    })
  }
}

