import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/core/services/category.service';
import { ColDef } from 'ag-grid-community';
import { DatatableActionsComponent } from './datatable-actions/datatable-actions.component';
import { ToastService } from 'angular-toastify';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent {
  constructor(private categoryService: CategoryService, private formBuilder: FormBuilder, private toastService: ToastService){}

  @ViewChild('closeButton') closeButton!: ElementRef;
  @ViewChild('addProduct') addButton!: ElementRef;

  updateState: boolean = false;

  ngOnInit(){
    this.setData();
  }

  rowData :any = [];

  colDefs : ColDef[] = [
    {field: 'name', flex : 1},
    {field : 'description', flex: 1},
    {field : 'createdAt', flex:1},
    {field : 'action', flex :1, cellRenderer : DatatableActionsComponent, cellRendererParams:{
      delete : (id: string)=>this.delete(id),
      update : (id:string)=>this.update(id)
    }, sortable : false}
  ]

  update(id: string){
    this.updateState = true;
    this.addButton.nativeElement.click();
    this.categoryService.getCategory(id).subscribe((data: any)=>{
      this.categoryForm.patchValue({
        name : data.data.name,
        description : data.data.description
      })
    })
    this.updateProductId = id;
  }

  updateProductId!: string;

  updateCategory(){
    this.categoryService.updateCategory(this.updateProductId, this.categoryForm.value).subscribe((data:any)=>{
      this.toastService.warn(data.message);
      this.setData();
      this.closeButton.nativeElement.click();
      this.categoryForm.reset();
    })
  }

  delete(id: string){
    Swal.fire({
      title: "Are you sure?",
      text: "All product related to this category will be also deleted!!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoryService.deleteCategory(id).subscribe((data: any)=>{
          this.toastService.error(data.message);
          this.setData();
        })
      }
    });
  }

  setData(){
    this.categoryService.getAllCategory().subscribe((data: any)=>{
      this.rowData = data.data;
    })
  }

  categoryForm = this.formBuilder.group({
    name : ['', Validators.required],
    description : ['', Validators.required]
  })

  addCategory(){
    this.categoryService.addCategory(this.categoryForm.value).subscribe((data:any)=>{
      if(data.status == true){
        this.toastService.success(data.message);
        this.categoryForm.reset();
        this.closeButton.nativeElement.click();
        this.setData();
      }else{
        this.toastService.error(data.message);
      }
    })
  }

  resetThings(){
    this.updateState = false;
    this.categoryForm.reset()
  }
  
}
