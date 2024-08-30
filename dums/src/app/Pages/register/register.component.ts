import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  public mask: string = '999.999.999-99';

  onInputChange(event: any) {
    if (event.length > 10) {
      this.mask = '99.999.999/9999-99';
    } else {
      this.mask = '999.999.999-99';
    }
  }
}
