import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, tap, filter } from "rxjs/operators";

import { WelcomeService } from "../welcome/welcome.service";

@Component({
  selector: "app-highscore",
  templateUrl: "./highscore.component.html",
  styleUrls: ["./highscore.component.css"]
})
export class HighscoreComponent implements OnInit {
  playerScore: {};
  winOrLoss: string;
  highScoreUrl: string = "http://localhost:3000/highscores";
  scores: any[];
  errorMessage: string;
  playerName: string;
  newScores$ = this.getHighScores()

  constructor(
    private welcomeService: WelcomeService,
    private http: HttpClient
  ) {}

  ngOnInit(): void { 
    if (this.welcomeService.getWinState()) {
      this.postHighScore().subscribe({
        next: postedScore => {
          console.log(postedScore)
  
        },
        error: err => (this.errorMessage = err)
      });
    }
    //set the new high score here then call get scores and add it manually?
  this.getHighScores().subscribe({
      next: scores => {
       
        this.scores = this.sortScores(scores)
      
      },
      error: err => (this.errorMessage = err)
    });
  }

  sortScores(scores: any[]): any[] {
    if (this.playerScore) {scores = [...scores]} //unnessessary? 
      scores = scores.sort((a,b) => {
        if(a.score > b.score) {return -1}
        if(a.score < b.score) {return 1}
      })
      console.log('the sorted scores are', scores)
     return scores
  }

  postHighScore(): Observable<{}> {
   
    this.playerScore = {"name": this.welcomeService.getUserName(), "score": this.welcomeService.getUserScore()}
    return this.http.post<{}>(this.highScoreUrl, this.playerScore).pipe(
      tap(data => console.log("the new score is: ", data)),
      catchError(this.handleError)
    )
  }

  getHighScores(): Observable<any[]> {

    return this.http.get<any[]>(this.highScoreUrl).pipe(
      tap(data => console.log("the high scores are: ", data)),
      catchError(this.handleError) //CATCH <<<-----
    );
  }

  private handleError(res: HttpErrorResponse) {
    let errorMessage = " ";
    if (res.error instanceof ErrorEvent) {
      //is A an instance of class B
      errorMessage = `An error occured: ${res.error.message}`;
    } else {
      errorMessage = `Server returned code: ${res.status}, error message is:
       ${res.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage); //THROW -->>>>>
  }
}
