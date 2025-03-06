import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environments } from '../../../environment/environments';
import { User } from '../interfaces/user.interface';
import { catchError, map, Observable, of, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = environments.baseURL;
  private user?: User;

  constructor(private httpClient: HttpClient) {}

  get currentUser(): User | undefined {
    if (!this.user) return undefined;
    return structuredClone(this.user);
  }

  login(usuario: string, password: string): Observable<User | null> {
    return this.httpClient
      .get<User>(`${this.baseUrl}/users/${usuario}/${password}`)
      .pipe(
        tap((user) => (this.user = user)),
        tap((user) => localStorage.setItem('token', JSON.stringify(user)))
      );
  }

  register(usuario: User): Observable<User>{
    return this.httpClient.post<User>(`${this.baseUrl}/userCreate`, usuario);
  }

  usernameExists(username: string,password: string): Observable<User | null> {
    return this.httpClient
      .get<User>(`${this.baseUrl}/users/${username}/${password}`)
      .pipe(
        map((user) => (user ? user : null)),
        catchError((error) => of(null))
      );
  }

  logout() {
    this.user = undefined;
    localStorage.clear();
  }

  checkAuthenticacion(): Observable<boolean> {
    const token = localStorage.getItem('token');
    if (!token) return of(false);
    const userLogueado = JSON.parse(token);
    return this.httpClient
      .get<User>(
        `${this.baseUrl}/users/${userLogueado.data.usuario}/${userLogueado.data.password}`
      )
      .pipe(
        tap((user) => (this.user = user)),
        map((user) => !!user),
        catchError((err) => of(false))
      );
  }
}
