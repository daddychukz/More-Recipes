import React from 'react';
import { shallow } from 'enzyme';
import Authenticate from '../../../src/utils/requireAuth';
import Resetpassword from '../../../src/components/pages/ResetPassword';

const components = Authenticate(Resetpassword);

const { WrappedComponent } = components;


let props;
let mountedComponent;

/**
 * @description Initialise the component
 *
 * @returns {object} ManageRecipe - Mounted component
 */
const getComponent = () => {
  if (!mountedComponent) {
    mountedComponent = shallow(<WrappedComponent {...props} />);
  }
  return mountedComponent;
};

/**
 * @description Initialise the component
 *
 * @returns {object} ManageRecipe - Mounted component
 */

describe('Component: Authenticate', () => {
  beforeEach(() => {
    props = {
      isAuthenticated: true,
      history: {
        push: jest.fn()
      }
    };
    mountedComponent = undefined;
  });

  describe('Protected Routes test suite', () => {
    it('Redirects user to homepage without token', () => {
      props.isAuthenticated = false;
      expect(getComponent()).toMatchSnapshot();
    });

    it('Redirects user to homepage with invalid token', () => {
      localStorage.setItem('jwtToken', 'dfdfjjhjhjdf');
      expect(getComponent()).toMatchSnapshot();
    });
  });
});
