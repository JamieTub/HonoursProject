import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ResultsComponent } from './results/results.component';
import { SurveyComponent } from './survey/survey.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
<<<<<<< HEAD
  { path: 'survey', component: SurveyComponent},
  { path: 'results', component: ResultsComponent},
  { path: '**', component: HomeComponent, pathMatch: 'full' }
=======
  { path: 'results', component: ResultsComponent},
  { path: 'survey', component: SurveyComponent},
  { path: '**', component: HomeComponent, pathMatch: 'full'},
>>>>>>> 8be94c48e0b954a23eb3fd9ee11305e98ebb6e82
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
