import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastService } from 'angular-toastify';
import { CategoryService } from 'src/app/core/services/category.service';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent {

  @ViewChild('closeButton') closeButton!: ElementRef;
  @ViewChild('addButton') addButton!: ElementRef;
  constructor(private prodService: ProductService, private formBuilder: FormBuilder, private categoryService: CategoryService, private ts: ToastService) { }

  allProducts: any;
  allCategories: any;
  queryParams: any = {};

  ngOnInit() {
    this.setProducts();
    this.setForm();
    this.categoryService.getAllCategory().subscribe((data: any) => {
      this.allCategories = data.data;
    })
  }

  get controls() {
    return this.productForm.controls;
  }

  search(e: any) {
    this.queryParams.search = e.target.value;
    this.setProducts();
  }

  changeCategory(event: any) {
    this.queryParams.filter = event.target.value;
    this.setProducts();
  }

  setProducts() {
    this.prodService.getAllProducts(this.queryParams).subscribe((data: any) => {
      this.allProducts = data.data;
    })
  }

  productForm: any;

  setForm() {
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
      file: ['', Validators.required],
      category: ['', Validators.required]
    })
  }

  deleteProduct(id: string) {
    this.prodService.getProduct(id).subscribe((data: any) => {
      this.imagename = data.data.image;
      // console.log(data);
      this.prodService.deleteProduct(id, this.imagename).subscribe((data: any) => {
        this.ts.error(data.message)
        this.setProducts();
      })
    })
  }

  addProduct() {
    if(this.productForm.valid) {
      const formData = new FormData();
      formData.append('price', this.productForm.controls.price.value as string),
        formData.append('name', this.productForm.controls.name.value as string),
        formData.append('description', this.productForm.controls.description.value as string),
        formData.append('category', this.productForm.controls.category.value as string),
        formData.append('file', this.selectedFile);

      this.prodService.addProduct(formData).subscribe((data: any) => {
        if (data.status === true) {
          this.ts.success(data.message);
          this.setProducts();
          this.closeButton.nativeElement.click();
          this.resetThings();
        } else {
          this.ts.error(data.message);

        }
      })
    }else{
      this.productForm.markAllAsTouched()
    }
  }

  selectedFile: any;

  selectFile(event: any) {
    this.selectedFile = event.target.files[0];
  }

  updateState: boolean = false;
  updateProductId !: string;
  imagename !: string;

  updateProduct(id: string) {
    this.updateProductId = id;
    this.addButton.nativeElement.click();
    this.updateState = true;
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
      file: [''],
      category: ['', Validators.required]
    });
    this.prodService.getProduct(id).subscribe((data: any) => {
      this.imagename = data.data.image;
      this.productForm.patchValue({
        name: data.data.name,
        price: data.data.price,
        description: data.data.description,
        category: data.data.category
      })
    })
  }

  update() {
    if (this.productForm.valid) {
      const formData = new FormData();
      formData.append('price', this.productForm.controls.price.value as string);
      formData.append('name', this.productForm.controls.name.value as string);
      formData.append('description', this.productForm.controls.description.value as string);
      if (this.productForm.controls.file.value) {
        formData.append('file', this.selectedFile);
      }
      this.prodService.editProduct(this.updateProductId, formData, this.imagename).subscribe((data: any) => {
        if (data.status === true) {
          this.ts.warn(data.message)
          this.setProducts();
          this.closeButton.nativeElement.click()
          this.resetThings();
          this.setForm()
        } else {
          this.ts.error(data.message)

        }
      })
    } else {
      this.productForm.markAllAsTouched();
    }
  }

  resetThings() {
    this.productForm.reset();
    this.updateState = false;
  }
}
