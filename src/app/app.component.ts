
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CalState } from 'src/states/calc.state';
import * as CalcAction from "../Actions/calc.action"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'calculator';
  cal$!: Observable<CalState>;
  constructor(private store:Store<{calc: CalState}>){
    this.cal$ = this.store.select('calc');
  }

  getdigit(digit: string) {
    this.store.dispatch(CalcAction.addDigit({ digit: digit }))
 }

 addOperator(operator: string)
 {
    this.store.dispatch(CalcAction.addOperator({operator: operator}));
 }

 calculate()
 {
  this.store.dispatch(CalcAction.calculate());
 }

 reset()
 {
  this.store.dispatch(CalcAction.reset());
 }
}
