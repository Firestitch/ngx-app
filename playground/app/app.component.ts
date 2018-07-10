import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { FsAppService } from '../../src/services';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(private _renderer: Renderer2, private _appService: FsAppService) {
  }

  public ngOnInit() {
    this._appService.renderer = this._renderer;
    this._appService.initBodyClassListener();
  }

  public ngOnDestroy() {
    this._appService.destroyBodyClassListener();
  }
}
