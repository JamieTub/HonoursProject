import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ResultsComponent } from './results/results.component';
import { SurveyComponent } from './survey/survey.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'results', component: ResultsComponent},
  { path: 'survey', component: SurveyComponent},
  { path: '**', component: HomeComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
