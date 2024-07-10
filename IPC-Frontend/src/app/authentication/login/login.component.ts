import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from 'angular-toastify';
import { Ilogin } from 'src/app/core/interfaces/ilogin';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private formBuilder : FormBuilder, private authService: AuthenticationService, private router: Router, private toastService: ToastService){}

  loginForm = this.formBuilder.group({
    email : ['', [Validators.required, Validators.email]],
    password : ['', Validators.required]
  })

  login(){
    if(this.loginForm.invalid){
      this.loginForm.markAllAsTouched();
    }else{
      this.authService.login(this.loginForm.value as Ilogin).subscribe((data: any)=>{
        if(data.status === true){
          const user = {
            role : data.role,
            username : data.username,
            token : data.token
          }
          localStorage.setItem('user', JSON.stringify(user));
          this.router.navigate([`${data.role}`]);
          this.toastService.success(data.message);
        }else{
          this.toastService.error(data.message);
        }
      })
    }
  }
}
