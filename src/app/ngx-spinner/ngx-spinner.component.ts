import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

import { NgxSpinnerController } from './ngx-spinner.controller';

export function slideAnimationFactory() {
  return trigger('slideInOut', [
    state('show', style({
      transform: 'translateY(0%)',
      bottom: '0px'
    })),
    state('hide', style({
      transform: 'translateY(100%)',
      bottom: '-5px'
    })),
    transition('show => hide', animate('200ms ease-in-out')),
    transition('hide => show', animate('200ms ease-in-out'))
  ]);
}

@Component({
  selector: 'ngx-spinner',
  animations: [ slideAnimationFactory() ],
  template: `
    <div
      [ngClass]="stateChange"
      [@slideInOut]="mode"
      class="ngx-loader-container">
      <span class="ngx-loader"></span>
      <span class="ngx-loader-title">Loading</span>
    </div>
  `,
  styles: [
    `
      .ngx-loader-container {
        position: fixed;
        bottom: 0;
        right: 1%;
        background-color: rgba(0, 0, 0, 0.75);
        vertical-align: middle;
        padding: 8px 16px;
        z-index: 9999;
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
        box-shadow: 0 0 4px #555;
        user-select: none;
      }
      .ngx-loader-container .ngx-loader-title {
        color: #fff;
      }
      .ngx-loader-container .ngx-loader {
        width: 20px;
        height: 20px;
        display: inline-block;
        vertical-align: middle;
        z-index: 9999;
        margin-right: 4px;
        background-image: url("/assets/loader.svg");
        background-repeat: no-repeat;
        background-size: cover;
      }
      @media screen and (max-width: 430px) {
        .ngx-loader-container {
          right: 0;
          left: 0;
          border-radius: 0;
          background-color: #222;
          text-align: center;
        }
      }
    `
  ]
})
export class NgxSpinnerComponent implements OnInit {
  public get stateChange() {
    return {
      'ngx-loader-state-show': this.mode === 'show',
      'ngx-loader-state-hide': this.mode === 'hide'
    }
  }

  public mode: 'show' | 'hide';

  constructor(private progress: NgxSpinnerController) { }

  private handleStateChange(state: boolean) {
    return state ? this.show() : this.hide();
  }

  public ngOnInit() {
    this.mode = 'hide';
    this.progress.onStateChange.subscribe(state =>
      this.handleStateChange(state));
  }

  public show() {
    this.mode = 'show';
  }

  public hide() {
    this.mode = 'hide';
  }
}
