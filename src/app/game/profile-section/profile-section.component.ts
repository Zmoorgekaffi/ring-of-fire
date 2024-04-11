import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Game } from '../../../models/game';


@Component({
  selector: 'app-profile-section',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './profile-section.component.html',
  styleUrl: './profile-section.component.scss'
})
export class ProfileSectionComponent {

  @Input() playerNameInput: string = '';  
  @Input() playerIsActive: boolean = false;

}
