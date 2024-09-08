import { Component } from '@angular/core';
import { PoMenuItem, PoMenuPanelItem } from '@po-ui/ng-components';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent {
  menuItemSelected: string = '';

  menus: Array<PoMenuItem> = [
    {
      label: 'Emitente',
      action: this.printMenuAction.bind(this),
      link: '/emitente',
      icon: 'po-icon po-icon-document-filled',
      shortLabel: 'Emitente',
    },
    {
      label: 'Transportadora',
      action: this.printMenuAction.bind(this),
      link: '/login',
      icon: 'po-icon po-icon-truck',
      shortLabel: 'Transportadora',
    },
  ];

  constructor() {}

  printMenuAction(menu: PoMenuItem) {
    this.menuItemSelected = menu.label;
  }
}
