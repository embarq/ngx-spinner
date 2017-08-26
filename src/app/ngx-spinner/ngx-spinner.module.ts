import {
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSpinnerComponent } from './ngx-spinner.component';
import { NgxSpinnerController } from './ngx-spinner.controller';

@NgModule({
  imports: [ CommonModule ],
  declarations: [ NgxSpinnerComponent ],
  exports: [ NgxSpinnerComponent ],
  providers: [ NgxSpinnerController ]
})
export class NgxSpinnerModule {
  constructor (@Optional() @SkipSelf() parentModule: NgxSpinnerModule) {
    if (parentModule) {
      throw new Error('NgxSpinnerModule is already loaded. Import it in the AppModule only');
    }
  }
}
