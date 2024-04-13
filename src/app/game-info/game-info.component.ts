import { Component, Input, OnChanges, OnInit, input } from '@angular/core';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-game-info',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './game-info.component.html',
  styleUrl: './game-info.component.scss'
})

export class GameInfoComponent implements OnInit, OnChanges {
  
  cardAction = [
    { title: 'Waterfall', description: 'Everyone has to start drinking at the same time. As soon as player 1 stops drinking, player 2 may stop drinking. Player 3 may stop as soon as player 2 stops drinking, and so on.' },
    { title: 'You', description: 'You decide who drinks' },
    { title: 'Me', description: 'Congrats! Drink a shot!' },
    { title: 'Category', description: 'Come up with a category (e.g. Colors). Each player must enumerate one item from the category.' },
    { title: 'Bust a jive', description: 'Player 1 makes a dance move. Player 2 repeats the dance move and adds a second one. ' },
    { title: 'Chicks', description: 'All girls drink.' },
    { title: 'Heaven', description: 'Put your hands up! The last player drinks!' },
    { title: 'Mate', description: 'Pick a mate. Your mate must always drink when you drink and the other way around.' },
    { title: 'Thumbmaster', description: '"The player who draws the card becomes the \"Thumb Master\" and can place their thumb on the table at any time. Everyone else must imitate this action. The last person to place their thumb on the table must drink.' },
    { title: 'Men', description: 'All men drink.' },
    { title: 'Quizmaster', description: 'You\'re now the Quizmaster! Your main task is to ask questions to the other players. Be creative and keep the game lively! The other players must answer the Quizmaster\'s questions and be ready for any penalties or challenges if their answers are deemed incorrect.' },
    { title: 'Never have i ever...', description: 'Say something you nnever did. Everyone who did it has to drink.' },
    { title: 'Rule', description: 'Make a rule. Everyone needs to drink when he breaks the rule.' },
  ];

  cardTitle:string = '';
  cardDescription:string = '';
  @Input() card:string = ''; 

  ngOnChanges() {
    if(this.card && !isNaN(+this.card.split('_')[1]) && typeof +this.card.split('_')[1] === "number") {
      let cardNumber: number = +this.card.split('_')[1];
      this.cardTitle = this.cardAction[cardNumber - 1].title;
      this.cardDescription = this.cardAction[cardNumber - 1].description;
    }
  }

  ngOnInit() {
  }
}
