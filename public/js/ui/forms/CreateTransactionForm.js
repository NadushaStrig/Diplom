
class CreateTransactionForm extends AsyncForm {
  constructor(element) {
    super(element);
    this.renderAccountsList();
  }
  renderAccountsList() {   
    const acc = this.element.querySelector('.accounts-select');
    Account.list(User.current(), (err, resp) => {
      if (resp && resp.data) {
        acc.innerHTML = '';
        resp.data.forEach(item =>{
          acc.innerHTML += `<option value="${item.id}">${item.name}</option>`;
        })
      }
    })
  }
  onSubmit(data) {
    Transaction.create(data, (error, resp) => {
      if (resp && resp.success) {
        this.element.reset();  
        App.getModal('newIncome').close();
        App.getModal('newExpense').close();
        App.update();  
      }
    });
  }
}