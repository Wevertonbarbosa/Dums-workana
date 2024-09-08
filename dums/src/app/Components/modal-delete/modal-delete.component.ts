import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import {
  PoModalAction,
  PoModalComponent,
  PoNotificationService,
} from '@po-ui/ng-components';
import { DataEmitenteService } from '../../Services/data-emitente.service';

@Component({
  selector: 'app-modal-delete',
  templateUrl: './modal-delete.component.html',
  styleUrl: './modal-delete.component.css',
})
export class ModalDeleteComponent {
  @ViewChild(PoModalComponent, { static: true })
  deleteModal!: PoModalComponent;

  @Output() onDelete: EventEmitter<void> = new EventEmitter();


  private deleteId!: number;

  constructor(
    private service: DataEmitenteService,
    private poNotification: PoNotificationService
  ) {}

  open(id: number) {
    this.deleteId = id;
    this.deleteModal.open();
  }

  close() {
    this.deleteModal.close();
  }

  confirmDeleteAction: PoModalAction = {
    action: () => {
      this.service.deleteEmitente(this.deleteId).subscribe({
        next: () => {
          this.close();
          this.poNotification.success('Emitente excluído com sucesso!');
          this.onDelete.emit();
        },
        error: (err) => {
          console.error('Erro ao excluir emitente:', err);
          this.poNotification.error('Erro ao excluir o emitente.');
        },
      });
    },
    label: 'Confirmar',
    disabled: false,
  };

  cancelAction: PoModalAction = {
    action: () => this.close(),
    label: 'Cancelar',
    danger: true,
  };
}
