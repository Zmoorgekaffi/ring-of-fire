import { Injectable, inject, OnDestroy } from '@angular/core';
import { Firestore, collection, doc, onSnapshot, addDoc, updateDoc } from '@angular/fire/firestore';
import { unsubscribe } from 'node:diagnostics_channel';
import { stringify } from 'node:querystring';
import { Observable, Subscription } from 'rxjs';
import { GameComponent } from '../game/game.component';
import { log } from 'node:console';

interface GameData {
  players: [],
  playedCards: [],
  currentPlayer: number,
  stack: []
}

@Injectable({
  providedIn: 'root'
})
export class FirebaseServiceService {

  firestore: Firestore = inject(Firestore);

  // unsubGames;
  unsubSingleGame: any;
  gameData: GameData = {
    players: [],
    playedCards: [],
    currentPlayer: 0,
    stack: []
  };
  gameId: string = '';

  constructor() {
    //   this.unsubGames = onSnapshot(this.getColRef('games'), (list) => {
    //   list.forEach(game => {
    //     console.log('item data is: ', game.data());
    //   });
    // });
  }

  subSingleGame(paramId: string): Observable<any> {
    return new Observable((observer) => {
      this.unsubSingleGame = onSnapshot(doc(this.getColRef('games'), paramId), (doc) => {
        if (doc.exists()) {
          let docData = doc.data();
          this.copyDocDataToGameData(docData);
          observer.next(this.gameData);
        } else {
          console.warn('das spiel kontte nicht geladen werden!');
          observer.error('das spiel konnte nicht geladen werden!')
        }
      }, (error) => {
        console.warn('Fehler beim laden des Spiels: ', error);
      });
    return () => this.unsubSingleGame();
    });
  }

  copyDocDataToGameData(docData: any) {
    this.gameData.players = docData['players'];
    this.gameData.playedCards = docData['playedCards'];
    this.gameData.stack = docData['stack'];
    this.gameData.currentPlayer = docData['currentPlayer'];
  }

  getColRef(colId: string) {
    return collection(this.firestore, colId);
  }

  async addGame(game: any){
    try {
      let newGame = await addDoc(this.getColRef('games'), game);
      return newGame['id'];
    } catch (error) {
      return false;
    }
  }

  async updateGame(gameId:string, gameData:any) {
    try {
      let docRef = doc(this.getColRef('games'), gameId);
      await updateDoc(docRef, gameData)
    } catch (err) {
      console.warn('ein fehler ist aufgetreten: ', err)
    }
  }

  ngOnDestroy() {
    // if (this.unsubGames) {
    //   this.unsubGames();
    // }
    if (this.unsubSingleGame) {
      this.unsubSingleGame();
    }
  }
}
