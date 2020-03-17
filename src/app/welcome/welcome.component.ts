import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  playerName: string;

  startGame() {
    console.log('game starting')
  }

  constructor() { }

  ngOnInit(): void {
  }

}
