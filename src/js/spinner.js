export default class Spinner {
  constructor() {
    this.spinner = document.querySelector('.spinner');
  }
  hideSpinner() {
    
    this.spinner.classList.add('visually-hidden');
  }
  showSpinner() {
    this.spinner.classList.remove('visually-hidden');
  }
}