import { Injectable } from '@angular/core';
import { environment } from "../../environments/environments";
import { HttpClient } from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from "../../models/User";

@Injectable({
  providedIn: 'root'
})

export class UsersService {
  private url: string = environment.API;

  constructor(private http: HttpClient) { }

  read(): Observable<any> {
    return this.http.get<User>(`${this.url}/persons`).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  create(user: User): Observable<User> {
    return this.http.post<User>(`${this.url}/persons`, user).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  update(user: User, userId: number): Observable<User> {
    return this.http.patch<User>(`${this.url}/persons/${userId}`, user).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  delete(id: number): Observable<User> {
    return this.http.delete<User>(`${this.url}/persons/${id}`).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    );
  }


  errorHandler(e: any): Observable<any> {
    console.log('error', e);
    return EMPTY;
  }
}
