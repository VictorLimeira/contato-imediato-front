import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

const PERSONAL_CODE = 'personal-code';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  personalCode: string = '';
  public tokenSubject: Subject<string> = new Subject<string>();

  constructor(private router: Router) {
    this.tokenSubject.subscribe((value) => {
      this.personalCode = value
    });
    this.tokenSubject.next(window.sessionStorage.getItem(PERSONAL_CODE) ?? '');
  }

  public signOut(): void {
    window.sessionStorage.clear();
    this.tokenSubject.next('');
    this.router.navigate(['']);
  }

  public savePersonalCode(code: string): void {
    window.sessionStorage.removeItem(PERSONAL_CODE);
    window.sessionStorage.setItem(PERSONAL_CODE, code);
    this.tokenSubject.next(PERSONAL_CODE);
  }

  public getPersonalCode(): string | null {
    return window.sessionStorage.getItem(PERSONAL_CODE);
  }
}
