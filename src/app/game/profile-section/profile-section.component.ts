import { Component, Input } from '@angular/core';
import { Game } from '../../../models/game';


@Component({
  selector: 'app-profile-section',
  standalone: true,
  imports: [
  ],
  templateUrl: './profile-section.component.html',
  styleUrl: './profile-section.component.scss'
})
export class ProfileSectionComponent {

  @Input() playerNameInput: string = '';  

}
