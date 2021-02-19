import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  results: any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getSurveyResults();
  }

  getSurveyResults(){
    this.http.get<any>('https://api.surveyjs.io/private/Surveys/getSurveyResults/73b90aec-4f97-4ea9-84f3-5b39fb0446dd?accessKey=66cba137050a4be68ac02c7792d27744&from={from}&till={till}').subscribe(response => {
      this.results = response;
      console.log(this.results);
    }, error => {
      console.log('Something went wrong when requesting survey results.')
    })
  }

}
