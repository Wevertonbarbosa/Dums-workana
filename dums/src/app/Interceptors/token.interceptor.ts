import { HttpInterceptorFn } from '@angular/common/http';
import { AuthTokenService } from '../Services/auth-token.service';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authTokenService = inject(AuthTokenService);
  const router = inject(Router);

  const authToken = authTokenService.getToken();
  const urlPath = new URL(req.url).pathname;
  const requiresAuth = urlPath.includes('/emitente'); 

  const authReq =
    authToken && requiresAuth
      ? req.clone({
          headers: req.headers.set('Authorization', `Bearer ${authToken}`),
        })
      : req;

  console.log('Requisição clonada com cabeçalho de autenticação:', authReq);

  return next(authReq).pipe(
    catchError((error) => {
      if (error.status === 401 || error.status === 403) {
        router.navigate(['/login']);
      }
      return throwError(() => error);
    })
  );
};
