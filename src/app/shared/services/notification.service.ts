import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  subject$ = new Subject();
  behavior$= new BehaviorSubject<string>("");
  constructor() {}

  send(value: any) {
    this.subject$.next(value);
    this.behavior$.next(value);
  }
  received(){
    return{
       behavior: this.behavior$.asObservable(),
       subject:this.subject$.asObservable()
    }
  }
}
