import { Component } from '@angular/core';
import { PoMenuItem, PoMenuPanelItem } from '@po-ui/ng-components';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent {
  menus: Array<PoMenuItem> = [
    {
      label: 'Emitente',
      link: '/emitente',
      icon: 'po-icon po-icon-document-filled',
      shortLabel: 'Emitente',
    },
    {
      label: 'Transportadora',
      //Próxima página
      icon: 'po-icon po-icon-truck',
      shortLabel: 'Transportadora',
    },
  ];

  constructor() {}
}
