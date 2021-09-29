import { AfterContentChecked, Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[togglePasswordVisibility]'
})

export class PasswordVisibilityTogglerDirective implements AfterContentChecked{

  private _show = false;
  @Input() value: string;

  parent = this.element.nativeElement.parentNode;
  span = document.createElement('span');

  constructor(private element: ElementRef) { 
    console.log('inside PasswordVisibilityTogglerDirective');
    this.setup();
  }

  ngAfterContentChecked() {
    console.log(this.value);
    if(this.value === undefined || this.value.length === 0){
      console.log('---------if---------');
      this.span.style.visibility = 'hidden';
    }
    else {
      console.log('---------else---------');
      this.span.style.visibility = 'visible';
    }
  }

  setup(){
    
    this.span.style.whiteSpace = 'nowrap';
    this.span.style.cursor = 'pointer';
    this.span.style.display = 'flex';
    this.span.style.alignItems = 'center';
    this.span.innerHTML = 'Show password';
    this.span.style.padding = '0.7em';
    this.span.style.fontSize = '0.8em';
    this.span.style.position = 'absolute';
    this.span.style.left = '62%';
    // console.log(this.value);
    this.span.addEventListener('click', (event) => {
      console.log('password visibility toggler clicked');
      console.log(this.value);
      this.toggle(this.span);
    });
    this.span.addEventListener('mouseenter', () => {
      // this.span.style.fontWeight = 'bold';
      this.span.style.textDecoration = 'underline'
      this.span.style.fontSize = '0.85em';
    });
    this.span.addEventListener('mouseleave', () => {
      // this.span.style.fontWeight = 'normal';
      this.span.style.textDecoration = 'none';
      this.span.style.fontSize = '0.8em';

    })
    this.parent.appendChild(this.span);
  }

  toggle(span: HTMLElement){
    this._show = !this._show;
    if(this._show && this.value.length !== 0){
      this.element.nativeElement.setAttribute('type', 'text');
      span.innerHTML = 'Hide password';
    }
    else {
      this.element.nativeElement.setAttribute('type', 'password');
      span.innerHTML = 'Show password';
    }
  }
}
