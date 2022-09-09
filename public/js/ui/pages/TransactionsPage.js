
class TransactionsPage  {

  constructor( element ) {
    this.element = element;
    this.registerEvents();
    
    if(element === undefined) {
       throw new Error('Элемент не существует');
    }
  }  

  update() {
      this.render(this.lastOptions);
  }

  registerEvents() {
    this.element.addEventListener('click', (e) => {
      if(e.target.closest('.transaction__remove')){
       return this.removeTransaction(e.target.closest('.transaction__remove').dataset.id);
      }
      if(e.target.closest('.remove-account')){
        this.removeAccount();
      } 
    });  
  }

  removeAccount() {
    if (this.lastOptions === undefined) {
      return;
    }
    if(confirm('Вы действительно хотите удалить счёт?')){
      Account.remove({ id: this.lastOptions.account_id }, (err, resp) => {
        if (resp && resp.success) {
          App.updateWidgets();
          App.updateForms();
          this.clear();
        }
      });  
    }
  }

  removeTransaction( id ) {
    if(confirm('Вы действительно хотите удалить транзакцию?')) {
        Transaction.remove({id},(err,resp) => {
            if(resp && resp.success) {
                App.update();
            }
         })
      };
  }

  render(options){
    if(options) {
        this.lastOptions = options;
  
    Account.get(options.account_id, (err, resp) => {        
      if(resp) {
        this.renderTitle(resp.data.name); 
          }       
    }) 

    Transaction.list(options,(err, resp) => {               
      if(resp) {
        this.renderTransactions(resp.data);
          }
      })
    }
  }

  
  clear() {
    this.renderTransactions([]);
    this.renderTitle('Название счёта');
    this.lastOptions = null;
  }

  renderTitle(name){
    document.querySelector('.content-title').textContent = name;
  }

  formatDate(date){
      let now = new Date(date);
      let format = {day: 'numeric', month: 'long', year: 'numeric'};
      let time = {hour: 'numeric', minute: 'numeric'};
      return `${now.toLocaleString("ru", format)}  в ${now.toLocaleString("ru", time)}`
  }
  getTransactionHTML(item){
   if(item) {
    let transactionType;
    if(item.type == 'income') {
        transactionType = 'transaction_income';
      }
    if(item.type == 'expense') {
      transactionType = 'transaction_expense';
      }

    return `<div class="transaction ${transactionType} row" style="display: flex;justify-content: space-between">
                <div class="col-md-7 transaction__details">
                    <div class="transaction__icon">
                        <span class="fa fa-money fa-2x"></span>
                    </div>
                
                    <div class="transaction__info">
                        <h4 class="transaction__title">${item.name}</h4>
                        <!-- дата -->
                        <div class="transaction__date">${this.formatDate(item.created_at)}</div>
                    </div>
                </div>

                <div class="col-md-3">
                    <div class="transaction__summ">
                    <!--  сумма -->
                    ${item.sum} <strike>P</strike>    
                    </div>
                </div>

                <div class="col-md-2 transaction__controls">
                    <!-- в data-id нужно поместить id -->
                    <button class="btn btn-danger transaction__remove" data-id=${item.id}>
                      <i class="fa fa-trash"></i>  
                    </button>
                </div>
            </div>`   
      }
  }

  renderTransactions(data){
    const con = this.element.querySelector('.content');
    con.innerHTML = '';
    for (let item of data) {
      con.innerHTML += this.getTransactionHTML(item);
    }
  }
}