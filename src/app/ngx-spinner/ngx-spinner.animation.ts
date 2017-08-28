import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

import { NgxSpinnerPosition } from './ngx-spinner.controller';

interface AnimationStateDefinition {
  [key: string]: {
    active:   { [key: string]: string | number },
    inactive: { [key: string]: string | number }
  }
}

const defaultTransition = animate('200ms ease-in-out');
const animationStates: AnimationStateDefinition = {
  'top-right': {
    active:   { top: 0, right: '1%', transform: 'translateY(0)' },
    inactive: { top: 0, right: '1%', transform: 'translateY(-200%)' }
  },
  'top-left': {
    active:   { top: 0, left: '1%', transform: 'translateY(0)' },
    inactive: { top: 0, left: '1%', transform: 'translateY(-200%)' }
  },
  'bottom-right': {
    active:   { bottom: 0, right: '1%', transform: 'translateY(0)' },
    inactive: { bottom: 0, right: '1%', transform: 'translateY(100%)' }
  },
  'bottom-left': {
    active:   { bottom: 0, left: '1%', transform: 'translateY(0)' },
    inactive: { bottom: 0, left: '1%', transform: 'translate(100%)' }
  }
};

export function buildState(isPresent: boolean, position: NgxSpinnerPosition) {
  return `${ isPresent ? 'active' : 'inactive' }--${ position }`;
}

export function animationStateReducer(states, stateKey) {
  const start = buildState(true, stateKey);
  const end = buildState(false, stateKey);
  const stateDef = [
    state(start, style(animationStates[stateKey].active)),
    state(end, style(animationStates[stateKey].inactive)),
    transition(`${ start } => ${ end }`, defaultTransition),
    transition(`${ end } => ${ start }`, defaultTransition)
  ];
  return [ ...states, ...stateDef ];
}

export const spinnerAnimationTrigger = Object
  .keys(animationStates)
  .reduce(animationStateReducer, []);
