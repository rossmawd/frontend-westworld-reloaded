import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  playerInput: string
  //@Output() playerNameOut: EventEmitter<string> = new EventEmitter<string>();

  startGame() {
    //this.playerNameOut.emit(this.playerInput)
    console.log('game starting')
    this.router.navigate(['/game', {name: this.playerInput}])
  }

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
  }

}
