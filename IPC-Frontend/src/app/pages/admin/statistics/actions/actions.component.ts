import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements ICellRendererAngularComp {
  refresh(params: ICellRendererParams<any, any, any>): boolean {
    return true
  }

  params: any;

  agInit(params: ICellRendererParams<any, any, any>): void {
    this.params = params;
  }

  delete(){
    this.params.deleteUser(this.params.data._id);
  }
}
