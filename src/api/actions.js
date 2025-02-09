import { actions } from '.';

export function getHi() {
  return actions.get('/hi');
}

export function getActions() {
  let result= actions.get('/list');

  return result? result : {};
}

export function postSaveActions() {
  let result= actions.post('/list');

  return result? result : {};
}
