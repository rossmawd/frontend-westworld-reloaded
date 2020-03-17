import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  playerName: string;

  startGame() {
    console.log('game starting')
    this.router.navigate(['/game'])
  }

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
  }

}
