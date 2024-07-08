import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent {

  @ViewChild('closeButton') closeButton!: ElementRef;
  @ViewChild('addButton') addButton!: ElementRef;
  constructor(private prodService : ProductService, private formBuilder: FormBuilder){}

  allProducts : any;

  ngOnInit(){
    this.setProducts();
    this.setForm();
  }

  setProducts(){
    this.prodService.getAllProducts().subscribe((data:any)=>{
      this.allProducts = data.data;
    })
  }

  productForm : any;

  setForm(){
    this.productForm = this.formBuilder.group({
      name : ['', Validators.required],
      price : ['', Validators.required],
      description : ['', Validators.required],
      file : ['', Validators.required]
    })
  }

  deleteProduct(id: string){
    this.prodService.deleteProduct(id).subscribe((data:any)=>{
      this.setProducts();
    })
  }

  addProduct(){
    const formData = new FormData();
    formData.append('price', this.productForm.controls.price.value as string),
    formData.append('name', this.productForm.controls.name.value as string),
    formData.append('description', this.productForm.controls.description.value as string),
    formData.append('file', this.selectedFile);

    this.prodService.addProduct(formData).subscribe((data: any)=>{
      this.setProducts();
      this.closeButton.nativeElement.click();
      this.resetThings();
    })
  }

  selectedFile: any;

  selectFile(event: any){
    this.selectedFile = event.target.files[0];
  }

  updateState: boolean = false;
  updateProductId !: string;

  updateProduct(id: string){
    this.updateProductId = id;
    this.addButton.nativeElement.click();
    this.updateState = true;
    this.productForm = this.formBuilder.group({
      name : ['', Validators.required],
      price : ['', Validators.required],
      description : ['', Validators.required],
      file : ['']
    });
    this.prodService.getProduct(id).subscribe((data:any)=>{
      this.productForm.patchValue({
        name : data.data.name,
        price : data.data.price,
        description : data.data.description
      })
    })
  }

  update(){
    const formData = new FormData();
    formData.append('price', this.productForm.controls.price.value as string);
    formData.append('name', this.productForm.controls.name.value as string);
    formData.append('description', this.productForm.controls.description.value as string);
    if(this.productForm.controls.file.value){
      formData.append('file', this.selectedFile);
    }
    this.prodService.editProduct(this.updateProductId, formData).subscribe((data: any)=>{
      this.setProducts();
      this.closeButton.nativeElement.click()
      this.resetThings();
      this.setForm()
    })
  }

  resetThings(){
    this.productForm.reset();
    this.updateState = false;
  }
}
