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
        console.log(this.distributeCards([...this.cards]))
      },
      error: err => (this.errorMessage = err)
    })

 
    //this.playerName = this.route.snapshot.paramMap.get("name");
   this.playerName ? null : this.playerName = this.welcomeService.getUserName()
  
  }
  distributeCards(cards: ICard[]): ICard[][] {
    let playerCards: ICard[]
    let opponentCards: ICard[]
    
    cards = this.shuffle(cards)
    


    return [[this.cards.pop()],[this.cards.shift()]]
      
  }

   shuffle(cards: ICard[]): ICard[] {
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    return cards;
}
}
