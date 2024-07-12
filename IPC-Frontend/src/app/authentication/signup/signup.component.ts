import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from 'angular-toastify';
import { Isignup } from 'src/app/core/interfaces/isignup';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  constructor(private formbuilder: FormBuilder, private authService:AuthenticationService, private router: Router, private ts : ToastService){}

  signupForm = this.formbuilder.group({
    username : ['', [Validators.required, Validators.pattern('^[a-zA-z0-9]*$')]],
    role : 'user',
    password: ['', Validators.required],
    email : ['', [Validators.email, Validators.required]],
    file : ['', Validators.required]
  })

  selectedFile : any;

  selectFile(e: any){
    this.selectedFile = e.target.files[0];
  }

  signup(){
    if(this.signupForm.invalid){
      this.signupForm.markAllAsTouched();
    }else{
      const formData = new FormData();
      formData.append('username', this.signupForm.controls.username.value as string);
      formData.append('email', this.signupForm.controls.email.value as string);
      formData.append('password', this.signupForm.controls.password.value as string);
      formData.append('role', this.signupForm.controls.role.value as string);
      formData.append('file', this.selectedFile);
      this.authService.signup(formData).subscribe((data : any)=>{
        if(data.status == true){
          this.router.navigate(['/auth']);
          this.ts.success(data.message);
        }else{
          this.ts.error(data.message);
        }
      })
    }
  }

}
