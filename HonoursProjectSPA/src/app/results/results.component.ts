import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import * as d3 from 'd3';
import survey from './../_data/survey.json';
import { FormsModule } from '@angular/forms'
import appSecrets from '../appSecrets.json'

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  results: any;
  data: any = [];
  selectedOption: number;
  barchart = false;
  piechart = false;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getSurveyResults();  
  }

  getSurveyResults(){
    this.http.get<any>(appSecrets.url).subscribe(response => {
      this.results = response;
      console.log(this.results)
      //console.log(this.results);
    }, error => {
      console.log('Something went wrong when requesting survey results.')
    })
  }

  //the trigger of the dropdown
  renderChart(){
    this.barchart = false;
    this.piechart = false;
    //call getLabels
    let labels = this.getQuestionLabels(this.selectedOption);
    //call questionResults
    let results = this.getQuestionResults(this.selectedOption, labels);
  } 

  //this took me a whole afternoon
  //should be labels.length

  // getNumberOfAnswers(question: number){
  //   if(question < 6){
  //     for(var i = 0; i < survey.pages[0].elements.length; i++){
  //       if(survey.pages[0].elements[i].name == "question" + question){
  //           let noAn = survey.pages[0].elements[i];
  //           let numChoices = noAn.choices.length;
  //           return numChoices;
  //       }
  //     }
  //   }
  //  else{
  //     question = question - 6;
  //     for(var i = 0; i < survey.pages[0].elements.length; i++){
  //       if(survey.pages[1].elements[i].name == "question" + question){
  //           let noAn = survey.pages[1].elements[i];
  //           let numChoices = noAn.choices.length;
  //           return numChoices;
  //       }
  //     }
  //   }
  // }

  getQuestionResults(question: number, labels: any[]) {
    let type = this.getQuestionType(question);
    let values = [];
    if(type == "checkbox") {
      //do count for arrays
      let answers = this.getArrayQuestionResult();
      //let size = labels.length;
      let results = this.countAllOccurences(answers, labels)

      // let countOccurrences = (answers, val) =>
      // answers.reduce((a, v) => (v === val ? a + 1 : a), 0);

      // for(var i = 1; i <= size; i++){
      //   values.push(countOccurrences(answers, "item" + i))
      // }
      //call CreateBarChartData(labels, values)
      this.CreateBarChartData(labels, results)
    }
    else if(type == "radiogroup" || type == "dropdown") {
      //do count for singles
      //call CreateBarChartData(labels, values)
    }
    else if(type = "boolean") {
      //do count for booleans
      let answers = this.getBoolAnswer();
      let results = this.countBools(answers)
      this.CreatePieChartData(results)

    }
  }

  countBools(answers){
    let values = [];
    var numOfTrue = 0;

    for(var i = 0; i < answers.length; i++){
      if(answers[i] == true){
        numOfTrue++;
      }
    }
    var numOfFalse = answers.length - numOfTrue;
    values.push(numOfTrue, numOfFalse);
    console.log(values)
    return values;
  }

  //counts all occurences of all elements, and replaces empty elements with 0
  countAllOccurences(values, labels) {
    //create emtpy array
    let results = [];

    //add 0 to the array for every label that is available
    labels.forEach(element => {
      results.push(0);
    });

    //for every value in the array
    values.forEach(element => {
      //take the last number in the string and take away 1
      //EXAMPLE: "item2" = 2,
      //          2 - 1 = 1
      let num: number = element.substring(element.length - 1) - 1;

      //using the number in the string, add 1 to the number in the position of the array
      results[num]++;
    });
    console.log(results)
    return results;
  }

  getQuestionType(question: number) {
    if(question < 6) {
      return survey.pages[0].elements[question - 1].type;
    } else {
      return survey.pages[1].elements[question - 6].type;
    }
  }

  getQuestionLabels(question: number) {
    let labels = [];
    if(question < 6) {
      if(survey.pages[0].elements[question - 1].type == "boolean") {
        labels.push("false");
        labels.push("true");
      } else{
        for(let i = 0; i < survey.pages[0].elements[question - 1].choices.length; ++i) {
          labels.push(survey.pages[0].elements[question - 1].choices[i].text);
        }
      }
    } else {
      if(survey.pages[1].elements[question - 6].type == "boolean") {
        labels.push("false");
        labels.push("true");
      } else{
        for(let i = 0; i < survey.pages[1].elements[question - 6].choices.length; ++i) {
          labels.push(survey.pages[1].elements[question - 6].choices[i].text);
        }
      }
    }
    return labels
  } 

  getArrayQuestionResult(){
    let answers = [];
    if(this.selectedOption == 1) {
      
      for(let i = 0; i < this.results.Data.length; ++i) {
        for(let j = 0; j < this.results.Data[i].question1.length; ++j) {
          answers.push(this.results.Data[i].question1[j]);
        }
      }
    }
    else if(this.selectedOption == 8) {
      for(let i = 0; i < this.results.Data.length; ++i) {
        for(let j = 0; j < this.results.Data[i].question8.length; ++j) {
          answers.push(this.results.Data[i].question8[j]);
        }
      }
    }
    else if(this.selectedOption == 9) {
      for(let i = 0; i < this.results.Data.length; ++i) {
        for(let j = 0; j < this.results.Data[i].question9.length; ++j) {
          answers.push(this.results.Data[i].question9[j]);
        }
      }
    }
    else if(this.selectedOption == 10) {
      for(let i = 0; i < this.results.Data.length; ++i) {
        for(let j = 0; j < this.results.Data[i].question10.length; ++j) {
          answers.push(this.results.Data[i].question10[j]);
        }
      }
    }
    return answers;

  }

  getBoolAnswer(){
    let answers = [];
    //4,6,7
    if(this.selectedOption == 4){
      for(let i = 0; i < this.results.Data.length; ++i){
        answers.push(this.results.Data[i].question4);
      }
    }
    else if(this.selectedOption == 6){
      for(let i = 0; i < this.results.Data.length; ++i){
        answers.push(this.results.Data[i].question6);
      }
    }
    else if(this.selectedOption == 7){
      for(let i = 0; i < this.results.Data.length; ++i){
        answers.push(this.results.Data[i].question7);
      }
    }
    return answers;
  }

  CreatePieChartData(answers){
    let data = [
      {"label": "true " + answers[0], "value": answers[0]},
      {"label": "false " + answers[1], "value": answers[1]}];

      if(answers[0] == 0){
        data[0].label = ""
      }
      if(answers[1] == 0){
        data[1].label = ""
      }

    this.data = data;
    this.piechart = true;
    this.barchart = false;
  }

  CreateBarChartData(labels, values) {
    let data = [];
    for(let i = 0; i < labels.length; ++i) {
      let obj = {
        "x":labels[i],
        "y":values[i]
      }
      data.push(obj);
    }
    this.data = data;
    this.piechart = false;
    this.barchart = true;
    
  }

}
