import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WelcomeService {
  private userName: string;

  constructor() { }

  setUserName(player : string): void {
     this.userName = player
     console.log(this.userName)
  }

  getUserName(): string {
    return this.userName
  }
}
