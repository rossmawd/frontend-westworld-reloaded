import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { WelcomeService } from "../welcome/welcome.service";
import { CardService } from '../card/card.service';
import {ICard} from '../card/card'


@Component({
  selector: "app-game",
  templateUrl: "./game.component.html",
  styleUrls: ["./game.component.scss"]
})
export class GameComponent implements OnInit {
  playerName: string;
  errorMessage: string
  cards: ICard[] = []

  constructor(
    private route: ActivatedRoute,
    private welcomeService: WelcomeService,
    private cardService: CardService
  ) {}

  ngOnInit(): void {
    this.cardService.getCards().subscribe({
      next: cards => {
        this.cards = cards;
      },
      error: err => (this.errorMessage = err)
    })
    //this.playerName = this.route.snapshot.paramMap.get("name");
   this.playerName ? null : this.playerName = this.welcomeService.getUserName()
  }
}
