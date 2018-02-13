import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import * as types from '../../src/actions/types';
import mockData from '../mocks/authData';
import { validateToken } from '../../src/actions/authActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Test for Vote actions', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });
  it('should dispatch action to upvote a recipe', (done) => {
    moxios.stubRequest('/api/v1/validate-token', {
      status: 200,
      response: { message: 'All good!' }
    });

    const expectedActions = [
      {
        type: types.VALIDATE_USER_TOKEN,
        payload: { message: 'All good!' }
      }
    ];
    const store = mockStore({});

    return store.dispatch(validateToken(mockData.token))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });
});
