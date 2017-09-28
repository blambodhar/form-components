import FormComponent from '../../form-component';

export class TextField extends FormComponent {
  constructor(context, options) {
    super(
      context,
      context.querySelector('.text-field__input'),
      options
    );
    super.init();
    this.initEvents();
    console.debug('Text field initialized');
  }

  initEvents() {
    this.field.addEventListener('focus', () => this.setIsFilledIn(true));
    this.field.addEventListener('blur', () => this.setIsFilledIn());
    this.field.addEventListener('input', () => {
      // Don't just call setIsFilledIn() for the case where you've removed
      // the text field value but are still focusing the text field
      this.setIsFilledIn(
        this.field.value || this.field === document.activeElement
      );
    });
  }
}

export const selector = '[class^="text-field--"]';
