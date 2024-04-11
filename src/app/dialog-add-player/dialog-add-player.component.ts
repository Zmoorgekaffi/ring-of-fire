import {Component, Inject} from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule, matFormFieldAnimations} from '@angular/material/form-field';
import { GameComponent } from '../game/game.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dialog-add-player',
  standalone: true,
  imports: [
    MatButtonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    GameComponent,
    CommonModule,
    MatDialogModule
  ],
  templateUrl: './dialog-add-player.component.html',
  styleUrl: './dialog-add-player.component.scss'
})
export class DialogAddPlayerComponent {

  name:string = "";


}
