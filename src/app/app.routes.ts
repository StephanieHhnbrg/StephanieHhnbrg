import { Routes } from '@angular/router';
import {AnimationPageComponent} from "./pages/animation-page/animation-page.component";
import {OldPageComponent} from "./pages/old-page/old-page.component";

export const routes: Routes = [
  { path: 'deprecated', component: OldPageComponent }, // TODO: encapsulate old page as model and do lazy loading // https://angular.love/angular-router-everything-you-need-to-know-about
  { path: '', component: AnimationPageComponent },
];
