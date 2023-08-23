import { Component, OnInit } from '@angular/core';
import { ViewQuestionService } from './service/view-question.service';
import { ActivatedRoute, Params } from '@angular/router';
import { viewQuestionInterface } from '../level-interfaces';

@Component({
  selector: 'app-view-questions',
  templateUrl: './view-questions.component.html',
  styleUrls: ['./view-questions.component.css'],
})
export class ViewQuestionsComponent implements OnInit {
  constructor(
    private viewQuesService: ViewQuestionService,
    private route: ActivatedRoute
  ) {}

  allQuestions!: viewQuestionInterface[];
  levelId!: string;


  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.levelId = params['levelId'];
      console.log(this.levelId);
    });
    this.loadQuestions();
  }

  private loadQuestions() {
    this.viewQuesService.getAllQuestions(this.levelId).subscribe(
      (resData: any) => {
        console.log(resData.data);
        this.allQuestions = resData.data;
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
}
