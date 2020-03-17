import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameComponent } from './game/game.component';
import { CardComponent } from './card/card.component';


const routes: Routes = [
  {path: 'game', component: GameComponent},
  {path: 'welcome', component: CardComponent},
  {path: '', redirectTo: "welcome", pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }


// RouterModule.forRoot([
//   { path: "products", component: ProductListComponent },
//   { path: "products/:id", component: ProductDetailComponent },
//   { path: "welcome", component: WelcomeComponent },
//   { path: "images", component: ImagesComponent },
//   { path: "", redirectTo: "welcome", pathMatch: "full" },
//   { path: "**", redirectTo: "welcome", pathMatch: "full" }
// ])