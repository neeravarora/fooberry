import * as playerActions from '../reducers/player/playerActions';
import * as npcActionCreators from '../reducers/npcs/npcActionCreators';
import { take, put, select} from 'redux-saga/effects';

export function* npcMovementSaga() {
  while (true) {
    yield take(playerActions.MOVE_ACTION);
    const state = yield select();
    const playerLocation = state.player.get('point');
    const playerPoint = {
      x: playerLocation.get('x'),
      y: playerLocation.get('y')
    };
    yield put(npcActionCreators.moveNPCThiefCreator(playerPoint));
  }
}