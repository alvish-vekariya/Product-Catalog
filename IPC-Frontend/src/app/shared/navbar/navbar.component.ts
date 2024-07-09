import { Component } from '@angular/core';
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
  constructor(private ls : LocalstorageService, private authService : AuthenticationService, private router: Router, private ts: ToastService){}

  name !: string;
  role !: string;
  ngOnInit(){
    this.name = this.ls.username;
    this.role = this.ls.role;
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

}
