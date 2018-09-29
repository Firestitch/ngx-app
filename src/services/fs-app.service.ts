import { Injectable, RendererFactory2 } from '@angular/core';
import { ActivationEnd, ActivationStart, Router } from '@angular/router';
import { filter } from 'rxjs/operators/filter';


@Injectable()
export class FsAppService {
  public bodyClassListener;
  private componentBodyClasses = [];
  private _renderer;

  constructor(private _router: Router,
              rendererFactory: RendererFactory2) {
    this._renderer = rendererFactory.createRenderer(null, null);
  }

  get renderer() {
    return this._renderer;
  }

  set renderer(val) {
    this._renderer = val;
  }
  
  public destroy() {
    this.destroyBodyClassListener();
  }
  
  public init() {
    this.initBodyClassListener();
  }

  public addBodyClass(cls) {
    this._renderer.addClass(document.body, cls);
  }

  public registerComponentBodyClass(component, cls) {
    this.addBodyClass(cls);
    this.componentBodyClasses.push({ name: component.constructor.name, cls: cls });
  }

  public removeBodyClass(cls) {
    this.renderer.removeClass(document.body, cls);
  }

  public initBodyClassListener() {
    this.bodyClassListener = this._router
      .events
      .pipe(
        filter(event => event instanceof ActivationStart || event instanceof ActivationEnd)
      )
      .subscribe((event) => {
        if (event instanceof ActivationEnd) {
          const data = event.snapshot.routeConfig.data;
          if (data && data.bodyClass) {

            data.bodyClass.split(/[\s,]/).forEach((cls) => {
              this.addBodyClass(cls);
            });
          }
        } else if (event instanceof ActivationStart) {
          
          let componentBodyClasses = [];
          this.componentBodyClasses.forEach(item => {
            if (this.hasRouteComponent(item.name, event.snapshot)) {
              componentBodyClasses.push(item.cls);
            }
          });

          document.body.className.split(' ').forEach((name) => {
            if (name.match(/^body-/) && componentBodyClasses.indexOf(name)<0) {
              this.removeBodyClass(name);
            }
          });
        }

      });
  }

  private hasRouteComponent(name, snapshot) {
    if (snapshot.component && snapshot.component.name === name) {
      return true;
    }

    if (snapshot.parent) {
      return this.hasRouteComponent(name, snapshot.parent);
    }

    return false;
  }

  public destroyBodyClassListener() {
    if (this.bodyClassListener) {
      this.bodyClassListener.unsubscribe();
    }
  }
}
