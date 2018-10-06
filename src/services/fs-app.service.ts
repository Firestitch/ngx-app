import { Injectable, RendererFactory2 } from '@angular/core';
import {
  ActivatedRoute,
  NavigationStart,
  NavigationEnd,
  Router, NavigationCancel
} from '@angular/router';
import { filter } from 'rxjs/operators/filter';


@Injectable()
export class FsAppService {
  public bodyClassListener;

  private componentBodyClasses = [];
  private _renderer;
  private _prevRoute = null;

  constructor(
    public rendererFactory: RendererFactory2,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {
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
        filter(event => event instanceof NavigationStart || event instanceof NavigationEnd)
      )
      .subscribe((event: NavigationStart | NavigationEnd) => {

        if (event instanceof NavigationStart) {
          this._prevRoute = this._activatedRoute;
        } else if (event instanceof NavigationEnd) {
          this.cleanUpRoute(this._activatedRoute);
          this.applyActivatedRoute();
        }
      });
  }

  public destroyBodyClassListener() {
    if (this.bodyClassListener) {
      this.bodyClassListener.unsubscribe();
    }
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

  private cleanUpRoute(route) {
    const snapshot = route.firstChild && route.firstChild.snapshot;

    const componentBodyClasses = [];

    this.componentBodyClasses.forEach(item => {
      if (this.hasRouteComponent(item.name, snapshot)) {
        componentBodyClasses.push(item.cls);
      }
    });

    document.body.className.split(' ').forEach((name) => {
      if (name.match(/^body-/) && componentBodyClasses.indexOf(name) < 0) {
        this.removeBodyClass(name);
      }
    });
  }

  private applyActivatedRoute() {
    const data = this._activatedRoute.firstChild && this._activatedRoute.firstChild.snapshot.data;

    if (data && data.bodyClass) {

      data.bodyClass.split(/[\s,]/).forEach((cls) => {
        this.addBodyClass(cls);
      });
    }
  }
}
