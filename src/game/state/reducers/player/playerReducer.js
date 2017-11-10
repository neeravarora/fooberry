import {fromJS} from 'immutable';
import Point2 from '../../Point2';
import * as actions from './playerActions';

const playerInitialState = fromJS({
  name: 'FooBerry the Wise',
  point: { x: 7, y: 7 },
  hitPoints: 100,
  maxHitPoints: 100,
  weapon: null,
  weapons: [
    { name: 'mace', damage: 8, accuracy: .5 },
    { name: 'sword', damage: 12, accuracy: .6 },
    { name: 'bow', damage: 4, accuracy: .9 },
    { name: 'axe', damage: 6, accuracy: .7}
  ]
});

export default function playerReducer(state = playerInitialState, action) {
  switch (action.type) {
  case actions.MOVE_ACTION:
    return moveTo(state, action.payload.direction);
  case actions.UPDATE_PLAYER_INFO:
    return updatePlayerInfo(state, action);
  case actions.UPDATE_PLAYER_STRENGTH:
    return updatePlayerStrength(state, action.payload.newHitPoints);
  case actions.CHOOSE_WEAPON:
    return chooseWeapon(state, action);
  case actions.FIRE_ACTION:                        // marker action - saga picks it up
    return state;
  default:
    return state;
  }
}

function moveTo(state, direction) {
  // temporary until we get our heads around the object graph
  const currentPosition = state.getIn(['point']);
  let newPosition;
  switch (direction) {
  case 'north':
    newPosition = Point2.move(currentPosition.get('x'), currentPosition.get('y'), 0, -1);
    break;
  case 'south':
    newPosition = Point2.move(currentPosition.get('x'), currentPosition.get('y'), 0, 1);
    break;
  case 'west':
    newPosition = Point2.move(currentPosition.get('x'), currentPosition.get('y'), -1, 0);
    break;
  case 'east':
    newPosition = Point2.move(currentPosition.get('x'), currentPosition.get('y'), 1, 0);
    break;
  default:
    newPosition = currentPosition;
  }

  return state.withMutations((state) => {
    return state
      .setIn(['point'], fromJS({
        x: newPosition.x,
        y: newPosition.y
      }));
  });
}

function updatePlayerInfo(state, action) {
  return state.withMutations(state => {
    state.set('name', action.payload.name);
  });
}

function updatePlayerStrength(state, hitPoints) {
  return state.withMutations(state => {
    state.set('hitPoints', hitPoints);
  });
}

function chooseWeapon(state, action) {
  return state.set('weapon', action.payload.weapon);
}
