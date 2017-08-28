import { Component, Input, OnInit } from '@angular/core';
import { trigger } from '@angular/animations';

import {
  NgxSpinnerController,
  NgxSpinnerOptions,
  NgxSpinnerPosition,
  NgxSpinnerStateChange
} from './ngx-spinner.controller';

import { spinnerAnimationTrigger, buildState } from './ngx-spinner.animation';

@Component({
  selector: 'ngx-spinner',
  animations: [ trigger('spinnerAnimation', spinnerAnimationTrigger) ],
  template: `
    <div
      [attr.data-mode]="mode"
      [@spinnerAnimation]="mode"
      class="ngx-loader-container">

      <span class="ngx-loader"></span>
      <span class="ngx-loader-title">Loading</span>

    </div>
  `,
  styleUrls: [ './ngx-spinner.component.css' ]
})
export class NgxSpinnerComponent implements OnInit {
  public position: NgxSpinnerPosition;
  public mode: string;

  constructor(private controller: NgxSpinnerController) {
    this.position = controller.position;
  }

  private handleStateChange(state: NgxSpinnerStateChange) {
    return state.present ? this.show(state.options) : this.hide();
  }

  public ngOnInit() {
    this.mode = buildState(false, this.position);
    this.controller.onStateChange.subscribe(state =>
      this.handleStateChange(state));
  }

  public show(options: NgxSpinnerOptions) {
    if (options != null) {
      this.position = options.position || this.controller.position;
    }
    this.mode = buildState(true, this.position);
  }

  public hide() {
    this.mode = buildState(false, this.position);
  }
}
