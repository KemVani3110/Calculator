
import { CalState } from './../states/calc.state';
import * as CalcAction from "../Actions/calc.action"
import { createReducer, on } from '@ngrx/store';

const initialState: CalState = {
  display: '0',
  current: '',
  prev: '',
  operator: '',
};

export const calcReducer = createReducer(
  initialState,
  on(CalcAction.addDigit,(state, {digit})=>{
    let temp;
    if(state.current.includes(".") && digit === '.')
    {
      temp = state.current;
    }
    else{
      temp = state.current + digit;
    }
    return{...state,current: temp, display:temp}  ;
  } ),
  on(CalcAction.addOperator,(state, {operator})=>{
    let temp = calculate(state.prev, state.operator, state.current);
    return{...state, prev:temp,display:temp,operator:operator,current:''}
  } ),
  on(CalcAction.calculate,(state)=>{
    let temp = calculate(state.prev, state.operator, state.current);
    return{...state, prev:temp,display:temp,operator:'',current:''}
  } ),
  on(CalcAction.reset,(state)=>{
    let temp = calculate(state.prev, state.operator, state.current);
    return{display: '0',
    current: '',
    prev: '',
    operator: ''}
  } ),
)

function calculate(prev: string, operator: string, current: string)
{
  if(!prev)
  {
    return current;
  }
  else if(!current){
    return prev;
  }

  let result: number = 0;
  switch (operator) {
    case '+':
      result = parseFloat(prev) + parseFloat(current);
      break;
      case '-':
        result = parseFloat(prev) - parseFloat(current);
        break;
        case '*':
      result = parseFloat(prev) * parseFloat(current);
      break;
      case '/':
      result = parseFloat(prev) / parseFloat(current);
      break;
    default:
      break;
  }
  let final = result.toString().slice(0,12);
  if(final ==='NaN'){
    return "Syntax Error"
  }
  else{
    return final;
  }
}
