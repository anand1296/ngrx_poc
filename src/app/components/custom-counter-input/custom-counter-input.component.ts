import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { changeText, customIncrement } from '../../counterState/counter.actions';
import { CounterState } from '../../counterState/counter.state';

@Component({
  selector: 'app-custom-counter-input',
  templateUrl: './custom-counter-input.component.html',
  styleUrls: ['./custom-counter-input.component.scss']
})
export class CustomCounterInputComponent implements OnInit {

  counterValue: number;
  textValue: string;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
  }

  onAdd() {
    this.store.dispatch(customIncrement({value: this.counterValue}));
    this.counterValue = 0;
  }

  onTextChange() {
    this.store.dispatch(changeText({text: this.textValue}));
    this.textValue = '';
  }

}
