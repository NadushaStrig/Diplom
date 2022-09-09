

class UserWidget {

  constructor(element){
    this.element = element; 
   if(element === undefined) {
      throw new Error('Элемент не существует');
   }
  }
  
  update(){
    document.querySelector('.user-name').textContent = User.current().name;
  }
}
