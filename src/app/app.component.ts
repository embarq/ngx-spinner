import { Component } from '@angular/core';
import { NgxSpinnerController } from './ngx-spinner/ngx-spinner.controller';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent {
  constructor(private spinner: NgxSpinnerController) {
    // code...
  }

  public toggleSpinner() {
    this.spinner.isPresent ? this.spinner.hide() : this.spinner.show();
  }
}
