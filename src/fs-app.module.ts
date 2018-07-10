import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FsAppService } from './services';


@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
  ],
  entryComponents: [
  ],
  declarations: [
  ],
  providers: [
    // FsComponentService,
  ],
})
export class FsAppModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FsAppModule,
      providers: [FsAppService]
    };
  }
}
