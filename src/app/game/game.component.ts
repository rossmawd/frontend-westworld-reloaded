import { Component, OnInit, OnChanges } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { WelcomeService } from "../welcome/welcome.service";
import { CardService } from "../card/card.service";
import { ICard } from "../card/card";
import { Router } from "@angular/router";

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
  infoMessage: string;
  playerCardColor: string;
  oppCardColor: string;
  playerScore: number = 50;

  constructor(
    private route: ActivatedRoute,
    private welcomeService: WelcomeService,
    private cardService: CardService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cardService.getCards().subscribe({
      next: cards => {
        this.cards = cards;
        this.distributeCards([...this.cards]);

        this.currentPlayerCard = this.playerCards[0];
        this.currentOpponentCard = this.opponentCards[0];
      },
      error: err => (this.errorMessage = err)
    });

    this.playerName
      ? null
      : (this.playerName = this.welcomeService.getUserName());
  }

  distributeCards(cards: ICard[]): void {
    cards = this.shuffle(cards);
    cards.pop();

    this.playerCards = cards.slice(0, 8);
    this.opponentCards = cards.slice(8);
    console.log("players:", this.playerCards, "Opponents:", this.opponentCards);
  }

  handleAttack(attribute: string): void {
    let goodie = { ...this.currentPlayerCard };
    let baddie = { ...this.currentOpponentCard };
    if (goodie[attribute] > baddie[attribute]) {
      this.displayResult(goodie.name, baddie.name, attribute, "win");
    } else if (goodie[attribute] < baddie[attribute]) {
      this.displayResult(baddie.name, goodie.name, attribute, "lose");
    } else {
      this.displayResult(baddie.name, goodie.name, attribute, "draw");
    }
  }

  displayResult(
    winner: string,
    loser: string,
    att: string,
    outcome: string
  ): void {
    let winLoseDraw: string;
    switch (outcome) {
      case "win":
        winLoseDraw = "You Won a Card!";
        this.oppCardColor = "#ff3333";
        break;
      case "lose":
        winLoseDraw = "You Lost a Card!";
        this.playerCardColor = "#ff3333";
        break;
      case "draw":
        winLoseDraw = `It\'s a stalemate! Re-Draw!`;
        break;
      default:
        null;
    }

    if (att === "apperception") {
      this.infoMessage =
        winLoseDraw + ` ${winner} outsmarted ${loser}! Unsurprising.`;
    }
    if (att === "aggression") {
      this.infoMessage =
        winLoseDraw + ` ${winner} overpowered ${loser}!`;
    }
    if (att === "charm") {
      this.infoMessage =
        winLoseDraw + ` Poor ${loser} fell for ${winner}'s charms!`;
    }

    console.log(this.infoMessage);
    setTimeout(() => {
      this.exchangeCard(outcome);
      this.oppCardColor = null;
      this.playerCardColor = null;
    }, 3000);
  }

  exchangeCard(condition: string): void {
    console.log(condition);
    if (this.updateScoreAndDetermineIfLoss(condition)) {
      return;
    }
    if (condition === "win") {
      this.playerCards = [...this.playerCards, this.opponentCards.shift()];
      this.playerCards.push(this.playerCards.shift());
    } else if (condition === "lose") {
      this.opponentCards = [...this.opponentCards, this.playerCards.shift()];
      this.opponentCards.push(this.opponentCards.shift());
    } else {
      this.opponentCards.push(this.opponentCards.shift());
      this.playerCards.push(this.playerCards.shift());
    }
    //set the cards for the next round
    if (!(typeof this.playerCards[0] === 'number')) { //to deal w/ odd bug
    this.currentPlayerCard = this.playerCards[0];
    this.currentOpponentCard = this.opponentCards[0];
    }
    console.log("the new player card is", this.currentPlayerCard);
    console.log("the new opponent card is", this.currentOpponentCard);
  }

  updateScoreAndDetermineIfLoss(condition: string): boolean {
    if (condition === "lose") {
      this.playerScore--;
    }
    console.log("the player score is now" + this.playerScore);
    console.log("the player has: " + this.playerCards.length + ' cards left');
    if (this.playerCards.length - 1 < 3) {
      console.log("ROUTING");
      this.router.navigate(["/welcome"]);
      return true;
    }
    if (this.opponentCards.length - 1 < 3) {
      this.router.navigate(["/welcome"]);
      return true;
    }
    return false;
  }

  shuffle(cards: ICard[]): ICard[] {
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    return cards;
  }
}

// drawCards(deck: string): ICard {
//   this[deck].push(this[deck].unshift());
//   return this[deck][0];
// }
// this.currentPlayerCard = this.drawCards("playerCards");
// this.currentOpponentCard = this.drawCards("opponentCards");
