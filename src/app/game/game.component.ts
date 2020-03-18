import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { WelcomeService } from "../welcome/welcome.service";

@Component({
  selector: "app-game",
  templateUrl: "./game.component.html",
  styleUrls: ["./game.component.scss"]
})
export class GameComponent implements OnInit {
  playerName: string;

  constructor(
    private route: ActivatedRoute,
    private welcomeService: WelcomeService
  ) {}

  ngOnInit(): void {
    //this.playerName = this.route.snapshot.paramMap.get("name");
    this.playerName = this.welcomeService.getUserName()
  }
}
