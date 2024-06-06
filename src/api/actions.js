import { actions } from '.';

export function getHi() {
  return actions.get('/hi');
}