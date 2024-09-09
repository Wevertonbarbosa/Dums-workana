import { CanActivateFn, Router } from '@angular/router';
import { AuthTokenService } from '../Services/auth-token.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authTokenService = inject(AuthTokenService);
  const router = inject(Router);

  if (authTokenService.getToken()) {
    return true;
  } else {
    router.navigate(['login']);
    return false;
  }

};
