import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { JProject } from '../models/model';
import { catchError, of, tap } from 'rxjs';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root',
})

export class ProjectService {
  baseUrl: string = '';
  constructor(private http: HttpClient,private notify:NotificationService) {
    this.baseUrl = environment.apiUrl;
  }
  getProject() {
    this.http
      .get<JProject>(`${this.baseUrl}/project.json`)
      .pipe(
        tap((project) => {
            console.log(project);
            this.notify.user$.next(project)
            
          //   this._store.update((state) => ({
          //       ...state,
          //       ...project
          //     }));
        }),
        catchError((error) => {
          return of(error);
        })
      )
      .subscribe();
  }
}
