import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Game } from '../../models/game';
import { ProfileSectionComponent } from './profile-section/profile-section.component';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {
  MatDialog,
} from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import {MatDialogModule} from '@angular/material/dialog';
import { GameInfoComponent } from '../game-info/game-info.component';


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
export class GameComponent {

  currentCard: string = '';
  pickCardAnimation: boolean = false;
  game: Game;

  constructor(public dialog: MatDialog) {
    this.game = new Game();
  }

  newGame() {
    this.game = new Game(); 
  }

  takeCard(): void {
    if (this.pickCardAnimation == false && this.game.stack.length > 0) {
      this.pickCardAnimation = true;
      this.currentCard = this.game.stack.pop()!;

      setTimeout((): void => {
        this.pickCardAnimation = false;
        this.game.playedCards.push(this.currentCard);
        this.nextPlayer();
      }, 1000);
    }
  }

  nextPlayer(): void {
    if(this.game.currentPlayer === this.game.players.length - 1) {
      this.game.currentPlayer = 0;
    } else {
      this.game.currentPlayer++;
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name:string) => {
      this.game.players.push(name);
    });
  }

}


