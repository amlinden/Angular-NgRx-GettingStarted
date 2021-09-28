import { createReducer, on, createAction, createFeatureSelector, createSelector } from '@ngrx/store';
import * as AppState from '../../state/app.state';
import { User } from '../user';

export interface State extends AppState.State {
  users: UserState;
}

export interface UserState {
  maskUserName: boolean;
  currentUser: User;
}

const initialState: UserState = {
  maskUserName: true,
  currentUser: null
}

const getUserFeatureState = createFeatureSelector<UserState>('users');

export const getMaskUserName = createSelector(
  getUserFeatureState,
  state => state.maskUserName
)
export const userReducer = createReducer(
initialState,
  on(createAction('[User] Mask User Name'), state => {
    return {
      ...state,
      maskUserName: !state.maskUserName
    };
  })
);
