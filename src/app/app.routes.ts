import { Routes } from '@angular/router';
import { StartScreenComponent } from './start-screen/start-screen.component';
import { GameComponent } from './game/game.component';
import path from 'path';
import { pathToFileURL } from 'url';


export const routes: Routes = [
    { path: '', component: StartScreenComponent },
    { path: 'game/:id', component: GameComponent },    
];
