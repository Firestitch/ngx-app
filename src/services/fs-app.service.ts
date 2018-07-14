import { Injectable, Renderer2 } from '@angular/core';
import { ActivationEnd, ActivationStart, Router } from '@angular/router';
import { filter } from 'rxjs/operators';


@Injectable()
export class FsAppService {
  public bodyClassListener;

  private _renderer: Renderer2;

  constructor(private _router: Router) {
  }

  get renderer() {
    return this._renderer;
  }

  set renderer(val) {
    this._renderer = val;
  }

  public initBodyClassListener() {
    this.bodyClassListener = this._router
      .events
      .pipe(
        filter(event => event instanceof ActivationStart || event instanceof ActivationEnd)
      )
      .subscribe((event: ActivationEnd) => {
        if (event instanceof ActivationEnd) {
          const data = event.snapshot.routeConfig.data;
          if (data && data.bodyClass) {

            data.bodyClass.split(' ').forEach((cls) => {
              this._renderer.addClass(document.body, cls);
            });
          }
        } else if (event instanceof ActivationStart) {
          document.body.className.split(' ').forEach((name) => {
            if (name.match(/^body-/)) {
              this.renderer.removeClass(document.body, name);
            }
          });
        }

      });
  }

  public destroyBodyClassListener() {
    if (this.bodyClassListener) {
      this.bodyClassListener.unsubscribe();
    }
  }
}
