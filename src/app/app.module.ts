import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardComponent } from './card/card.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { GameComponent } from './game/game.component';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    ToolbarComponent,
    GameComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
