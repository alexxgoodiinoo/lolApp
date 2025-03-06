import { Injectable } from '@angular/core';
import { environments } from '../../environment/environments';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { Champ, Datum } from './interface/champ.interface';

@Injectable({ providedIn: 'root' })
export class ChampService {
  constructor(private http: HttpClient) {}

  private baseURL: string = environments.baseURL;

  getChamps(): Observable<Datum[]> {
    return this.http.get<{ data: Datum[] }>(`${this.baseURL}`).pipe(
      map(response => response.data)
    );
  }

  getChampById(id: string): Observable<Datum> {
    return this.http
      .get<any>(`${this.baseURL}/${id}`)
      .pipe(
        catchError((error) => of(undefined)),
        map(champ => champ.data)
      );
  }

  addChamp(champ: Datum): Observable<Datum> {
    return this.http.post<Datum>(`${this.baseURL}`, champ);
  }

  updateChamp(id: string, champ: Datum): Observable<Datum> {
    return this.http.patch<Datum>(`${this.baseURL}/${id}`, champ);
  }

  deleteChampById(id: string): Observable<boolean> {
    return this.http.delete(`${this.baseURL}/${id}`).pipe(
      map((resp) => true),
      catchError((err) => of(false))
    );
  }
}
