import mockData from '../mocks/userData';
import * as types from '../../src/actions/types';
import userReducer from '../../src/reducers/userReducer';

describe('User Reducers', () => {
  describe('Create User Reducer', () => {
    it('should return proper initial state', (done) => {
      expect(userReducer(undefined, {})).toEqual({});
      done();
    });

    it('adds user data when action of type CREATE_USER is called', (done) => {
      const action = {
        type: types.CREATE_USER,
        payload: mockData.signupResponse.user,
      };

      const newState = userReducer({}, action);
      expect(newState).toEqual(action.payload);
      done();
    });

    it(`logs a user in when action of type USER_LOGGED_IN is
    called`, (done) => {
      const action = {
        type: types.USER_LOGGED_IN,
        payload: mockData.signinResponse
      };

      const newState = userReducer({}, action);
      expect(newState).toEqual(action.payload);
      done();
    });

    it(`gets user profile when action of type GET_USER_PROFILE
    is called`, (done) => {
      const action = {
        type: types.GET_USER_PROFILE,
        payload: mockData.userProfile
      };

      const newState = userReducer({}, action);
      expect(newState).toEqual(action.payload);
      done();
    });

    it(`modifies user profile when action of type EDIT_USER_PROFILE
    is called`, (done) => {
      const action = {
        type: types.EDIT_USER_PROFILE,
        payload: mockData.updatedProfileResponse
      };

      const newState = userReducer({}, action);
      expect(newState).toEqual(action.payload);
      done();
    });

    it(`validates user token when action of type VALIDATE_USER_TOKEN
    is called`, (done) => {
      const action = {
        type: types.VALIDATE_USER_TOKEN,
        payload: { message: 'all good' }
      };

      const newState = userReducer({}, action);
      expect(newState.message).toEqual('all good');
      done();
    });

    it(`resets user password when action of type RESET_USER_PASSWORD
    is called`, (done) => {
      const action = {
        type: types.RESET_USER_PASSWORD,
        payload: { message: 'password updated' }
      };
      const newState = userReducer({}, action);
      expect(newState.message).toEqual('password updated');
      done();
    });

    it(`sends reset password Link when action of type
    RESET_USER_PASSWORD_REQUEST is called`, (done) => {
      const action = {
        type: types.RESET_USER_PASSWORD_REQUEST,
        payload: { message: 'Reset password link sent' }
      };
      const newState = userReducer({}, action);
      expect(newState.message).toEqual('Reset password link sent');
      done();
    });
  });
});
