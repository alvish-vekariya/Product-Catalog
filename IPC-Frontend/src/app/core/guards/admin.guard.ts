import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LocalstorageService } from '../services/localstorage.service';
import { Location } from '@angular/common';

export const adminGuard: CanActivateFn = () => {
  const ls = inject(LocalstorageService);
  const local = inject(Location);
  const router = inject(Router);

  if(ls.local){
    if(ls.token == 'admin') return true;
    else {
      local.back();
      return false;
    }
  }else{
    router.navigate(['/']);
    return false
  }
}
