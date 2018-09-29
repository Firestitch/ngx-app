import { Component } from '@angular/core';
import { FsAppService } from '../../../../src/services';


@Component({
  selector: 'component-class',
  templateUrl: 'component-class.component.html'
})
export class ComponentClassComponent {
 
  constructor(private appService: FsAppService) {}

  public ngOnInit() {
    this.appService.registerComponentBodyClass(this, 'body-component-class');
  }
}
