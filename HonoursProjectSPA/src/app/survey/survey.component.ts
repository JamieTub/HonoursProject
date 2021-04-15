import { Component, OnInit } from '@angular/core';
import * as Survey from "survey-angular";

Survey.StylesManager.applyTheme("modern");
var surveyJSON = { surveyId: 'a7bcbfdd-753c-48a5-bf11-5c183e864e0c', surveyPostId: 'a138df6b-d718-4df0-9bf7-7b04e047767d'}


@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit {
  

  constructor() { }

  ngOnInit() {
    var survey = new Survey.Model(surveyJSON);
    Survey.SurveyNG.render("surveyElement", { model: survey });
}

}
