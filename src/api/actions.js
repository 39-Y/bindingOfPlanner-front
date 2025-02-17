import { actions } from '.';

export function getHi() {
  return actions.get('/hi');
}

export function getActions() {
  let result= actions.get('/list');

  return result? result : {};
}

export function postSaveActions(cache) {
  let result= actions.post('/list', cache)
    .then(error => {
      console.log("Error:",error)
    });

  return result? result : {};
}
