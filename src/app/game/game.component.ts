import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { WelcomeService } from "../welcome/welcome.service";
import { CardService } from "../card/card.service";
import { ICard } from "../card/card";

@Component({
  selector: "app-game",
  templateUrl: "./game.component.html",
  styleUrls: ["./game.component.css"]
})
export class GameComponent implements OnInit {
  playerName: string;
  errorMessage: string;
  cards: ICard[] = [];
  playerCards: ICard[];
  opponentCards: ICard[];
  currentPlayerCard: ICard;
  currentOpponentCard: ICard;

  constructor(
    private route: ActivatedRoute,
    private welcomeService: WelcomeService,
    private cardService: CardService
  ) {}

  ngOnInit(): void {
    this.cardService.getCards().subscribe({
      next: cards => {
        this.cards = cards;
        this.distributeCards([...this.cards])
        this.currentPlayerCard = this.drawCards(this.playerCards)
        this.currentOpponentCard= this.drawCards(this.opponentCards)
      },
      error: err => (this.errorMessage = err)
    });

    //this.playerName = this.route.snapshot.paramMap.get("name");
    this.playerName
      ? null
      : (this.playerName = this.welcomeService.getUserName());
  }

  drawCards(cards: ICard[]): ICard {
    cards.unshift(cards.pop())
    return cards[0]
  }

  distributeCards(cards: ICard[]): void {
    let playerCards: ICard[];
    let opponentCards: ICard[];

    cards = this.shuffle(cards);
    cards.pop();

    playerCards = cards.slice(0, 8);
    opponentCards = cards.slice(8);
    console.log("players:", playerCards, "Opponents:", opponentCards);
    
    this.playerCards = playerCards
    this.opponentCards = opponentCards
  }

  shuffle(cards: ICard[]): ICard[] {
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    return cards;
  }
}
