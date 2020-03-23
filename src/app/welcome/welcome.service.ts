import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WelcomeService {
  private userName: string
  private userScore: number;
  private winOrLoss: string;

  constructor() { }

  setUserName(player : string): void {
     this.userName = player
  }

  getUserName(): string {
    return this.userName
  }

  getWinState(): string {
    return this.winOrLoss
  }

  setUserScore(score: number, winOrLoss: string): void {
    this.userScore = score
    this.winOrLoss = winOrLoss
    console.log('the win state is ' + winOrLoss)
  } 

  getUserScore(): {} {
    console.log('I must have an API call here')
    return this.userScore
  }

}
