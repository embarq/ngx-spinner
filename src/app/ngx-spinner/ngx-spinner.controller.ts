import { EventEmitter, Optional, Injectable } from '@angular/core';

export type NgxSpinnerPosition
  = 'bottom-left'
  | 'bottom-center'
  | 'bottom-right'
  | 'top-left'
  | 'top-center'
  | 'top-right';

export class NgxSpinnerOptions {
  constructor(
    public readonly position: NgxSpinnerPosition = 'top-right'
  ) { }
}

export interface NgxSpinnerStateChange {
  present: boolean;
  options?: NgxSpinnerOptions;
}

@Injectable()
export class NgxSpinnerController {
  public isPresent: boolean;
  public onStateChange: EventEmitter<NgxSpinnerStateChange>;
  public position: NgxSpinnerPosition;

  constructor(@Optional() config: NgxSpinnerOptions) {
    if (typeof config !== 'undefined' && config != null) {
      this.position = config.position || 'top-right';
    } else {
      this.position = 'top-right';
    }

    this.isPresent = false;
    this.onStateChange = new EventEmitter<NgxSpinnerStateChange>(true);
  }

  public show(options?: NgxSpinnerOptions) {
    this.onStateChange.emit({
      present: true,
      options
    });
    this.isPresent = true;
  }

  public hide() {
    this.onStateChange.emit({ present: false });
    this.isPresent = false;
  }
}
