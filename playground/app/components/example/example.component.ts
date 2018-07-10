import { Component } from '@angular/core';

@Component({
  selector: 'example',
  templateUrl: 'example.component.html'
})
export class ExampleComponent {
  public tabs = [
    { path: '/body/page1', label: 'Page Without Class' },
    { path: '/body/page2', label: 'Page With Class' }
  ];
}
