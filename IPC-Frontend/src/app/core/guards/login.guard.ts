import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LocalstorageService } from '../services/localstorage.service';

export const loginGuard: CanActivateFn = (route, state) => {
  const ls = inject(LocalstorageService);
  const router = inject(Router);

  if(ls.local){
    return true;
  }else{
    router.navigate(['/auth']);
    return false;
  }

};
