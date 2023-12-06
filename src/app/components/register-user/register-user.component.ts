import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { NgIf } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { TokenService } from '../../services/token.service';


@Component({
  selector: 'app-register-user',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf],
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.css'
})
export class RegisterUserComponent implements OnInit {

  constructor(
    private apiService: ApiService,
    private toastr: ToastrService,
    private tokenService: TokenService
  ) { }

  registerForm!: FormGroup;
  personalCode!: '';

  ngOnInit() {
    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
    });
  }

  get email() {
    return this.registerForm.get('email');
  }

  registerUser() {
    this.apiService.post('register', { 'email': this.registerForm.value.email })
      .subscribe({
        next: (response) => {
          this.toastr.success('Copie seu código permanente de acesso.', ':D');
          this.personalCode = (response as any).personal_code;
          this.tokenService.savePersonalCode((response as any).personal_code);
        },
        error: (e) => {
          const errors = [];
          errors.push(e.error.message);
          if (errors.includes('The email field must be a valid email address.')) {
            this.toastr.error('Este e-mail não é válido.', ':(');
          } else {
            this.toastr.error('Não conseguimos criar sua conta, tente outro e-mail.', ':(');
          }
          ;
        },
        complete: () => console.info('complete')
      });
  }

}
