import { Component } from '@angular/core';
import { PoMenuPanelItem } from '@po-ui/ng-components';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent {
  title: string = 'Customers';

  public readonly menuItems: Array<PoMenuPanelItem> = [
    {
      label: 'Emitente',
      link: '/dashboard',
      icon: 'po-icon po-icon-plus',
    },
    {
      label: 'Visualizar Emitente',
      link: '/login',
      icon: 'po-icon po-icon-document-double',
    },
  ];

  changeTitle(menu: PoMenuPanelItem) {
    
  }
}
