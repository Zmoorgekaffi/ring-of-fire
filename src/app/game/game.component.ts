import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
export class GameComponent implements OnInit {

  currentCard: string = '';
  pickCardAnimation: boolean = false;
  public game: Game;

  constructor(public dialog: MatDialog, public firebaseService: FirebaseServiceService, private aRoute: ActivatedRoute) {
    this.game = new Game;
   }

  ngOnInit(): void {
    this.newGame();
    this.aRoute.params.subscribe((params) => {
      this.firebaseService.subSingleGame(params['id']).then( () => {
        this.updateGameData();
        console.log(this.game);
      }).catch((err) => {
        console.warn(err);
      });
    }); 
  }

  updateGameData() {
    this.game.players = this.firebaseService.gameData.players;
    this.game.currentPlayer = this.firebaseService.gameData.currentPlayer;
    this.game.stack = this.firebaseService.gameData.stack;
    this.game.playedCards = this.firebaseService.gameData.playedCards;
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
          console.log('games stack is: ',this.game.stack);
        }, 1000);
      }
      else if (this.game.players.length === 0) {
        alert('Please add players first');
      }
    }
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
    });
  }
}
