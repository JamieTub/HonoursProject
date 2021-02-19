import { Component, OnInit } from '@angular/core';
import * as Survey from "survey-angular";

Survey.StylesManager.applyTheme("modern");
var surveyJSON = { surveyId: '73b90aec-4f97-4ea9-84f3-5b39fb0446dd', surveyPostId: '191dee6c-4a65-4279-ab62-2d46e71cecba'}

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
