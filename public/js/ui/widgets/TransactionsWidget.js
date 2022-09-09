

class TransactionsWidget {

  constructor( element ) {
    this.element = element;
    this.registerEvents();
  }
    
   
  registerEvents() {
    this.element.addEventListener('click', e => {
      e.preventDefault();
      e.target.classList.contains('create-income-button') ? App.getModal('newIncome').open() : App.getModal('newExpense').open();
    });
  }
}

