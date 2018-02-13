import React from 'react';
import { shallow } from 'enzyme';
import Authenticate from '../../../src/utils/noAuth';
import Homepage from '../../../src/components/pages/Home';

const components = Authenticate(Homepage);

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
    it('Redirects Authenticated user from login page to recipe box', () => {
      props.isAuthenticated = true;
      expect(getComponent()).toMatchSnapshot();
    });

    it('Redirects user to loginpage with invalid token', () => {
      props.isAuthenticated = false;
      localStorage.setItem('jwtToken', 'dfdfjjhjhjdf');
      expect(getComponent()).toMatchSnapshot();
    });
  });
});
