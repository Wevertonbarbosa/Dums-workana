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
      icon: 'ph ph-user',
      shortLabel: 'Emitente',
    },
    {
      label: 'Timekeeping',
      action: this.printMenuAction.bind(this),
      icon: 'ph ph-clock',
      shortLabel: 'Timekeeping',
      // badge: { value: 1 },
    },
    
  ];

  constructor() {}

  printMenuAction(menu: PoMenuItem) {
    this.menuItemSelected = menu.label;
  }
}
