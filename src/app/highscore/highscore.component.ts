import { Component, OnInit } from '@angular/core';
import { WelcomeService } from "../welcome/welcome.service";

@Component({
  selector: 'app-highscore',
  templateUrl: './highscore.component.html',
  styleUrls: ['./highscore.component.css']
})
export class HighscoreComponent implements OnInit {
  playerScore: number;
  winOrLoss: string;

  constructor(private welcomeService: WelcomeService,) {

  }
  ngOnInit(): void {
    this.playerScore = this.welcomeService.getAllScores()
    this.winOrLoss = this.welcomeService.getWinState()
  }

}
