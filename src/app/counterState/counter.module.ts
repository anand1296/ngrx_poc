import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CounterComponent } from '../components/counter/counter.component';
import { CounterButtonsComponent } from '../components/counter-buttons/counter-buttons.component';
import { CounterOutputComponent } from '../components/counter-output/counter-output.component';
import { CustomCounterInputComponent } from '../components/custom-counter-input/custom-counter-input.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from '../home/home.component';
import { StoreModule } from '@ngrx/store';
import { counterReducer } from './counter.reducer';
import { COUNTER_STATE_NAME } from './counter.selectors';

const routes: Routes = [
    {
        path: '', component: CounterComponent
    },
    {
        path: '**', component: HomeComponent
    }
]

@NgModule({
    declarations: [
        CounterComponent,
        CounterButtonsComponent,
        CounterOutputComponent,
        CustomCounterInputComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),
        StoreModule.forFeature(COUNTER_STATE_NAME, counterReducer)
    ]
})

export class CounterModule { }