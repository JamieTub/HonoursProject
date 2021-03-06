import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BarComponent } from './bar/bar.component';
import { LineComponent } from './line/line.component';
import { PieComponent } from './pie/pie.component';
import { HomeComponent } from './home/home.component';
import { ResultsComponent } from './results/results.component';
import { SurveyComponent } from './survey/survey.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'survey', component: SurveyComponent},
  { path: 'results', component: ResultsComponent},
  { path: 'results/bar', component: BarComponent},
  { path: 'results/line', component: LineComponent},
  { path: 'results/pie', component: PieComponent},
  { path: 'about', component: AboutComponent},
  { path: '**', component: HomeComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
