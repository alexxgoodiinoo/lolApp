import { Component } from '@angular/core';
import { User } from '../../../auth/interfaces/user.interface';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrl: './layout-page.component.css'
})
export class LayoutPageComponent {
  constructor(
    private authService: AuthService,
    private router: Router
  ){}

  public sidebarItems = [
    { label: 'Listado', icon: 'label', url: './list' },
    { label: 'Añadir', icon: 'add', url: './new-champ' },
  ];

  onLogout(){
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

  get user():User | undefined{
    return this.authService.currentUser;
  }
}
