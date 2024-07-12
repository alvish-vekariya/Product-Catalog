import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from 'angular-toastify';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { LocalstorageService } from 'src/app/core/services/localstorage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(private ls : LocalstorageService, private authService : AuthenticationService, private router: Router, private ts: ToastService, private formBuilder: FormBuilder){}

  
  user !: any;
  @ViewChild('profilePhoto') profilePhoto !: ElementRef;
  ngOnInit(){
    this.authService.getUser().subscribe((data: any)=>{
      this.user = data.data;
      this.imageUrl = `http://localhost:3000/${data.data.profile}`;
      this.tempImageUrl = this.imageUrl;
      this.patchValue();
    })
  }

  logout(){
    this.authService.logout().subscribe((data: any)=>{
      if(data.status === true){
        this.ts.error(data.message)
        localStorage.clear();
        this.router.navigate(['/auth'])
      }
    })
  }

  selectedProfile : any;
  imageUrl !:string;
  tempImageUrl !: string;

  selectProfile(e:any){
    this.selectedProfile = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(this.selectedProfile);

    reader.onload = ()=>{
      this.tempImageUrl = reader.result as string;
    }
  }

  @ViewChild('fileInput') fileInput !: ElementRef;
  changeImage(){
    this.fileInput.nativeElement.click();
  }

  @ViewChild('closeModal') closeButton !: ElementRef;

  updateProfile(){
    if(this.profileForm.invalid){
      this.ts.error('please complete the details')
    }else{
      const formData = new FormData();
      formData.append('username',this.profileForm.controls.username.value as string);
      if(this.changePswd == true){
        formData.append('password', this.profileForm.controls.password.value as string);
      }
      if(this.selectedProfile){
        formData.append('profile', this.selectedProfile);
      }

      this.authService.updateUser(formData, this.user.profile).subscribe((data: any)=>{
        if(data.status === true){
          this.ts.success(data.message);
          this.closeButton.nativeElement.click();
          this.ngOnInit();
        }else{
          this.ts.error(data.message);
        }
      })
    }
  }

  resetAllThings(){
    this.tempImageUrl = this.imageUrl;
    this.canclePassword();
  }

  profileForm = this.formBuilder.group({
    username : ['', [Validators.required, Validators.pattern('^[a-zA-z0-9]*$')]],
    password : ['', Validators.required],
    email : ['', Validators.required]
  })

  patchValue(){
    this.profileForm.patchValue({
      username: this.user.username,
      email : this.user.email
    })
    this.profileForm.controls.email.disable();
    this.profileForm.controls.password.disable();
  }
  
  changePswd : boolean = false;
  
  showPassword(){
    this.changePswd = true;
    this.profileForm.controls.password.enable();
  }

  canclePassword(){
    this.changePswd = false;
    this.profileForm.controls.password.reset();
    this.profileForm.controls.password.disable();
  }

}
