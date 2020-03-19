import { Component, OnInit, OnChanges } from "@angular/core";
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
        this.distributeCards([...this.cards]);
        // this.currentPlayerCard = this.drawCards(this.playerCards);
        // this.currentOpponentCard = this.drawCards(this.opponentCards);
        this.currentPlayerCard = this.drawCards("playerCards");
        this.currentOpponentCard = this.drawCards("opponentCards");
      },
      error: err => (this.errorMessage = err)
    });

    //this.playerName = this.route.snapshot.paramMap.get("name");
    this.playerName
      ? null
      : (this.playerName = this.welcomeService.getUserName());
  }

  handleAttack(attribute: string): void {
    let player = { ...this.currentPlayerCard };
    let opponent = { ...this.currentOpponentCard };
    if (player[attribute] > opponent[attribute]) {
      this.exchangeCard("win");
    } else if (player[attribute] < opponent[attribute]) {
      this.exchangeCard("lose");
    } else {
      this.exchangeCard("draw");
    }
    this.ngOnChanges()
  }

  exchangeCard(condition: string): void {
    console.log(condition);
    let oppCard = this.currentOpponentCard;
    let playerCard = this.currentPlayerCard;
    if (condition === "win") {
      // this.playerCards.push(this.opponentCards.shift());
      this.playerCards = [...this.playerCards, this.opponentCards.shift()]
      this.playerCards.push(this.playerCards.shift())
     
      this.currentPlayerCard = this.playerCards[0]
      this.currentOpponentCard = this.opponentCards[0]
      console.log("the new player card is", this.currentPlayerCard);
      console.log("the new opponent card is", this.currentOpponentCard);
    }
    console.log(this.playerCards);
  }

  drawCards(deck: string): ICard {
    let cards = this[deck];
    cards.push(cards.unshift());
    return cards[0];
  }
  // drawCards(cards: ICard[]): ICard {
  //   console.log('Drawing new card')
  //   cards.unshift(cards.pop());
  //   return cards[0];
  // }

  ngOnChanges() {
    console.log("changes");
  }

  distributeCards(cards: ICard[]): void {
    let playerCards: ICard[];
    let opponentCards: ICard[];

    cards = this.shuffle(cards);
    cards.pop();

    playerCards = cards.slice(0, 8);
    opponentCards = cards.slice(8);
    console.log("players:", playerCards, "Opponents:", opponentCards);

    this.playerCards = playerCards;
    this.opponentCards = opponentCards;
  }

  shuffle(cards: ICard[]): ICard[] {
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    return cards;
  }
}
