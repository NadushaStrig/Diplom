
class Sidebar {
 
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  
  static initToggleButton() {
    const tap = document.querySelector('.sidebar-toggle');
    const press= document.querySelector('.skin-blue');
    
    tap.addEventListener('click', () =>{
      if(press.classList.contains('sidebar-open') && press.classList.contains('sidebar-collapse')){
      press.classList.remove('sidebar-open')
      press.classList.remove('sidebar-collapse')
      return
      }
      press.classList.add('sidebar-open')
      press.classList.add('sidebar-collapse')
    })
  }

  static initAuthLinks() {
    document.querySelector('.menu-item_login > a').onclick = e => {
      e.preventDefault();
      App.getModal('login').open();
    };
    document.querySelector('.menu-item_register > a').onclick = e => {
      e.preventDefault();
      App.getModal('register').open();
    };
    document.querySelector('.menu-item_logout > a').onclick = e => {
      e.preventDefault();
      User.logout((err, resp) => {
        if (resp && resp.success) App.setState('init');
      });
    };
  }
}
  
