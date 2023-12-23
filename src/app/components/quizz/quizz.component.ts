import { Component, OnInit } from '@angular/core';
import quiz_hero from "../../../assets/data/quizz_questions.json";
import quiz_ffx from "../../../assets/data/quizz_ffx.json";

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})

export class QuizzComponent implements OnInit {

  quizz_questions = quiz_ffx;

  title:string = "";

  questions:any;
  questionSelected:any;

  answers:string[] = [];
  answerSelected:string = "";
  answerImage:string = "";

  questionIndex:number = 0;
  questionMaxIndex:number = 0;

  finished:boolean = false;



  constructor() { }

  ngOnInit(): void {
    if(this.quizz_questions){
      this.finished = false
      this.title = this.quizz_questions.title

      this.questions = this.quizz_questions.questions
      this.questionSelected = this.questions[this.questionIndex]

      this.questionIndex = 0
      this.questionMaxIndex = this.questions.length;

    }
  }

  playerChoice(value:string){
    this.answers.push(value)
    this.nextStep()
  }

  async nextStep(){
    this.questionIndex++

    if(this.questionMaxIndex > this.questionIndex) {
      this.questionSelected = this.questions[this.questionIndex]

    } else {
      const finalResult:string = await this.checkResult(this.answers)
      this.finished = true;
      this.answerSelected = this.quizz_questions.results[finalResult as keyof typeof this.quizz_questions.results].result
      this.answerImage = this.quizz_questions.results[finalResult as keyof typeof this.quizz_questions.results].img

    }
  }

  async checkResult(answers:string[]){
    const result = answers.reduce((previous, current, i, arr)=>{
      if(
          arr.filter(item => item === previous).length >
          arr.filter(item => item === current).length
         ){
            return previous
      } else {
        return current
      }
    })

    return result;
  }

}
