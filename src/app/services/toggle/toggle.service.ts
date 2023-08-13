import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ToggleService {
  private toggleSubject = new Subject<void>();

  constructor() { }

  toggleDrawer() {
    this.toggleSubject.next();
  }

  getToggleObservable() {
    return this.toggleSubject.asObservable();
  }
}
