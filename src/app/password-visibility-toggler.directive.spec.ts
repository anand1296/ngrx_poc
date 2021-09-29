import { ElementRef } from '@angular/core';
import { PasswordVisibilityTogglerDirective } from './password-visibility-toggler.directive';

describe('PasswordVisibilityTogglerDirective', () => {
  it('should create an instance', () => {
    let el: ElementRef;
    const directive = new PasswordVisibilityTogglerDirective(el);
    expect(directive).toBeTruthy();
  });
});
