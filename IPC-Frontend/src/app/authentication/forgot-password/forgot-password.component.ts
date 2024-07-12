import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from 'angular-toastify';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  constructor(private authService: AuthenticationService, private formBuilder: FormBuilder, private ts : ToastService, private router: Router){}

  forgotForm = this.formBuilder.group({
    email : ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
    otp : ['', Validators.required],
    newPswd : ['', Validators.required]
  })

  state : boolean = false;
  change : boolean = false;
  ngOnInit(){
    this.forgotForm.controls.otp.disable();
    this.forgotForm.controls.newPswd.disable();
  }

  userEmail !: string;

  getOTP(){
    if(this.forgotForm.invalid){
      this.forgotForm.markAllAsTouched()
    }else{
      this.forgotForm.controls.otp.enable();
      this.userEmail = this.forgotForm.controls.email.value as string;
      this.authService.getOtp(this.userEmail).subscribe((data: any)=>{
        if(data.status === true){
          this.state = true;
          alert(data.otp);
        }else{
          this.ts.error(data.message);
        }
      })
    }
  }

  validateOtp(){
    this.authService.validateOtp(this.userEmail, this.forgotForm.controls.otp.value as string).subscribe((data:any)=>{
      if(data.status === true){
        this.change = true;
        this.ts.success(data.message);
        this.forgotForm.controls.newPswd.enable();
      }else{
        this.ts.error(data.message);
      }
    })
  }

  changePassword(){
    this.authService.changePassword(this.userEmail, this.forgotForm.controls.newPswd.value as string).subscribe((data:any)=>{
      if(data.status === true){
        this.ts.success(data.message);
        this.router.navigate(['/auth']);
      }else{
        this.ts.error(data.message);
      }
    })
  }
  cancle(){
    this.router.navigate(['/auth']);
  }
}
