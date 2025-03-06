import { Component, ElementRef, ViewChild } from '@angular/core';
import { EmailValidator, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '../../services/validators.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../interfaces/user.interface';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styles: ``
})
export class RegisterPageComponent {
  public myForm: FormGroup;

  constructor(
    private fb:FormBuilder, 
    private validatorsService: ValidatorsService,
    private authService: AuthService,
    private router: Router
  ){
    this.myForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(this.validatorsService.emailPattern), Validators.email]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      password2: ['', [Validators.required]]
    }, {
      validators: this.validatorsService.isFieldOneEqualFieldTwo('password', 'password2')
    });
  }

  isValidField ( field: string ){
    return this.validatorsService.isValidField( this.myForm, field);
  }


  onRegister():void{
    this.myForm.markAllAsTouched();
    const valores = this.myForm.value;
    const nuevoUsuario: User = {
      user: valores.username,
      email: valores.email,
      password: valores.password
    }
    this.authService.usernameExists(nuevoUsuario.user, nuevoUsuario.password)
      .subscribe(user => {
        if(user === null){
          this.authService.register(nuevoUsuario);
        }else{
          //TODO hacer algo que informe que ya esta registrado
        }
      })
  }
}
