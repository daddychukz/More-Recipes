import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import * as types from '../../src/actions/types';
import mockData from '../mocks/userData';
import {
  signUp,
  signIn,
  logout,
  getUserProfile,
  updateUserProfile,
  resetPasswordRequest,
  resetPassword } from '../../src/actions/userActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Test for users action', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });
  describe('Signup/Signout test cases', () => {
    it('should dispatch action to sign up a user', (done) => {
      moxios.stubRequest('/api/v1/users/signup', {
        status: 201,
        response: mockData.signupResponse
      });

      const expectedActions = [
        {
          type: types.SET_CURRENT_USER,
          user: mockData.decodedToken
        },
        {
          type: types.CREATE_USER,
          payload: mockData.signupResponse.User,
        }
      ];
      const store = mockStore({});

      return store.dispatch(signUp(mockData.signupRequest))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });

    it('should dispatch action to sign in a user', (done) => {
      moxios.stubRequest('/api/v1/users/signin', {
        status: 200,
        response: {
          data: mockData.signinResponse,
          token: mockData.token
        }
      });

      const expectedActions = [
        {
          type: types.SET_CURRENT_USER,
          user: mockData.decodedToken
        },
        {
          type: types.USER_LOGGED_IN,
          payload: mockData.signinResponse
        }
      ];
      const store = mockStore({});

      return store.dispatch(signIn(mockData.signinRequest))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });

    it('should dispatch action to signout a user', (done) => {
      const expectedActions = [
        {
          type: types.SET_CURRENT_USER,
          user: {}
        }
      ];
      const store = mockStore({});

      store.dispatch(logout());
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });

  describe('User profile test cases', () => {
    it('should dispatch action to get user profile', (done) => {
      moxios.stubRequest('/api/v1/user/profile/', {
        status: 200,
        response: mockData.userProfile
      });

      const expectedActions = [
        {
          type: types.GET_USER_PROFILE,
          payload: mockData.userProfile
        }
      ];
      const store = mockStore({});

      return store.dispatch(getUserProfile())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });

    it('should dispatch action to update user profile', (done) => {
      moxios.stubRequest('/api/v1/user/profile/edit', {
        status: 200,
        response: mockData.updatedProfileResponse
      });

      const expectedActions = [
        {
          type: types.EDIT_USER_PROFILE,
          payload: mockData.updatedProfileResponse
        }
      ];
      const store = mockStore({});

      return store.dispatch(updateUserProfile(mockData.updateProfileRequest))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });

    describe('User Password test cases', () => {
      it('should dispatch action to request reset password', (done) => {
        moxios.stubRequest('/api/v1/user/reset_password_request', {
          status: 200,
          response: {
            message: 'Reset Password link sent successfully'
          }
        });

        const expectedActions = [
          {
            type: types.RESET_USER_PASSWORD_REQUEST,
            payload: {
              message: 'Reset Password link sent successfully'
            }
          }
        ];
        const store = mockStore({});

        return store.dispatch(resetPasswordRequest('example@example.com'))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
            done();
          });
      });

      it('should dispatch action to reset user password', (done) => {
        moxios.stubRequest('/api/v1/user/reset-password', {
          status: 200,
          response: {
            message: 'Password Successfuly Updated'
          }
        });

        const expectedActions = [
          {
            type: types.RESET_USER_PASSWORD,
            payload: {
              message: 'Password Successfuly Updated'
            }
          }
        ];
        const store = mockStore({});

        return store.dispatch(resetPassword(mockData.resetPasswordRequest))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
            done();
          });
      });
    });
  });
});
