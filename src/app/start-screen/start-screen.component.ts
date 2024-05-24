import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FirebaseServiceService } from '../services/firebase-service.service';
import { Game } from '../../models/game'; 

@Component({
  selector: 'app-start-screen',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './start-screen.component.html',
  styleUrl: './start-screen.component.scss'
})
export class StartScreenComponent {

  constructor(private router: Router, private fireService: FirebaseServiceService) {

  }

  startNewGame() {
    let game = new Game()
    game.players.push('ben');
    this.fireService.addGame((game).toJSON()).then( (gameId) => {
      if(gameId){
        this.router.navigateByUrl(`/game/${gameId}`);
      } else {
        console.error('spiel konnte nicht erstellt werden.')
      }
    });
  }
}
