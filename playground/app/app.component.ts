import { Component, OnDestroy, OnInit } from '@angular/core';
import { FsAppService } from '../../src/services';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {
  
  constructor(private _appService: FsAppService) {}

  public ngOnInit() {
    this._appService.init();
  }

  public ngOnDestroy() {
    this._appService.destroy();
  }
}
