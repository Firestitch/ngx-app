import { Component } from '@angular/core';
import { FsAppService } from '../../../../src/services';

@Component({
  selector: 'example',
  templateUrl: 'example.component.html'
})
export class ExampleComponent {

  public constructor(private appService: FsAppService) {}

  public tabs = [
    { path: '/body/page1', label: 'Page Without Class' },
    { path: '/body/page2', label: 'Page With Class' }
  ];

  public addClass() {
    this.appService.addBodyClass('body-from-button-click');
  }
}
