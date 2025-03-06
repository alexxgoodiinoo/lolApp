import { Component, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styles: ``
})
export class LoginPageComponent {
  @ViewChild('usuario') usuario!: ElementRef<HTMLInputElement>
  @ViewChild('password') password!: ElementRef<HTMLInputElement>

  public noLogueado = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ){}

  onLogin():void{
    this.authService.login(this.usuario.nativeElement.value, this.password.nativeElement.value)
      .subscribe(user => {
        this.router.navigate(['/'])
      })
    this.noLogueado = true;
    this.usuario.nativeElement.value = "";
    this.password.nativeElement.value = "";
  }
}
