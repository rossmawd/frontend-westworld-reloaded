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
  infoMessage: string = 'Choose one of your character\'s attributes to fight!'

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
        this.currentPlayerCard = this.drawCards("playerCards");
        this.currentOpponentCard = this.drawCards("opponentCards");
      },
      error: err => (this.errorMessage = err)
    });

    this.playerName
      ? null
      : (this.playerName = this.welcomeService.getUserName());
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
    let winLoseDraw: string 
    if (outcome === 'win') {winLoseDraw = 'You Win a Card!'}
    if (outcome === 'lose') {winLoseDraw = 'You Lose a Card!'}
    if (outcome === 'draw') {winLoseDraw = `It\'s a stalemate! Re-Draw!`}

    // console.log(`${winner} used ${att} to defeat ${loser}`);
    if (att === 'apperception') {
      this.infoMessage = winLoseDraw + ` ${winner} outsmarted ${loser}! Smarty Pants.`
    }
    if ( att === 'aggression') {
      this.infoMessage = winLoseDraw + ` ${loser}'s strength was no match for ${winner}!`
    }
    if ( att === 'charm') {
      this.infoMessage = winLoseDraw + ` Poor ${loser} has fallen for ${winner}'s charms!`
    }  
    console.log(this.infoMessage)
    this.exchangeCard(outcome);
  }

  exchangeCard(condition: string): void {
    console.log(condition);
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
    this.currentPlayerCard = this.playerCards[0];
    this.currentOpponentCard = this.opponentCards[0];
    console.log("the new player card is", this.currentPlayerCard);
    console.log("the new opponent card is", this.currentOpponentCard);
  }

  drawCards(deck: string): ICard {
    this[deck].push(this[deck].unshift());
    return this[deck][0];
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
