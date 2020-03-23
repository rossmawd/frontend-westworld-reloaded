import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WelcomeService {
  private userName: string
  private userScore: number;

  constructor() { }

  setUserName(player : string): void {
     this.userName = player
  }

  getUserName(): string {
    return this.userName
  }

  setUserScore(score: number): void {
    this.userScore = score
  } 

  getAllScores(): any {
    console.log('I must have an API call here')
    return this.userScore
  }

}
