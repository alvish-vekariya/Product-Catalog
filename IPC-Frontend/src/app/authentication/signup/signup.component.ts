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
    username : ['', Validators.required],
    role : 'user',
    password: ['', Validators.required],
    email : ['', [Validators.email, Validators.required]]
  })

  signup(){
    this.authService.signup(this.signupForm.value as Isignup).subscribe((data : any)=>{
      if(data.status == true){
        this.router.navigate(['/auth']);
        this.ts.success(data.message);
      }else{
        this.ts.error(data.message);
      }
    })
  }

}
