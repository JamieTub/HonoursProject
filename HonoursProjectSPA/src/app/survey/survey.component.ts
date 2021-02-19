import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit {
  

  constructor() { }

  ngOnInit(): void {
    var survey = new Survey.Model(surveyJSON);
    survey.onComplete.add(sendDataToServer);
   Survey.SurveyNG.render("surveyElement", { model: survey });
}

  

}
