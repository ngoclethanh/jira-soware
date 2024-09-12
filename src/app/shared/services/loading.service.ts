import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor() { }
  public showLoading = new EventEmitter<boolean>();
  loading = false;
  start() {
    this.showLoading.emit(true);
    this.loading = true;
  }

  complete() {
    this.showLoading.emit(false);
    this.loading = false;
  }
}
