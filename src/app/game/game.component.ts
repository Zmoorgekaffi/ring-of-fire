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
import { DialogModule } from '@angular/cdk/dialog';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    CommonModule,
    ProfileSectionComponent,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    DialogModule
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

  takeCard() {
    if (this.pickCardAnimation == false && this.game.stack.length > 0) {
      this.pickCardAnimation = true;
      this.currentCard = this.game.stack.pop()!;
      console.log(this.game.playedCards);

      setTimeout(() => {
        this.pickCardAnimation = false;
        this.game.playedCards.push(this.currentCard);
      }, 1000);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}


