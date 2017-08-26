import { EventEmitter, Injectable } from '@angular/core';

@Injectable()
export class NgxSpinnerController {
  public isPresent: boolean;
  public onStateChange: EventEmitter<boolean>;

  constructor() {
    this.isPresent = false;
    this.onStateChange = new EventEmitter<boolean>(true);
  }

  public show() {
    this.onStateChange.emit(true);
    this.isPresent = true;
  }

  public hide() {
    this.onStateChange.emit(false);
    this.isPresent = false;
  }
}
