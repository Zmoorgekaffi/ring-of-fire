import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Game } from '../../models/game';
import { ProfileSectionComponent } from './profile-section/profile-section.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialog,
} from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { MatDialogModule } from '@angular/material/dialog';
import { GameInfoComponent } from '../game-info/game-info.component';
import { FirebaseServiceService } from '../services/firebase-service.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    CommonModule,
    ProfileSectionComponent,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    GameInfoComponent
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent implements OnInit, OnDestroy {

  currentCard: string = '';
  pickCardAnimation: boolean = false;
  public game: Game;
  gameSub: any;

  constructor(public dialog: MatDialog, public firebaseService: FirebaseServiceService, private aRoute: ActivatedRoute) {
    this.game = new Game;
   }

  ngOnInit(){
    this.aRoute.params.subscribe((params) => {

      this.gameSub = this.firebaseService.subSingleGame(params['id']).subscribe( (gameData) => {
        this.updateGameData(gameData);
        console.log(this.game);
      },((err) => {
        console.warn(err);
      }));
    }); 
  }

  ngOnDestroy(): void {
    if(this.gameSub) {
      this.gameSub.unsubscribe();
    }
  }

  updateGameData(gameData:any) {
    this.game.players = gameData.players;
    this.game.currentPlayer = gameData.currentPlayer;
    this.game.stack = gameData.stack;
    this.game.playedCards = gameData.playedCards;
  }

  async newGame() {
    this.game = new Game();
    //await this.firebaseService.addGame((this.game as Game).toJSON()); //erstellt ein neues spiel

  }

  takeCard(): void {
    if (this.game instanceof Game) {
      if (this.pickCardAnimation == false && this.game.stack.length > 0 && this.game.players.length !== 0) {
        this.pickCardAnimation = true;
        this.currentCard = this.game.stack.pop()!;
        setTimeout((): void => {
          this.pickCardAnimation = false;
          (this.game as Game).playedCards.push(this.currentCard);
          this.nextPlayer();
          console.log('games stack is: ', this.game.stack);
          this.updateGameInFirestore();
        }, 1000);
      }
      else if (this.game.players.length === 0) {
        alert('Please add players first');
      }
    }
  }

  updateGameInFirestore() {
    this.aRoute.params.subscribe((params)=>{
      this.firebaseService.updateGame(params['id'], this.game.toJSON());
    })
  }

  nextPlayer() {
    if (this.game instanceof Game) {
      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
    }
  }

  addPlayerToPlayersArray(name: string) {
    if(this.game instanceof Game) {
      this.game.players.push(name);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      this.addPlayerToPlayersArray(name);
      this.updateGameInFirestore();
    });
  }

  
}
