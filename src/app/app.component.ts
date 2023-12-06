import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { TokenService } from './services/token.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'contato-imediato-front';

  constructor(
    private tokenService: TokenService
  ) { }

  personalCode: string|null = '';
  private codeSubscription: Subscription = new Subscription;

  ngOnInit() {
    this.personalCode = this.tokenService.getPersonalCode();
    this.codeSubscription = this.tokenService.tokenSubject.subscribe((code: string) => {
      this.personalCode = code;
   });
  }

  ngOnDestroy(): void {
    this.codeSubscription.unsubscribe();
  }

  signOut(): void {
    this.tokenService.signOut();
  }
}
