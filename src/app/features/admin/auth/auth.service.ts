import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { NotificationService } from '../../../shared/services/notification.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl: string = '';
  constructor(private http: HttpClient, private notify: NotificationService) {
    this.baseUrl = environment.apiUrl;
  }
  login(): Observable<any> {
   return this.http.get<any>(`${this.baseUrl}/auth.json`);
  }
}
