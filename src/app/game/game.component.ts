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
  playerScore: number = 50

  constructor(
    private route: ActivatedRoute,
    private welcomeService: WelcomeService,
    private cardService: CardService,
    private router: Router,
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
    if (outcome === 'win') {winLoseDraw = 'You Won a Card!'}
    if (outcome === 'lose') {winLoseDraw = 'You Lost a Card!'}
    if (outcome === 'draw') {winLoseDraw = `It\'s a stalemate! Re-Draw!`}

    // console.log(`${winner} used ${att} to defeat ${loser}`);
    if (att === 'apperception') {
      this.infoMessage = winLoseDraw + ` ${winner} outsmarted ${loser}! Unsurprising.`
    }
    if ( att === 'aggression') {
      this.infoMessage = winLoseDraw + ` ${loser}'s strength was no match for ${winner}!`
    }
    if ( att === 'charm') {
      this.infoMessage = winLoseDraw + ` Poor ${loser} fell for ${winner}'s charms!`
    }  
    console.log(this.infoMessage)
    outcome === 'win' ? this.oppCardColor = '#ff3333' : this.playerCardColor = '#ff3333' 
    setTimeout(() => {
      this.exchangeCard(outcome)
      this.oppCardColor = null 
      this.playerCardColor = null
    }, 3000)
   
    
  }

  updateScoreAndDetermineIfLoss(condition: string): boolean{
    if (condition === 'lose') {this.playerScore --}
    console.log('the player score is now' + this.playerScore)
    console.log('the player has' + this.playerCards.length)
    if (this.playerCards.length - 1 < 3) { 
      console.log('ROUTING')
      this.router.navigate(["/welcome"]);
      return true
    }
    if (this.opponentCards.length -1 < 3) {
      this.router.navigate(["/welcome"])
      return true
    }
   

    return false
  }

  exchangeCard(condition: string): void {
    console.log(condition);
    if (this.updateScoreAndDetermineIfLoss(condition)){return}
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
