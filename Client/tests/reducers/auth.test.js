import mockData from '../mocks/userData';
import * as types from '../../src/actions/types';
import authReducer from '../../src/reducers/authReducer';

describe('Favorite Recipe Reducer', () => {
  const initialState = {
    isAuthenticated: false,
    user: {}
  };

  it('should return proper initial state', (done) => {
    expect(authReducer(undefined, {})).toEqual(initialState);
    done();
  });

  it('sets the current user when action of type SET_CURRENT_USER is called', (done) => {
    const action = {
      type: types.SET_CURRENT_USER,
      user: mockData.decodedToken
    };

    const newState = authReducer({}, action);
    expect(newState.user.fullname).toEqual('Adam Eve');
    done();
  });
});
