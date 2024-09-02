import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthTokenService {
  constructor(private cookieService: CookieService) {}

  getToken(): string | null {
    return this.cookieService.get('authToken');
  }

  setToken(token: string) {
    this.cookieService.set('authToken', token, {
      expires: 2,
      path: '/',
      secure: true,
      sameSite: 'Lax',
    });
  }
}
