import { AfterContentChecked, Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[togglePasswordVisibility]'
})

export class PasswordVisibilityTogglerDirective implements AfterContentChecked{

  private _show = false;
  @Input() value: string;

  constructor(private element: ElementRef) { 
    console.log('inside PasswordVisibilityTogglerDirective');
    this.setup();
  }

  ngAfterContentChecked() {
    console.log(this.value);
  }

  setup(){
    const parent = this.element.nativeElement.parentNode;
    const span = document.createElement('span');
    span.style.whiteSpace = 'nowrap';
    span.style.cursor = 'pointer';
    span.innerHTML = 'Show password';
    if(this.value === undefined || this.value === ''){
      span.style.visibility = 'hidden';
    }
    else {
      span.style.visibility = 'visible';
    }
    span.addEventListener('click', (event) => {
      console.log('password visibility toggler clicked');
      console.log(this.value);
      this.toggle(span);
    });
    span.addEventListener('mouseenter', () => {
      span.style.fontWeight = 'bold';
    });
    span.addEventListener('mouseleave', () => {
      span.style.fontWeight = 'normal';
    })
    parent.appendChild(span);
  }

  toggle(span: HTMLElement){
    this._show = !this._show;
    if(this._show){
      this.element.nativeElement.setAttribute('type', 'text');
      span.innerHTML = 'Hide password';
    }
    else {
      this.element.nativeElement.setAttribute('type', 'password');
      span.innerHTML = 'Show password';
    }
  }
}
