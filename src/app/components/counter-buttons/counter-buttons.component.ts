import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { decrement, double, increment, reset } from 'src/app/counterState/counter.actions';
import { COUNTER_STATE_NAME, getCounter } from 'src/app/counterState/counter.selectors';
import { CounterState } from 'src/app/counterState/counter.state';

@Component({
  selector: 'app-counter-buttons',
  templateUrl: './counter-buttons.component.html',
  styleUrls: ['./counter-buttons.component.scss']
})
export class CounterButtonsComponent implements OnInit {

  // @Output() increment = new EventEmitter<void>();
  // @Output() decrement = new EventEmitter<void>();
  // @Output() reset = new EventEmitter<void>();

  counter : number;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.select(getCounter).subscribe((data: any) => {
      this.counter = data.counter;
    });
  }

  onIncrement() {
    // this.increment.emit();
    this.store.dispatch(increment())
  }

  onDecrement() {
    // this.decrement.emit();
    this.store.dispatch(decrement());
  }

  onReset() {
    // this.reset.emit();
    this.store.dispatch(reset());
  }

  onDouble() {
    this.store.dispatch(double())
  }

}
