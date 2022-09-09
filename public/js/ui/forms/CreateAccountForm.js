
class CreateAccountForm extends AsyncForm {
 
  onSubmit(data) {
    Account.create(data, (err, resp) => {
      if (resp && resp.success) {
      App.update();
      }
      App.getModal('createAccount').close();
      this.element.reset();
    })
  }
}
