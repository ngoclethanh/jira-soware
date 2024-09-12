import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  subject$ = new Subject();
  behavior$= new BehaviorSubject<any>('');
  user$ = new BehaviorSubject<any>([]);

  constructor() {}

  send(value: any) {
    //this.subject$.next(value);
  return  this.behavior$.next(value);
  }
  received(){
    return this.behavior$.asObservable();
    // return{
    //    behavior: this.behavior$.asObservable(),
    //    subject:this.subject$.asObservable()
    // }
  }
}
