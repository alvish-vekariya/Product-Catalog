import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-datatable-actions',
  templateUrl: './datatable-actions.component.html',
  styleUrls: ['./datatable-actions.component.scss']
})
export class DatatableActionsComponent implements ICellRendererAngularComp {

  params: any;

  refresh(params: ICellRendererParams<any, any, any>): boolean {
    return true;
  }

  agInit(params: ICellRendererParams<any, any, any>): void {
    this.params = params;
  }

  delete(){
    this.params.delete(this.params.data._id);
  }

  update(){
    this.params.update(this.params.data._id);
  }

}
