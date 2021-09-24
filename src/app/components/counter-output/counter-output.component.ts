import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { CounterState } from 'src/app/counterState/counter.state';
import { getCounter, getText } from 'src/app/counterState/counter.selectors';
import { AppState } from 'src/app/app.state';

@Component({
  selector: 'app-counter-output',
  templateUrl: './counter-output.component.html',
  styleUrls: ['./counter-output.component.scss']
})
export class CounterOutputComponent implements OnInit, OnDestroy {

  // @Input() counter;
  counter : number;
  text: string;
  counterSubscription: Subscription;
  textSubscription: Subscription;
  counter$: Observable<{counter: number}>;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.counterSubscription = this.store.select(getCounter).subscribe((data) => {
      console.log('Counter observable is called.');
      this.counter = data;
    });

    this.counterSubscription = this.store.select(getText).subscribe((data) => {
      console.log('Text observable is called.');
      this.text = data;
    });

    // this.counter$ = this.store.select('counter');
  }

  ngOnDestroy() {
    if(this.counterSubscription) {
      this.counterSubscription.unsubscribe();
    }

    if(this.textSubscription) {
      this.textSubscription.unsubscribe();
    }
  }

}
