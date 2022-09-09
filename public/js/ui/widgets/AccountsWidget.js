

class AccountsWidget {

  constructor( element ) {
    this.element = element;
    this.registerEvents();
    this.update();

    if(element === undefined) {
       throw new Error('Элемент не существует');
    }
    
  }

  registerEvents() {
    this.element.addEventListener('click', e => {
      e.preventDefault();
      e.target.classList.contains('create-account') ? App.getModal('createAccount').open() : this.onSelectAccount(e.target.closest('.account'));
    });
  }

 
  update() {
    if(User.current()) {
      Account.list(null,(err, resp) => {
        if (resp && resp.success) {
          this.clear();
          resp.data.forEach(a => this.renderItem(a));
        }
      })
    }
  }

  clear() {
    this.element.querySelectorAll('.account').forEach(e => e.remove())
  }

  onSelectAccount( element ) {
    this.element.querySelector('.active') ? this.element.querySelector('.active').classList.remove('active') : ''
    element.closest('.account').classList.add('active')
  
    App.showPage('transactions', { account_id: element.dataset.id} );
  }
  

  getAccountHTML(item){
    return ` <li class="account" data-id=${item.id}>
                <a href="#">
                  <span>${item.name}</span> /
                  <span>${item.sum}</span>
                </a>
              </li>`
  }

  renderItem(data){
    this.element.insertAdjacentHTML('beforeend', this.getAccountHTML(data))
  }
}
