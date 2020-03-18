import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { WelcomeService } from "./welcome.service";

@Component({
  selector: "app-welcome",
  templateUrl: "./welcome.component.html",
  styleUrls: ["./welcome.component.scss"]
})
export class WelcomeComponent implements OnInit {
  playerInput: string;
  //@Output() playerNameOut: EventEmitter<string> = new EventEmitter<string>();

  startGame() {
    //this.playerNameOut.emit(this.playerInput)
    console.log("game starting");
    this.welcomeService.setUserName(this.playerInput)
    this.router.navigate(["/game"]);

  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private welcomeService: WelcomeService
  ) {}

  ngOnInit(): void {

  }
}
