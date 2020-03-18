import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WelcomeService {
  private userName: string

  constructor() { }

  setUserName(player : string): void {
     this.userName = player
  }

  getUserName(): string {
    return this.userName
  }
}
