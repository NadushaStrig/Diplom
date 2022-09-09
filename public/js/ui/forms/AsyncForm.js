
class AsyncForm {

  constructor(element) {
    this.element = element;
    this.registerEvents();

   if(element === undefined) {
      throw new Error('Элемент не существует');
   }
  }
  
  registerEvents() {
    this.element.onsubmit = e => {
      e.preventDefault();
      this.submit();
      }
  }

  getData() {
    const formData = new FormData(this.element);
    return Object.fromEntries(formData.entries());
  }
  onSubmit(options){      
  }
  submit() {
    this.onSubmit(this.getData());
  }
}