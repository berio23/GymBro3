import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-exercise-details',
  templateUrl: './exercise-details.component.html',
  styleUrls: ['./exercise-details.component.scss']
})
export class ExerciseDetailsComponent implements OnInit {
  @Input() exercise: any;

  constructor() { }

  ngOnInit(): void {
  }
}
