
class Modal {
 
  constructor(element){
    this.element = element;
    this.registerEvents();

   if(element === undefined) {
      throw new Error('Элемент не существует');   
   }
  }

  registerEvents() {
   this.element.querySelectorAll('[data-dismiss="modal"]').forEach(element => {
      element.onclick = e => {
      this.onClose(e);
      }
    });
  }
  
  onClose(e) {
    e.preventDefault();
    this.close();
  }

  open() {
    this.element.style.display = 'block';           
  }

  close(){
    this.element.style.display = 'none';  
    
  }
}