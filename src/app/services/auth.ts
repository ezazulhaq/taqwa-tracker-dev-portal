import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map, catchError, throwError, BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environments';

export interface LoginResponse {
  access_token: string;
  token_type: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);

  private currentTokenSubject: BehaviorSubject<string | null>;
  public currentToken: Observable<string | null>;

  constructor() {
    this.currentTokenSubject = new BehaviorSubject<string | null>(
      localStorage.getItem('taqwa_access_token')
    );
    this.currentToken = this.currentTokenSubject.asObservable();
  }

  public get currentTokenValue(): string | null {
    return this.currentTokenSubject.value;
  }

  login(email: string, password: string): Observable<LoginResponse> {
    const body = new URLSearchParams();
    body.set('username', email);
    body.set('password', password);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post<LoginResponse>(
      `${environment.apiUrl}/auth/token`,
      body.toString(),
      { headers }
    ).pipe(
      map(response => {
        // Store token in localStorage
        localStorage.setItem('taqwa_access_token', response.access_token);
        this.currentTokenSubject.next(response.access_token);
        return response;
      }),
      catchError(error => {
        return throwError(() => error);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('taqwa_access_token');
    this.currentTokenSubject.next(null);
  }

  isAuthenticated(): boolean {
    return !!this.currentTokenValue;
  }
}
