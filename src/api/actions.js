import { actions } from '.';

export function getHi() {
  return actions.get('/hi');
}

export function getActions() {
  return actions.get('/list');
}