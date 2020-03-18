import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  playerName: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.playerName = this.route.snapshot.paramMap.get("name")
  }
}


