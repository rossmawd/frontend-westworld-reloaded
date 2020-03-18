import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms'
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardComponent } from './card/card.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { GameComponent } from './game/game.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    ToolbarComponent,
    GameComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


// RouterModule.forRoot([
//   { path: "products", component: ProductListComponent },
//   { path: "products/:id", component: ProductDetailComponent },
//   { path: "welcome", component: WelcomeComponent },
//   { path: "images", component: ImagesComponent },
//   { path: "", redirectTo: "welcome", pathMatch: "full" },
//   { path: "**", redirectTo: "welcome", pathMatch: "full" }
// ])