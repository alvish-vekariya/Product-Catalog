import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { LocalstorageService } from 'src/app/core/services/localstorage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(private ls : LocalstorageService, private authService : AuthenticationService, private router: Router){}

  name !: string;
  ngOnInit(){
    this.name = this.ls.username;
  }

  logout(){
    this.authService.logout().subscribe((data: any)=>{
      if(data.status === true){
        localStorage.clear();
        this.router.navigate(['/auth'])
      }
    })
  }

}
