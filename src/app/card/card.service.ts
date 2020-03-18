import { Injectable } from '@angular/core';
import {ICard} from './card'
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, tap, filter } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class CardService {
  //to allow a local path to work here: in angular.json 
  // add 'src/api' to the assets array
  private cardUrl = "api/cards/cards.json";

  constructor(private http: HttpClient) { }

  getCards(): Observable<ICard[]> {
    return this.http.get<ICard[]>(this.cardUrl).pipe(
      tap(data => console.log(data)),
      catchError(this.handleError) //CATCH <<<-----
    );
  }

  private handleError(res: HttpErrorResponse) {
    let errorMessage = " ";
    if (res.error instanceof ErrorEvent) {
      //is A an instance of class B
      errorMessage = `An error occured: ${res.error.message}`;
    } else {
      errorMessage = `Server returned code: ${res.status}, error message is:
            ${res.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage); //THROW -->>>>>
  }
}
